(function() {
  const chatInput = document.getElementById('chat-input');
  const chatSubmit = document.getElementById('chat-submit');
  const chatMessages = document.getElementById('chat-messages');
  const closePopup = document.getElementById('close-popup');
  const defaultPrompts = document.getElementById('default-prompts');

  const sendMessage = (message) => {
    const messageElement = document.createElement('div');
    messageElement.className = 'flex justify-end mb-3 chat-message';
    messageElement.innerHTML = `<div class="bg-blue-500 text-white rounded-lg py-2 px-4 max-w-[70%]">${message}</div>`;
    chatMessages.appendChild(messageElement);
    messageElement.offsetHeight; // Trigger reflow for animation
    messageElement.classList.add('show');
    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatInput.value = '';
  };

  const receiveReply = (message) => {
    const replyElement = document.createElement('div');
    replyElement.className = 'flex mb-3 chat-message';
    replyElement.innerHTML = `<div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%]">${message}</div>`;
    chatMessages.appendChild(replyElement);
    replyElement.offsetHeight; // Trigger reflow for animation
    replyElement.classList.add('show');
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const onUserRequest = (message) => {
    console.log('User request:', message);
    sendMessage(message);
    setTimeout(() => receiveReply('Thank you for your question. Our team will get back to you shortly with a detailed response.'), 1000);
  };

  chatSubmit.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) onUserRequest(message);
  });

  chatInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') chatSubmit.click();
  });

  closePopup.addEventListener('click', () => {
    window.parent.postMessage('close-chat', '*');
  });

  defaultPrompts.addEventListener('click', (event) => {
    if (event.target.classList.contains('prompt-box')) {
      onUserRequest(event.target.textContent);
    }
  });
})();