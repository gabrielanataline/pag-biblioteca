import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NotificationService } from './notification.service';
import { Observable, from, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Livros } from '../models/livros';


@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  constructor( 
    private firestore: AngularFirestore,
    private notification: NotificationService) { }

  public listarLivros(): Observable<any> {
    const promise = this.firestore.collection('livros').get();

    return from(promise).pipe(
      map((response: any) => {
        return response.docs.map((doc: any) => {
          const livro: Livros = doc.data() as Livros;
          livro.id = doc.id;
          return livro;
        })
      }),
      catchError(error => {
        this.notification.showMessege('Erro ao listar os livros', 'error');
        console.error(error);
        return EMPTY;
      })
    )


  }

  public novoLivro(livro: Livros): Observable<any> {
    const promise = this.firestore.firestore.collection('livros').add(livro);


    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessege('Erro ao criar um novo livro', 'error');
        console.error(error);
        return EMPTY;
      })
    );
  }

  public listarPorId(idLivro: string): Observable<any> {
    const promise = this.firestore.collection('livros').doc(idLivro).get();

    return from(promise).pipe(
      map(doc => {
        const livros: Livros = doc.data() as Livros;
        livros.id = doc.id;
        return livros;
      }),
      catchError(error => {
        this.notification.showMessege('Erro ao buscar o livro pelo id!', 'error');
        console.error(error);
        return EMPTY;
      })

    )
  }

  public deletarLivros(idLivro: string): Observable<any> {
    const promise = this.firestore.collection('livros').doc(idLivro).delete();

    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessege('Erro ao deletar o livro!', 'error');
        console.error(error);
        return EMPTY;
      })
    );
  }

  public atualizarLivros(livros: Livros): Observable<any> {
    const promise = this.firestore.collection('livros').doc(livros.id).update(livros);

    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessege('Erro ao atualizar o livro!', 'error');
        console.error(error);
        return EMPTY;
      })
    );
  }
}
