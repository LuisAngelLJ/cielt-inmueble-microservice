import { Component, Inject, OnInit } from '@angular/core';
//capturar datos desde el dialog
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//interface que modela la data que se va a capturar
export interface DialogData {
  multiple: boolean;
  crop: boolean;
}

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss']
})
export class FilesUploadComponent implements OnInit {
 isHovering!: boolean;

 //subida de archivos
 files: File[] = [];
 imageFile!: File;
 isError!: boolean;
 filesURLs: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<FilesUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  ngOnInit(): void {
  }

  toggleHover(event:boolean) {
    this.isHovering = event;
  }

  //cuando suelte la imagen
  onDrop(files: FileList): void {
    this.dropGeneral(files);
  }

  onDropFile(event: FileList | any): void {
    this.dropGeneral(event.target.files);
  }

  //metodo para los archivos que se seleccionaron u arrastraron
  dropGeneral(files: FileList): void {
    this.isError = false;
    if(this.data.crop && files.length > 1) {
      this.isError = true;
      return;
    }

    //agregar archivos al arreglo
    for (let i = 0; i < files.length; i++) {
      //se parsea como file para quitar el error
      this.files.push(files.item(i) as File);
    }

    console.log(files);
  }

  onUploadComplete(url: string): void {
    this.filesURLs.push(url);
  }

  onComplete(): void {
    //data que envio al cliente desde el dialog
    const res = this.data.multiple ? this.filesURLs : this.filesURLs[0];
    this.dialogRef.close(res);
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
