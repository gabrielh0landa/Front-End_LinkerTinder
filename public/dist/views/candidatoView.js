import { skillsDisponiveis } from '../data/index.js';
export function criarFormularioCandidato() {
    const skillsHtml = skillsDisponiveis.map(skill => `
    <div class="skill-checkbox">
      <input type="checkbox" id="${skill.toLowerCase()}" name="skills" value="${skill}">
      <label for="${skill.toLowerCase()}">${skill}</label>
    </div>
  `).join('');
    return `
    <form id="formulario-candidato">
      <h2>Cadastro de Candidato</h2>
      
      <label for="nome">Nome:</label>
      <input type="text" id="nome" required>
      
      <label for="email">Email:</label>
      <input type="email" id="email" required>

      <label for="cpf">CPF:</label>
      <input type="text" id="cpf" required>

      <label for="idade">Idade:</label>
      <input type="number" id="idade" required>

      <label for="descricao">Descrição / Breve Resumo:</label>
      <textarea id="descricao" rows="4"></textarea>
      
      <h3>Skills:</h3>
      <div id="skills-container">
        ${skillsHtml}
      </div>
              
      <button type="submit">Cadastrar Candidato</button>
    </form>
  `;
}
