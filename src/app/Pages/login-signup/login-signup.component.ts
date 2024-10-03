import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { registerModel } from '../../models/Class/Register';
import { loginModel } from '../../models/Class/Login';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css'
})
export class LoginSignupComponent {

  activeForm: 'login' | 'register' = 'login';
  registerObj: registerModel = new registerModel();
  loginObj: loginModel = new loginModel();

  constructor(private _snackbar: MatSnackBar, private _router: Router) { };
  toggleForm(form: 'login' | 'register') {
    this.activeForm = form;

  }

  registerForm() {
    debugger;
    const localusers = localStorage.getItem('users');
    if (localusers != null) {
      const users = JSON.parse(localusers);
      users.push(this.registerObj);
      localStorage.setItem('users', JSON.stringify(users));
    } else {
      const users = [];
      users.push(this.registerObj);
      localStorage.setItem('users', JSON.stringify(users));
    }
    this._snackbar.open('User register successfully', 'Close');
  }


  loginForm() {
    debugger;
    const localusers = localStorage.getItem('users');
    if (localusers != null) {
      const users = JSON.parse(localusers);
      const isUserExits = users.find((user: registerModel) => user.email == this.loginObj.email && user.password == this.loginObj.password);
      if (isUserExits != undefined) {
        this._snackbar.open('User login successfully', 'Close');
        localStorage.setItem('loggedUser', JSON.stringify(isUserExits));
        this._router.navigateByUrl('dashboard');
      } else {
        this._snackbar.open('Invalid email or password', 'Close');
      }
    }
  }

}
