import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'nuevo',
    loadChildren: () => import('./inmueble-nuevo/inmueble-nuevo.module').then(m=>m.InmuebleNuevoModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'lista',
    loadChildren: () => import('./inmueble-lista/inmueble-lista.module').then(m=>m.InmuebleListaModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InmuebleRoutingModule { }
