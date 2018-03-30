chrome.runtime.sendMessage({ type: "_GET_DATA_" }, function(response) {
  console.log(response);
});
