(function() {
  let chatWidgetContainer, chatTopBar, chatLoader, chatIframe;
  let iframeLoaded = false;

  const createChatElements = () => {
    // Create chat widget container
    chatWidgetContainer = document.createElement('div');
    chatWidgetContainer.id = 'chat-widget-container';
    chatWidgetContainer.style.display = 'none';

    // Create chat top bar
    chatTopBar = document.createElement('div');
    chatTopBar.id = 'chat-top-bar';
    chatTopBar.className = 'fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-900 text-white p-2 flex justify-center items-center cursor-pointer z-50';
    chatTopBar.innerHTML = '<span class="text-sm font-semibold">Chat with AI</span>';

    // Create chat loader
    chatLoader = document.createElement('div');
    chatLoader.id = 'chat-loader';
    chatLoader.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
    chatLoader.style.display = 'none';
    chatLoader.innerHTML = '<div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>';

    // Create chat iframe
    chatIframe = document.createElement('iframe');
    chatIframe.id = 'chat-iframe';
    chatIframe.className = 'fixed top-0 left-0 w-full h-0 border-none transition-all duration-700 ease-in-out';
    chatIframe.src = 'about:blank';

    // Append elements to container
    chatWidgetContainer.appendChild(chatTopBar);
    chatWidgetContainer.appendChild(chatLoader);
    chatWidgetContainer.appendChild(chatIframe);

    // Append container to body
    document.body.appendChild(chatWidgetContainer);
  };

  const showLoader = () => {
    chatLoader.style.display = 'block';
  };

  const hideLoader = () => {
    chatLoader.style.display = 'none';
  };

  const loadIframe = () => {
    if (!iframeLoaded) {
      showLoader();
      chatIframe.src = 'chat-iframe.html';
      chatIframe.onload = () => {
        iframeLoaded = true;
        hideLoader();
      };
    }
  };

  const toggleChat = () => {
    if (chatIframe.style.height === '100%') {
      chatIframe.style.height = '0';
    } else {
      loadIframe();
      chatIframe.style.height = '100%';
    }
  };

  const initChatWidget = () => {
    createChatElements();
    chatWidgetContainer.style.display = 'block';
    chatTopBar.addEventListener('click', toggleChat);
  };

  window.addEventListener('load', initChatWidget);

  window.addEventListener('message', (event) => {
    if (event.data === 'close-chat') {
      chatIframe.style.height = '0';
    }
  });
})();