console.log("content script runing")
const sleep = (ms) => {
   return new Promise((resolve, reject) => setTimeout(resolve, ms));
};

chrome.runtime.onMessage.addListener(//pause/play youtube video
   (message, sender, sendResponse) => {
      let video = document.getElementsByTagName("video")[0]
      console.log(video.paused, message)
      if (message == "Play" && video.paused) {
         video.play()

      } else if (message == "Pause" && !video.paused) {

         video.pause()
      }
   },
)

let video = null;
window.onload = async function () {//background.js connection
   window.addEventListener("keydown", async (e) => {
      if (e.code == (await chrome.storage.local.get('hotkey')).hotkey) {
         chrome.runtime.sendMessage({ type: "toggle" })
      }
   })
   do {
      await sleep(2000)
      video = document.getElementsByTagName("video")[0]
   } while (video == null);

   console.log(video)
   video.onplay = video.onpause = function (e) {
      chrome.runtime.sendMessage(video.paused ? "Play" : "Pause")
   }
}