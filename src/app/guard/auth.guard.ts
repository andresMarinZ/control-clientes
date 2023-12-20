import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router'; // change CanActivateFn to CanActivate
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate { // change CanActivateFn to CanActivate
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean>{ // change CanActivate to canActivate
    return this.afAuth.authState.pipe(
      map( auth => {
        if(!auth){
          this.router.navigate(['/login']);
          return false;
        }
        else{
          return true;
        }
      })
    )
  }
}
