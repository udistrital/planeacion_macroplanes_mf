import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArbolComponent } from './components/arbol/arbol.component';
import { ConstruccionComponent } from './components/construccion/construccion.component';
import { ConsultarPlanesComponent } from './components/consultar/consultar-planes.component';
import { ConsultarDialogComponent } from './components/dialogs/consultar-dialog/consultar-dialog.component';
import { EditarDialogComponent } from './components/dialogs/editar-dialog/editar-dialog.component';
import { VisualizarDocumentoDialogComponent } from './components/dialogs/visualizar-documento-dialog/visualizar-documento-dialog.component';
import { EvaluacionPedComponent } from './pages/ped/evaluacion-ped/evaluacion-ped.component';
import { PedComponent } from './pages/ped/ped.component';
import { SeguimientoPedComponent } from './pages/ped/seguimiento-ped/seguimiento-ped.component';
import { ConsultarPiComponent } from './pages/plan-indicativo/consultar-pi/consultar-pi.component';
import { EvaluacionPiComponent } from './pages/plan-indicativo/evaluacion-pi/evaluacion-pi.component';
import { SeguimientoPiComponent } from './pages/plan-indicativo/seguimiento-pi/seguimiento-pi.component';
import { ConsultarPoaComponent } from './pages/plan-operativo-anual/consultar-poa/consultar-poa.component';
import { EvaluacionPoaComponent } from './pages/plan-operativo-anual/evaluacion-poa/evaluacion-poa.component';
import { ConstruccionPmeeComponent } from './pages/pmee/construccion-pmee/construccion-pmee.component';
import { EvaluacionPmeeComponent } from './pages/pmee/evaluacion-pmee/evaluacion-pmee.component';
import { SeguimientoPmeeComponent } from './pages/pmee/seguimiento-pmee/seguimiento-pmee.component';
import { PuiComponent } from './pages/pui/pui.component';
import { TranslationPaginator } from './@core/services/TranslationPaginator';

@NgModule({
  declarations: [
    AppComponent,
    ConsultarPlanesComponent,
    ArbolComponent,
    PedComponent,
    ConsultarDialogComponent,
    EvaluacionPedComponent,
    SeguimientoPedComponent,
    ConsultarPiComponent,
    EvaluacionPiComponent,
    SeguimientoPiComponent,
    ConsultarPoaComponent,
    EvaluacionPoaComponent,
    ConstruccionPmeeComponent,
    EvaluacionPmeeComponent,
    SeguimientoPmeeComponent,
    PuiComponent,
    EditarDialogComponent,
    VisualizarDocumentoDialogComponent,
    ConstruccionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatDialogModule,
    MatRadioModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatChipsModule,
    MatMenuModule,
    FormsModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: TranslationPaginator }],
  bootstrap: [AppComponent],
})
export class AppModule { }
