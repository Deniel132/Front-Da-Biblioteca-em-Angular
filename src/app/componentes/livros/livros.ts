import { Component, inject, linkedSignal, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Livro, livroDTO, livroInterface } from '../../services/livro/livro';


@Component({
  selector: 'app-livros',
  imports: [FormsModule],
  templateUrl: './livros.html',
  styleUrl: './livros.css',
})
export class Livros implements OnInit {


  private readonly livroService = inject(Livro);

  ListaDeLivros = signal<livroInterface[]>([]);

  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    this.livroService.getLivros().subscribe((response) => {
      console.log('Resposta:', response);
      this.ListaDeLivros.set(response);
    });
  }

  deletar(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Essa acao nao pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d63031',
    }).then((result) => {
      if (result.isConfirmed) {
        this.livroService.deleteLivros(id).subscribe(() => {
          Swal.fire({
            title: 'Deletado!',
            text: 'O Livro foi removido.',
            icon: 'success',
            showConfirmButton: false,
          });
          this.getInfo();
        });
      }
    });
  }

  deletarTodos() {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Essa acao nao pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d63031',
    });

    this.livroService.deletAll().subscribe(() => {
      console.log('Livro deletado');
      this.getInfo();
    });
  }

  async setInfo() {
    Swal.fire({
      title: 'Novo Livro',
      html: `
    <input id="titulo" class="swal2-input" placeholder="titulo">
    <input id="estado" class="swal2-input" placeholder="estado">
    <input id="autor" class="swal2-input" placeholder="autor">
     <input id="LinkImagem" class="swal2-input" placeholder="Link imagem">
  `,
      showCancelButton: true,
    }).then((result) => {

      const titulo = (document.getElementById('titulo') as HTMLInputElement).value.trim();
      const status = (document.getElementById('estado') as HTMLInputElement).value.trim();
      const autor = (document.getElementById('autor') as HTMLInputElement).value.trim();
      const Link = (document.getElementById('LinkImagem') as HTMLInputElement).value.trim();

      if (result.isConfirmed) {
        const novoLivro: livroDTO = {
          titulo: titulo,
          statusDeUso: status,
          autor: autor,
          LinkImagem: Link,
        };

        if (!titulo || !status || !autor || !Link) {
          Swal.fire({
            title: 'Campo vazio',
            text: 'Digite um ISBN válido.',
            icon: 'warning',
          });
        } else {
          this.livroService.setLivros(novoLivro).subscribe({
            next: async () => {
              await Swal.fire('Sucesso!', 'Livro cadastrado com sucesso!', 'success');
              this.getInfo();
            },
            error: (err) => {
              Swal.fire('Erro!', 'nao foi possível cadastrar o Livro.', 'error');
              console.error(err);
            },
          });
        }

      }
      });
  }


  editarLivro(id: number, livros: livroInterface) {
    Swal.fire({
      title: 'Novo Livro',
      html: `
    <input id="titulo" class="swal2-input" placeholder="titulo" value="${livros.titulo}">
    <input id="estado" class="swal2-input" placeholder="estado" value="${livros.statusDeUso}">
  `,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const novoLivro: livroInterface = {
          id: livros.id,
          titulo: (document.getElementById('titulo') as HTMLInputElement).value,
          emprestado: livros.emprestado,
          statusDeUso: (document.getElementById('estado') as HTMLInputElement).value,
          LinkImagem: livros.LinkImagem,
          autor: livros.autor,
          ativo: livros.ativo,
        };

        console.log(novoLivro);
        this.livroService.alterar(novoLivro.id, novoLivro).subscribe(() => {
          Swal.fire({
            title: 'Alterado!',
            text: 'O Livro foi Alterado.',
            icon: 'success',
            showConfirmButton: false,
          });
          this.getInfo();
        });
      }
    });
  }

  reativar(id: number) {
    this.livroService.reativar(id).subscribe(() => {
      Swal.fire({
        title: 'Reativado!',
        text: 'O livro foi Reativado.',
        icon: 'success',
        showConfirmButton: false,
      });
      this.getInfo();
    });
  }

  setByISBN() {
    Swal.fire({
      title: 'Novo Livro',
      html: `
    <input id="ISBN" class="swal2-input" placeholder="ISBN">
  `,
      showCancelButton: true,
    }).then((result) => {
      const isbn = (document.getElementById('ISBN') as HTMLInputElement).value.trim();

      if (result.isConfirmed) {
        if (!isbn){
          Swal.fire({
            title: 'Campo vazio',
            text: 'Digite um ISBN válido.',
            icon: 'warning',
          });
        }else{
          this.livroService.setLivrosISBN(isbn).subscribe(() => {
            Swal.fire({
              title: 'Livro Adicionado!',
              text: 'O livro foi Adicionado.',
              icon: 'success',
              showConfirmButton: false,
            });
            this.getInfo();
          });
        }
      }
    });
  }





}
