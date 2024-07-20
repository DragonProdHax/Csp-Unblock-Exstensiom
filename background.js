let isEnabled = false;

chrome.action.onClicked.addListener((tab) => {
  isEnabled = !isEnabled;
  chrome.storage.local.set({ isEnabled });
  if (isEnabled) {
    chrome.webRequest.onHeadersReceived.addListener(
      removeCSPHeaders,
      { urls: ["<all_urls>"] },
      ["blocking", "responseHeaders"]
    );
  } else {
    chrome.webRequest.onHeadersReceived.removeListener(removeCSPHeaders);
  }
  chrome.action.setIcon({
    path: isEnabled ? "icons/icon128_enabled.png" : "icons/icon128.png",
    tabId: tab.id
  });
});

function removeCSPHeaders(details) {
  details.responseHeaders = details.responseHeaders.filter(header => header.name.toLowerCase() !== 'content-security-policy');
  return { responseHeaders: details.responseHeaders };
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.toggle) {
    isEnabled = !isEnabled;
    chrome.storage.local.set({ isEnabled });
    if (isEnabled) {
      chrome.webRequest.onHeadersReceived.addListener(
        removeCSPHeaders,
        { urls: ["<all_urls>"] },
        ["blocking", "responseHeaders"]
      );
    } else {
      chrome.webRequest.onHeadersReceived.removeListener(removeCSPHeaders);
    }
    chrome.action.setIcon({
      path: isEnabled ? "icons/icon128_enabled.png" : "icons/icon128.png"
    });
    sendResponse({ status: "toggled", isEnabled });
  }
});
