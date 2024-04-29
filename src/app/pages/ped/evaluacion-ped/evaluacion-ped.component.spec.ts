import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionPedComponent } from './evaluacion-ped.component';

describe('EvaluacionPedComponent', () => {
  let component: EvaluacionPedComponent;
  let fixture: ComponentFixture<EvaluacionPedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluacionPedComponent]
    });
    fixture = TestBed.createComponent(EvaluacionPedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
