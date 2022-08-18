//SPOTIFY CONNECTION
let button = null;
const selector = "button[aria-label=Play],button[aria-label=Pause]"

const sleep = (ms) => {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
};

window.onload = async function () {
    window.addEventListener("keydown", async (e) => {
        if (e.code == (await chrome.storage.local.get('hotkey')).hotkey) {
            //background.js connection
            chrome.runtime.sendMessage({ type: "toggle" })
        }
    })
    do {
        await sleep(2000)
        button = document.querySelector(selector)
    } while (button == null);

    button.addEventListener("click", function () {
        //background.js connection
        if (button.ariaLabel == "Play") {
            chrome.runtime.sendMessage("Pause")
        } else if (button.ariaLabel == "Pause") {
            chrome.runtime.sendMessage("Play")
        }
    })
}

//connect to background.js to either stop or resume music
chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {
        if (message == button.ariaLabel) {
            button.click()
        }
    },
)