import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import * as fromRoot from '@app/store';
import * as fromList from '../store/save';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-inmueble-nuevo',
  templateUrl: './inmueble-nuevo.component.html',
  styleUrls: ['./inmueble-nuevo.component.scss']
})
export class InmuebleNuevoComponent implements OnInit {
  loading$ !: Observable<boolean | null>;
  photoLoaded !: string;

  constructor(
    private store: Store<fromRoot.State>, //apuntar al state global
  ) { }

  ngOnInit(): void {
  }

  registrarInmueble(f: NgForm): void {
    if(f.valid) {
      this.loading$ = this.store.pipe(select(fromList.getLoading));
      //agregar valores al objeto
      const inmuebleCreateRequest: fromList.InmuebleCreateRequest = {
        nombre: f.value.nombre,
        picture: this.photoLoaded,
        direccion: f.value.direccion,
        precio: Number(f.value.precio)
      }
      //ejecutar la transsaccion
      this.store.dispatch(new fromList.Create(inmuebleCreateRequest));
    }
  }

  onFilesChanged(url: any): void {
    if(url) {
      this.photoLoaded = url;
    }
  }

}
