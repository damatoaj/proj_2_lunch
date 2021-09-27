let alertSuccess = document.getElementById('alert-container success');
let alertError = document.getElementById('alert-container error');
let alertMessage = document.getElementById('alert');

if (alertMessage) {
    
    setTimeout(endAlerts, 5000)
};

function endAlerts() {
    if(alertSuccess && alertSuccess.style) {alertSuccess.style.display = 'none'};
    if(alertError && alertError.style) {alertError.style.display = 'none'};
    if(alertMessage && alertMessage.style) {alertMessage.style.display = 'none'};
};