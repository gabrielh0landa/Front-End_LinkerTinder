export function gerarGraficoSkills(candidatos) {
    // DETETIVE 1: Checando se a função foi chamada
    console.log('--- Iniciando Depuração do Gráfico ---');
    console.log('1. Função gerarGraficoSkills foi chamada com', candidatos.length, 'candidatos.');
    // DETETIVE 2: Verificando se o canvas foi encontrado
    const canvasElement = document.getElementById('grafico-skills');
    console.log('2. Elemento canvas encontrado no HTML:', canvasElement);
    // A nossa "saída de emergência" silenciosa
    if (!canvasElement || candidatos.length === 0) {
        console.log('3. CONDIÇÃO DE SAÍDA: Canvas ou candidatos não encontrados. Função interrompida.');
        return;
    }
    // --- 1. Processar os Dados ---
    const contagemSkills = {};
    for (const candidato of candidatos) {
        for (const skill of candidato.skills) {
            contagemSkills[skill] = (contagemSkills[skill] || 0) + 1;
        }
    }
    const labels = Object.keys(contagemSkills);
    const data = Object.values(contagemSkills);
    // DETETIVE 3: Verificando os dados que serão usados no gráfico
    console.log('4. Dados processados para o gráfico:', { labels, data });
    // --- 2. Criar o Gráfico ---
    new Chart(canvasElement, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                    label: '# de Candidatos por Skill',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
    // DETETIVE 4: Confirmando que a criação do gráfico foi chamada
    console.log('5. Comando para criar o gráfico foi executado com sucesso!');
    console.log('--- Fim da Depuração ---');
}
