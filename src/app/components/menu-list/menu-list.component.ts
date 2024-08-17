import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<void>();
  @Input() isAuthorized !: boolean | null;//recibir información del header
  @Output() signOut = new EventEmitter<void>(); //disparar evento para salir de sesión en app.component.ts

  constructor() { }

  ngOnInit(): void {
  }

  closeMenu(): void {
    this.menuToggle.emit();
  }

  //salir de sesion
  onSignOut(): void {
    this.signOut.emit();
  }
}
