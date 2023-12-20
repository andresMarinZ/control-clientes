import { Injectable } from '@angular/core';
import { Configuracion } from '../model/configuracion.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  configuracionDoc!: AngularFirestoreDocument<Configuracion>;
  configuracion!: Observable<any>;
  id = '1';

  constructor(private db: AngularFirestore){}

  getConfiguracion(): Observable<Configuracion>{
    this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
    this.configuracion = this.configuracionDoc.valueChanges();
    return this.configuracion;
}

modificarConfiguracion(configuracion: Configuracion){
    this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
    this.configuracionDoc.update(configuracion);
}
}
