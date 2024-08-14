import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NotificationService } from '@app/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //estado de spinner
  showSpinner = false;
  title = 'cli-inmueble-app';

  constructor(
    private fs:AngularFirestore,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.fs.collection('test').stateChanges().subscribe(personas => {
      console.log(personas.map(p => p.payload.doc.data()));
    });
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
}
