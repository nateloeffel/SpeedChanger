document.getElementById('setSpeedBtn').addEventListener('click', () => {
  let speedInput = document.getElementById('speed');
  let speed = parseFloat(speedInput.value);
  if (isNaN(speed) || speed < 0.1 || speed > 10.0) {
    alert("Please enter a valid speed between 0.1 and 10.0");
    return;
  }

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        function: setVideoSpeed,
        args: [speed],
      },
      () => {
        // callback function
      }
    );
  });
});

function setVideoSpeed(speed) {
  console.log("SETTING VIDEO SPEED " + speed);
  let videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.playbackRate = speed;
  });
}
