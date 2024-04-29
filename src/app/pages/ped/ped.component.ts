import { Component, OnInit } from '@angular/core';
import {
  TIPO_PLAN
} from 'src/app/@core/services/codigosEstados.service';

@Component({
  selector: 'app-ped',
  templateUrl: './ped.component.html',
  styleUrls: ['./ped.component.scss'],
})
export class PedComponent implements OnInit {
  posicionTipoPlan: number;

  constructor() {
    this.posicionTipoPlan = TIPO_PLAN.DesarrolloEstrategico;
  }

  ngOnInit() {}
}
