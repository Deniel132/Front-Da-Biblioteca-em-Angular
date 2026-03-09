import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Emprestimos } from './emprestimos';

describe('Emprestimos', () => {
  let component: Emprestimos;
  let fixture: ComponentFixture<Emprestimos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Emprestimos],
    }).compileComponents();

    fixture = TestBed.createComponent(Emprestimos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
