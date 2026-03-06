import { Routes } from '@angular/router';
import { Home } from './componentes/home/home';
import { Content } from './componentes/content/content';
import { Livros } from './componentes/livros/livros';

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
  }


];
