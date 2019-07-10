import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService 
{
  url: String;


  constructor(private _http: HttpClient)
  {
    this.url = global.url;
  }

  login(user): Observable <any>
  {
    // Convertir el Object a JSON String
    let params = JSON.stringify(user);

    // Definir Cabecera
    let headers = new HttpHeaders().set('Content-Type',' application/json');

    // Hacer Peticion Ajax
    return this._http.post(this.url+'register', params ,{headers});
  }
}
