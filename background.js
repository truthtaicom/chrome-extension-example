let store = {}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.type === "_DATA_") {
    store['_DATA_'] = request.data;
    pushNotif(store['_DATA_'])
  }

  if(request.type === "GET_DATA") {
    sendResponse(store['_DATA_'])
  }
});

function pushNotif(data) {
  chrome.runtime.sendMessage(
    { type: "_NOTIF_" },
    response => (data))
}