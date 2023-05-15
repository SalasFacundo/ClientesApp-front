import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private httpClient: HttpClient) { }

  getClientes():Observable< Cliente[]>{
    return this.httpClient.get(this.urlEndPoint).pipe(
      map( response => response as Cliente[])
    );
  }

  create(cliente: Cliente) : Observable<Cliente>{
    return this.httpClient.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders});
  }

  getCliente(id): Observable<Cliente>{
    return this.httpClient.get<Cliente>(this.urlEndPoint+'/'+id);
  }

  update(cliente: Cliente): Observable<Cliente>{
    return this.httpClient.put<Cliente>(this.urlEndPoint+'/'+cliente.id, cliente, {headers: this.httpHeaders});
  }

  delete(id: number) : Observable<Cliente>{
    return this.httpClient.delete<Cliente>(this.urlEndPoint+'/'+id, {headers: this.httpHeaders});
  }
}
