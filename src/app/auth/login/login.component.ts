import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    email: [localStorage.getItem("email") || "", [Validators.required, Validators.email]],
    password: ["", Validators.required],
    remember: [false]
  });


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void { }

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
}
