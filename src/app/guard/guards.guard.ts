import { NotificationService } from './../services/notification.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
    private notification: NotificationService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.firebaseAuth
      .authState
      .pipe(
        map(usuario => {
          if(usuario) {
            return true;
          }
          else {
            this.notification.showMessege("Acesso restrito! Faça login.",'error');
            this.router.navigate(["/login"]);
            return false;
          }
        })
      )
  }
  
}



