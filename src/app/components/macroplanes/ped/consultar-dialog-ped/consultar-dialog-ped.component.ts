import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Plan } from 'src/app/@core/models/plan';
import { RequestManager } from 'src/app/services/requestManager';

@Component({
  selector: 'app-consultar-dialog-ped',
  templateUrl: './consultar-dialog-ped.component.html',
  styleUrls: ['./consultar-dialog-ped.component.scss']
})
export class ConsultarDialogPedComponent implements OnInit{
  formConsultar!: FormGroup;
  nombre: string;
  descripcion: string;
  tipoPlan: string;
  planId: string;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.nombre = data.sub.nombre;
    this.descripcion = data.sub.descripcion;
    this.tipoPlan = data.sub.tipo_plan_id;
    this.planId = data.sub._id;
  }

  ngOnInit(): void {
    this.formConsultar = this.formBuilder.group({
      descripcion: [this.descripcion, Validators.required],
      nombre: [this.nombre, Validators.required],
      tipo_plan_id: [this.tipoPlan, Validators.required],
      plan_id: [this.planId, Validators.required]
    });
  }
}
