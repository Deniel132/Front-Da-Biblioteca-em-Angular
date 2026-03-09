import { Routes } from '@angular/router';
import { Home } from './componentes/home/home';
import { Content } from './componentes/content/content';
import { Livros } from './componentes/livros/livros';
import { Estoque } from './componentes/estoque/estoque';
import { Emprestimos } from './componentes/emprestimos/emprestimos';

export const routes: Routes = [

  {
    path: "",
    component: Home
  },
  {
    path: "clientes",
    component: Content
  },
  {
    path: "livros",
    component: Livros
  },
  {
    path: "estoque",
    component: Estoque
  },
  {
    path: "emprestimos",
    component: Emprestimos
  }


];
