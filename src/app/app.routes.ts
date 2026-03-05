import { Routes } from '@angular/router';
import { Home } from './componentes/home/home';
import { Content } from './componentes/content/content';

export const routes: Routes = [

  {
    path: "",
    component: Home
  },
  {
    path: "clientes",
    component: Content
  }


];
