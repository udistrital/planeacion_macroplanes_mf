import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataRequest } from 'src/app/@core/models/dataRequest';
import { Plan } from 'src/app/@core/models/plan';
import { SubGrupoDetalle } from 'src/app/@core/models/subGrupoDetalle';
import {
  CodigosService,
} from 'src/app/@core/services/codigosEstados.service';
import { RequestManager } from 'src/app/@core/services/requestManager';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ConsultarDialogComponent } from '../dialogs/consultar-dialog/consultar-dialog.component';
import { EditarDialogComponent } from '../dialogs/editar-dialog/editar-dialog.component';

@Component({
  selector: 'app-consultar-planes',
  templateUrl: './consultar-planes.component.html',
  styleUrls: ['./consultar-planes.component.scss'],
})
export class ConsultarPlanesComponent implements OnInit {
  @Input() posicionTipoPlan!: number;
  displayedColumns: string[] = ['nombre', 'descripcion', 'activo', 'actions'];
  dataSource!: MatTableDataSource<Plan>;
  planes!: Plan[];
  plan!: Plan;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private request: RequestManager,
    private codigosService: CodigosService
  ) { }

  async ngOnInit() {
    await this.codigosService.cargarIdentificadores();
    this.cargarPlanesFiltradosPorTipoDePlan();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialogEditar(plan: Plan): void {
    const dialogRef = this.dialog.open(EditarDialogComponent, {
      width: 'calc(80vw - 60px)',
      height: 'calc(40vw - 60px)',
      data: {
        ban: 'plan',
        sub: plan,
        subDetalle: {
          type: '',
          required: false,
        } as SubGrupoDetalle,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == undefined) {
        return undefined;
      } else {
        let planAActualizar = {
          ...result,
          _id: this.plan._id,
          activo: result.activo == 'true' ? true : false,
          formato: result.formato == 'true' ? true : false,
        } as Plan;
        this.actualizarPlan(planAActualizar);
      }
    });
  }

  openDialogConsultar(sub: Plan): void {
    this.dialog.open(ConsultarDialogComponent, {
      width: 'calc(80vw - 60px)',
      height: 'calc(40vw - 60px)',
      data: {
        ban: 'plan',
        sub,
        subDetalle: {
          type: '',
          required: false,
        } as SubGrupoDetalle,
      },
    });
  }

  actualizarPlan(planActualizado: Plan) {
    if (this.plan.activo != planActualizado.activo) {
      // Si cambio el estado activo de el plan
      Swal.fire({
        title: planActualizado.activo ? 'Habilitar plan' : 'Inhabilitar Plan',
        text: `¿Está seguro de ${planActualizado.activo ? 'habilitar' : 'inhabilitar'
          } el plan?`,
        showCancelButton: true,
        confirmButtonText: `Si`,
        cancelButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          // Actualiza el plan
          this.request
            .put(
              environment.PLANES_CRUD,
              `plan/${planActualizado._id}`,
              planActualizado
            )
            .subscribe({
              next: (data: DataRequest) => {
                if (data) {
                  if (planActualizado.activo) {
                    // Activa el arbol
                    this.request
                      .put(
                        environment.PLANEACION_ARBOL_MID,
                        `arbol/plan/${planActualizado._id}/activar`,
                        {}
                      )
                      .subscribe({
                        next: (data: DataRequest) => {
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
                          console.error(error);
                          Swal.fire({
                            title: 'No se logró activar el plan',
                            icon: 'error',
                            showConfirmButton: false,
                            timer: 2500,
                          });
                        },
                      });
                  } else {
                    // Desactiva el arbol
                    this.request
                      .delete(
                        environment.PLANEACION_ARBOL_MID,
                        `arbol/plan/${planActualizado._id}/desactivar`
                      )
                      .subscribe({
                        next: (data: DataRequest) => {
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
                          console.error(error);
                          Swal.fire({
                            title: 'No se logró desactivar el plan',
                            icon: 'error',
                            showConfirmButton: false,
                            timer: 2500,
                          });
                        },
                      });
                  }
                }
              },
              error: (error) => {
                console.error(error);
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
            timer: 2500,
          });
        }
      });
    } else {
      // Si no cambio el estado activo de el plan
      this.request
        .put(
          environment.PLANES_CRUD,
          `plan/${planActualizado._id}`,
          planActualizado
        )
        .subscribe({
          next: (data: DataRequest) => {
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
            console.error(error);
            Swal.fire({
              title: 'Error en la operación',
              icon: 'error',
              showConfirmButton: false,
              timer: 2500,
            });
          },
        });
    }
  }

  inactivarArbol(planId: string) {
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
            `arbol/plan/${planId}/desactivar`
          )
          .subscribe({
            next: (data: DataRequest) => {
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
              console.error(error);
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
          timer: 2500,
        });
      }
    });
  }

  cargarPlanesFiltradosPorTipoDePlan() {
    this.request
      .get(
        environment.PLANES_CRUD,
        `plan?query=tipo_plan_id:${this.codigosService.getCodigo(
          this.posicionTipoPlan
        )}`
      )
      .subscribe({
        next: (data: DataRequest) => {
          if (data) {
            this.planes = data.Data;
            this.dataSource = new MatTableDataSource(this.planes);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
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

  editar(fila: Plan): void {
    this.plan = fila;
    console.log('Plan antes de editar:');
    console.log(fila);
    this.request.get(environment.PLANES_CRUD, `plan/${fila._id}`).subscribe({
      next: (data: DataRequest) => {
        if (data) {
          this.plan = data.Data;
          this.openDialogEditar(this.plan);
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

  consultar(fila: Plan): void {
    this.plan = fila;
    this.request
      .get(environment.PLANEACION_ARBOL_MID, `arbol/${fila._id}`)
      .subscribe({
        next: (data: DataRequest) => {
          // Verifica si hay datos en el arbol de el plan
          if (data?.Data) {
            this.openDialogConsultar(fila);
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
          Swal.fire({
            title: 'No hay datos relacionados',
            text: 'No existe información para el plan señalado.',
            icon: 'info',
            showConfirmButton: false,
            timer: 2500,
          });
        },
      });
  }

  inactivar(fila: Plan): void {
    this.plan = fila;
    if (fila.activo) {
      this.inactivarArbol(fila._id);
    } else {
      Swal.fire({
        title: 'Plan ya inactivo',
        text: `El plan ya se encuentra en estado inactivo`,
        icon: 'info',
        showConfirmButton: false,
        timer: 2500,
      });
    }
  }
}
