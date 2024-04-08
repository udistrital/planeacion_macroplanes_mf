import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArbolComponent } from './components/arbol/arbol.component';
import { PedComponent } from './components/macroplanes/ped/ped.component';
import { ConsultarDialogPedComponent } from './components/macroplanes/ped/consultar-dialog-ped/consultar-dialog-ped.component';
import { EvaluacionPedComponent } from './components/macroplanes/ped/evaluacion-ped/evaluacion-ped.component';
import { SeguimientoPedComponent } from './components/macroplanes/ped/seguimiento-ped/seguimiento-ped.component';
import { ConsultarPiComponent } from './components/macroplanes/plan-indicativo/consultar-pi/consultar-pi.component';
import { EvaluacionPiComponent } from './components/macroplanes/plan-indicativo/evaluacion-pi/evaluacion-pi.component';
import { SeguimientoPiComponent } from './components/macroplanes/plan-indicativo/seguimiento-pi/seguimiento-pi.component';
import { ConsultarPoaComponent } from './components/macroplanes/plan-operativo-anual/consultar-poa/consultar-poa.component';
import { EvaluacionPoaComponent } from './components/macroplanes/plan-operativo-anual/evaluacion-poa/evaluacion-poa.component';
import { ConstruccionPmeeComponent } from './components/macroplanes/pmee/construccion-pmee/construccion-pmee.component';
import { EvaluacionPmeeComponent } from './components/macroplanes/pmee/evaluacion-pmee/evaluacion-pmee.component';
import { SeguimientoPmeeComponent } from './components/macroplanes/pmee/seguimiento-pmee/seguimiento-pmee.component';
import { PuiComponent } from './components/macroplanes/pui/pui.component';
import { EditarDialogComponent } from './components/editar-dialog/editar-dialog.component';
import { VisualizarDocumentoDialogComponent } from './components/visualizar-documento-dialog/visualizar-documento-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ArbolComponent,
    PedComponent,
    ConsultarDialogPedComponent,
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
    VisualizarDocumentoDialogComponent
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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
