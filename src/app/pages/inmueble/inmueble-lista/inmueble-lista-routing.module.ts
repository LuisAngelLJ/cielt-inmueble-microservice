import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InmuebleListaComponent } from './inmueble-lista.component';

const routes: Routes = [
  {path: '', component: InmuebleListaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InmuebleListaRoutingModule { }
