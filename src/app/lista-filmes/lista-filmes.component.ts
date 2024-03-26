import { Component, OnInit } from '@angular/core';
import { aluno } from '../interfaces/filmes';

@Component({
  selector: 'lista',
  templateUrl: './lista-filmes.component.html',
  styleUrls: ['./lista-filmes.component.css']
})
export class ListaFilmesComponent implements OnInit {

  constructor() { }

  filmes: aluno[] = [];
  mediaNotas: number = 0; // Propriedade para armazenar a média

  newFilme: aluno = {
    nome: '',
    turma: '',
    periodo: '',
    nota: ''
  };

  

  ngOnInit() {
  }

  onAddMovieClick(title?: string, clas?: string, period?: string, rating?: string, teste?: boolean) {
    if (teste == true) {
      if (title && clas && period && rating) {
        const numericRating = parseFloat(rating);
  
        if (!isNaN(numericRating) && numericRating >= 0 && numericRating <= 10) {
          this.newFilme.nome = title;
          this.newFilme.turma = clas;
          this.newFilme.periodo = period;
          this.newFilme.nota = numericRating.toString();
  
          this.filmes.push(this.newFilme);
          this.newFilme = {
            nome: '',
            turma: '',
            periodo: '',
            nota: ''
          };
  
          return 'aluno adicionado com sucesso!';
        } else {
          return 'A nota deve ser um número entre 0 e 10.';
        }
      } else {
        return 'Por favor, preencha todos os campos obrigatórios.';
      }
    } else {
      // Your existing code for handling form inputs manually
      const titleInput = (document.querySelector('#title') as HTMLInputElement);
      const genreInput = (document.querySelector('#clas') as HTMLInputElement);
      const yearInput = (document.querySelector('#period') as HTMLInputElement);
      const ratingInput = (document.querySelector('#rating') as HTMLInputElement);
  
      if (titleInput && genreInput && yearInput && ratingInput) {
        this.newFilme.nome = titleInput.value.toString();
        this.newFilme.turma = genreInput.value;
        this.newFilme.periodo = yearInput.value;
  
        // Ensure the rating is within the valid range
        const numericRating = parseFloat(ratingInput.value);
        if (!isNaN(numericRating) && numericRating >= 0 && numericRating <= 10) {
          this.newFilme.nota = numericRating.toString();
  
          // Verificar se os campos obrigatórios não estão vazios
          if (this.newFilme.nome && this.newFilme.turma && this.newFilme.periodo && this.newFilme.nota) {
            this.filmes.push(this.newFilme);
            this.newFilme = {
              nome: '',
              turma: '',
              periodo: '',
              nota: ''
            };
  
            // Limpar os campos após a adição
            titleInput.value = '';
            genreInput.value = '';
            yearInput.value = '';
            ratingInput.value = '';
  
            this.calcularMedia();
            return 'aluno adicionado com sucesso!';
          } else {
            return 'Por favor, preencha todos os campos obrigatórios.';
          }
        } else {
          return 'A nota deve ser um número entre 0 e 10.';
        }
      } else {
        return 'Erro ao acessar os campos de entrada.';
      }
    }
  }

  deleteFilme(aluno: aluno) {
    const index = this.filmes.indexOf(aluno);
    if (index !== -1 && index < this.filmes.length) {
      this.filmes.splice(index, 1);
      this.calcularMedia();
      return 'aluno excluído com sucesso!';
    } else {
      return 'Erro ao excluir o aluno. aluno não encontrado na lista ou índice inválido.';
    }
  }

  calcularMedia() {
    let totalFilmes = 0;
    let somaNotas = 0;

    for (const filme of this.filmes) {
        if (filme.nota !== undefined && !isNaN(parseFloat(filme.nota))) {
            somaNotas += parseFloat(filme.nota);
            totalFilmes++;
        }
    }

    this.mediaNotas = totalFilmes === 0 ? 0 : somaNotas / totalFilmes;
}


}