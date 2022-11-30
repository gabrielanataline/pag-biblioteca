import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {  Observable, from, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: AngularFireStorage,
    private notification: NotificationService
  ) { }


  public adicionarImagem(img: File): Observable<any>{
    const promise = this.storage.upload(`fotos/${Date.now()}`, img);

    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessege('Erro ao fazer upload da imagem', 'error');
        console.error(error);
        return EMPTY;
      })
    );
  }

  public deleteFoto(img: string): Observable<any>{
    const promise = this.storage.refFromURL(img).delete();

    return from(promise).pipe(
      catchError(error => {
        this.notification.showMessege("Erro deletarr a imagem.", "error");
        console.error(error);
        return EMPTY;
      })
    );
  }
}
