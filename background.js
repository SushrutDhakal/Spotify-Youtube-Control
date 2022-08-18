const URLS = ["*://*.youtube.com/*", "*://*.spotify.com/*"]
// get message from content script
let active;

chrome.runtime.onMessage.addListener(
    async (message, sender, sendResponse) => {

        active = (await chrome.storage.local.get('active')).active

        if (message.type == "toggle") {
            active = !active
            await chrome.storage.local.set({ active, active })
        }
        if (!active) return
        //check if active or not
        chrome.tabs.query({ url: URLS }, function (tabs) {
            for (let tab of tabs) {
                if (tab.id == sender.tab.id) continue
                chrome.tabs.sendMessage(tab.id, message);
            }
        });
    }
)