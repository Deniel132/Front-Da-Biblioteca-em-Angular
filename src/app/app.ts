import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Home}   from './componentes/home/home';
import { Content } from './componentes/content/content';
import { Header } from './componentes/header/header';


@Component({
  selector: 'app-root',
  imports: [Content, Home, RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {
  protected readonly title = signal('biblioteca-front');
  titulo = 'teste2';
}
