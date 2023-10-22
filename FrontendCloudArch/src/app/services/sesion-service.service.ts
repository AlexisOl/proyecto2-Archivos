import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SesionServiceService {
  //generacion del tipo deusuario
  private usuario:user|null = null;

  private user = new BehaviorSubject<user | null>(null);
  user$ = this.user.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(Boolean));

  constructor(private http: HttpClient) {
//iniciar servicio
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      this.usuario = JSON.parse(usuarioString);
      this.user.next(this.usuario);
    }

  }



  //ingresa al usuario -- en las variables globales
  setUsuario(nuevoUsuario: user) {
    localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
    this.usuario = nuevoUsuario;
    this.user.next(nuevoUsuario);
  }


  // le elimina
  eliminarUsuario() {
    localStorage.removeItem('usuario');
    this.usuario = null;
    this.user.next(null);
  }



  // solo obtenciones
  getUsuario(): user | null {
    return this.usuario;
  }

  isAuthenticated(): boolean {
    return !!this.getUsuario();
  }
}
