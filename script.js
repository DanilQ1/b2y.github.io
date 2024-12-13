let lastBettingTime = 0; 
let tokenIndex = 0;

const tokens = [
    "demo",
    "demo",
    "demo" 
];

function getAuthorizationToken() {
    const token = tokens[tokenIndex];
    tokenIndex = (tokenIndex + 1) % tokens.length;
    return `Bearer ${token}`;
}


async function checkSignal() {
    const url = 'https://crash-gateway-cr.100hp.app/state?id_n=1play_luckyjet';
    const response = await fetch(url, {
        headers: {
            'Authorization': getAuthorizationToken()
        }
    });
    const data = await response.json();
    const state = data.current_state;


    let responseText = document.getElementById('responseText');
    if (!responseText) {
        console.error('Element with ID responseText not found.');
        return;
    }

    if (state === "betting" && Date.now() - lastBettingTime > 5000) {
        responseText.textContent = "WAITING";
        responseText.className = 'text betting';        
        lastBettingTime = Date.now();
    } else if (state === "ending") {
        responseText.textContent = "TAKE";
        responseText.className = 'text betting';
    } else if (state === "flying") {
        responseText.textContent = "WAITING";
        responseText.className = 'text betting';
    } 
}




let intervalId = setInterval(checkSignal, 100);
checkSignal();
