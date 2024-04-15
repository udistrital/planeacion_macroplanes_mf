import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionPoaComponent } from './evaluacion-poa.component';

describe('EvaluacionPoaComponent', () => {
  let component: EvaluacionPoaComponent;
  let fixture: ComponentFixture<EvaluacionPoaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluacionPoaComponent]
    });
    fixture = TestBed.createComponent(EvaluacionPoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
