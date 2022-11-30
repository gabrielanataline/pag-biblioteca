import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Emprestimo } from 'src/app/models/emprestimo';
import { Livros } from 'src/app/models/livros';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { LivrosService } from 'src/app/services/livros.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-editar-emprestimo',
  templateUrl: './editar-emprestimo.component.html',
  styleUrls: ['./editar-emprestimo.component.css']
})
export class EditarEmprestimoComponent implements OnInit {

  // PARA EVITAR QUE A PROPRIEDADE VENHA UNDEFINED É NECESSÁRIO ADICIONAR UM OBJETO VAZIO, POR CAUSA DO [(ngModel)] no html
  public emprestimo: Emprestimo = {
      leitor: '',
      email: '',
      telefone: '',
      status: '',
      livro: {
        titulo: '', 
        autor: '',
        categoria: '',
        isbn: ''
      },
      data: ''
  }
  public livros: Livros[] = [];

  constructor(
    private emprestimoService: EmprestimoService,
    private livrosService: LivrosService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.listarLivros();
    this.inicilizarCampos();
  }

  public inicilizarCampos(): void {
    const id = this.route.snapshot.params["id"];
    this.emprestimoService.listarPorId(id).subscribe(emprestimo  => {
      this.emprestimo = emprestimo;
    })
  }

  public editarEmprestimo(form: NgForm): void{
    if(form.valid){
      this.emprestimoService.atualizarEmprestimo(this.emprestimo).subscribe(response => {
        this.notification.showMessege("Atualizado com sucesso!", "success");
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
