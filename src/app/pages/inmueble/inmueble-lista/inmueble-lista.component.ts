import { Component, OnInit } from '@angular/core';
import * as fromrRoot from '@app/store';
import * as fromList from '../store/save';
import { InmuebleResponse} from '../store/save';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-inmueble-lista',
  templateUrl: './inmueble-lista.component.html',
  styleUrls: ['./inmueble-lista.component.scss']
})
export class InmuebleListaComponent implements OnInit {
  inmuebles$ !: Observable<InmuebleResponse[] | null>;
  loading$ !: Observable<boolean | null>;
  pictureDefault: string = "https://firebasestorage.googleapis.com/v0/b/edificacion-app.appspot.com/o/image%2F1637099019171_O5986058_0.jpg?alt=media&token=0a146233-d63b-4702-b28d-6eaddf5e207a";

  constructor(
    private store: Store<fromrRoot.State>
  ) { }

  ngOnInit(): void {
    //consultar a la API y que devuelva los datos
    this.store.dispatch(new fromList.Read);
    //leer la información en la memoria
    this.loading$ = this.store.pipe(select(fromList.getLoading));
    this.inmuebles$ = this.store.pipe(select(fromList.getInmuebles));
  }

}
