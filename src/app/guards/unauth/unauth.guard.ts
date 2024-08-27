import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { select, Store } from "@ngrx/store";
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { filter, Observable, tap, map } from "rxjs";
import { Injectable } from "@angular/core";

//declarar que trabaje en todos los componentes de Angular
@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private router: Router,
    private store: Store<fromRoot.State>//instancia del store global
  ) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check();// check me dice si el usuario esta en sesión
  }

  //revisar el store para ver si el usuario esta en sesión o no
  private check(): Observable<boolean> {
    return this.store.pipe(select(fromUser.getUserState))//acceder a los datos del usuario
    .pipe(//saber si existe la información o no
      filter(state => !state.loading),//saber si el estado no se esta cargando
      tap(state => { //leer información
        if(state.email) {//si existe un usuario
          this.router.navigate(['/']);
        }
      }),
      map(state => !state.email)//devolver un false con un observable
    )
  }
}
