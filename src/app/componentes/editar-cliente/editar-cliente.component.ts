import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/model/cliente.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente:Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  id:string = '';

  constructor(
    private clientService:ClientService,
    private toastr: ToastrService,
    private router:Router,
    private route:ActivatedRoute
    ) { }

    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.clientService.getCliente(this.id).subscribe(cliente => {
        this.cliente = cliente;
      });
    }

    guardar(client: NgForm){
      if(!client.valid){
        this.toastr.show('Por favor llena el formulario correctamente', 'Major Error', {
          timeOut: 3000,
        });
      }
      else{
        client.value.id = this.id;
        this.clientService.modificarCliente(client.value);
        this.router.navigate(['/']);
      }
    }

    eliminar(){
      if(confirm('¿Seguro que desea elminiar el cliente?')){
        this.clientService.eliminarCliente(this.cliente);
        this.router.navigate(['/']);
      }
    }
}
