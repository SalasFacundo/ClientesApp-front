import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private httpClient: HttpClient) { }

  getClientes():Observable< Cliente[]>{
    return this.httpClient.get('http://localhost:8080/api/clientes').pipe(
      map( response => response as Cliente[])
    );
  }
}
