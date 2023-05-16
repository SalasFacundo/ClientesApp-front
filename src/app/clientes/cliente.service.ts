import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private httpClient: HttpClient, private router: Router) { }

  getClientes():Observable< Cliente[]>{
    return this.httpClient.get(this.urlEndPoint).pipe(
      map( response => response as Cliente[])
    );
  }

  create(cliente: Cliente) : Observable<any>{
    return this.httpClient.post<any>(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError( e => {
        Swal.fire('Error al crear', e.error.mensaje, 'error')
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Cliente>{
    return this.httpClient.get<Cliente>(this.urlEndPoint+'/'+id).pipe(
      catchError(e => {
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        this.router.navigate(['/clientes'])
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any>{
    return this.httpClient.put<any>(this.urlEndPoint+'/'+cliente.id, cliente, {headers: this.httpHeaders}).pipe(
      catchError( e => {
        Swal.fire('Error al crear', e.error.mensaje, 'error')
        return throwError(e);
      })
    );
  }

  delete(id: number) : Observable<Cliente>{
    return this.httpClient.delete<Cliente>(this.urlEndPoint+'/'+id, {headers: this.httpHeaders}).pipe(
      catchError( e => {
        Swal.fire('Error al eliminar', e.error.mensaje, 'error')
        return throwError(e);
      })
    );
  }
}
