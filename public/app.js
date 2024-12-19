// URL for the Netlify function
const functionBaseUrl = '/.netlify/functions/inviteCode';

// Select DOM elements
const generateBtn = document.getElementById('generate-btn');
const inviteCodeDisplay = document.getElementById('invite-code');
const checkBtn = document.getElementById('check-btn');
const codeInput = document.getElementById('code-input');
const checkResultDisplay = document.getElementById('check-result');

// Generate Invite Code
generateBtn.addEventListener('click', async () => {
    try {
        const response = await fetch(functionBaseUrl, { method: 'POST' });
        const data = await response.json();
        inviteCodeDisplay.textContent = `Generated Code: ${data.inviteCode}`;
    } catch (error) {
        console.error('Error generating invite code:', error);
    }
});

// Check Invite Code
checkBtn.addEventListener('click', async () => {
    const code = codeInput.value;
    if (!code) {
        checkResultDisplay.textContent = 'Please enter a code.';
        return;
    }

    try {
        const response = await fetch(`${functionBaseUrl}?code=${code}`);
        const data = await response.json();
        checkResultDisplay.textContent = data.isValid
            ? 'Code is valid!'
            : 'Code is invalid.';
    } catch (error) {
        console.error('Error checking invite code:', error);
    }
});
