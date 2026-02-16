import { Component, inject } from '@angular/core'; // Adicionei o 'inject' aqui
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClimaService } from './services/clima';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Forma moderna de injetar o service para evitar o erro de "injection token"
  private climaService = inject(ClimaService);

  cidade: string = '';
  dados: any;

  executarBusca() {
    // Verificamos se o usuário digitou algo
    if (!this.cidade.trim()) {
      alert('Por favor, digite o nome de uma cidade.');
      return;
    }

    this.climaService.buscarClimaPorCidade(this.cidade).subscribe({
      next: (res) => {
        this.dados = res;
        console.log('Dados recebidos:', res);
      },
      error: (err) => {
        console.error('Erro na busca:', err);
        alert('Cidade não encontrada ou erro na conexão.');
      }
    });
  }
} // <--- O código deve terminar aqui, SEM o "]" que estava antes.