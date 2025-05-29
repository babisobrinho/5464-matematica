// Dados para os cálculos e visualizações
const dadosTernos = {
    // Combinações únicas possíveis (10 combinações)
    combinacoesUnicas: [
        { terno: "RRR", subtipo: "S-R", dominancia: "R" },
        { terno: "RRK", subtipo: "S-R", dominancia: "R" },
        { terno: "RRW", subtipo: "S-R", dominancia: "R" },
        { terno: "RKK", subtipo: "S-R", dominancia: "R" },
        { terno: "RKW", subtipo: "S-R", dominancia: "R" },
        { terno: "RWW", subtipo: "S-R", dominancia: "R" },
        { terno: "KKK", subtipo: "S-K", dominancia: "K" },
        { terno: "KKW", subtipo: "S-K", dominancia: "K" },
        { terno: "KWW", subtipo: "S-K", dominancia: "K" },
        { terno: "WWW", subtipo: "S-W", dominancia: "W" }
    ],
    
    // Regras de reprodução
    regrasReproducao: {
        "S-R": { partilha: 2, autoReproducao: false },
        "S-K": { partilha: [1, 2], autoReproducao: true },
        "S-W": { partilha: 1, autoReproducao: false }
    }
};

// Função para inicializar a página quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tabela de ternos
    inicializarTabelaTernos();
    
    // Inicializar gráfico de distribuição
    inicializarGraficoDistribuicao();
    
    // Inicializar simulador de reprodução
    inicializarSimuladorReproducao();
    
    // Inicializar análise de proposição
    inicializarAnaliseProposicao();
    
    // Configurar filtros
    configurarFiltros();
});

