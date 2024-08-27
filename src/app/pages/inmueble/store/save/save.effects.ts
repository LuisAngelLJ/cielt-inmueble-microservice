import { Injectable } from '@angular/core';
import * as fromActions from './save.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from '@app/services';
import { from, Observable, of } from 'rxjs';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { InmuebleCreateRequest, InmuebleResponse } from './save.models';
import { environment } from 'environments/environment';

type Action = fromActions.All;

@Injectable()
export class SaveEffects {
  constructor(
    private actions: Actions,
    private _httpClient: HttpClient,
    private router: Router,
    private notification: NotificationService
  ) {}

  create: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.CREATE),
      map((action: fromActions.Create) => action.inmueble),
      switchMap((request: InmuebleCreateRequest) => {
        // Obtener el token del localStorage
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this._httpClient.post<InmuebleResponse>(`${environment.url}gateway/inmueble`, request, { headers }).pipe(
          delay(1000), // hacer un retarso de 1s para que se perciba el spinner
          tap((response: InmuebleResponse) => {
            this.router.navigate(['inmueble/lista']);
          }),
          map((inmueble: InmuebleResponse) => new fromActions.CreateSuccess(inmueble)),
          catchError(err => {
            this.notification.error(`Error al guardar inmueble: ${err.message}`);
            return of(new fromActions.CreateError(err.message));
          })
        );
      })
    )
  );


  read: Observable<Action> = createEffect( () => {
    return this.actions.pipe(
      ofType(fromActions.Types.READ),
      switchMap( () =>
        this._httpClient.get<InmuebleResponse[]>(`${environment.url}gateway/inmueble`)
      .pipe(
        delay(1000),
        map( (inmuebles: InmuebleResponse[]) => new fromActions.ReadSuccess(inmuebles)),
        catchError( err => of(new fromActions.ReadError(err.message)))
      )
      )
    )
  });
}
