import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RequestManager } from '../../../services/requestManager';
import { ConsultarDialogPedComponent } from './consultar-dialog-ped/consultar-dialog-ped.component';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { EditarDialogComponent } from '../../editar-dialog/editar-dialog.component';

@Component({
  selector: 'app-ped',
  templateUrl: './ped.component.html',
  styleUrls: ['./ped.component.scss']
})
export class PedComponent implements OnInit{
  displayedColumns: string[] = ['nombre', 'descripcion', 'activo', 'actions'];
  dataSource!: MatTableDataSource<any>;
  uid!: number; // id del objeto
  planes!: any[];
  plan: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private request: RequestManager,
  ) {
    this.loadData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialogEditar(sub: any, subDetalle: any): void {
    const dialogRef = this.dialog.open(EditarDialogComponent, {
      width: 'calc(80vw - 60px)',
      height: 'calc(40vw - 60px)',
      data: {ban: 'plan', sub, subDetalle}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined){
        return undefined;
      } else {
        this.putData(result, 'editar');
      }
    });
  }

  openDialogConsultar(sub: any, subDetalle: any): void {
    const dialogRef = this.dialog.open(ConsultarDialogPedComponent, {
      width: 'calc(80vw - 60px)',
      height: 'calc(40vw - 60px)',
      data: {ban: 'plan', sub, subDetalle}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined){
        return undefined;
      } else {
        this.putData(result, 'editar');
      }
    });
  }

  putData(res: any, bandera: any){
    if (bandera == 'editar'){
      this.request
        .put(environment.PLANES_CRUD, `plan`, res, this.uid)
        .subscribe({
          next: (data: any) => {
            if (data) {
              Swal.fire({
                title: 'Actualización correcta',
                text: `Se actualizaron correctamente los datos`,
                icon: 'success',
              }).then((result) => {
                if (result.value) {
                  window.location.reload();
                }
              });
            }
          },
          error: (error) => {
            Swal.fire({
              title: 'Error en la operación',
              icon: 'error',
              showConfirmButton: false,
              timer: 2500,
            });
          },
        });
    } else if (bandera == 'activo') {
      Swal.fire({
        title: 'Inhabilitar plan',
        text: `¿Está seguro de inhabilitar el plan?`,
        showCancelButton: true,
        confirmButtonText: `Si`,
        cancelButtonText: `No`,
      }).then((result) => {
          if (result.isConfirmed) {
            this.request
              .put(environment.PLANES_CRUD, `plan`, res, this.uid)
              .subscribe({
                next: (data: any) => {
                  if (data) {
                    Swal.fire({
                      title: 'Cambio realizado',
                      icon: 'success',
                    }).then((result) => {
                      if (result.value) {
                        window.location.reload();
                      }
                    });
                  }
                },
                error: (error) => {
                  Swal.fire({
                    title: 'Error en la operación',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2500,
                  });
                },
              });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              title: 'Cambio cancelado',
              icon: 'error',
              showConfirmButton: false,
              timer: 2500
            })
          }
      })
    }
  }

  // Inactivar todo el árbol
  deleteData(){
    Swal.fire({
      title: 'Inhabilitar plan',
      text: `¿Está seguro de inhabilitar el plan?`,
      showCancelButton: true,
      confirmButtonText: `Si`,
      cancelButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
          this.request
            .delete(
              environment.PLANEACION_ARBOL_MID,
              `arbol/plan/${this.uid}/desactivar`
            )
            .subscribe({
              next: (data: any) => {
                if (data) {
                  Swal.fire({
                    title: 'Cambio realizado',
                    icon: 'success',
                  }).then((result) => {
                    if (result.value) {
                      window.location.reload();
                    }
                  });
                }
              },
              error: (error) => {
                Swal.fire({
                  title: 'Error en la operación',
                  icon: 'error',
                  showConfirmButton: false,
                  timer: 2500,
                });
              },
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: 'Cambio cancelado',
            icon: 'error',
            showConfirmButton: false,
            timer: 2500
          })
        }
    })
  }

  loadData(){
    this.request
      .get(
        environment.PLANES_CRUD,
        `plan?query=tipo_plan_id:616513b91634adfaffed52bf`
      )
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.planes = data.Data;
            this.ajustarData();
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

  ajustarData(){
    this.cambiarValor("activo", true, "Activo")
    this.cambiarValor("activo", false, "Inactivo")
    this.dataSource = new MatTableDataSource(this.planes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editar(fila: any): void{
    this.uid = fila._id;
    this.request.get(environment.PLANES_CRUD, `plan/${this.uid}`).subscribe({
      next: (data: any) => {
        if (data) {
          this.plan = data.Data;
          let subgrupoDetalle = {
            type: '',
            required: false,
          };
          this.openDialogEditar(this.plan, subgrupoDetalle);
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

  consultar(fila: any): void{
    this.uid = fila._id;
    this.request.get(environment.PLANES_CRUD, `plan/${this.uid}`).subscribe({
      next: (data: any) => {
        if (data && data.Data && Array.isArray(data.Data.structuredData)) {
          // Verifica si hay datos y si data.Data no es nulo ni está vacío
          this.plan = data.Data;
          let subgrupoDetalle = {
            type: '',
            required: false,
          };
          this.openDialogConsultar(this.plan, subgrupoDetalle);
        } else {
          Swal.fire({
            title: 'No hay datos relacionados',
            text: 'No existe información para el plan señalado.',
            icon: 'info',
            showConfirmButton: false,
            timer: 2500,
          });
        }
      },
      error: (error) => {
        console.error(error);
        // Maneja el caso de error en la solicitud HTTP GET
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

  inactivar(fila: any):void{
    this.uid = fila._id;
    if (fila.activo == 'Activo'){
      if (fila.tipo_plan_id != '611af8464a34b3599e3799a2'){
        this.deleteData();
      } else if (fila.tipo_plan_id == '611af8464a34b3599e3799a2'){
        let res = {
          activo: false,
        }
        this.putData(res, 'activo')
      }
    } else if (fila.activo == 'Inactivo'){
      Swal.fire({
        title: 'Plan ya inactivo',
        text: `El plan ya se encuentra en estado inactivo`,
        icon: 'info',
        showConfirmButton: false,
        timer: 2500
      });
    }
  }

  cambiarValor(valorABuscar: any, valorViejo: any, valorNuevo: any) {
    this.planes.forEach(function(elemento) {
      elemento[valorABuscar] = elemento[valorABuscar] == valorViejo ? valorNuevo : elemento[valorABuscar]
    })
  }

  ngOnInit(): void {

  }
}
