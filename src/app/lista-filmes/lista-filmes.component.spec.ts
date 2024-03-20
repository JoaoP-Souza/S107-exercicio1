import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFilmesComponent } from './lista-filmes.component';

describe('ListaFilmesComponent', () => {
  let component: ListaFilmesComponent;
  let fixture: ComponentFixture<ListaFilmesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaFilmesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaFilmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  
  it('should add a movie and verify the return ', () => {
    // chamanado o método e passando os valores por parametro
    const result = component.onAddMovieClick('aluno 1', 'Ação', '2022', '4.5', true);
    // verificando retorno do aluno  
    expect(result).toBe('aluno adicionado com sucesso!');
  });

  it('should add a movie and verify the size of the string', () => {
    // chamanado o método e passando os valores por parametro
    component.onAddMovieClick('aluno 1', 'Ação', '2022', '4.5', true);
    // verificando retorno do aluno  
    expect(component.filmes.length).toBe(1);


  });
  

  it('should not add a movie with invalid data', () => {
    component.newFilme.nome = '';
    component.newFilme.turma = '';
    component.newFilme.periodo = '';
    component.newFilme.nota = '';
  
    const result = component.onAddMovieClick();
  
    expect(component.filmes.length).toBe(0);
  
  expect(result).toBe('A nota deve ser um número entre 0 e 10.');
  });

  it('should handle error when accessing input fields', () => {
    spyOn(document, 'querySelector').and.returnValue(null);
  
    const result = component.onAddMovieClick();

    expect(result).toBe('Erro ao acessar os campos de entrada.');
  });
  
  
  it('should remove a movie', () => {
    const initialMovies = [
      {
        nome: 'aluno 1',
        turma: 'Ação',
        periodo: '2022',
        nota: '4.5',
      },
      {
        nome: 'aluno 2',
        turma: 'Comédia',
        periodo: '2021',
        nota: '3.8',
      },
    ];
  
    component.filmes = [...initialMovies];
    
    const movieToRemove = initialMovies[0];
    const expectedMoviesAfterRemoval = [initialMovies[1]];
  
    const result = component.deleteFilme(movieToRemove);
  
    expect(component.filmes).toEqual(expectedMoviesAfterRemoval);
    expect(result).toBe('aluno excluído com sucesso!');
  });
  
  
  it('deve definir a média como 0 se não houver filmes', () => {
    
    component.filmes = [];
    component.calcularMedia();
    
    expect(component.mediaNotas).toBe(0);
  });
  
  it('deve calcular a média corretamente quando há filmes', () => {
    
    component.filmes = [
      { nome: 'aluno 1', turma: 'Ação', periodo: '2022', nota: '5' },
      { nome: 'aluno 2', turma: 'Aventura', periodo: '2021', nota: '7' },
      { nome: 'aluno 3', turma: 'Comédia', periodo: '2020', nota: '8' }
    ];
      
    component.calcularMedia();
    // Calcule a média manualmente
    const somaNotas = 5 + 7 + 8;
    const mediaEsperada = somaNotas / component.filmes.length;
    
    expect(component.mediaNotas).toBe(mediaEsperada);
  });

});
