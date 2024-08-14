import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {
  //archivos
  @Output() dropped = new EventEmitter<FileList>();
  //detectar que el drop esta sobre el area para subir el archivo
  @Output() hovered = new EventEmitter<boolean>();

  constructor() { }

  //dejar caer
  @HostListener('drop', ['$event'])
  onDrop($event:any) {
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files);
    this.hovered.emit(false);
  }

  //arrastrar
  @HostListener('dragover', ['$event'])
  onDragOver($event:any) {
    $event.preventDefault();
    this.hovered.emit(true);
  }

  //salir del arrastre
  @HostListener('dragleave', ['$event'])
  onDragLeave($event:any) {
    $event.preventDefault();
    this.hovered.emit(false);
  }

}
