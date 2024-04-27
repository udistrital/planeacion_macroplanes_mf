import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPoaComponent } from './consultar-poa.component';

describe('ConsultarPoaComponent', () => {
  let component: ConsultarPoaComponent;
  let fixture: ComponentFixture<ConsultarPoaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarPoaComponent]
    });
    fixture = TestBed.createComponent(ConsultarPoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
