import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RequestManager } from '../../../services/requestManager';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { VisualizarDocumentoDialogComponent } from '../../visualizar-documento-dialog/visualizar-documento-dialog.component';
import { Plan } from 'src/app/@core/models/plan';
import { DataRequest } from 'src/app/@core/models/dataRequest';
import { Vigencia } from 'src/app/@core/models/vigencia';
import { DocumentRequest, Documento } from 'src/app/@core/models/document';
import { CodigosEstados } from 'src/app/services/codigosEstados.service';

@Component({
  selector: 'app-pui',
  templateUrl: './pui.component.html',
  styleUrls: ['./pui.component.scss']
})
export class PuiComponent implements OnInit{
  displayedColumns: string[] = ['Vigencia', 'Nombre', 'Descripcion', 'Soporte'];
  dataSource!: MatTableDataSource<Plan>;
  planes!: Plan[];

  constructor(
    private request: RequestManager,
    public dialog: MatDialog,
    private codigosService: CodigosEstados
  ) {
    this.dataSource = new MatTableDataSource();
  }

  loadData() {
    this.request
      .get(
        environment.PLANES_CRUD,
        `plan?query=tipo_plan_id:${this.codigosService.getIdTipoPlanUniversitarioInstitucional()}`
      )
      .subscribe({
        next: (data: DataRequest) => {
          if (data) {
            this.planes = data.Data as Plan[];
            this.getVigencias();
            this.dataSource.data = this.planes;
          }
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            title: 'Error en la operación',
            text: 'No se encontraron datos registrados',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2500,
          });
        },
      });
  }

  getVigencias() {
    for (let i = 0; i < this.planes.length; i++) {
      if (this.planes[i].vigencia != undefined)
        this.request
          .get(
            environment.PARAMETROS_SERVICE,
            `periodo?query=Id:${this.planes[i].vigencia}`
          )
          .subscribe({
            next: (data: DataRequest) => {
              if (data) {
                let vigencia: Vigencia  = data.Data[0];
                this.planes[i].vigencia = vigencia.Nombre;
              }
            },
            error: (error) => {
              console.error(error);
              Swal.fire({
                title: 'Error en la operación',
                text: 'No se encontraron datos registrados',
                icon: 'warning',
                showConfirmButton: false,
                timer: 2500,
              });
            },
          });
    }
  }

  revisarDocumento(documentoId: string) {
    let header = "data:application/pdf;base64,";
    let documentoBase64: string;
    if (documentoId !== "") {
      this.loadDocumento(documentoId).then((documento: Documento) => {
        if (documento.file === undefined) {
          const file = documento;
          const reader = new FileReader();
          // @ts-ignore
          reader.readAsDataURL(file);
          reader.onload = () => {
            let aux = new String(reader.result);
            documentoBase64 = aux.replace(header, "");
            this.dialog.open(VisualizarDocumentoDialogComponent, {
              width: '1200',
              minHeight: 'calc(100vh - 90px)',
              height: '80%',
              data: documentoBase64
            });
          }
        } else {
          this.dialog.open(VisualizarDocumentoDialogComponent, {
            width: '1000px',
            minHeight: 'calc(100vh - 90px)',
            height: '80%',
            data: { "url": header + documento.file, banderaPUI: true}
          });
        }
      })
    } else {
      Swal.fire({
        title: 'Error en la operación',
        text: 'Este proyecto no tiene soporte documental',
        icon: 'warning',
        showConfirmButton: false,
        timer: 2500
      })
    }
  }

  loadDocumento(documentoId: string) {
    Swal.fire({
      title: 'Cargando documento',
      timerProgressBar: true,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    })
    let documento: Documento;
    return new Promise<Documento>((resolve, reject) => {
      this.request
        .get(environment.GESTOR_DOCUMENTAL_MID, `document/${documentoId}`)
        .subscribe({
          next: (data: DocumentRequest) => {
            if (data) {
              documento = {
                name: data['dc:title'],
                size: data['file:content'].length,
                type: data['file:content']['mime-type'],
                uid: documentoId,
                file: data.file,
              };
              resolve(documento);
            } else {
              Swal.fire({
                title: 'Error al cargar documento',
                icon: 'warning',
                showConfirmButton: false,
                timer: 2500,
              });
              reject(undefined);
            }
          },
        });
    });
  }

  async ngOnInit() {
    await this.codigosService.cargarIdentificadores();
    this.loadData();
  }
}
