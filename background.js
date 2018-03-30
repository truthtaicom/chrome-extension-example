// let enabled = false;

// function updateIcon() {
//   enabled = !enabled;
//   const iconPath = `/assets/icon-${enabled && 'on' || 'off'}.png`;
//   console.log(iconPath, 'iconPath')
//   chrome.browserAction.setIcon({
//     path: {
//       16: iconPath,
//       32: iconPath
//     }
//   });
// }

// function getBadget() {
//   chrome.browserAction.setBadgeText({ text: "10+" });
// }

chrome.runtime.onMessage.addListener((msg, sender) => {
  // // First, validate the message's structure
  // if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
  //   // Enable the page-action for the requesting tab
  //   chrome.pageAction.show(sender.tab.id);
  // }
});