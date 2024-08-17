import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from '@app/store/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  @Output() menuToggle = new EventEmitter<void>();
  @Input() user !: UserResponse | null;
  @Input() isAuthorized !: boolean | null; //saber si el usuario esya en sesión o no
  @Output() signOut = new EventEmitter<void>(); //disparar evento para salir de sesipn

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.isAuthorized)
  }

  onMenuToggleDispatch(): void {
    //translado la lógica de este evento al padre
    this.menuToggle.emit();
    console.log(this.isAuthorized);
  }

  onSignOut(): void {
    this.signOut.emit();
    this.router.navigate(['/']);
  }

}
