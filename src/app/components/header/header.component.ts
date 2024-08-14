import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onMenuToggleDispatch(): void {
    //translado la lógica de este evento al padre
    this.menuToggle.emit();
  }

}
