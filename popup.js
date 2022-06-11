// popup.js: only get access to content of popup.html
// Need to tell content script to get access to the open tab content via message passing
let message_div;

async function getActiveTabURL() {
  const tabs = await chrome.tabs.query({
      currentWindow: true,
      active: true
  });

  return tabs[0];
}

function setMessage(message){
  message_div.innerHTML = message;
}

async function setSpeed(speed){
  const activeTab = await getActiveTabURL();
  console.log(activeTab);
  // tell the content script to do sth & set the response handler
  chrome.tabs.sendMessage(activeTab.id, { speed }, (returned_message) => {
    setMessage(returned_message);
  });
}

$(document).ready(function() {
  message_div = $("#message");

  // Add click event handler to each default speed button
  $(".providedSpeed").each(function(){
    $(this).click(()=>{
      setSpeed($(this).attr("data-speed"));
    });
  });

  // let speed_buttons = document.getElementsByClassName("providedSpeed");
  // for (let button of speed_buttons) {
  //   let speed = button.getAttribute("data-speed");
  //   button.addEventListener("click", () => {
  //     setSpeed(speed);
  //   });
  // }

  // Add click event handler for the customized speed setting
  // document.getElementById("setCustomizeSpeed").addEventListener("click", () => {
  $("#setCustomizeSpeed").click(function(){
    var customized_speed_element = $("#customizedSpeed");
    var customized_speed = customized_speed_element.value;
    customized_speed_element.value = "";

    if (customized_speed == "") {
      message_div.innerHTML = "Error: Empty input.";
    } else {
      customized_speed = Number(customized_speed);
      if (isNaN(customized_speed)) {
        message_div.innerHTML = "Error: Not a number.";
      } else if (customized_speed < 0 || customized_speed > 10) {
        message_div.innerHTML = "Error: Exceed range.";
      } else {
        customized_speed = customized_speed.toFixed(1);
        setSpeed(customized_speed);
      }
    }
  });
});