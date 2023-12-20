import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/model/cliente.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes:Cliente[] = [];
  cliente:Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }
  @ViewChild('clienteForm') clienteForm:NgForm = new NgForm([], []);
  @ViewChild('botonCerrar') botonCerrar:ElementRef = new ElementRef('button');

  constructor(
    private clientService:ClientService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.clientService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  getSaldoTotal() {
    let saldoTotal:number = 0;
    if (this.clientes) {
      this.clientes.forEach((cliente:any) => {
        saldoTotal += cliente.saldo;
      });
    }
    return saldoTotal;
  }

  agregar(client: NgForm) {
    if (!client.form.valid) {
      this.toastr.error('Formulario no valido', 'Major Error', {
        timeOut: 3000,
      });
    } else {
      this.clientService.agregarCliente(client.value);
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal() {
    this.botonCerrar.nativeElement.click();
  }

}
