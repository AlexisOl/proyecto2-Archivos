import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionCompartidaService {
  private rutaActual: string[] = ['compartido'];
  private ruta = new BehaviorSubject<string[]>(this.rutaActual);
  ruta$ = this.ruta.asObservable();

  constructor() {}

  setRuta(nuevaRuta: string) {
    this.rutaActual.push(nuevaRuta);
    this.ruta.next(this.rutaActual);
  }


  //funcion de eliminarion
  eliminarParteRuta() {
    if (this.rutaActual.length > 1) {
      this.rutaActual.pop();
      this.ruta.next(this.rutaActual);
    }
  }

  getRuta(): string[] {
    return this.rutaActual;
  }

  getRutaTexto():string {
    let texto=""
    this.rutaActual.forEach(
      (elemento:string) => {
        texto+=elemento+"/"
      }
    )

    return texto;
  }
}
