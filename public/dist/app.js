// Importa tudo que precisamos de todos os arquivos
import { Candidato, Empresa, Vagas, candidatos, empresas } from './data/index.js';
import { criarFormularioCandidato } from './views/candidatoView.js';
import { criarFormularioEmpresa } from './views/empresaView.js';
import { criarDashboardCandidato } from './views/candidatoDashboardView.js';
import { criarDashboardEmpresa } from './views/empresaDashboardView.js';
import { gerarGraficoSkills } from './views/graficoSkills.js'; // <-- 1. ADICIONE ESTE IMPORT
// Função Central: Renderiza a tela baseada no nome que recebe
function renderizarTela(nomeDaPagina) {
    const container = document.getElementById('container-principal');
    if (!container)
        return;
    container.innerHTML = '';
    switch (nomeDaPagina) {
        case 'cadastro-candidato': {
            // Lógica de cadastro do candidato... (sem alterações)
            container.innerHTML = criarFormularioCandidato();
            const form = document.getElementById('formulario-candidato');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const nome = document.getElementById('nome').value;
                    const email = document.getElementById('email').value;
                    const cpf = document.getElementById('cpf').value;
                    const idade = parseInt(document.getElementById('idade').value);
                    const descricao = document.getElementById('descricao').value;
                    const skillsSelecionadas = [];
                    document.querySelectorAll('input[name="skills"]:checked').forEach(input => {
                        skillsSelecionadas.push(input.value);
                    });
                    const novoCandidato = new Candidato(nome, email, cpf, idade, "mock-cep", "mock-estado", descricao, skillsSelecionadas);
                    candidatos.push(novoCandidato);
                    alert('Candidato cadastrado!');
                    console.log(candidatos);
                    form.reset();
                });
            }
            break;
        }
        case 'cadastro-empresa': {
            // Lógica de cadastro da empresa... (sem alterações)
            container.innerHTML = criarFormularioEmpresa();
            const vagasTemporarias = [];
            const btnAdicionarVaga = document.getElementById('btn-adicionar-vaga');
            const listaVagasUl = document.getElementById('lista-vagas-adicionadas');
            btnAdicionarVaga === null || btnAdicionarVaga === void 0 ? void 0 : btnAdicionarVaga.addEventListener('click', () => {
                const nomeVagaInput = document.getElementById('nome-vaga');
                const nomeVaga = nomeVagaInput.value;
                if (!nomeVaga) {
                    alert('Por favor, digite o nome da vaga.');
                    return;
                }
                const skillsVagaSelecionadas = [];
                document.querySelectorAll('input[name="vaga-skills"]:checked').forEach(input => {
                    skillsVagaSelecionadas.push(input.value);
                });
                const novaVaga = new Vagas(nomeVaga, skillsVagaSelecionadas);
                vagasTemporarias.push(novaVaga);
                if (listaVagasUl) {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${novaVaga.nome} (Skills: ${novaVaga.skills.join(', ') || 'Nenhuma'})`;
                    listaVagasUl.appendChild(listItem);
                }
                nomeVagaInput.value = '';
                document.querySelectorAll('input[name="vaga-skills"]:checked').forEach(input => {
                    input.checked = false;
                });
            });
            const form = document.getElementById('formulario-empresa');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const nome = document.getElementById('nome-empresa').value;
                    const email = document.getElementById('email-empresa').value;
                    const cnpj = document.getElementById('cnpj-empresa').value;
                    const descricao = document.getElementById('descricao-empresa').value;
                    const novaEmpresa = new Empresa(nome, email, cnpj, "mock-cep", "mock-estado", vagasTemporarias, descricao);
                    empresas.push(novaEmpresa);
                    alert('Empresa e suas vagas cadastradas com sucesso!');
                    console.log(empresas);
                    form.reset();
                    if (listaVagasUl)
                        listaVagasUl.innerHTML = '';
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
    var _a, _b, _c, _d;
    // Conecta todos os botões de navegação
    (_a = document.getElementById('nav-cadastro-candidato')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => renderizarTela('cadastro-candidato'));
    (_b = document.getElementById('nav-cadastro-empresa')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => renderizarTela('cadastro-empresa'));
    (_c = document.getElementById('nav-dashboard-candidato')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => renderizarTela('dashboard-candidato'));
    (_d = document.getElementById('nav-dashboard-empresa')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => renderizarTela('dashboard-empresa'));
    // Mostra a primeira tela ao carregar a página
    renderizarTela('cadastro-candidato');
});
