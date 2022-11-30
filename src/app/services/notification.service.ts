import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar: MatSnackBar) { }

  public showMessege(msg: string, tipo: string): void{
    if(tipo == "error"){
      this.snackbar.open(msg, 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'alert-red'
      });
    }else if(tipo == "success"){
      this.snackbar.open(msg, 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'alert-green'
      });
    }
    
  }
}
