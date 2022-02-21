import { Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario.service';

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
    password2: ["", Validators.required],
    terminos: [false, Validators.required]
  }, {
    validators: this.passwordsIguales("password", "password2")
  });

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) {

  }

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    }

    // Realizar la creación
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(resp => {
        // Mover al dashboard
        this.router.navigateByUrl("/");
      }, (err) => {
        // Si sudede un error
        Swal.fire("Error", err.error.msg, "error");
      });
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {

      return false;
    }
  }

  passwordNoValidas() {
    const pass1 = this.registerForm.get("password")?.value;
    const pass2 = this.registerForm.get("password2")?.value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    }
    else {
      return false;
    }
  }

  aceptaTerminos(): boolean {
    return !this.registerForm.get("terminos")?.value && this.formSubmitted;
  }

  passwordsIguales(passName1: string, passName2: string) {
    return (formGroup: FormGroup) => {
      const passControl1 = formGroup.get(passName1);
      const passControl2 = formGroup.get(passName2);

      if (passControl1?.value === passControl2?.value) {
        passControl2?.setErrors(null);
      } else {
        passControl2?.setErrors({ noEsIgual: true });
      }
    }
  }

}
