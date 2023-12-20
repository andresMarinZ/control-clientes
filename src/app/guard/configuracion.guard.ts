import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router'; // change CanActivateFn to CanActivate
import { Observable, map } from 'rxjs';
import { ConfiguracionService } from '../services/configuracion.service';

@Injectable({ providedIn: 'root' })
export class configuracionGuard implements CanActivate { // change CanActivateFn to CanActivate
  constructor(
    private router: Router,
    private configuracionServicio: ConfiguracionService,
  ) { }

  canActivate(): Observable<boolean>{
    return this.configuracionServicio.getConfiguracion().pipe(
        map( configuracion => {
            if(configuracion.permitirRegistro){
                return true;
            }
            else{
                this.router.navigate(['/login']);
                return false;
            }
        })
    );
}
}

