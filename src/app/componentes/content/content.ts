import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClienteDTO, Clientes, ClienteService } from '../../services/cliente/cliente-service';
import Swal from 'sweetalert2';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-content',
  imports: [FormsModule, NgClass],
  templateUrl: './content.html',
  styleUrl: './content.css',
  standalone: true,
})
export class Content implements OnInit {
  editar: boolean = false;
  idParaAlteracao: number = 0;

  private readonly clienteSetvice = inject(ClienteService);

  ListaDeClientes = signal<Clientes[]>([]);

  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    this.clienteSetvice.getClientes().subscribe((response) => {
      console.log('Resposta:', response);
      this.ListaDeClientes.set(response);
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
        this.clienteSetvice.deletClientes(id).subscribe(() => {
          Swal.fire({
            title: 'Deletado!',
            text: 'O cliente foi removido.',
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

    this.clienteSetvice.deletAll().subscribe(() => {
      console.log('Cliente deletado');
      this.getInfo();
    });
  }

  nome: string = '';
  email: string = '';
  data: string = '';

  async setInfo() {
    const novoCliente: ClienteDTO = {
      nome: this.nome,
      email: this.email,
      dataDoCadastro: this.data,
    };

    if (!this.nome || !this.email || !this.data) {
      await Swal.fire('Erro!', 'Algum Campo Nao preenchido', 'error');
      return;
    } else {
      this.clienteSetvice.setClientes(novoCliente).subscribe({
        next: async () => {
          await Swal.fire('Sucesso!', 'Cliente cadastrado com sucesso!', 'success');
          this.getInfo();
          this.nome = '';
          this.email = '';
          this.data = '';
        },
        error: (err) => {
          Swal.fire('Erro!', 'nao foi possível cadastrar o cliente.', 'error');
          console.error(err);
        },
      });
    }
    this.editar = false;
  }

  editarCliente(id: number, cliente: Clientes) {
    this.editar = true;
    this.idParaAlteracao = id;

    this.nome = cliente.nome;
    this.email = cliente.email;
    this.data = cliente.dataDoCadastro;
  }

  reativar(id: number) {
    this.clienteSetvice.reativar(id).subscribe(() => {
      Swal.fire({
        title: 'Reativado!',
        text: 'O cliente foi Reativado.',
        icon: 'success',
        showConfirmButton: false,
      });
      this.getInfo();
    });
  }

  alter() {
    const novoCliente: ClienteDTO = {
      nome: this.nome,
      email: this.email,
      dataDoCadastro: this.data,
    };

    this.clienteSetvice.alterar(this.idParaAlteracao, novoCliente).subscribe(() => {
      Swal.fire({
        title: 'Alterado!',
        text: 'O cliente foi Alterado.',
        icon: 'success',
        showConfirmButton: false,
      });
      this.getInfo();
    });

    this.getInfo();
    this.nome = '';
    this.email = '';
    this.data = '';

    this.editar = false;
  }
}



