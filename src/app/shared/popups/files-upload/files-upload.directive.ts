import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilesUploadComponent } from './files-upload.component';

@Directive({
  selector: '[appFilesUpload]'
})
export class FilesUploadDirective {
  @Input() multiple!: boolean;//multiples archivos
  @Input() crop!: boolean; //administrar la edicion de la imagen

  @Output() changed = new EventEmitter<string | string[]>();// puede almacenar una cadena o un conjunto

  constructor(private dialog: MatDialog) { }

  //esun metodo decorador que es usado para escuchar y manejar eventos del DOM
  @HostListener('click', ['event']) onClick() {
    this.openDialog();
  }

  private openDialog(): void {
    //abrir el popup
    const dialogRef = this.dialog.open(FilesUploadComponent, {
      width: '550px',
      height: '500px',
      data: {
        multiple: this.multiple,
        crop: this.crop
      }
    });

    //evento para cerrar la ventana
    dialogRef.afterClosed().subscribe(result => {//result es la colección de archivos que se subem
      this.changed.emit(result || null); //agrego el o los archivos y en caso de que no haya nada mando un null
    });
  }

}
