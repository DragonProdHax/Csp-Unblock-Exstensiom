document.getElementById('toggle-button').addEventListener('click', () => {
    chrome.runtime.sendMessage({ toggle: true }, (response) => {
      console.log(response.status, response.isEnabled);
    });
  });
  