import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NotificationService } from './notification.service';
import { catchError } from 'rxjs/operators'
import { GoogleAuthProvider } from 'firebase/auth'
import { Observable, from, EMPTY } from 'rxjs'
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseAuth: AngularFireAuth, private notification: NotificationService) { }

  public authenticateByGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();
    const promise = this.firebaseAuth.signInWithPopup(provider);

    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessege("Erro ao autenticar com o google!", "error")
        console.error(error)
        return EMPTY
      })
    )
  }

  public autenticacaoPorEmailEsenha(usuario: Usuario): Observable<any> {
    const { email, senha } = usuario;
    const promise = this.firebaseAuth.signInWithEmailAndPassword(email, senha);
    return from(promise).pipe(
      catchError(error => {
        if (error.code == "auth/user-not-found") {
          this.notification.showMessege("Usuário não cadastrado!", "error")
        } else if (error.code == "auth/wrong-password") {
          this.notification.showMessege("Senha incorreta!", "error")
        } else {
          this.notification.showMessege("Erro ao autenticar", "error")
          console.error(error)
        }
        return EMPTY

    })
    )
  }

  public criarUsuario(usuario: Usuario): Observable<any> {
    const { email, senha } = usuario;
    const promise = this.firebaseAuth.createUserWithEmailAndPassword(email, senha);

    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessege("Erro ao cadastrar usuário!", "error")
      console.error(error)
      return EMPTY
      })
    )
  }

  public sair(): Observable<void>{
    const promise = this.firebaseAuth.signOut();
    return from(promise)
  }
}
