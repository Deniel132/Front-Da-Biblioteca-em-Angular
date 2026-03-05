import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Headr } from '../../services/header/headr';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly headerServece = inject(Headr);
}
