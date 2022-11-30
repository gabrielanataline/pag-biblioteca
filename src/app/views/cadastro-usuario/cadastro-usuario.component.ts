import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  public formLogin: FormGroup;

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router
  ) {
    this.formLogin = fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  public signInByGoogle(): void {
    this.authService.authenticateByGoogle().subscribe(response => {
      this.notification.showMessege("Seja bem-vindo(a)!", "success");
      this.router.navigate(["/home"])
    })
  }

   public signInEmailAndPassword(): void {
     if (this.formLogin.valid) {
       const user: Usuario = this.formLogin.value;
       this.authService.criarUsuario(user).subscribe(credencials => {
         this.notification.showMessege("Seja bem-vindo(a)!", "success");
         this.router.navigate(["/login"])
       })
     } else {
       this.notification.showMessege("Dados inválido", "error");
     }
   }
}
