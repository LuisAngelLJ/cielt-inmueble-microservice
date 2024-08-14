import { Injectable } from '@angular/core';
import * as fromActions from './user.actions';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationService } from '@app/services';
import { Router } from '@angular/router';
import { Observable, of} from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UserResponse } from './user.models';
import { environment } from 'environments/environment';

//definir action principal
type Action = fromActions.All;

@Injectable()
export class UserEffects {
  constructor(
    private _httpClient: HttpClient,
    private actions: Actions,
    private notification: NotificationService,
    private router: Router
  ) {}

  //registro de nuevo usuario
  signUpEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGN_UP_EMAIL),
      map((action: fromActions.SignUpEmail) => action.user),
      switchMap(userData => {
        console.log('Datos del usuario:', userData);
        return this._httpClient.post<UserResponse>(
          `${environment.url}api/authentication/registrar`,
          userData,
          { headers: { 'Content-Type': 'application/json' } }
        ).pipe(
          tap((response: UserResponse) => {
            console.log('Respuesta del servidor:', response);
            localStorage.setItem('token', response.token);
            this.router.navigate(['/']);
          }),
          map((response: UserResponse) => new fromActions.SignUpEmailSuccess(response.email, response || null)),
          catchError(err => {
            console.error('Error al registrar el usuario:', err);
            console.error('Detalles del error:', err.message, err.status, err.statusText);
            this.notification.error("Ocurrió un error al registrar al usuario");
            return of(new fromActions.SignUpEmailError(err.message));
          })
        );
      })
    )
  );


  //inicio de sesión
  signInEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(//evaluación de transacción
      ofType(fromActions.Types.SIGN_IN_EMAIL), // definir la operacion que quiero trabajar
      map((action: fromActions.SignInEmail) => action.credentials), // obtener los parametros para hacer la transaccion
      switchMap(userData => //comunicacion con el servidor
        this._httpClient.post<UserResponse>(`${environment.url}api/authentication/sing-in`, userData)
        .pipe(//evaluar el posible resultado de la url
          tap((response: UserResponse) => { //respuesta satisfactoria
            localStorage.setItem('token', response.token);
            this.router.navigate(['/']);
          }),
          map((response: UserResponse) => new fromActions.SignInEmailSuccess(response.email, response || null)),//devuelve un observable de tipo action
          catchError(err => { //respuesta en caso de error
            this.notification.error("Usuario no encontrado y/o credenciales incorrectas");
            return of(new fromActions.SignInEmailError(err.message));//devuelve un observable de tipo action con ayuda de of
          })
        )
      )
    )
  );


  //refrescar el navegador
  init: Observable<Action> = createEffect(() =>
    this.actions.pipe(//evaluación de transacción
      ofType(fromActions.Types.INIT), // definir la operacion que quiero trabajar
      switchMap( async () => localStorage.getItem('token')), // obtener los parametros de localStarage
      switchMap(token => {
        if(token) {
          return this._httpClient.get<UserResponse>(`${environment.url}api/user`)
          .pipe(//evaluar el posible resultado de la url
            tap((response: UserResponse) => { //respuesta satisfactoria
              console.log("Usuario en sesion", response);
            }),
            map((response: UserResponse) => new fromActions.InitAuthorized(response.email, response || null)),//devuelve un observable de tipo action
            catchError(err => { //respuesta en caso de error
              return of(new fromActions.InitError(err.message));//devuelve un observable de tipo action con ayuda de of
            })
          )
        }else {
          return of(new fromActions.InitUnauthorized());
        }
      }
      )
    )
  );
}
