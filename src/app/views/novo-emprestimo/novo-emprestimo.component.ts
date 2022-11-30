import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Emprestimo } from 'src/app/models/emprestimo';
import { Livros } from 'src/app/models/livros';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { LivrosService } from 'src/app/services/livros.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-novo-emprestimo',
  templateUrl: './novo-emprestimo.component.html',
  styleUrls: ['./novo-emprestimo.component.css']
})
export class NovoEmprestimoComponent implements OnInit {

  public formEmprestimo: FormGroup;
  public livros: Livros[] = [];

  constructor(
    fb: FormBuilder,
    private emprestimoService: EmprestimoService,
    private livrosService: LivrosService,
    private notification: NotificationService,
    private router: Router) { 
    this.formEmprestimo = fb.group({
      leitor: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      telefone: ["", [Validators.required]],
      status: ["", [Validators.required]],
      livro: ["", [Validators.required]],
      data: new Date().toLocaleDateString()
    });

  }

  ngOnInit(): void {
    this.listarLivros();
  
  }

  public novoEmprestimo(): void{
    if(this.formEmprestimo.valid){
      const emprestimo : Emprestimo = this.formEmprestimo.value;
      //emprestimo.data = new Date().toLocaleDateString();
      this.emprestimoService.novoEmprestimo(emprestimo).subscribe(response => {
        this.notification.showMessege("Criado com sucesso!", "success");
        this.router.navigate(['/painel']);
      })
    }
  }
  

  public listarLivros(): void {
    this.livrosService.listarLivros().subscribe(livros => {
      this.livros = livros;
    })
  }



 
}
