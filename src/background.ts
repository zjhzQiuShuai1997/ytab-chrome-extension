chrome.runtime.onInstalled.addListener(() => {
  const color = '#3aa757';
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
  chrome.storage.local.set({
    color
  });

  chrome.tabs.create({
    url: chrome.runtime.getURL('./pages.html')
  });
});
