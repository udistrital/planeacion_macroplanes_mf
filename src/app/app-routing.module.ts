import { APP_BASE_HREF } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { getSingleSpaExtraProviders } from 'single-spa-angular';
import { PedComponent } from './pages/ped/ped.component';
import { SeguimientoPedComponent } from './pages/ped/seguimiento-ped/seguimiento-ped.component';
import { EvaluacionPedComponent } from './pages/ped/evaluacion-ped/evaluacion-ped.component';
import { ConsultarPiComponent } from './pages/plan-indicativo/consultar-pi/consultar-pi.component';
import { EvaluacionPiComponent } from './pages/plan-indicativo/evaluacion-pi/evaluacion-pi.component';
import { ConsultarPoaComponent } from './pages/plan-operativo-anual/consultar-poa/consultar-poa.component';
import { EvaluacionPoaComponent } from './pages/plan-operativo-anual/evaluacion-poa/evaluacion-poa.component';
import { SeguimientoPiComponent } from './pages/plan-indicativo/seguimiento-pi/seguimiento-pi.component';
import { ConstruccionPmeeComponent } from './pages/pmee/construccion-pmee/construccion-pmee.component';
import { SeguimientoPmeeComponent } from './pages/pmee/seguimiento-pmee/seguimiento-pmee.component';
import { EvaluacionPmeeComponent } from './pages/pmee/evaluacion-pmee/evaluacion-pmee.component';
import { PuiComponent } from './pages/pui/pui.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'ped',
    component: AppComponent,
    children: [
      {
        path: "consultar",
        component: PedComponent
      },
      {
        path: 'seguimiento',
        component: SeguimientoPedComponent,
      },
      {
        path: 'evaluacion',
        component: EvaluacionPedComponent,
      },
    ],
  },
  {
    path: 'pi',
    component: AppComponent,
    children: [
      {
        path: 'consultar',
        component: ConsultarPiComponent,
      },
      {
        path: 'seguimiento',
        component: SeguimientoPiComponent,
      },
      {
        path: 'evaluacion',
        component: EvaluacionPiComponent,
      },
    ],
  },

  {
    path: 'poa',
    component: AppComponent,
    children: [
      {
        path: 'consultar',
        component: ConsultarPoaComponent,
      },
      {
        path: 'evaluacion',
        component: EvaluacionPoaComponent,
      },
    ],
  },
  {
    path: 'pmee',
    component: AppComponent,
    children: [
      {
        path: 'construccion',
        component: ConstruccionPmeeComponent,
      },
      {
        path: 'seguimiento',
        component: SeguimientoPmeeComponent,
      },
      {
        path: 'evaluacion',
        component: EvaluacionPmeeComponent,
      },
    ],
  },
  {
    path: 'pui',
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
