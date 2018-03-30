let store = {}

window.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    tabs => {
      chrome.runtime.sendMessage(
        { type: "GET_DATA" },
        response => {
          store['__DATA__'] = response;
          console.log(store)
          pushNotif()
        });
    }
  );
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.type === "_NOTIF_") {
    sendResponse((data) => {
      console.log(data);
      pushNotif()
    })
  }
});

function pushNotif() {
  const opt = {
      type: "basic",
      title: "Project1",
      message: "This is my first extension.",
      iconUrl: "../assets/icon-on.png"
  };
  console.log(opt)
  chrome.notifications.create('okbb', opt);
}

