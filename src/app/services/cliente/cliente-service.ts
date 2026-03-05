import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Clientes{

  "id": number;
  "nome": string;
  "status": boolean;
  "email": string;
  "dataDoCadastro" : string;
}
export interface ClienteDTO {
  nome: string;
  email: string;
  dataDoCadastro: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly httpCliente = inject(HttpClient);

  getClientes(): Observable<Clientes[]> {
    return this.httpCliente.get<Clientes[]>('http://localhost:8080/cliente');
  }

  setClientes(cliente: ClienteDTO): Observable<Clientes> {
    return this.httpCliente.post<Clientes>('http://localhost:8080/cliente', cliente);
  }

  deletClientes(id: number) {
    return this.httpCliente.delete('http://localhost:8080/cliente/deletarconta/' + id);
  }

  deletAll() {
    return this.httpCliente.delete('http://localhost:8080/cliente/deletarconta');
  }
  reativar(id: number) {
    return this.httpCliente.patch('http://localhost:8080/cliente/reativar/' + id, null);
  }

  alterar(id: number, cliente: ClienteDTO) {
    return this.httpCliente.put('http://localhost:8080/cliente/alterar/' + id, cliente);
  }
}
