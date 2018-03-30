let store = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case "_SET_DATA_":
      store["_DATA_"] = message.data;
      break;
    case "_GET_DATA_":
      sendResponse(store);
      break;
    default:
      console.error("Unrecognized message: ", message);
  }
});
