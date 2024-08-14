import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading$ !: Observable<boolean | null>;

  constructor(
    private store: Store<fromRoot.State> //contiene los datos del usuario
  ) { }

  ngOnInit(): void {
  }

  loginUsuario(f: NgForm) {
    const userLoginRequest: fromUser.EmailPasswordCredentials = {
      username: f.value.username,
      password: f.value.password
    }

    //ejecutar el login
    this.store.dispatch(new fromUser.SignInEmail(userLoginRequest));//seleccionamos el action para que este llama al reducer a su vez invoque al effects
  }

}
