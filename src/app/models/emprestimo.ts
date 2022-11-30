import { Livros } from "./livros";

export interface Emprestimo {
    id?: string;
    leitor:string;
    email:string;
    telefone:string;
    status:string;
    livro:Livros;
    data: string;
}