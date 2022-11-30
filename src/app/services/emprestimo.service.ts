import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, EMPTY } from 'rxjs';
import { Emprestimo } from '../models/emprestimo';
import { NotificationService } from './notification.service';
import { catchError, map } from 'rxjs/operators';
import { LivrosService } from './livros.service';


@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {

  constructor(
    private firestore: AngularFirestore,
    private notification: NotificationService,
  ) { }

  public listarEmprestimos(): Observable<any> {
    const promise = this.firestore.collection('emprestimos').get();

    return from(promise).pipe(
      map((response: any) => {
        return response.docs.map((doc: any) => {
          const emprestimo: Emprestimo = doc.data() as Emprestimo;
          emprestimo.id = doc.id;
          return emprestimo;
        })
      }),
      catchError(error => {
        this.notification.showMessege('Erro ao listar os empretimos', 'error');
        console.error(error);
        return EMPTY;
      })
    )


  }

  public novoEmprestimo(emprestimo: Emprestimo): Observable<any> {
    const promise = this.firestore.firestore.collection('emprestimos').add(emprestimo);


    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessege('Erro ao criar um novo emprestimo', 'error');
        console.error(error);
        return EMPTY;
      })
    );
  }

  public listarPorId(idEmprestimo: string): Observable<any> {
    const promise = this.firestore.collection('emprestimos').doc(idEmprestimo).get();

    return from(promise).pipe(
      map(doc => {
        const emprestimo: Emprestimo = doc.data() as Emprestimo;
        emprestimo.id = doc.id;
        return emprestimo;
      }),
      catchError(error => {
        this.notification.showMessege('Erro ao buscar id!', 'error');
        console.error(error);
        return EMPTY;
      })

    )
  }

  public deletarEmprestimo(idEmpretimo: string): Observable<any> {
    const promise = this.firestore.collection('emprestimos').doc(idEmpretimo).delete();

    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessege('Erro ao deletar o emprestimo!', 'error');
        console.error(error);
        return EMPTY;
      })
    );
  }

  public atualizarEmprestimo(emprestimo: Emprestimo): Observable<any> {
    const promise = this.firestore.collection('emprestimos').doc(emprestimo.id).update(emprestimo);

    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessege('Erro ao atualizar o emprestimo!', 'error');
        console.error(error);
        return EMPTY;
      })
    );
  }


}
