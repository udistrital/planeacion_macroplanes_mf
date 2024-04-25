import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RequestManager } from '../../../services/requestManager';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { VisualizarDocumentoDialogComponent } from '../../visualizar-documento-dialog/visualizar-documento-dialog.component';

@Component({
  selector: 'app-pui',
  templateUrl: './pui.component.html',
  styleUrls: ['./pui.component.scss']
})
export class PuiComponent implements OnInit{
  displayedColumns: string[] = ['Vigencia', 'Nombre', 'Descripcion', 'Soporte'];
  dataSource!: MatTableDataSource<any>;
  planes!: any[];

  constructor(
    private request: RequestManager,
    public dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource();
    this.loadData();
  }

  loadData() {
    this.request
      .get(
        environment.PLANES_CRUD,
        `plan?query=tipo_plan_id:623cb06616511e41ef5d798c`
      )
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.planes = data.Data;
            this.getVigencias();
            this.dataSource.data = this.planes;
          }
        },
        error: (error) => {
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
            `periodo?query=Id:` + this.planes[i].vigencia
          )
          .subscribe({
            next: (data: any) => {
              if (data) {
                let vigencia: any = data.Data[0];
                this.planes[i].vigencia = vigencia.Nombre;
              }
            },
            error: (error) => {
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

  revisarDocumento(documentoId: any) {
    let header = "data:application/pdf;base64,";
    let documentoBase64: string;
    if (documentoId != "") {
      this.loadDocumento(documentoId).then((documento: any) => {
        if (documento["file"] == undefined) {
          const file = documento;
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            let aux = new String(reader.result);
            documentoBase64 = aux.replace(header, "");
            const dialogRef = this.dialog.open(VisualizarDocumentoDialogComponent, {
              width: '1200',
              minHeight: 'calc(100vh - 90px)',
              height: '80%',
              data: documentoBase64
            });
          }
        } else {
          const dialogRef = this.dialog.open(VisualizarDocumentoDialogComponent, {
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
    let message: string = '';
    let resolveRef: any;
    let rejectRef: any;
    let dataPromise: Promise<string> = new Promise((resolve, reject) => {
      resolveRef = resolve;
      rejectRef = reject;
    });
    let documento: any;
    Swal.fire({
      title: 'Cargando documento',
      timerProgressBar: true,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    })
    this.request
      .get(environment.GESTOR_DOCUMENTAL_MID, `document/` + documentoId)
      .subscribe({
        next: (data: any) => {
          if (data) {
            documento = {
              name: data['dc:title'],
              size: data['file:content']['length'],
              type: data['file:content']['mime-type'],
              uid: documentoId,
              file: data['file'],
            };
            resolveRef(documento);
          } else {
            Swal.fire({
              title: 'Error al cargar documento',
              icon: 'warning',
              showConfirmButton: false,
              timer: 2500,
            });
            rejectRef(undefined);
          }
        },
      });
    return dataPromise;
  }

  ngOnInit(): void {
  }
}
