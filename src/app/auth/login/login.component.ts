import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit, NgZone, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild("googleBtn", { static: true })
  googleBtn!: ElementRef;

  public formSubmitted = false;
  public loginForm = this.fb.group({
    email: [localStorage.getItem("email") || "", [Validators.required, Validators.email]],
    password: ["", Validators.required],
    remember: [false]
  });


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.startApp();
  }

  ngAfterViewInit(): void {
  }

  async startApp() {
    await this.usuarioService.googleInit();
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" } // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }

  login(): void {
    this.usuarioService.login(this.loginForm.value)
      .subscribe(resp => {
        if (this.loginForm.get("remember")?.value) {
          localStorage.setItem("email", this.loginForm.get("email")?.value);
        } else {
          localStorage.removeItem("email");
        }

        // Mover al dashboard
        this.router.navigateByUrl("/");
      }, (err) => {
        Swal.fire("Error", err.error.msg, "error");
      });
  }

}
