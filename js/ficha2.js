// Dados para os gráficos e cálculos
const dadosOriginais = {
    distribuicao: {
        genesW0: 0.296, // 8/27
        genesW1: 0.444, // 12/27
        genesW2: 0.222, // 6/27
        genesW3: 0.037  // 1/27
    },
    resistencia: {
        genesW0: 0.07,  // 7%
        genesW1: 0.30,  // 30%
        genesW2: 0.55,  // 55%
        genesW3: 0.95   // 95%
    }
};

// Função para inicializar a página quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar gráficos
    inicializarGraficoSubtipos();
    inicializarGraficoContribuicao();
    inicializarGraficoComparacao();
    inicializarGraficoEvolucao();
    
    // Configurar eventos para a calculadora interativa
    configurarCalculadoraInterativa();
    
    // Configurar evento para o botão de simulação
    document.getElementById('simular-btn').addEventListener('click', simularEvolucao);
    
    // Inicializar gráficos de distribuição antes e depois do ataque
    inicializarGraficosDistribuicao();
});

// Função para inicializar o gráfico de distribuição de subtipos
function inicializarGraficoSubtipos() {
    const ctx = document.getElementById('subtipos-chart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['0 genes W', '1 gene W', '2 genes W', '3 genes W'],
            datasets: [{
                data: [
                    dadosOriginais.distribuicao.genesW0 * 100,
                    dadosOriginais.distribuicao.genesW1 * 100,
                    dadosOriginais.distribuicao.genesW2 * 100,
                    dadosOriginais.distribuicao.genesW3 * 100
                ],
                backgroundColor: [
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(241, 196, 15, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(52, 152, 219, 0.7)'
                ],
                borderColor: [
                    'rgba(231, 76, 60, 1)',
                    'rgba(241, 196, 15, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(52, 152, 219, 1)'
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
                    text: 'Distribuição Original dos Subtipos'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw.toFixed(1)}%`;
                        }
                    }
                }
            }
        }
    });
}

// Função para inicializar o gráfico de contribuição para resistência
function inicializarGraficoContribuicao() {
    // Calcular contribuições
    const contribuicoes = [
        dadosOriginais.distribuicao.genesW0 * dadosOriginais.resistencia.genesW0 * 100,
        dadosOriginais.distribuicao.genesW1 * dadosOriginais.resistencia.genesW1 * 100,
        dadosOriginais.distribuicao.genesW2 * dadosOriginais.resistencia.genesW2 * 100,
        dadosOriginais.distribuicao.genesW3 * dadosOriginais.resistencia.genesW3 * 100
    ];
    
    const ctx = document.getElementById('contribuicao-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['0 genes W', '1 gene W', '2 genes W', '3 genes W'],
            datasets: [{
                label: 'Contribuição para Resistência (%)',
                data: contribuicoes,
                backgroundColor: [
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(241, 196, 15, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(52, 152, 219, 0.7)'
                ],
                borderColor: [
                    'rgba(231, 76, 60, 1)',
                    'rgba(241, 196, 15, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(52, 152, 219, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Contribuição (%)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Contribuição de Cada Subtipo para a Resistência Total'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Contribuição: ${context.raw.toFixed(2)}%`;
                        }
                    }
                }
            }
        }
    });
}

