// content script: the one who get access to the open tab content

// listen to any incoming message
chrome.runtime.onMessage.addListener((obj, sender, response) => {
  let videos = $("video");
  // let videos = document.getElementsByTagName("video");
  if (videos == null) {
    // send response to the script which send this message
    response("ERROR: No video tag in this page.");
    return;
  }

  if (videos.length == 1) {
    videos[0].playbackRate = obj.speed;
    response("Set speed: " + obj.speed + "x");
  } else {
    response("ERROR: Not single video elements (count: " + videos.length + ")");
  }
});
