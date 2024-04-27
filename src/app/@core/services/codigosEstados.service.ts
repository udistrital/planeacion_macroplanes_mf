import { Injectable } from '@angular/core';
import { RequestManager } from './requestManager';
import { environment } from 'src/environments/environment';
import { DataRequest } from '../models/dataRequest';
import { TipoPlan } from '../models/tipoPlan';

const ABREVIACIONES = [
  { nombre: 'Proyecto', valor: 'PR_SP' },
  { nombre: 'DesarrolloEstrategico', valor: 'PD_SP' },
  { nombre: 'Indicativo', valor: 'PLI_SP' },
  { nombre: 'UniversitarioInstitucional', valor: 'PUI_SP' },
];
export enum TIPO_PLAN {
  Proyecto,
  DesarrolloEstrategico,
  Indicativo,
  UniversitarioInstitucional,
}
@Injectable({
  providedIn: 'root',
})
export class CodigosService {
  codigos: string[] = [];

  private constructor(public request: RequestManager) {}

  public async cargarIdentificadores() {
    const promesas = ABREVIACIONES.map(async (valor, pos) => {
      return new Promise<string>((resolve) => {
        this.request
          .get(
            environment.PLANES_CRUD,
            `tipo-plan?query=codigo_abreviacion:${valor.valor},activo=true`
          )
          .subscribe({
            next: (data: DataRequest) => {
              if (data.Data[0]) {
                const tipoPlan = data.Data[0] as TipoPlan;
                resolve(tipoPlan._id);
              }
            },
          });
      }).then((codigo) => {
        this.codigos[pos] = codigo;
      });
    });
    await Promise.all(promesas);
  }

  public getCodigo(posicion: number) {
    return this.codigos[posicion];
  }
}