// Função para inicializar a tabela de ternos
function inicializarTabelaTernos() {
    const tbody = document.getElementById('ternos-tbody');
    if (!tbody) return;
    
    // Limpar tabela
    tbody.innerHTML = '';
    
    // Adicionar cada terno à tabela
    dadosTernos.combinacoesUnicas.forEach((item, index) => {
        const row = document.createElement('tr');
        row.dataset.subtipo = item.subtipo;
        
        // Definir classe de cor baseada no subtipo
        let classeSubtipo = '';
        if (item.subtipo === 'S-R') classeSubtipo = 'table-danger';
        else if (item.subtipo === 'S-K') classeSubtipo = 'table-warning';
        else if (item.subtipo === 'S-W') classeSubtipo = 'table-success';
        
        row.className = classeSubtipo;
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.terno}</td>
            <td>${item.subtipo}</td>
            <td>${item.dominancia}</td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Atualizar contadores
    atualizarContadoresTernos();
}

// Função para atualizar os contadores de ternos
function atualizarContadoresTernos() {
    const totalTernos = dadosTernos.combinacoesUnicas.length;
    const totalSR = dadosTernos.combinacoesUnicas.filter(item => item.subtipo === 'S-R').length;
    const totalSK = dadosTernos.combinacoesUnicas.filter(item => item.subtipo === 'S-K').length;
    const totalSW = dadosTernos.combinacoesUnicas.filter(item => item.subtipo === 'S-W').length;
    
    document.getElementById('total-ternos').textContent = totalTernos;
    document.getElementById('total-sr').textContent = totalSR;
    document.getElementById('total-sk').textContent = totalSK;
    document.getElementById('total-sw').textContent = totalSW;
    
    document.getElementById('percent-sr').textContent = ((totalSR / totalTernos) * 100).toFixed(1) + '%';
    document.getElementById('percent-sk').textContent = ((totalSK / totalTernos) * 100).toFixed(1) + '%';
    document.getElementById('percent-sw').textContent = ((totalSW / totalTernos) * 100).toFixed(1) + '%';
}

// Função para inicializar o gráfico de distribuição
function inicializarGraficoDistribuicao() {
    const ctx = document.getElementById('distribuicao-chart');
    if (!ctx) return;
    
    const totalTernos = dadosTernos.combinacoesUnicas.length;
    const totalSR = dadosTernos.combinacoesUnicas.filter(item => item.subtipo === 'S-R').length;
    const totalSK = dadosTernos.combinacoesUnicas.filter(item => item.subtipo === 'S-K').length;
    const totalSW = dadosTernos.combinacoesUnicas.filter(item => item.subtipo === 'S-W').length;
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Subespécie S-R', 'Subespécie S-K', 'Subespécie S-W'],
            datasets: [{
                data: [totalSR, totalSK, totalSW],
                backgroundColor: [
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(241, 196, 15, 0.7)',
                    'rgba(46, 204, 113, 0.7)'
                ],
                borderColor: [
                    'rgba(231, 76, 60, 1)',
                    'rgba(241, 196, 15, 1)',
                    'rgba(46, 204, 113, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: 'Distribuição das Subespécies'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const percentage = ((value / totalTernos) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Função para configurar os filtros
function configurarFiltros() {
    const filtroSubtipo = document.getElementById('filtro-subtipo');
    if (!filtroSubtipo) return;
    
    filtroSubtipo.addEventListener('change', function() {
        const subtipo = this.value;
        const rows = document.querySelectorAll('#ternos-tbody tr');
        
        rows.forEach(row => {
            if (subtipo === 'todos' || row.dataset.subtipo === subtipo) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
        
        // Atualizar explicação do filtro
        atualizarExplicacaoFiltro(subtipo);
    });
}

// Função para atualizar a explicação do filtro
function atualizarExplicacaoFiltro(subtipo) {
    const explicacaoFiltro = document.getElementById('explicacao-filtro');
    if (!explicacaoFiltro) return;
    
    let texto = '';
    
    switch(subtipo) {
        case 'S-R':
            texto = `<h5>Subespécie S-R</h5>
                    <p>A subespécie S-R é caracterizada pela dominância do cromossoma R no terno 13. Esta subespécie:</p>
                    <ul>
                        <li>Não consegue reproduzir sexuadamente com outro da sua subespécie</li>
                        <li>Partilha 2 cromossomas no processo de reprodução</li>
                        <li>Produz a proteína RL que permite uma parede celular mais resistente</li>
                    </ul>
                    <p>Existem 6 combinações únicas de ternos que pertencem a esta subespécie, todas contendo pelo menos um cromossoma R.</p>`;
            break;
        case 'S-K':
            texto = `<h5>Subespécie S-K</h5>
                    <p>A subespécie S-K é caracterizada pela dominância do cromossoma K no terno 13 (sem presença de R). Esta subespécie:</p>
                    <ul>
                        <li>Pode partilhar 1 ou 2 cromossomas na reprodução sexuada</li>
                        <li>Consegue produzir compostos para reparação celular mais rápida e eficaz</li>
                        <li>Pode reproduzir-se com qualquer subespécie, incluindo ela mesma</li>
                    </ul>
                    <p>Existem 3 combinações únicas de ternos que pertencem a esta subespécie, todas contendo pelo menos um cromossoma K, mas nenhum cromossoma R.</p>`;
            break;
        case 'S-W':
            texto = `<h5>Subespécie S-W</h5>
                    <p>A subespécie S-W é caracterizada por ter o seu 13º terno com 3 cromossomas W. Esta subespécie:</p>
                    <ul>
                        <li>Não consegue reproduzir-se sexuadamente com outro da sua subespécie</li>
                        <li>Partilha 1 cromossoma no processo de reprodução</li>
                        <li>Produz agentes enzimáticos que permitem eliminar rapidamente produtos nocivos</li>
                        <li>Possui a maior resistência ao bacteriófago (95%)</li>
                    </ul>
                    <p>Existe apenas 1 combinação única de terno que pertence a esta subespécie: WWW.</p>`;
            break;
        default:
            texto = `<h5>Importância da Classificação por Subespécies</h5>
                    <p>A classificação das bactérias em subespécies baseada nos ternos cromossomáticos é fundamental para:</p>
                    <ul>
                        <li>Compreender as regras de reprodução e as possibilidades de descendência</li>
                        <li>Analisar a resistência ao bacteriófago, que está diretamente relacionada com o número de genes W</li>
                        <li>Prever a evolução da população bacteriana ao longo das gerações</li>
                        <li>Estudar como a distribuição das subespécies muda após ataques do bacteriófago</li>
                    </ul>
                    <p>Este filtro permite visualizar as combinações únicas de ternos por subespécie, facilitando a análise das características específicas de cada grupo.</p>`;
    }
    
    explicacaoFiltro.innerHTML = texto;
}

// Função para inicializar o simulador de reprodução
function inicializarSimuladorReproducao() {
    const simuladorForm = document.getElementById('simulador-form');
    if (!simuladorForm) return;
    
    simuladorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const bacteria1 = document.getElementById('bacteria1').value;
        const bacteria2 = document.getElementById('bacteria2').value;
        const terno1 = document.getElementById('terno1').value;
        const terno2 = document.getElementById('terno2').value;
        
        // Verificar restrições de reprodução
        if ((bacteria1 === 'S-R' && bacteria2 === 'S-R') || 
            (bacteria1 === 'S-W' && bacteria2 === 'S-W')) {
            mostrarErroSimulador('Erro: Bactérias da mesma subespécie S-R ou S-W não podem reproduzir entre si!');
            return;
        }
        
        // Verificar se os ternos são válidos para as subespécies selecionadas
        if (!verificarTernoValido(terno1, bacteria1) || !verificarTernoValido(terno2, bacteria2)) {
            mostrarErroSimulador('Erro: O terno selecionado não corresponde à subespécie escolhida!');
            return;
        }
        
        // Calcular descendentes
        const descendentes = calcularDescendentes(bacteria1, bacteria2, terno1, terno2);
        
        // Mostrar resultados
        mostrarResultadosReproducao(descendentes);
    });
    
    // Configurar eventos de mudança para atualizar os ternos disponíveis
    document.getElementById('bacteria1').addEventListener('change', function() {
        atualizarTernosDisponiveis('bacteria1', 'terno1');
    });
    
    document.getElementById('bacteria2').addEventListener('change', function() {
        atualizarTernosDisponiveis('bacteria2', 'terno2');
    });
    
    // Inicializar os ternos disponíveis
    atualizarTernosDisponiveis('bacteria1', 'terno1');
    atualizarTernosDisponiveis('bacteria2', 'terno2');
}

// Função para atualizar os ternos disponíveis com base na subespécie selecionada
function atualizarTernosDisponiveis(bacteriaId, ternoId) {
    const bacteriaSelect = document.getElementById(bacteriaId);
    const ternoSelect = document.getElementById(ternoId);
    const subtipo = bacteriaSelect.value;
    
    // Limpar opções atuais
    ternoSelect.innerHTML = '';
    
    // Filtrar ternos da subespécie selecionada
    const ternosDisponiveis = dadosTernos.combinacoesUnicas.filter(item => item.subtipo === subtipo);
    
    // Adicionar novas opções
    ternosDisponiveis.forEach(item => {
        const option = document.createElement('option');
        option.value = item.terno;
        option.textContent = item.terno;
        ternoSelect.appendChild(option);
    });
}

// Função para verificar se um terno é válido para uma subespécie
function verificarTernoValido(terno, subtipo) {
    return dadosTernos.combinacoesUnicas.some(item => item.terno === terno && item.subtipo === subtipo);
}

// Função para mostrar erro no simulador
function mostrarErroSimulador(mensagem) {
    const resultadoDiv = document.getElementById('resultado-simulacao');
    resultadoDiv.innerHTML = `
        <div class="alert alert-danger">
            ${mensagem}
        </div>
    `;
}

// Função para calcular os possíveis descendentes
function calcularDescendentes(bacteria1, bacteria2, terno1, terno2) {
    // Determinar cromossomas partilhados
    let partilhados1, partilhados2;
    
    if (bacteria1 === 'S-R') {
        partilhados1 = 2;
    } else if (bacteria1 === 'S-W') {
        partilhados1 = 1;
    } else { // S-K
        partilhados1 = Math.floor(Math.random() * 2) + 1; // 1 ou 2 aleatoriamente
    }
    
    if (bacteria2 === 'S-R') {
        partilhados2 = 2;
    } else if (bacteria2 === 'S-W') {
        partilhados2 = 1;
    } else { // S-K
        partilhados2 = Math.floor(Math.random() * 2) + 1; // 1 ou 2 aleatoriamente
    }
    
    // Gerar todas as combinações possíveis
    const descendentes = gerarCombinacoes(terno1, terno2, partilhados1, partilhados2);
    
    return {
        bacteria1,
        bacteria2,
        terno1,
        terno2,
        partilhados1,
        partilhados2,
        descendentes
    };
}

// Função para gerar todas as combinações possíveis de descendentes
function gerarCombinacoes(terno1, terno2, partilhados1, partilhados2) {
    const cromossomas1 = terno1.split('');
    const cromossomas2 = terno2.split('');
    const resultado = [];
    
    // Função para gerar todas as combinações possíveis de índices
    function gerarIndices(n, k) {
        const result = [];
        const indices = Array(k);
        
        function generate(start, chosen) {
            if (chosen === k) {
                result.push([...indices]);
                return;
            }
            
            for (let i = start; i < n; i++) {
                indices[chosen] = i;
                generate(i + 1, chosen + 1);
            }
        }
        
        generate(0, 0);
        return result;
    }
    
    // Gerar todas as combinações possíveis de índices para os cromossomas partilhados
    const indices1 = gerarIndices(3, partilhados1);
    const indices2 = gerarIndices(3, partilhados2);
    
    // Para cada combinação de índices
    for (const idx1 of indices1) {
        for (const idx2 of indices2) {
            // Criar um novo terno
            const novoTerno = ['', '', ''];
            
            // Preencher com cromossomas da primeira bactéria
            for (let i = 0; i < idx1.length; i++) {
                novoTerno[i] = cromossomas1[idx1[i]];
            }
            
            // Preencher com cromossomas da segunda bactéria
            for (let i = 0; i < idx2.length; i++) {
                novoTerno[partilhados1 + i] = cromossomas2[idx2[i]];
            }
            
            // Verificar se o terno está completo (3 cromossomas)
            if (partilhados1 + partilhados2 === 3) {
                // Ordenar o terno para garantir que combinações equivalentes sejam contadas apenas uma vez
                const ternoOrdenado = [...novoTerno].sort().reverse().join('');
                
                // Determinar o subtipo com base nas regras de dominância
                let subtipo;
                if (ternoOrdenado.includes('R')) {
                    subtipo = 'S-R';
                } else if (ternoOrdenado === 'WWW') {
                    subtipo = 'S-W';
                } else {
                    subtipo = 'S-K';
                }
                
                // Adicionar ao resultado se ainda não existir
                const existente = resultado.find(item => item.terno === ternoOrdenado);
                if (!existente) {
                    resultado.push({
                        terno: ternoOrdenado,
                        subtipo: subtipo
                    });
                }
            }
        }
    }
    
    return resultado;
}

// Função para mostrar os resultados da reprodução
function mostrarResultadosReproducao(dados) {
    const resultadoDiv = document.getElementById('resultado-simulacao');
    
    // Contar os subtipos
    const totalDescendentes = dados.descendentes.length;
    const totalSR = dados.descendentes.filter(item => item.subtipo === 'S-R').length;
    const totalSK = dados.descendentes.filter(item => item.subtipo === 'S-K').length;
    const totalSW = dados.descendentes.filter(item => item.subtipo === 'S-W').length;
    
    // Calcular percentagens
    const percentSR = totalSR > 0 ? ((totalSR / totalDescendentes) * 100).toFixed(1) : 0;
    const percentSK = totalSK > 0 ? ((totalSK / totalDescendentes) * 100).toFixed(1) : 0;
    const percentSW = totalSW > 0 ? ((totalSW / totalDescendentes) * 100).toFixed(1) : 0;
    
    let html = `
        <h5>Resultados da Simulação</h5>
        <div class="alert alert-info">
            <p><strong>Bactéria 1:</strong> ${dados.bacteria1} (${dados.terno1}) - Partilha ${dados.partilhados1} cromossomas</p>
            <p><strong>Bactéria 2:</strong> ${dados.bacteria2} (${dados.terno2}) - Partilha ${dados.partilhados2} cromossomas</p>
        </div>
        
        <h6>Possíveis Descendentes:</h6>
        <div class="table-responsive">
            <table class="table table-sm table-bordered">
                <thead>
                    <tr>
                        <th>Terno</th>
                        <th>Subespécie</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    dados.descendentes.forEach(item => {
        let classeSubtipo = '';
        if (item.subtipo === 'S-R') classeSubtipo = 'table-danger';
        else if (item.subtipo === 'S-K') classeSubtipo = 'table-warning';
        else if (item.subtipo === 'S-W') classeSubtipo = 'table-success';
        
        html += `
            <tr class="${classeSubtipo}">
                <td>${item.terno}</td>
                <td>${item.subtipo}</td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
        
        <h6>Distribuição dos Descendentes:</h6>
        <div class="row">
            <div class="col-md-6">
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Subespécie S-R
                        <span class="badge bg-danger rounded-pill">${totalSR} (${percentSR}%)</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Subespécie S-K
                        <span class="badge bg-warning rounded-pill">${totalSK} (${percentSK}%)</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Subespécie S-W
                        <span class="badge bg-success rounded-pill">${totalSW} (${percentSW}%)</span>
                    </li>
                </ul>
            </div>
            <div class="col-md-6">
                <canvas id="descendentes-chart" width="100" height="100"></canvas>
            </div>
        </div>
    `;
    
    resultadoDiv.innerHTML = html;
    
    // Criar gráfico de distribuição dos descendentes
    const ctx = document.getElementById('descendentes-chart');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Subespécie S-R', 'Subespécie S-K', 'Subespécie S-W'],
            datasets: [{
                data: [totalSR, totalSK, totalSW],
                backgroundColor: [
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(241, 196, 15, 0.7)',
                    'rgba(46, 204, 113, 0.7)'
                ],
                borderColor: [
                    'rgba(231, 76, 60, 1)',
                    'rgba(241, 196, 15, 1)',
                    'rgba(46, 204, 113, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const percentage = ((value / totalDescendentes) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Função para inicializar a análise da proposição lógica
function inicializarAnaliseProposicao() {
    const analisarBtn = document.getElementById('analisar-proposicao');
    if (!analisarBtn) return;
    
    analisarBtn.addEventListener('click', function() {
        const resultadoDiv = document.getElementById('resultado-proposicao');
        
        // Simulação de reprodução entre S-R e S-W
        const descendentesSRSW = calcularDescendentes('S-R', 'S-W', 'RRR', 'WWW');
        
        // Verificar se algum descendente é S-W
        const temSW = descendentesSRSW.descendentes.some(item => item.subtipo === 'S-W');
        
        let html = `
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">Análise da Proposição: "Sem a subespécie S-K, a subespécie S-W teria desaparecido"</h5>
                </div>
                <div class="card-body">
                    <h6>Formalização da Proposição:</h6>
                    <p>P → Q, onde:</p>
                    <ul>
                        <li>P: "Não existe a subespécie S-K"</li>
                        <li>Q: "A subespécie S-W desaparece"</li>
                    </ul>
                    
                    <h6>Análise:</h6>
                    <p>Para verificar esta proposição, precisamos determinar se é possível gerar a subespécie S-W sem a participação da subespécie S-K.</p>
                    
                    <div class="alert alert-info">
                        <h6>Possibilidades de Reprodução sem S-K:</h6>
                        <p>1. S-R + S-W (única combinação possível sem S-K)</p>
                    </div>
                    
                    <h6>Resultados da Simulação S-R + S-W:</h6>
                    <div class="table-responsive">
                        <table class="table table-sm table-bordered">
                            <thead>
                                <tr>
                                    <th>Terno</th>
                                    <th>Subespécie</th>
                                </tr>
                            </thead>
                            <tbody>
        `;
        
        descendentesSRSW.descendentes.forEach(item => {
            let classeSubtipo = '';
            if (item.subtipo === 'S-R') classeSubtipo = 'table-danger';
            else if (item.subtipo === 'S-K') classeSubtipo = 'table-warning';
            else if (item.subtipo === 'S-W') classeSubtipo = 'table-success';
            
            html += `
                <tr class="${classeSubtipo}">
                    <td>${item.terno}</td>
                    <td>${item.subtipo}</td>
                </tr>
            `;
        });
        
        html += `
                        </tbody>
                    </table>
                </div>
                
                <h6>Conclusão:</h6>
                <div class="alert ${temSW ? 'alert-danger' : 'alert-success'}">
                    <p><strong>A proposição é ${temSW ? 'FALSA' : 'VERDADEIRA'}</strong></p>
                    <p>${temSW ? 
                        'É possível gerar descendentes da subespécie S-W sem a participação da subespécie S-K.' : 
                        'Não é possível gerar descendentes da subespécie S-W sem a participação da subespécie S-K.'}</p>
                    <p>Como a subespécie S-W não pode reproduzir-se com ela mesma, e a reprodução com S-R não gera descendentes S-W, a subespécie S-W desapareceria após uma geração na ausência de S-K.</p>
                </div>
                
                <h6>Tabela de Verdade:</h6>
                <div class="table-responsive">
                    <table class="table table-sm table-bordered">
                        <thead>
                            <tr>
                                <th>P: "Não existe S-K"</th>
                                <th>Q: "S-W desaparece"</th>
                                <th>P → Q</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="table-success">
                                <td>V</td>
                                <td>V</td>
                                <td>V</td>
                            </tr>
                            <tr class="table-danger">
                                <td>V</td>
                                <td>F</td>
                                <td>F</td>
                            </tr>
                            <tr class="table-success">
                                <td>F</td>
                                <td>V</td>
                                <td>V</td>
                            </tr>
                            <tr class="table-success">
                                <td>F</td>
                                <td>F</td>
                                <td>V</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <p>No nosso caso, P é verdadeiro (estamos assumindo que não existe S-K) e Q é ${temSW ? 'falso (S-W não desaparece)' : 'verdadeiro (S-W desaparece)'}.</p>
                <p>Portanto, P → Q é ${temSW ? 'falso' : 'verdadeiro'}.</p>
            </div>
        </div>
        `;
        
        resultadoDiv.innerHTML = html;
    });
}
