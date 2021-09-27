let alertSuccess = document.getElementById('alert-container success');
let alertError = document.getElementById('alert-container error');
let alertMessage = document.getElementById('alert');

if (alertMessage) {
    console.log('alerts be gone')
    setTimeout(endAlerts, 5000)
    console.log('alerts are gone')
};

function endAlerts() {
    if(alertSuccess && alertSuccess.style?.display) {alertSuccess.style.display = 'none'};
    if(alertError && alertError.style?.display) {alertError.style.display = 'none'};
    if(alertMessage && alertMessage.style?.display) {alertMessage.style.display = 'none'};
};