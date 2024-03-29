import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public desde: number = 0;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.cargarUsuarios(this.desde).subscribe(resp => {
      const { total, usuarios } = resp;
      this.totalUsuarios = total;
      this.usuarios = usuarios;

    });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

}
