import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Plan } from 'src/app/@core/models/plan';

@Component({
  selector: 'app-consultar-dialog-ped',
  templateUrl: './consultar-dialog-ped.component.html',
  styleUrls: ['./consultar-dialog-ped.component.scss'],
})
export class ConsultarDialogPedComponent implements OnInit {
  formConsultar: FormGroup;
  plan : Plan;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { sub: Plan }
  ) {
    this.plan = data.sub;
    this.formConsultar = this.formBuilder.group({
      descripcion: [this.plan.descripcion, Validators.required],
      nombre: [this.plan.nombre, Validators.required],
      tipo_plan_id: [this.plan.tipo_plan_id, Validators.required],
      plan_id: [this.plan._id, Validators.required],
    });
  }

  ngOnInit() {}
}
