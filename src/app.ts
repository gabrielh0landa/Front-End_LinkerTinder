// Importa tudo que precisamos de todos os arquivos
import { Candidato, Empresa, Vagas, candidatos, empresas } from './data/index.js';
import { criarFormularioCandidato } from './views/candidatoView.js';
import { criarFormularioEmpresa } from './views/empresaView.js';
import { criarDashboardCandidato } from './views/candidatoDashboardView.js';
import { criarDashboardEmpresa } from './views/empresaDashboardView.js';
import { gerarGraficoSkills } from './views/graficoSkills.js'; // <-- 1. ADICIONE ESTE IMPORT

// Adicionamos os novos nomes de página
type NomePagina = 'cadastro-candidato' | 'cadastro-empresa' | 'dashboard-candidato' | 'dashboard-empresa';

// Função Central: Renderiza a tela baseada no nome que recebe
function renderizarTela(nomeDaPagina: NomePagina) {
  const container = document.getElementById('container-principal');
  if (!container) return;

  container.innerHTML = '';

  switch (nomeDaPagina) {
    case 'cadastro-candidato': {
      // Lógica de cadastro do candidato... (sem alterações)
      container.innerHTML = criarFormularioCandidato();
      const form = document.getElementById('formulario-candidato');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const nome = (document.getElementById('nome') as HTMLInputElement).value;
          const email = (document.getElementById('email') as HTMLInputElement).value;
          const cpf = (document.getElementById('cpf') as HTMLInputElement).value;
          const idade = parseInt((document.getElementById('idade') as HTMLInputElement).value);
          const descricao = (document.getElementById('descricao') as HTMLTextAreaElement).value;
          const skillsSelecionadas: string[] = [];
          document.querySelectorAll('input[name="skills"]:checked').forEach(input => {
            skillsSelecionadas.push((input as HTMLInputElement).value);
          });
          const novoCandidato = new Candidato(nome, email, cpf, idade, "mock-cep", "mock-estado", descricao, skillsSelecionadas);
          candidatos.push(novoCandidato);
          alert('Candidato cadastrado!');
          console.log(candidatos);
          (form as HTMLFormElement).reset();
        });
      }
      break;
    }

    case 'cadastro-empresa': {
      // Lógica de cadastro da empresa... (sem alterações)
      container.innerHTML = criarFormularioEmpresa();
      const vagasTemporarias: Vagas[] = [];
      const btnAdicionarVaga = document.getElementById('btn-adicionar-vaga');
      const listaVagasUl = document.getElementById('lista-vagas-adicionadas');
      btnAdicionarVaga?.addEventListener('click', () => {
        const nomeVagaInput = document.getElementById('nome-vaga') as HTMLInputElement;
        const nomeVaga = nomeVagaInput.value;
        if (!nomeVaga) { alert('Por favor, digite o nome da vaga.'); return; }
        const skillsVagaSelecionadas: string[] = [];
        document.querySelectorAll('input[name="vaga-skills"]:checked').forEach(input => {
          skillsVagaSelecionadas.push((input as HTMLInputElement).value);
        });
        const novaVaga = new Vagas(nomeVaga, skillsVagaSelecionadas);
        vagasTemporarias.push(novaVaga);
        if(listaVagasUl) {
            const listItem = document.createElement('li');
            listItem.textContent = `${novaVaga.nome} (Skills: ${novaVaga.skills.join(', ') || 'Nenhuma'})`;
            listaVagasUl.appendChild(listItem);
        }
        nomeVagaInput.value = '';
        document.querySelectorAll('input[name="vaga-skills"]:checked').forEach(input => {
          (input as HTMLInputElement).checked = false;
        });
      });
      const form = document.getElementById('formulario-empresa');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const nome = (document.getElementById('nome-empresa') as HTMLInputElement).value;
          const email = (document.getElementById('email-empresa') as HTMLInputElement).value;
          const cnpj = (document.getElementById('cnpj-empresa') as HTMLInputElement).value;
          const descricao = (document.getElementById('descricao-empresa') as HTMLTextAreaElement).value;
          const novaEmpresa = new Empresa(nome, email, cnpj, "mock-cep", "mock-estado", vagasTemporarias, descricao);
          empresas.push(novaEmpresa);
          alert('Empresa e suas vagas cadastradas com sucesso!');
          console.log(empresas);
          (form as HTMLFormElement).reset();
          if(listaVagasUl) listaVagasUl.innerHTML = '';
        });
      }
      break;
    }

    // Nossas novas telas!
    case 'dashboard-candidato': {
      // Passamos o array de empresas para a view renderizar as vagas
      container.innerHTML = criarDashboardCandidato(empresas);
      gerarGraficoSkills(candidatos);
      break;
    }

    case 'dashboard-empresa': {
      // Passamos o array de candidatos para a view renderizar
      container.innerHTML = criarDashboardEmpresa(candidatos);
      break;
    }
  }
}

// Ponto de entrada da aplicação
document.addEventListener('DOMContentLoaded', () => {
  // Conecta todos os botões de navegação
  document.getElementById('nav-cadastro-candidato')?.addEventListener('click', () => renderizarTela('cadastro-candidato'));
  document.getElementById('nav-cadastro-empresa')?.addEventListener('click', () => renderizarTela('cadastro-empresa'));
  document.getElementById('nav-dashboard-candidato')?.addEventListener('click', () => renderizarTela('dashboard-candidato'));
  document.getElementById('nav-dashboard-empresa')?.addEventListener('click', () => renderizarTela('dashboard-empresa'));

  // Mostra a primeira tela ao carregar a página
  renderizarTela('cadastro-candidato');
});