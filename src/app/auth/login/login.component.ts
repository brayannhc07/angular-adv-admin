import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  public auth2: any;


  ngOnInit(): void {
    this.renderButton();
  }
  public loginForm = this.fb.group({
    email: [localStorage.getItem("email") || "", [Validators.required, Validators.email]],
    password: ["", Validators.required],
    remember: [false]
  });


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService) { }


  login(): void {
    this.usuarioService.login(this.loginForm.value)
      .subscribe(resp => {
        if (this.loginForm.get("remember")?.value) {
          localStorage.setItem("email", this.loginForm.get("email")?.value);
        } else {
          localStorage.removeItem("email");
        }
      }, (err) => {
        Swal.fire("Error", err.error.msg, "error");
      });
    // this.router.navigateByUrl('/');
  }
  onSuccess(googleUser: any) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
  }

  onFailure(error: any) {
    console.log(error);
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });

    this.startApp();
  }

  startApp() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '711704106982-qgabo3kkv2n6kuhi6lmps3lb6go0hp3q.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.attachSignin(document.getElementById('customBtn'));
    });
  };

  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        const id_token = googleUser.getAuthResponse().id_token;
        console.log(id_token);
      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
