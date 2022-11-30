import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetaisComponent } from 'src/app/components/detais/detais.component';
import { Livros } from 'src/app/models/livros';
import { Emprestimo } from 'src/app/models/emprestimo';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns = ['leitor','livro', 'data', 'status', 'excluir', 'editar', 'capa' ];
  dataSource: Emprestimo[]=[];
  dataLivros: Livros[]=[]

  constructor(
    private emprestimoService:EmprestimoService,
    private notification: NotificationService,
    private dialogo: MatDialog,
    private storage: StorageService) { }

  ngOnInit(): void {
    this.iniciarTabela();
  
  }


  private iniciarTabela(): void {
    this.emprestimoService.listarEmprestimos().subscribe(emprestimo => {
      this.dataSource = emprestimo;
    });
  }

  public deletarEmprestimo(id: string, link: string): void {
    if(link != ""){
      this.storage.deleteFoto(link)
    }
    this.emprestimoService.deletarEmprestimo(id).subscribe(response => {
      this.notification.showMessege("Apagado!", "success");
      this.iniciarTabela();
    });
  }

  public detalhes(livros: Livros, status: string): void{
    livros.statusLivro = status;
    this.dialogo.open(DetaisComponent,{
      width: "600px",
      data: livros
    })
  }



}
