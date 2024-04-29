import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionPiComponent } from './evaluacion-pi.component';

describe('EvaluacionPiComponent', () => {
  let component: EvaluacionPiComponent;
  let fixture: ComponentFixture<EvaluacionPiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluacionPiComponent]
    });
    fixture = TestBed.createComponent(EvaluacionPiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
