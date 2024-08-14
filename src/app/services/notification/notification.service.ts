import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from './components';

@Injectable()
export class NotificationService {

  constructor(
    private snackBar: MatSnackBar //popup de notificaciones
  ) { }

  //metodos para desplegar el popup de mensajes
  error(message: string): void {
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: 3000,
      data: {message},//mensaje que se va a inyectar
      panelClass: ['mat-snackbar_error'] //estilos css
    });
  }

  success(message: string): void {
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: 3000,
      data: {message},//mensaje que se va a inyectar
      panelClass: ['mat-snackbar_success'] //estilos css
    });
  }
}
