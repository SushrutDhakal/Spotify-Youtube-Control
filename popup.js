let switch_track = document.getElementById('switch-track');
let checkbox = document.getElementById('switch');
let hotkey = document.getElementById('hotkey');
let settingsButton = document.getElementById('settingsButton')
let closeButton = document.getElementById('closeButton');
let homePage = document.getElementById('home-page')
let settingsPage = document.getElementById('settings-page')

chrome.storage.local.get('active', (result) => {
   checkbox.checked = result.active;
   switch_track_background()
});

checkbox.onchange = function (e) {
   //background.js connection
   console.log(e.target.checked)
   chrome.storage.local.set({ active: e.target.checked });
   switch_track_background()

}
chrome.storage.local.get('hotkey', (result) => {//take hotkey enter
   if (result.hotkey) {
      hotkey.innerHTML = result.hotkey;
   }
})

hotkey.onkeydown = function (e) {//store hotkey
   hotkey.innerHTML = e.code
   chrome.storage.local.set({ hotkey: e.code });
}

settingsButton.onclick = function () {//show settings
   homePage.style.display = 'none';
   settingsPage.style.display = 'unset';
}
closeButton.onclick = function () {//close settings
   homePage.style.display = 'unset';
   settingsPage.style.display = 'none';
}

window.addEventListener("keydown", async (e) => {
   if (e.code == (await chrome.storage.local.get('hotkey')).hotkey) {
      //background.js connection
      chrome.runtime.sendMessage({ type: "toggle" })
      checkbox.checked = !checkbox.checked
   }
})

function switch_track_background() {
   if (checkbox.checked) {
      switch_track.style.backgroundColor = '#4ed164';
   } else {
      switch_track.style.backgroundColor = '#919191';
   }
}