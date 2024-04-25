import { Injectable } from '@angular/core';
import { RequestManager } from './requestManager';
import { environment } from 'src/environments/environment';
import { DataRequest } from '../@core/models/dataRequest';

const ABREVIACIONES = {
  'tipo-plan': {
    Proyecto: 'PR_SP',
    DesarrolloEstrategico: 'PD_SP',
    Indicativo: 'PLI_SP',
    UniversitarioInstitucional: 'PUI_SP',
  },
};

@Injectable({
  providedIn: 'root',
})
export class CodigosEstados {
  private idTipoPlanProyecto = '';
  private idTipoPlanDesarrolloEstrategico = '';
  private idTipoPlanIndicativo = '';
  private idTipoPlanUniversitarioInstitucional = '';
  private constructor(public request: RequestManager) {}

  public async cargarIdentificadores() {
    await new Promise((resolve) => {
      this.request
        .get(
          environment.PLANES_CRUD,
          `tipo-plan?query=codigo_abreviacion:${ABREVIACIONES['tipo-plan'].Proyecto},activo=true`
        )
        .subscribe({
          next: (data: DataRequest) => {
            if (data.Data[0]) {
              this.idTipoPlanProyecto = data.Data[0]._id;
              resolve(data.Data[0]._id);
            }
          },
        });
    });
    await new Promise((resolve) => {
      this.request
        .get(
          environment.PLANES_CRUD,
          `tipo-plan?query=codigo_abreviacion:${ABREVIACIONES['tipo-plan'].DesarrolloEstrategico},activo=true`
        )
        .subscribe({
          next: (data: DataRequest) => {
            if (data.Data[0]) {
              this.idTipoPlanDesarrolloEstrategico = data.Data[0]._id;
              resolve(data.Data[0]._id);
            }
          },
        });
    });
    await new Promise((resolve) => {
      this.request
        .get(
          environment.PLANES_CRUD,
          `tipo-plan?query=codigo_abreviacion:${ABREVIACIONES['tipo-plan'].Indicativo},activo=true`
        )
        .subscribe({
          next: (data: DataRequest) => {
            if (data.Data[0]) {
              this.idTipoPlanIndicativo = data.Data[0]._id;
              resolve(data.Data[0]._id);
            }
          },
        });
    });
    await new Promise((resolve) => {
      this.request
        .get(
          environment.PLANES_CRUD,
          `tipo-plan?query=codigo_abreviacion:${ABREVIACIONES['tipo-plan'].UniversitarioInstitucional},activo=true`
        )
        .subscribe({
          next: (data: DataRequest) => {
            if (data.Data[0]) {
              this.idTipoPlanUniversitarioInstitucional = data.Data[0]._id;
              resolve(data.Data[0]._id);
            }
          },
        });
    });
  }

  public getIdTipoPlanProyecto() {
    return this.idTipoPlanProyecto;
  }

  public getIdTipoPlanDesarrolloEstrategico() {
    return this.idTipoPlanDesarrolloEstrategico;
  }

  public getIdTipoPlanIndicativo() {
    return this.idTipoPlanIndicativo;
  }

  public getIdTipoPlanUniversitarioInstitucional() {
    return this.idTipoPlanUniversitarioInstitucional;
  }
}
