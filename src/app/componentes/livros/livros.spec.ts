import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Livros } from './livros';

describe('Livros', () => {
  let component: Livros;
  let fixture: ComponentFixture<Livros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Livros],
    }).compileComponents();

    fixture = TestBed.createComponent(Livros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