// Função para inicializar o gráfico de comparação antes e depois do ataque
function inicializarGraficoComparacao() {
    // Calcular probabilidade total de resistência
    const probResistencia = calcularProbabilidadeResistencia(
        dadosOriginais.distribuicao.genesW0,
        dadosOriginais.distribuicao.genesW1,
        dadosOriginais.distribuicao.genesW2,
        dadosOriginais.distribuicao.genesW3
    );
    
    // Calcular distribuição após ataque
    const distribuicaoApos = {
        genesW0: (dadosOriginais.resistencia.genesW0 * dadosOriginais.distribuicao.genesW0) / probResistencia,
        genesW1: (dadosOriginais.resistencia.genesW1 * dadosOriginais.distribuicao.genesW1) / probResistencia,
        genesW2: (dadosOriginais.resistencia.genesW2 * dadosOriginais.distribuicao.genesW2) / probResistencia,
        genesW3: (dadosOriginais.resistencia.genesW3 * dadosOriginais.distribuicao.genesW3) / probResistencia
    };
    
    const ctx = document.getElementById('comparacao-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['0 genes W', '1 gene W', '2 genes W', '3 genes W'],
            datasets: [
                {
                    label: 'Antes do Ataque',
                    data: [
                        dadosOriginais.distribuicao.genesW0 * 100,
                        dadosOriginais.distribuicao.genesW1 * 100,
                        dadosOriginais.distribuicao.genesW2 * 100,
                        dadosOriginais.distribuicao.genesW3 * 100
                    ],
                    backgroundColor: 'rgba(52, 152, 219, 0.7)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Após o Ataque',
                    data: [
                        distribuicaoApos.genesW0 * 100,
                        distribuicaoApos.genesW1 * 100,
                        distribuicaoApos.genesW2 * 100,
                        distribuicaoApos.genesW3 * 100
                    ],
                    backgroundColor: 'rgba(46, 204, 113, 0.7)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Percentagem (%)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Distribuição dos Subtipos Antes e Após o Ataque'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw.toFixed(2)}%`;
                        }
                    }
                }
            }
        }
    });
}

// Função para inicializar o gráfico de evolução
function inicializarGraficoEvolucao() {
    const ctx = document.getElementById('evolucao-chart').getContext('2d');
    window.evolucaoChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Inicial'],
            datasets: [
                {
                    label: '0 genes W',
                    data: [dadosOriginais.distribuicao.genesW0 * 100],
                    borderColor: 'rgba(231, 76, 60, 1)',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    tension: 0.1
                },
                {
                    label: '1 gene W',
                    data: [dadosOriginais.distribuicao.genesW1 * 100],
                    borderColor: 'rgba(241, 196, 15, 1)',
                    backgroundColor: 'rgba(241, 196, 15, 0.1)',
                    tension: 0.1
                },
                {
                    label: '2 genes W',
                    data: [dadosOriginais.distribuicao.genesW2 * 100],
                    borderColor: 'rgba(46, 204, 113, 1)',
                    backgroundColor: 'rgba(46, 204, 113, 0.1)',
                    tension: 0.1
                },
                {
                    label: '3 genes W',
                    data: [dadosOriginais.distribuicao.genesW3 * 100],
                    borderColor: 'rgba(52, 152, 219, 1)',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Percentagem (%)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Evolução da Distribuição dos Subtipos ao Longo das Gerações'
                }
            }
        }
    });
}

// Função para configurar a calculadora interativa
function configurarCalculadoraInterativa() {
    const probB0 = document.getElementById('prob-b0');
    const probB1 = document.getElementById('prob-b1');
    const probB2 = document.getElementById('prob-b2');
    const probB3 = document.getElementById('prob-b3');
    
    const probB0Value = document.getElementById('prob-b0-value');
    const probB1Value = document.getElementById('prob-b1-value');
    const probB2Value = document.getElementById('prob-b2-value');
    const probB3Value = document.getElementById('prob-b3-value');
    
    const somaProbs = document.getElementById('soma-probs');
    const probResistencia = document.getElementById('prob-resistencia');
    const progressResistencia = document.getElementById('progress-resistencia');
    const validationMessage = document.getElementById('validation-message');
    
    // Função para atualizar os valores
    function atualizarValores() {
        const b0 = parseFloat(probB0.value);
        const b1 = parseFloat(probB1.value);
        const b2 = parseFloat(probB2.value);
        const b3 = parseFloat(probB3.value);
        
        probB0Value.textContent = b0.toFixed(3);
        probB1Value.textContent = b1.toFixed(3);
        probB2Value.textContent = b2.toFixed(3);
        probB3Value.textContent = b3.toFixed(3);
        
        const soma = b0 + b1 + b2 + b3;
        somaProbs.textContent = soma.toFixed(3);
        
        // Verificar se a soma é aproximadamente 1
        if (Math.abs(soma - 1) > 0.01) {
            validationMessage.style.display = 'block';
            return;
        } else {
            validationMessage.style.display = 'none';
        }
        
        // Calcular probabilidade de resistência
        const resistencia = calcularProbabilidadeResistencia(b0, b1, b2, b3);
        const resistenciaPct = resistencia * 100;
        
        probResistencia.textContent = resistenciaPct.toFixed(2) + '%';
        progressResistencia.style.width = resistenciaPct + '%';
        progressResistencia.setAttribute('aria-valuenow', resistenciaPct);
        progressResistencia.textContent = resistenciaPct.toFixed(2) + '%';
    }
    
    // Adicionar eventos de input
    probB0.addEventListener('input', atualizarValores);
    probB1.addEventListener('input', atualizarValores);
    probB2.addEventListener('input', atualizarValores);
    probB3.addEventListener('input', atualizarValores);
    
    // Configurar botão de reset
    document.getElementById('reset-probs').addEventListener('click', function() {
        probB0.value = dadosOriginais.distribuicao.genesW0;
        probB1.value = dadosOriginais.distribuicao.genesW1;
        probB2.value = dadosOriginais.distribuicao.genesW2;
        probB3.value = dadosOriginais.distribuicao.genesW3;
        atualizarValores();
    });
    
    // Inicializar valores
    atualizarValores();
}

// Função para calcular a probabilidade de resistência
function calcularProbabilidadeResistencia(b0, b1, b2, b3) {
    return (
        dadosOriginais.resistencia.genesW0 * b0 +
        dadosOriginais.resistencia.genesW1 * b1 +
        dadosOriginais.resistencia.genesW2 * b2 +
        dadosOriginais.resistencia.genesW3 * b3
    );
}

// Função para simular a evolução da colônia
function simularEvolucao() {
    const numGeracoes = parseInt(document.getElementById('num-geracoes').value);
    if (numGeracoes < 1 || numGeracoes > 10) {
        alert('Por favor, insira um número de gerações entre 1 e 10.');
        return;
    }
    
    // Inicializar distribuição
    let distribuicao = {
        genesW0: dadosOriginais.distribuicao.genesW0,
        genesW1: dadosOriginais.distribuicao.genesW1,
        genesW2: dadosOriginais.distribuicao.genesW2,
        genesW3: dadosOriginais.distribuicao.genesW3
    };
    
    // Limpar tabela
    const tbody = document.getElementById('evolucao-table');
    tbody.innerHTML = '';
    
    // Adicionar linha inicial
    adicionarLinhaEvolucao(tbody, 'Inicial', distribuicao);
    
    // Atualizar gráfico
    window.evolucaoChart.data.labels = ['Inicial'];
    window.evolucaoChart.data.datasets[0].data = [distribuicao.genesW0 * 100];
    window.evolucaoChart.data.datasets[1].data = [distribuicao.genesW1 * 100];
    window.evolucaoChart.data.datasets[2].data = [distribuicao.genesW2 * 100];
    window.evolucaoChart.data.datasets[3].data = [distribuicao.genesW3 * 100];
    
    // Simular gerações
    for (let i = 1; i <= numGeracoes; i++) {
        // Calcular probabilidade total de resistência
        const probResistencia = calcularProbabilidadeResistencia(
            distribuicao.genesW0,
            distribuicao.genesW1,
            distribuicao.genesW2,
            distribuicao.genesW3
        );
        
        // Calcular nova distribuição após ataque
        distribuicao = {
            genesW0: (dadosOriginais.resistencia.genesW0 * distribuicao.genesW0) / probResistencia,
            genesW1: (dadosOriginais.resistencia.genesW1 * distribuicao.genesW1) / probResistencia,
            genesW2: (dadosOriginais.resistencia.genesW2 * distribuicao.genesW2) / probResistencia,
            genesW3: (dadosOriginais.resistencia.genesW3 * distribuicao.genesW3) / probResistencia
        };
        
        // Adicionar linha na tabela
        adicionarLinhaEvolucao(tbody, i, distribuicao);
        
        // Atualizar gráfico
        window.evolucaoChart.data.labels.push(`Geração ${i}`);
        window.evolucaoChart.data.datasets[0].data.push(distribuicao.genesW0 * 100);
        window.evolucaoChart.data.datasets[1].data.push(distribuicao.genesW1 * 100);
        window.evolucaoChart.data.datasets[2].data.push(distribuicao.genesW2 * 100);
        window.evolucaoChart.data.datasets[3].data.push(distribuicao.genesW3 * 100);
    }
    
    window.evolucaoChart.update();
}

// Função para adicionar linha na tabela de evolução
function adicionarLinhaEvolucao(tbody, geracao, distribuicao) {
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>${geracao}</td>
        <td>${(distribuicao.genesW0 * 100).toFixed(1)}%</td>
        <td>${(distribuicao.genesW1 * 100).toFixed(1)}%</td>
        <td>${(distribuicao.genesW2 * 100).toFixed(1)}%</td>
        <td>${(distribuicao.genesW3 * 100).toFixed(1)}%</td>
    `;
    
    tbody.appendChild(row);
}

// Função para inicializar os gráficos de distribuição antes e depois do ataque
function inicializarGraficosDistribuicao() {
    // Calcular probabilidade total de resistência
    const probResistencia = calcularProbabilidadeResistencia(
        dadosOriginais.distribuicao.genesW0,
        dadosOriginais.distribuicao.genesW1,
        dadosOriginais.distribuicao.genesW2,
        dadosOriginais.distribuicao.genesW3
    );
    
    // Calcular distribuição após ataque usando o Teorema de Bayes
    const distribuicaoApos = {
        genesW0: (dadosOriginais.resistencia.genesW0 * dadosOriginais.distribuicao.genesW0) / probResistencia,
        genesW1: (dadosOriginais.resistencia.genesW1 * dadosOriginais.distribuicao.genesW1) / probResistencia,
        genesW2: (dadosOriginais.resistencia.genesW2 * dadosOriginais.distribuicao.genesW2) / probResistencia,
        genesW3: (dadosOriginais.resistencia.genesW3 * dadosOriginais.distribuicao.genesW3) / probResistencia
    };
    
    // Gráfico de distribuição inicial
    const ctxInicial = document.getElementById('distribuicao-inicial-chart').getContext('2d');
    new Chart(ctxInicial, {
        type: 'pie',
        data: {
            labels: ['0 genes W', '1 gene W', '2 genes W', '3 genes W'],
            datasets: [{
                data: [
                    dadosOriginais.distribuicao.genesW0 * 100,
                    dadosOriginais.distribuicao.genesW1 * 100,
                    dadosOriginais.distribuicao.genesW2 * 100,
                    dadosOriginais.distribuicao.genesW3 * 100
                ],
                backgroundColor: [
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(241, 196, 15, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(52, 152, 219, 0.7)'
                ],
                borderColor: [
                    'rgba(231, 76, 60, 1)',
                    'rgba(241, 196, 15, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(52, 152, 219, 1)'
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
                    text: 'Distribuição Inicial'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw.toFixed(1)}%`;
                        }
                    }
                }
            }
        }
    });
    
    // Gráfico de distribuição após ataque
    const ctxApos = document.getElementById('distribuicao-apos-chart').getContext('2d');
    new Chart(ctxApos, {
        type: 'pie',
        data: {
            labels: ['0 genes W', '1 gene W', '2 genes W', '3 genes W'],
            datasets: [{
                data: [
                    distribuicaoApos.genesW0 * 100,
                    distribuicaoApos.genesW1 * 100,
                    distribuicaoApos.genesW2 * 100,
                    distribuicaoApos.genesW3 * 100
                ],
                backgroundColor: [
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(241, 196, 15, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(52, 152, 219, 0.7)'
                ],
                borderColor: [
                    'rgba(231, 76, 60, 1)',
                    'rgba(241, 196, 15, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(52, 152, 219, 1)'
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
                    text: 'Distribuição Após Ataque'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw.toFixed(1)}%`;
                        }
                    }
                }
            }
        }
    });
    
    // Atualizar tabela de comparação
    atualizarTabelaComparacao(distribuicaoApos);
}

// Função para atualizar a tabela de comparação
function atualizarTabelaComparacao(distribuicaoApos) {
    const tbody = document.getElementById('comparacao-table');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // Adicionar linha para 0 genes W
    const row0 = document.createElement('tr');
    row0.innerHTML = `
        <td>0 genes W</td>
        <td>${(dadosOriginais.distribuicao.genesW0 * 100).toFixed(1)}%</td>
        <td>${(distribuicaoApos.genesW0 * 100).toFixed(1)}%</td>
        <td>${((distribuicaoApos.genesW0 - dadosOriginais.distribuicao.genesW0) * 100).toFixed(1)}%</td>
    `;
    tbody.appendChild(row0);
    
    // Adicionar linha para 1 gene W
    const row1 = document.createElement('tr');
    row1.innerHTML = `
        <td>1 gene W</td>
        <td>${(dadosOriginais.distribuicao.genesW1 * 100).toFixed(1)}%</td>
        <td>${(distribuicaoApos.genesW1 * 100).toFixed(1)}%</td>
        <td>${((distribuicaoApos.genesW1 - dadosOriginais.distribuicao.genesW1) * 100).toFixed(1)}%</td>
    `;
    tbody.appendChild(row1);
    
    // Adicionar linha para 2 genes W
    const row2 = document.createElement('tr');
    row2.innerHTML = `
        <td>2 genes W</td>
        <td>${(dadosOriginais.distribuicao.genesW2 * 100).toFixed(1)}%</td>
        <td>${(distribuicaoApos.genesW2 * 100).toFixed(1)}%</td>
        <td>${((distribuicaoApos.genesW2 - dadosOriginais.distribuicao.genesW2) * 100).toFixed(1)}%</td>
    `;
    tbody.appendChild(row2);
    
    // Adicionar linha para 3 genes W
    const row3 = document.createElement('tr');
    row3.innerHTML = `
        <td>3 genes W</td>
        <td>${(dadosOriginais.distribuicao.genesW3 * 100).toFixed(1)}%</td>
        <td>${(distribuicaoApos.genesW3 * 100).toFixed(1)}%</td>
        <td>${((distribuicaoApos.genesW3 - dadosOriginais.distribuicao.genesW3) * 100).toFixed(1)}%</td>
    `;
    tbody.appendChild(row3);
}
