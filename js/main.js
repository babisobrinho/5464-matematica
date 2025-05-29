// Função para inicializar elementos quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips do Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Inicializar popovers do Bootstrap
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    
    // Adicionar classe 'active' ao link de navegação atual
    setActiveNavLink();
    
    // Inicializar animações de entrada
    initFadeInAnimations();
});

// Função para definir o link de navegação ativo com base na página atual
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Função para inicializar animações de fade-in
function initFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transition = 'opacity 1s ease-in';
        observer.observe(element);
    });
}

// Função para formatar números com casas decimais específicas
function formatNumber(number, decimals = 2) {
    return Number(number).toFixed(decimals);
}

// Função para converter graus para radianos (útil para cálculos)
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Função para converter radianos para graus
function toDegrees(radians) {
    return radians * (180 / Math.PI);
}

// Função para gerar cores aleatórias para gráficos
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Função para gerar uma paleta de cores para gráficos
function generateColorPalette(numColors) {
    const colors = [];
    const hueStep = 360 / numColors;
    
    for (let i = 0; i < numColors; i++) {
        const hue = i * hueStep;
        colors.push(`hsl(${hue}, 70%, 60%)`);
    }
    
    return colors;
}

// Função para copiar texto para a área de transferência
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    // Opcional: mostrar feedback ao usuário
    alert('Texto copiado para a área de transferência!');
}

// Função para validar um formulário
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// Função para criar um gráfico de barras usando Chart.js (será implementada quando necessário)
function createBarChart(canvasId, labels, data, title) {
    // Esta função será implementada quando Chart.js for incluído
    console.log('Função createBarChart será implementada quando Chart.js for incluído');
}

// Função para criar um gráfico de pizza usando Chart.js (será implementada quando necessário)
function createPieChart(canvasId, labels, data, title) {
    // Esta função será implementada quando Chart.js for incluído
    console.log('Função createPieChart será implementada quando Chart.js for incluído');
}

// Função para criar uma tabela dinâmica
function createDynamicTable(containerId, headers, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const table = document.createElement('table');
    table.className = 'table table-striped table-hover';
    
    // Criar cabeçalho
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Criar corpo da tabela
    const tbody = document.createElement('tbody');
    
    data.forEach(row => {
        const tr = document.createElement('tr');
        
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        
        tbody.appendChild(tr);
    });
    
    table.appendChild(tbody);
    container.appendChild(table);
}

// Função para calcular fatorial (útil para cálculos de probabilidade)
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Função para calcular combinações (útil para cálculos de probabilidade)
function combinations(n, k) {
    return factorial(n) / (factorial(k) * factorial(n - k));
}

// Função para calcular permutações (útil para cálculos de probabilidade)
function permutations(n, k) {
    return factorial(n) / factorial(n - k);
}
