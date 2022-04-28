import { FileUploadService } from './../../services/file-upload.service';
import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario: Usuario | undefined;
  public imagenSubir: File | undefined;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadServices: FileUploadService
  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario?.nombre, Validators.required],
      email: [this.usuario?.email, [Validators.required, Validators.email]]
    });

  }


  actualizarPerfil() {
    console.log(this.perfilForm?.value);
    this.usuarioService.actualizarPerfil(this.perfilForm?.value)
      .subscribe(resp => {
        const { nombre, email } = this.perfilForm?.value;
        this.usuario!.email = email;
        this.usuario!.nombre = nombre;
      });

  }

  cambiarImagen(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    const file = files![0];
    this.imagenSubir = file;

  }

  subirImagen() {
    this.fileUploadServices.actualizarFoto(this.imagenSubir!, 'usuarios', this.usuario?.uid!)
      .then(console.log);
  }

}
