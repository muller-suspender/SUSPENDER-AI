const apiKey = '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';

async function sendMessage() {
  const inputField = document.getElementById('user-input');
  const message = inputField.value.trim();
  if (!message) return;

  appendMessage('You', message, 'user');
  inputField.value = '';
  appendMessage('Suspender AI', 'Typing...', 'bot');

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'No response.';
    updateLastBotMessage(reply);
  } catch (error) {
    updateLastBotMessage('❌ Error: Unable to connect to AI.');
  }
}

function appendMessage(sender, text, type) {
  const chatBox = document.getElementById('chat-box');
  const msg = document.createElement('div');
  msg.className = `message ${type}`;
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function updateLastBotMessage(text) {
  const messages = document.querySelectorAll('.bot');
  const last = messages[messages.length - 1];
  if (last) last.innerHTML = `<strong>Suspender AI:</strong> ${text}`;
}

// Theme toggle
const toggleButton = document.getElementById('mode-toggle');
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');
  toggleButton.innerText = document.body.classList.contains('light-mode')
    ? 'Switch to Dark Mode'
    : 'Switch to Light Mode';
});