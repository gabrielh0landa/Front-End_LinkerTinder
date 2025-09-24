import { Candidato } from '../data/index.js';
import Chart from 'chart.js/auto'; // Importa a biblioteca que acabamos de instalar

export function gerarGraficoSkills(candidatos: Candidato[]) {
  const canvasElement = document.getElementById('grafico-skills') as HTMLCanvasElement;
  // Se não houver o elemento canvas ou candidatos, não faz nada
  if (!canvasElement || candidatos.length === 0) return;

  // --- 1. Processar os Dados ---
  const contagemSkills: { [key: string]: number } = {};

  // Percorre todos os candidatos e todas as suas skills
  for (const candidato of candidatos) {
    for (const skill of candidato.skills) {
      // Se a skill já foi contada, incrementa. Se não, inicia em 1.
      contagemSkills[skill] = (contagemSkills[skill] || 0) + 1;
    }
  }

  const labels = Object.keys(contagemSkills); // Nomes das skills (ex: 'Python', 'Java')
  const data = Object.values(contagemSkills); // Contagem de cada skill (ex: 5, 3)

  // --- 2. Criar o Gráfico ---
  new Chart(canvasElement, {
    type: 'bar', // Tipo de gráfico: barras
    data: {
      labels: labels,
      datasets: [{
        label: '# de Candidatos por Skill',
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Cor das barras
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true, // Eixo Y começa no zero
          ticks: {
            // Garante que o eixo Y só mostre números inteiros
            stepSize: 1 
          }
        }
      }
    }
  });
}