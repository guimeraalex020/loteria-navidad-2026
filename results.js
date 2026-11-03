/**
 * Lotería de Navidad 2026 - Results Configuration
 * 
 * This file contains the results data structure and configuration.
 * 
 * =============================================================================
 * TODO: PLUGGING IN OFFICIAL RESULTS ON DRAW DAY (22 December 2026)
 * =============================================================================
 * 
 * 1. Set DRAW_COMPLETED to true
 * 2. Fill in the RESULTS object with official winning numbers:
 *    - gordo: The 5-digit winning number for El Gordo (1st prize)
 *    - segundo: The 5-digit winning number for 2nd prize
 *    - tercero: The 5-digit winning number for 3rd prize
 *    - cuartos: Array of two 5-digit numbers for 4th prizes
 *    - quintos: Array of eight 5-digit numbers for 5th prizes
 *    - pedrea: Array of 1,794 5-digit numbers (can be loaded from external JSON)
 * 
 * 3. Optionally, load results from an external API:
 *    - Uncomment the fetchOfficialResults() function
 *    - Point RESULTS_API_URL to official results JSON endpoint
 * 
 * OFFICIAL RESULTS SOURCES:
 * - Loterías y Apuestas del Estado: https://www.loteriasyapuestas.es
 * - RTVE Sorteo en directo: https://www.rtve.es/loteria-navidad/
 * 
 * EXTERNAL JSON FORMAT EXPECTED:
 * {
 *   "gordo": "12345",
 *   "segundo": "23456",
 *   "tercero": "34567",
 *   "cuartos": ["45678", "56789"],
 *   "quintos": ["67890", "78901", ...],
 *   "pedrea": ["00001", "00023", ...]
 * }
 * =============================================================================
 */

const LoteriaConfig = {
    // Set to true once the draw has been completed and results are official
    DRAW_COMPLETED: false,
    
    // Draw date for reference
    DRAW_DATE: '2026-12-22',
    
    // Optional: URL to fetch official results JSON
    // TODO: Uncomment and set this URL when official results API is available
    // RESULTS_API_URL: 'https://example.com/api/loteria-navidad-2026.json',
    
    // Official results - fill these in on draw day
    RESULTS: {
        // El Gordo (1st Prize) - 400,000€ per décimo
        gordo: null,  // TODO: Set to winning 5-digit string, e.g., "12345"
        
        // 2nd Prize - 125,000€ per décimo
        segundo: null,  // TODO: Set to winning 5-digit string
        
        // 3rd Prize - 50,000€ per décimo
        tercero: null,  // TODO: Set to winning 5-digit string
        
        // 4th Prizes (2 numbers) - 20,000€ per décimo each
        cuartos: [],  // TODO: Set to array of two 5-digit strings
        
        // 5th Prizes (8 numbers) - 6,000€ per décimo each
        quintos: [],  // TODO: Set to array of eight 5-digit strings
        
        // Pedrea (1,794 numbers) - 1,000€ per décimo each
        // Can be loaded from external file due to size
        pedrea: []  // TODO: Set to array of 5-digit strings
    },
    
    // Prize amounts in euros (per décimo)
    PRIZE_AMOUNTS: {
        gordo: 400000,
        segundo: 125000,
        tercero: 50000,
        cuarto: 20000,
        quinto: 6000,
        pedrea: 1000,
        aproximacionGordo: 20000,
        aproximacionSegundo: 12500,
        centena: 1000,
        dosUltimasCifrasGordo: 1000,
        reintegro: 20
    },
    
    // Demo mode results - used before draw day for testing UI
    DEMO_RESULTS: {
        gordo: '12345',
        segundo: '67890',
        tercero: '11111',
        cuartos: ['22222', '33333'],
        quintos: ['44444', '55555', '66666', '77777', '88888', '99999', '00000', '10101'],
        pedrea: ['12121', '23232', '34343', '45454', '56565', '78787', '89898', '90909']
    }
};

/**
 * TODO: Uncomment this function to fetch results from an external API
 * 
 * async function fetchOfficialResults() {
 *     if (!LoteriaConfig.RESULTS_API_URL) {
 *         console.warn('No results API URL configured');
 *         return false;
 *     }
 *     
 *     try {
 *         const response = await fetch(LoteriaConfig.RESULTS_API_URL);
 *         if (!response.ok) throw new Error('Failed to fetch results');
 *         
 *         const data = await response.json();
 *         
 *         // Validate and assign results
 *         if (data.gordo) LoteriaConfig.RESULTS.gordo = data.gordo;
 *         if (data.segundo) LoteriaConfig.RESULTS.segundo = data.segundo;
 *         if (data.tercero) LoteriaConfig.RESULTS.tercero = data.tercero;
 *         if (Array.isArray(data.cuartos)) LoteriaConfig.RESULTS.cuartos = data.cuartos;
 *         if (Array.isArray(data.quintos)) LoteriaConfig.RESULTS.quintos = data.quintos;
 *         if (Array.isArray(data.pedrea)) LoteriaConfig.RESULTS.pedrea = data.pedrea;
 *         
 *         LoteriaConfig.DRAW_COMPLETED = true;
 *         return true;
 *     } catch (error) {
 *         console.error('Error fetching official results:', error);
 *         return false;
 *     }
 * }
 */

/**
 * Get the appropriate results object based on draw status
 * @returns {Object} Results object (official or demo)
 */
function getResults() {
    if (LoteriaConfig.DRAW_COMPLETED && LoteriaConfig.RESULTS.gordo) {
        return LoteriaConfig.RESULTS;
    }
    return LoteriaConfig.DEMO_RESULTS;
}

/**
 * Check if the draw has been completed
 * @returns {boolean}
 */
function isDrawCompleted() {
    return LoteriaConfig.DRAW_COMPLETED && LoteriaConfig.RESULTS.gordo !== null;
}

/**
 * Get prize amount for a specific prize type
 * @param {string} prizeType - Type of prize
 * @returns {number} Prize amount in euros
 */
function getPrizeAmount(prizeType) {
    return LoteriaConfig.PRIZE_AMOUNTS[prizeType] || 0;
}

// Export for use in app.js
window.LoteriaConfig = LoteriaConfig;
window.getResults = getResults;
window.isDrawCompleted = isDrawCompleted;
window.getPrizeAmount = getPrizeAmount;
