import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Livros } from 'src/app/models/livros';
import { LivrosService } from 'src/app/services/livros.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit {

  displayedColumns = ['titulo', 'categoria', 'autor', 'isbn', 'excluir'];
  dataSource: Livros[] = []

  public formLivros: FormGroup;

  public img: string = '/assets/images/add.img.svg';
  public fotoUrl: string = ''
  public isLoadUpload: boolean = false;

  constructor(
    private livroService: LivrosService,
    private notification: NotificationService,
    private storage: StorageService,
    fb: FormBuilder) {

    this.formLivros = fb.group({
      titulo: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
    })

  }

  ngOnInit(): void {
    this.iniciarTabela();
  }

  private iniciarTabela(): void {
    this.livroService.listarLivros().subscribe(livro => {
      this.dataSource = livro;
    });
  }

  public deletarLivro(id: string, link: string): void {
    if(link != ""){
      this.storage.deleteFoto(link)
    }
    this.livroService.deletarLivros(id).subscribe(response => {
      this.notification.showMessege("Apagado!", "success");
      this.iniciarTabela();
    });
  }


  // MÉTODOS DO FORMULÁRIO PARA ADICIONAR UM LIVRO

  public criarLivro(): void {
    if (this.formLivros.valid) {
      const livro: Livros = this.formLivros.value;
      livro.capaUrl = this.fotoUrl;
      this.livroService.novoLivro(livro).subscribe(response => {
        this.notification.showMessege('Cadastrado com sucesso!', 'success');
        this.iniciarTabela();
      })
    }
  }

  public addImg(event: any): void {
    this.isLoadUpload = true;
    const file: File = event.target.files[0]
    this.storage.adicionarImagem(file).subscribe(urlImage => {
      this.isLoadUpload = false;
      const storageReference = urlImage.ref;
      const promiseFileUrl = storageReference.getDownloadURL(); // Retorna uma promesa
      promiseFileUrl.then((fotoUrl: string) => { // estraindo os dados da promise com o método then
        this.fotoUrl = fotoUrl;
      })

    })
  }


}
