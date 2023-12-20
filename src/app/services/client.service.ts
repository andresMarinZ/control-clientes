import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Cliente } from "../model/cliente.model";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientesColeccion: AngularFirestoreCollection<Cliente>;
  clientes: Observable<Cliente[]> = new Observable<Cliente[]>();
  cliente: Observable<Cliente> = new Observable<Cliente>();
  clienteDoc: any;

  constructor(private db: AngularFirestore) {
    this.clientesColeccion = db.collection<Cliente>('clientes', ref => ref.orderBy('nombre', 'asc'));
  }

  getClientes(): Observable<Cliente[]> {
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
      map((cambios: any) => {
        return cambios.map((accion: any) => {
          const datos = accion.payload.doc.data() as Cliente;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );
    return this.clientes;
  }

  agregarCliente(cliente: Cliente) {
    this.clientesColeccion.add(cliente);
  }

  getCliente(id: string) {
    this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`);
    this.cliente = this.clienteDoc.snapshotChanges().pipe(
      map((accion: any) => {
        if (accion.payload.exists === false) {
          return null;
        }
        else {
          const datos = accion.payload.data() as Cliente;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return this.cliente;
  }

  modificarCliente(cliente: Cliente) {
    this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
    this.clienteDoc.update(cliente);
  }

  eliminarCliente(cliente: Cliente) {
    this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
    this.clienteDoc.delete();
  }
}
