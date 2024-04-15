import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoPiComponent } from './seguimiento-pi.component';

describe('SeguimientoPiComponent', () => {
  let component: SeguimientoPiComponent;
  let fixture: ComponentFixture<SeguimientoPiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeguimientoPiComponent]
    });
    fixture = TestBed.createComponent(SeguimientoPiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
