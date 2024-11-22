// src/background/index.ts

chrome.runtime.onInstalled.addListener(() => {
  // Add context menu for reading selected text
  chrome.contextMenus.create({
    id: 'readAloud',
    title: 'Read Aloud with Edge TTS',
    contexts: ['selection'],
  });

  // Add context menu for reading the entire page
  chrome.contextMenus.create({
    id: 'readPage',
    title: 'Read Page Aloud with Edge TTS',
    contexts: ['page'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'readAloud' && info.selectionText && tab?.id !== undefined) {
    // Handle reading selected text
    chrome.tabs.sendMessage(tab.id, {
      action: 'readText',
      text: info.selectionText,
    });
  } else if (info.menuItemId === 'readPage' && tab?.id !== undefined) {
    // Handle reading the entire page
    chrome.tabs.sendMessage(tab.id, {
      action: 'readPage',
    });
  }
});