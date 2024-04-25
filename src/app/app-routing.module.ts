import { APP_BASE_HREF } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { getSingleSpaExtraProviders } from 'single-spa-angular';
import { PedComponent } from './components/macroplanes/ped/ped.component';
import { SeguimientoPedComponent } from './components/macroplanes/ped/seguimiento-ped/seguimiento-ped.component';
import { EvaluacionPedComponent } from './components/macroplanes/ped/evaluacion-ped/evaluacion-ped.component';
import { ConsultarPiComponent } from './components/macroplanes/plan-indicativo/consultar-pi/consultar-pi.component';
import { EvaluacionPiComponent } from './components/macroplanes/plan-indicativo/evaluacion-pi/evaluacion-pi.component';
import { ConsultarPoaComponent } from './components/macroplanes/plan-operativo-anual/consultar-poa/consultar-poa.component';
import { EvaluacionPoaComponent } from './components/macroplanes/plan-operativo-anual/evaluacion-poa/evaluacion-poa.component';
import { SeguimientoPiComponent } from './components/macroplanes/plan-indicativo/seguimiento-pi/seguimiento-pi.component';
import { ConstruccionPmeeComponent } from './components/macroplanes/pmee/construccion-pmee/construccion-pmee.component';
import { SeguimientoPmeeComponent } from './components/macroplanes/pmee/seguimiento-pmee/seguimiento-pmee.component';
import { EvaluacionPmeeComponent } from './components/macroplanes/pmee/evaluacion-pmee/evaluacion-pmee.component';
import { PuiComponent } from './components/macroplanes/pui/pui.component';

const routes: Routes = [
  {
    path: "ped",
    component: PedComponent,
    children: [
      {
        path: "seguimiento",
        component: SeguimientoPedComponent
      },
      {
        path: "evaluacion",
        component: EvaluacionPedComponent
      },
    ]
  },
  {
    path: "pi",
    component: ConsultarPiComponent,
    children: [
      {
        path: "seguimiento",
        component: SeguimientoPiComponent
      },
      {
        path: "evaluacion",
        component: EvaluacionPiComponent
      },
    ]
  },

  {
    path: "poa",
    component: ConsultarPoaComponent,
    children: [
      {
        path: "evaluacion",
        component: EvaluacionPoaComponent
      },
    ]
  },
  {
    path: "pmee",
    component: SeguimientoPmeeComponent,
    children: [
      {
        path: "construccion",
        component: ConstruccionPmeeComponent
      },
      {
        path: "evaluacion",
        component: EvaluacionPmeeComponent,
      },
    ]
  },
  {
    path: "pui",
    component: PuiComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    provideRouter(routes),
    { provide: APP_BASE_HREF, useValue: '/macroplanes/' },
    getSingleSpaExtraProviders(),
    provideHttpClient(withFetch())
  ]
})
export class AppRoutingModule { }
