import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NotificationService } from '@app/services';
import * as fromRoot from './store';
import * as fromUser from './store/user';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //estado de spinner
  showSpinner = false;
  title = 'cli-inmueble-app';
  user$ !: Observable<fromUser.UserResponse>;
  isAuthorized$ !: Observable<boolean>;

  constructor(
    private fs:AngularFirestore,
    private notification: NotificationService,
    private store: Store<fromRoot.State>,
    private router: Router
  ) {}

  ngOnInit() {
    //pruba para imprimir datos de la BD de firebase
    /*this.fs.collection('test').stateChanges().subscribe(personas => {
      console.log(personas.map(p => p.payload.doc.data()));
    });*/

    //buscar usuario en el backend con el token almacenado
    this.store.dispatch(new fromUser.Init());

    //obtener el usuario en el storage global
    this.user$ = this.store.pipe(select(fromUser.getUser)) as Observable<fromUser.UserResponse>;
    this.isAuthorized$ = this.store.pipe(select(fromUser.getIsAuthorized)) as Observable<boolean>;
    console.log(this.isAuthorized$);
  }

  //spinner
  onToggleSpinner(): void {
    //si esta en false se conviernte en true y sucesivamente
    this.showSpinner = !this.showSpinner;
  }

  //impirmir urls para mostrarlas en la vista
  onFilesChanged(urls: string | string[]): void {
    console.log('urls', urls);
  }

  //notificaciones
  onSuccess(): void {
    this.notification.success("El procedimiento fue exitoso");
  }

  onError(): void {
    this.notification.error("Se encontraron errores en el proceso");
  }

  //cerrar sesion
  onSignOut(): void {
    localStorage.removeItem('token');
    //limpiar storage global
    this.store.dispatch(new fromUser.SignOut());
    this.router.navigate(['/auth/login']);
  }
}
