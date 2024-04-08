import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarDocumentoDialogComponent } from './visualizar-documento-dialog.component';

describe('VisualizarDocumentoDialogComponent', () => {
  let component: VisualizarDocumentoDialogComponent;
  let fixture: ComponentFixture<VisualizarDocumentoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizarDocumentoDialogComponent]
    });
    fixture = TestBed.createComponent(VisualizarDocumentoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
