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
    component: PedComponent
  },
  {
    path: "seguimiento-ped",
    component: SeguimientoPedComponent
  },
  {
    path: "evaluacion-ped",
    component: EvaluacionPedComponent
  },
  {
    path: "consultar-pi",
    component: ConsultarPiComponent
  },
  {
    path: "seguimiento-pi",
    component: SeguimientoPiComponent
  },
  {
    path: "evaluacion-pi",
    component: EvaluacionPiComponent
  },
  {
    path: "consultar-poa",
    component: ConsultarPoaComponent
  },
  {
    path: "evaluacion-poa",
    component: EvaluacionPoaComponent
  },
  {
    path: "construccion-pmee",
    component: ConstruccionPmeeComponent
  },
  {
    path: "seguimiento-pmee",
    component: SeguimientoPmeeComponent
  },
  {
    path: "evaluacion-pmee",
    component: EvaluacionPmeeComponent,
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
