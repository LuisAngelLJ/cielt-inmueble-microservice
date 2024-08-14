import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
//controlar los tiempos en los que se suben los archivos
import { UploadTaskSnapshot } from '@angular/fire/storage';
import { Observable, Subject, lastValueFrom } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {
  @Input() file!: File;
  //se va a dispara cuando se complete la subida del o de los archivos
  @Output() complete = new EventEmitter<string>();
  //monitorear la subida del archivo
  task !: AngularFireUploadTask;

  snapshot$!: Observable<UploadTaskSnapshot | undefined>;

  //porcentaje de subida
  percentage$!: Observable<number | undefined>;
  //url de la imagen que se va a subir
  downloadURL!: string;

  private destroy = new Subject<void>();

  constructor(
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.startUpload();
  }

  //subir archivos a firebase
  startUpload(): void {
    //generar el path (directorio de ubicación)
    //formato image/20240728_miImagen.png
    //el this.file.type retorna un image/png o jpg aspi que uso un split para cortar y dejar image com nombre de la carpeta
    const path = `${this.file.type.split('/')[0]}/${Date.now()}_${this.file.name}`;//nombre de la carpeta + fecha actual + nombre del archivo

    //inicializar le path
    const storageRef = this.storage.ref(path);
    //comenzar subida de archivo
    this.task = this.storage.upload(path, this.file);
    //porcentaje de archivo
    this.percentage$ = this.task.percentageChanges();
    //estado de la imagen
    this.snapshot$ = this.task.snapshotChanges() as Observable<UploadTaskSnapshot | undefined>;
    //despegar observable para saber el estatus de la imagen u archivo
    this.snapshot$.pipe(
      takeUntil(this.destroy),
      finalize(async ()=> {
        //retornar url del archivo que se esta subiendo
        const storageRefObservable$ = storageRef.getDownloadURL();
        this.downloadURL = await lastValueFrom(storageRefObservable$);
        this.complete.next(this.downloadURL);//asigno el resultado de mi url a mi variable downloadURL
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
