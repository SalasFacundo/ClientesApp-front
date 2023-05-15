import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  titulo = 'Crear cliente';
  cliente: Cliente = new Cliente();
  hasParams: boolean = false;

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.cargarCliente()
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.clienteService.getCliente(id).subscribe(
          cliente => this.cliente = cliente
        );
        this.hasParams = true;
      }
    })
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe((response) => {
      this.router.navigate(['/clientes']);
      swal.fire(!this.hasParams ? 'Nuevo cliente' : 'Cliente editado', `Cliente ${this.cliente.nombre} ${!this.hasParams ? 'creado' : 'editado'} con exito!`, 'success');
    });
  }
}
