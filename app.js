/**
 * Lotería de Navidad 2026 - Main Application
 * 
 * Handles:
 * - Number checker functionality (demo mode / official results)
 * - Split calculator for sharing décimos
 * - UI interactions and animations
 */

(function() {
    'use strict';

    // ==========================================================================
    // DOM Elements
    // ==========================================================================
    
    const elements = {
        checkerForm: document.getElementById('checker-form'),
        numeroInput: document.getElementById('numero-input'),
        resultContainer: document.getElementById('result-container'),
        demoBadge: document.getElementById('demo-badge'),
        splitForm: document.getElementById('split-form'),
        prizeSelect: document.getElementById('prize-select'),
        customPrizeField: document.getElementById('custom-prize-field'),
        customPrize: document.getElementById('custom-prize'),
        splitResult: document.getElementById('split-result'),
        decimoPrice: document.getElementById('decimo-price'),
        numParticipants: document.getElementById('num-participants')
    };

    // ==========================================================================
    // Number Checker
    // ==========================================================================

    /**
     * Initialize the number checker
     */
    function initChecker() {
        // Update demo badge visibility based on draw status
        updateDemoBadge();
        
        // Handle form submission
        elements.checkerForm.addEventListener('submit', handleCheckNumber);
        
        // Format input as user types
        elements.numeroInput.addEventListener('input', formatNumberInput);
    }

    /**
     * Update demo badge visibility
     */
    function updateDemoBadge() {
        if (isDrawCompleted()) {
            elements.demoBadge.classList.add('hidden');
        } else {
            elements.demoBadge.classList.remove('hidden');
        }
    }

    /**
     * Format number input to only allow digits and pad to 5 characters
     * @param {Event} e - Input event
     */
    function formatNumberInput(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 5) {
            value = value.slice(0, 5);
        }
        e.target.value = value;
    }

    /**
     * Handle number check form submission
     * @param {Event} e - Submit event
     */
    function handleCheckNumber(e) {
        e.preventDefault();
        
        const numero = elements.numeroInput.value.padStart(5, '0');
        
        if (numero.length !== 5 || !/^\d{5}$/.test(numero)) {
            showError('Por favor, introduce un número válido de 5 cifras');
            return;
        }
        
        const result = checkNumber(numero);
        displayResult(result, numero);
    }

    /**
     * Check a number against the results
     * @param {string} numero - 5-digit number to check
     * @returns {Object} Result object with prize info
     */
    function checkNumber(numero) {
        const results = getResults();
        const prizes = [];
        
        // Check El Gordo
        if (numero === results.gordo) {
            prizes.push({
                type: 'gordo',
                name: 'El Gordo',
                amount: getPrizeAmount('gordo')
            });
        }
        
        // Check 2nd Prize
        if (numero === results.segundo) {
            prizes.push({
                type: 'segundo',
                name: 'Segundo Premio',
                amount: getPrizeAmount('segundo')
            });
        }
        
        // Check 3rd Prize
        if (numero === results.tercero) {
            prizes.push({
                type: 'tercero',
                name: 'Tercer Premio',
                amount: getPrizeAmount('tercero')
            });
        }
        
        // Check 4th Prizes
        if (results.cuartos.includes(numero)) {
            prizes.push({
                type: 'cuarto',
                name: 'Cuarto Premio',
                amount: getPrizeAmount('cuarto')
            });
        }
        
        // Check 5th Prizes
        if (results.quintos.includes(numero)) {
            prizes.push({
                type: 'quinto',
                name: 'Quinto Premio',
                amount: getPrizeAmount('quinto')
            });
        }
        
        // Check Pedrea
        if (results.pedrea.includes(numero)) {
            prizes.push({
                type: 'pedrea',
                name: 'Pedrea',
                amount: getPrizeAmount('pedrea')
            });
        }
        
        // Check approximations to El Gordo
        if (results.gordo) {
            const gordoNum = parseInt(results.gordo, 10);
            const numeroNum = parseInt(numero, 10);
            
            // Anterior y posterior
            if (numeroNum === gordoNum - 1 || numeroNum === gordoNum + 1) {
                if (!prizes.some(p => p.type === 'gordo')) {
                    prizes.push({
                        type: 'aproximacionGordo',
                        name: 'Aproximación al Gordo',
                        amount: getPrizeAmount('aproximacionGordo')
                    });
                }
            }
            
            // Centena del Gordo (same hundreds, different last two digits)
            const gordoCentena = Math.floor(gordoNum / 100);
            const numeroCentena = Math.floor(numeroNum / 100);
            if (gordoCentena === numeroCentena && numero !== results.gordo) {
                if (!prizes.some(p => p.type === 'aproximacionGordo')) {
                    prizes.push({
                        type: 'centena',
                        name: 'Centena del Gordo',
                        amount: getPrizeAmount('centena')
                    });
                }
            }
            
            // Two last digits match El Gordo
            const gordoLastTwo = results.gordo.slice(-2);
            const numeroLastTwo = numero.slice(-2);
            if (gordoLastTwo === numeroLastTwo && numero !== results.gordo) {
                if (!prizes.some(p => ['gordo', 'aproximacionGordo', 'centena'].includes(p.type))) {
                    prizes.push({
                        type: 'dosUltimasCifrasGordo',
                        name: 'Dos últimas cifras del Gordo',
                        amount: getPrizeAmount('dosUltimasCifrasGordo')
                    });
                }
            }
        }
        
        // Check approximations to 2nd Prize
        if (results.segundo) {
            const segundoNum = parseInt(results.segundo, 10);
            const numeroNum = parseInt(numero, 10);
            
            if (numeroNum === segundoNum - 1 || numeroNum === segundoNum + 1) {
                if (!prizes.some(p => p.type === 'segundo')) {
                    prizes.push({
                        type: 'aproximacionSegundo',
                        name: 'Aproximación al 2º Premio',
                        amount: getPrizeAmount('aproximacionSegundo')
                    });
                }
            }
            
            // Centena del Segundo
            const segundoCentena = Math.floor(segundoNum / 100);
            const numeroCentena = Math.floor(numeroNum / 100);
            if (segundoCentena === numeroCentena && numero !== results.segundo) {
                if (!prizes.some(p => ['aproximacionSegundo'].includes(p.type))) {
                    const existingCentena = prizes.find(p => p.type === 'centena');
                    if (!existingCentena) {
                        prizes.push({
                            type: 'centena',
                            name: 'Centena del 2º Premio',
                            amount: getPrizeAmount('centena')
                        });
                    }
                }
            }
        }
        
        // Check centena of 3rd Prize
        if (results.tercero) {
            const terceroNum = parseInt(results.tercero, 10);
            const numeroNum = parseInt(numero, 10);
            
            const terceroCentena = Math.floor(terceroNum / 100);
            const numeroCentena = Math.floor(numeroNum / 100);
            if (terceroCentena === numeroCentena && numero !== results.tercero) {
                const existingCentena = prizes.find(p => p.type === 'centena');
                if (!existingCentena) {
                    prizes.push({
                        type: 'centena',
                        name: 'Centena del 3er Premio',
                        amount: getPrizeAmount('centena')
                    });
                }
            }
        }
        
        // Check reintegro (last digit matches El Gordo)
        if (results.gordo) {
            const gordoLastDigit = results.gordo.slice(-1);
            const numeroLastDigit = numero.slice(-1);
            if (gordoLastDigit === numeroLastDigit && prizes.length === 0) {
                prizes.push({
                    type: 'reintegro',
                    name: 'Reintegro',
                    amount: getPrizeAmount('reintegro')
                });
            }
        }
        
        return {
            numero,
            prizes,
            totalAmount: prizes.reduce((sum, p) => sum + p.amount, 0),
            isDemo: !isDrawCompleted()
        };
    }

    /**
     * Display the result in the UI
     * @param {Object} result - Result object from checkNumber
     * @param {string} numero - The checked number
     */
    function displayResult(result, numero) {
        elements.resultContainer.hidden = false;
        
        let html = '';
        let containerClass = 'result-container';
        
        if (result.isDemo) {
            containerClass += ' demo';
            html += `
                <div class="result-demo-notice">
                    <strong>⚠️ Modo Demo</strong>
                    <p>El sorteo aún no se ha celebrado. Este es un resultado de prueba.</p>
                </div>
            `;
        }
        
        if (result.prizes.length > 0) {
            containerClass += ' winner';
            html += `
                <h3 class="result-title">🎉 ¡Número premiado!</h3>
                <p class="result-number">Número: <strong>${numero}</strong></p>
            `;
            
            result.prizes.forEach(prize => {
                html += `
                    <div class="result-prize">
                        <span class="prize-badge">${prize.name}</span>
                        <span class="prize-amount">${formatCurrency(prize.amount)}</span>
                    </div>
                `;
            });
            
            if (result.prizes.length > 1) {
                html += `
                    <div class="result-total">
                        <strong>Total: ${formatCurrency(result.totalAmount)}</strong>
                    </div>
                `;
            }
        } else {
            containerClass += ' no-prize';
            html += `
                <h3 class="result-title">Sin premio</h3>
                <p class="result-number">Número: <strong>${numero}</strong></p>
                <p class="result-detail">Este número no ha sido premiado${result.isDemo ? ' (en el modo demo)' : ''}.</p>
            `;
        }
        
        elements.resultContainer.className = containerClass;
        elements.resultContainer.innerHTML = html;
        
        // Scroll to result
        elements.resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /**
     * Show an error message
     * @param {string} message - Error message to display
     */
    function showError(message) {
        elements.resultContainer.hidden = false;
        elements.resultContainer.className = 'result-container';
        elements.resultContainer.innerHTML = `
            <p class="result-error">${message}</p>
        `;
    }

    // ==========================================================================
    // Split Calculator
    // ==========================================================================

    /**
     * Initialize the split calculator
     */
    function initSplitCalculator() {
        // Handle prize selection change
        elements.prizeSelect.addEventListener('change', handlePrizeSelectChange);
        
        // Handle form submission
        elements.splitForm.addEventListener('submit', handleSplitCalculation);
    }

    /**
     * Handle prize selection change
     * @param {Event} e - Change event
     */
    function handlePrizeSelectChange(e) {
        const isCustom = e.target.value === 'custom';
        elements.customPrizeField.hidden = !isCustom;
        if (isCustom) {
            elements.customPrize.focus();
        }
    }

    /**
     * Handle split calculation form submission
     * @param {Event} e - Submit event
     */
    function handleSplitCalculation(e) {
        e.preventDefault();
        
        const decimoPrice = parseFloat(elements.decimoPrice.value) || 20;
        const numParticipants = parseInt(elements.numParticipants.value, 10) || 1;
        
        let prizeAmount;
        if (elements.prizeSelect.value === 'custom') {
            prizeAmount = parseFloat(elements.customPrize.value) || 0;
        } else {
            prizeAmount = parseFloat(elements.prizeSelect.value);
        }
        
        if (numParticipants < 1) {
            showSplitError('El número de participantes debe ser al menos 1');
            return;
        }
        
        if (prizeAmount < 0) {
            showSplitError('El premio debe ser un valor positivo');
            return;
        }
        
        const result = calculateSplit(decimoPrice, numParticipants, prizeAmount);
        displaySplitResult(result);
    }

    /**
     * Calculate the split of a prize
     * @param {number} decimoPrice - Price of the décimo
     * @param {number} numParticipants - Number of participants
     * @param {number} prizeAmount - Total prize amount
     * @returns {Object} Split calculation result
     */
    function calculateSplit(decimoPrice, numParticipants, prizeAmount) {
        const contributionPerPerson = decimoPrice / numParticipants;
        const prizePerPerson = prizeAmount / numParticipants;
        const netProfitPerPerson = prizePerPerson - contributionPerPerson;
        
        // Calculate tax (20% on amounts over 40,000€)
        const taxFreeThreshold = 40000;
        let taxPerPerson = 0;
        
        if (prizePerPerson > taxFreeThreshold) {
            const taxableAmount = prizePerPerson - taxFreeThreshold;
            taxPerPerson = taxableAmount * 0.20;
        }
        
        const netAfterTaxPerPerson = prizePerPerson - taxPerPerson - contributionPerPerson;
        
        return {
            decimoPrice,
            numParticipants,
            prizeAmount,
            contributionPerPerson,
            prizePerPerson,
            netProfitPerPerson,
            taxPerPerson,
            netAfterTaxPerPerson
        };
    }

    /**
     * Display the split calculation result
     * @param {Object} result - Split calculation result
     */
    function displaySplitResult(result) {
        elements.splitResult.hidden = false;
        
        const html = `
            <div class="split-result-header">
                <h3>Reparto calculado</h3>
                <p>${result.numParticipants} participante${result.numParticipants > 1 ? 's' : ''}</p>
            </div>
            
            <div class="split-result-grid">
                <div class="split-stat">
                    <div class="split-stat-value">${formatCurrency(result.contributionPerPerson)}</div>
                    <div class="split-stat-label">Aportación</div>
                </div>
                <div class="split-stat">
                    <div class="split-stat-value">${formatCurrency(result.prizePerPerson)}</div>
                    <div class="split-stat-label">Premio bruto</div>
                </div>
                <div class="split-stat">
                    <div class="split-stat-value">${formatCurrency(result.taxPerPerson)}</div>
                    <div class="split-stat-label">Impuestos*</div>
                </div>
                <div class="split-stat">
                    <div class="split-stat-value">${formatCurrency(result.netAfterTaxPerPerson)}</div>
                    <div class="split-stat-label">Beneficio neto</div>
                </div>
            </div>
            
            <div class="split-highlight">
                <div class="split-highlight-amount">${formatCurrency(result.netAfterTaxPerPerson)}</div>
                <div class="split-highlight-label">Cada participante recibiría (neto)</div>
            </div>
            
            <p class="split-note">
                * Impuestos: 20% sobre la cantidad que exceda 40.000€ por persona.
                ${result.prizePerPerson <= 40000 ? 'En este caso, el premio está exento de impuestos.' : ''}
            </p>
        `;
        
        elements.splitResult.innerHTML = html;
        
        // Scroll to result
        elements.splitResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /**
     * Show an error in the split calculator
     * @param {string} message - Error message
     */
    function showSplitError(message) {
        elements.splitResult.hidden = false;
        elements.splitResult.innerHTML = `<p class="split-error">${message}</p>`;
    }

    // ==========================================================================
    // Utilities
    // ==========================================================================

    /**
     * Format a number as currency (euros)
     * @param {number} amount - Amount to format
     * @returns {string} Formatted currency string
     */
    function formatCurrency(amount) {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(amount);
    }

    // ==========================================================================
    // Initialization
    // ==========================================================================

    /**
     * Initialize the application
     */
    function init() {
        initChecker();
        initSplitCalculator();
        
        // Add smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
