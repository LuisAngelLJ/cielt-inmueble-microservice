import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InmuebleListaComponent } from './inmueble-lista.component';

describe('InmuebleListaComponent', () => {
  let component: InmuebleListaComponent;
  let fixture: ComponentFixture<InmuebleListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InmuebleListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InmuebleListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
