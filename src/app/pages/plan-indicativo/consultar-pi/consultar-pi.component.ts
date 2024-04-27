import { Component, OnInit } from '@angular/core';
import {
  TIPO_PLAN
} from 'src/app/@core/services/codigosEstados.service';

@Component({
  selector: 'app-consultar-pi',
  templateUrl: './consultar-pi.component.html',
  styleUrls: ['./consultar-pi.component.scss'],
})
export class ConsultarPiComponent implements OnInit {
  posicionTipoPlan:number;
  constructor() {
    this.posicionTipoPlan = TIPO_PLAN.Indicativo
  }
  ngOnInit(): void {}
}
