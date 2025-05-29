document.addEventListener('DOMContentLoaded', function() {
    // Desenhar visualizações
    desenharPartição();
    desenharProbabilidadeCondicional();
    desenharProbabilidadeTotal();
    desenharBayes();
    
    // Configurar calculadora interativa de Bayes
    configurarCalculadoraBayes();
});

// Função para desenhar a visualização de partição
function desenharPartição() {
    const canvas = document.getElementById('particaoCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Limpar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Desenhar conjunto A (círculo grande)
    ctx.beginPath();
    ctx.arc(width/2, height/2, width/2 - 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(200, 200, 200, 0.3)';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#333';
    ctx.font = '16px Arial';
    ctx.fillText('A', width/2 - 10, 25);
    
    // Desenhar subconjunto B1
    ctx.beginPath();
    ctx.moveTo(width/2, height/2);
    ctx.arc(width/2, height/2, width/2 - 10, -Math.PI/6, Math.PI/2);
    ctx.closePath();
    ctx.fillStyle = 'rgba(52, 152, 219, 0.5)';
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#333';
    ctx.fillText('B₁', width/2 - 60, height/2 - 40);
    
    // Desenhar subconjunto B2
    ctx.beginPath();
    ctx.moveTo(width/2, height/2);
    ctx.arc(width/2, height/2, width/2 - 10, Math.PI/2, 4*Math.PI/3);
    ctx.closePath();
    ctx.fillStyle = 'rgba(46, 204, 113, 0.5)';
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#333';
    ctx.fillText('B₂', width/2 - 20, height/2 + 80);
    
    // Desenhar subconjunto B3
    ctx.beginPath();
    ctx.moveTo(width/2, height/2);
    ctx.arc(width/2, height/2, width/2 - 10, 4*Math.PI/3, 11*Math.PI/6);
    ctx.closePath();
    ctx.fillStyle = 'rgba(231, 76, 60, 0.5)';
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#333';
    ctx.fillText('B₃', width/2 + 60, height/2 - 40);
}

// Função para desenhar a visualização de probabilidade condicional
function desenharProbabilidadeCondicional() {
    const canvas = document.getElementById('probCondCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Limpar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Desenhar conjunto S (retângulo)
    ctx.beginPath();
    ctx.rect(10, 10, width - 20, height - 20);
    ctx.fillStyle = 'rgba(200, 200, 200, 0.3)';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#333';
    ctx.font = '16px Arial';
    ctx.fillText('S', 20, 30);
    
    // Desenhar conjunto B
    ctx.beginPath();
    ctx.ellipse(width/2, height/2, width/3, height/3, 0, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(52, 152, 219, 0.5)';
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#333';
    ctx.fillText('B', width/2 - 80, height/2);
    
    // Desenhar conjunto A∩B
    ctx.beginPath();
    ctx.ellipse(width/2 + 20, height/2, width/5, height/4, 0, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(231, 76, 60, 0.7)';
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#333';
    ctx.fillText('A∩B', width/2 + 20, height/2);
    
    // Adicionar legenda
    ctx.fillStyle = '#333';
    ctx.font = '14px Arial';
    ctx.fillText('P(A|B) = P(A∩B) / P(B)', width/2 - 100, height - 20);
}

// Função para desenhar a visualização de probabilidade total
function desenharProbabilidadeTotal() {
    const canvas = document.getElementById('probTotalCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Limpar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Desenhar conjunto S (retângulo)
    ctx.beginPath();
    ctx.rect(10, 10, width - 20, height - 20);
    ctx.fillStyle = 'rgba(200, 200, 200, 0.3)';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#333';
    ctx.font = '16px Arial';
    ctx.fillText('S', 20, 30);
    
    // Desenhar partição B1, B2, B3
    // B1
    ctx.beginPath();
    ctx.rect(10, 10, (width - 20)/3, height - 20);
    ctx.fillStyle = 'rgba(52, 152, 219, 0.3)';
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#333';
    ctx.fillText('B₁', 30, 50);
    
    // B2
    ctx.beginPath();
    ctx.rect(10 + (width - 20)/3, 10, (width - 20)/3, height - 20);
    ctx.fillStyle = 'rgba(46, 204, 113, 0.3)';
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#333';
    ctx.fillText('B₂', 30 + (width - 20)/3, 50);
    
    // B3
    ctx.beginPath();
    ctx.rect(10 + 2*(width - 20)/3, 10, (width - 20)/3, height - 20);
    ctx.fillStyle = 'rgba(231, 76, 60, 0.3)';
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#333';
    ctx.fillText('B₃', 30 + 2*(width - 20)/3, 50);
    
    // Desenhar conjunto A intersectando B1, B2, B3
    ctx.beginPath();
    ctx.rect(10, height/3, width - 20, height/4);
    ctx.fillStyle = 'rgba(241, 196, 15, 0.7)';
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#333';
    ctx.fillText('A', width/2, height/3 + height/8);
    
    // Adicionar legenda
    ctx.fillStyle = '#333';
    ctx.font = '14px Arial';
    ctx.fillText('P(A) = P(A|B₁)P(B₁) + P(A|B₂)P(B₂) + P(A|B₃)P(B₃)', width/2 - 150, height - 20);
}

// Função para desenhar a visualização do Teorema de Bayes
function desenharBayes() {
    const canvas = document.getElementById('bayesCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Limpar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Desenhar conjunto S (retângulo)
    ctx.beginPath();
    ctx.rect(10, 10, width - 20, height - 20);
    ctx.fillStyle = 'rgba(200, 200, 200, 0.3)';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#333';
    ctx.font = '16px Arial';
    ctx.fillText('S', 20, 30);
    
    // Desenhar conjunto B
    ctx.beginPath();
    ctx.rect(10, 10, (width - 20)/2, height - 20);
    ctx.fillStyle = 'rgba(52, 152, 219, 0.5)';
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#333';
    ctx.fillText('B', 30, 50);
    
    // Desenhar conjunto A
    ctx.beginPath();
    ctx.rect(10, height/3, width - 20, height/3);
    ctx.fillStyle = 'rgba(231, 76, 60, 0.5)';
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#333';
    ctx.fillText('A', 20, height/3 + 20);
    
    // Destacar A∩B
    ctx.beginPath();
    ctx.rect(10, height/3, (width - 20)/2, height/3);
    ctx.fillStyle = 'rgba(155, 89, 182, 0.7)';
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#333';
    ctx.fillText('A∩B', 30, height/3 + height/6);
    
    // Adicionar legenda
    ctx.fillStyle = '#333';
    ctx.font = '14px Arial';
    ctx.fillText('P(B|A) = P(A|B)P(B) / P(A)', width/2 - 100, height - 20);
}

// Função para configurar a calculadora interativa de Bayes
function configurarCalculadoraBayes() {
    const priorB = document.getElementById('prior-b');
    const condAGivenB = document.getElementById('cond-a-given-b');
    const condAGivenNotB = document.getElementById('cond-a-given-not-b');
    
    const priorBValue = document.getElementById('prior-b-value');
    const condAGivenBValue = document.getElementById('cond-a-given-b-value');
    const condAGivenNotBValue = document.getElementById('cond-a-given-not-b-value');
    
    const totalA = document.getElementById('total-a');
    const posteriorBGivenA = document.getElementById('posterior-b-given-a');
    const progressPosterior = document.getElementById('progress-posterior');
    
    // Função para atualizar os valores
    function atualizarValores() {
        const pB = parseFloat(priorB.value);
        const pAGivenB = parseFloat(condAGivenB.value);
        const pAGivenNotB = parseFloat(condAGivenNotB.value);
        
        priorBValue.textContent = pB.toFixed(2);
        condAGivenBValue.textContent = pAGivenB.toFixed(2);
        condAGivenNotBValue.textContent = pAGivenNotB.toFixed(2);
        
        // Calcular P(A) usando o Teorema da Probabilidade Total
        const pA = pB * pAGivenB + (1 - pB) * pAGivenNotB;
        
        // Calcular P(B|A) usando o Teorema de Bayes
        const pBGivenA = (pAGivenB * pB) / pA;
        
        totalA.textContent = pA.toFixed(2);
        posteriorBGivenA.textContent = pBGivenA.toFixed(2);
        
        const posteriorPercent = pBGivenA * 100;
        progressPosterior.style.width = posteriorPercent + '%';
        progressPosterior.setAttribute('aria-valuenow', posteriorPercent);
        progressPosterior.textContent = posteriorPercent.toFixed(0) + '%';
    }
    
    // Adicionar eventos de input
    priorB.addEventListener('input', atualizarValores);
    condAGivenB.addEventListener('input', atualizarValores);
    condAGivenNotB.addEventListener('input', atualizarValores);
    
    // Inicializar valores
    atualizarValores();
}
