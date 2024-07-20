document.getElementById('toggle-button').addEventListener('click', () => {
    chrome.runtime.sendMessage({ toggle: true });
  });
  