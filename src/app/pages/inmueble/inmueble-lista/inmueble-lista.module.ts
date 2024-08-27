import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InmuebleListaRoutingModule } from './inmueble-lista-routing.module';
import { InmuebleListaComponent } from './inmueble-lista.component';

import { SpinnerModule } from '@app/shared/indicators';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    InmuebleListaComponent
  ],
  imports: [
    CommonModule,
    InmuebleListaRoutingModule,
    SpinnerModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class InmuebleListaModule { }
