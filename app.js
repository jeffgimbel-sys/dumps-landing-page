// DUMPS LANDING PAGE CONTROLLER

// 1. STATE VARIABLES
let configState = {
    purchaseType: 'subscribe', // 'subscribe' or 'once'
    hasShaker: false           // boolean
};

// 2. PRICING SPECS
const PRICES = {
    subscribe: 29.74,
    once: 34.99,
    shaker: 12.00
};

// 3. DOM SELECTORS
const toggleSub = document.getElementById('toggle-sub');
const toggleOnce = document.getElementById('toggle-once');
const shakerAddon = document.getElementById('shaker-addon');

const summaryFreq = document.getElementById('summary-freq');
const shakerSummaryRow = document.getElementById('shaker-summary-row');
const summaryTotalPrice = document.getElementById('summary-total-price');
const checkoutBtn = document.getElementById('checkout-btn');

// 4. EVENT LISTENERS
toggleSub.addEventListener('click', () => setPurchaseType('subscribe'));
toggleOnce.addEventListener('click', () => setPurchaseType('once'));
shakerAddon.addEventListener('change', toggleShaker);
checkoutBtn.addEventListener('click', runCheckout);

// 5. UPDATE LOGIC
function setPurchaseType(type) {
    configState.purchaseType = type;
    
    if (type === 'subscribe') {
        toggleSub.classList.add('active');
        toggleOnce.classList.remove('active');
    } else {
        toggleOnce.classList.add('active');
        toggleSub.classList.remove('active');
    }
    
    updateBuyBox();
}

function toggleShaker() {
    configState.hasShaker = shakerAddon.checked;
    updateBuyBox();
}

function updateBuyBox() {
    // 1. Calculate price
    let basePrice = PRICES[configState.purchaseType];
    let addonPrice = configState.hasShaker ? PRICES.shaker : 0;
    let totalPrice = (basePrice + addonPrice).toFixed(2);
    
    // 2. Update summary panels
    if (configState.purchaseType === 'subscribe') {
        summaryFreq.textContent = "MONTHLY SUBSCRIPTION (SAVE 15%)";
    } else {
        summaryFreq.textContent = "ONE-TIME DEPOSIT";
    }
    
    if (configState.hasShaker) {
        shakerSummaryRow.style.display = 'flex';
    } else {
        shakerSummaryRow.style.display = 'none';
    }
    
    summaryTotalPrice.textContent = `$${totalPrice}`;
    
    // 3. Update checkout button text to reflect price
    checkoutBtn.textContent = `DEPLOY PAYLOAD ($${totalPrice})`;
}

function runCheckout() {
    let skuLabel = '60-Serving Dumps Daily Jar';
    let freqLabel = configState.purchaseType === 'subscribe' ? 'Monthly Subscription' : 'One-Time Order';
    let shakerLabel = configState.hasShaker ? ' + The Reactor Shaker' : '';
    
    alert(`MISSION CONTROL: Order compiled successfully!\n\nPayload: ${skuLabel}${shakerLabel}\nType: ${freqLabel}\nTotal Charge: ${summaryTotalPrice.textContent}\n\nRedirecting to secure gateway...`);
}

// Initialize on page load
updateBuyBox();
