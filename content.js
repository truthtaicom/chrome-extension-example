// Inform the background page that
// this tab should have a page-action
// chrome.runtime.sendMessage({
//   from:    'content',
//   subject: 'showPageAction'
// });

const getData = () => {
  const $form = document.querySelectorAll('form table')[1];
  const $list = $form.querySelectorAll('select option')

  const productList = [...$list]
    .map(el => ({ id: el.value, text: el.text }))
    .filter(el => el.id)

  console.log($form)
  console.log(productList)
}

getData()

// // Listen for messages from the popup
// chrome.runtime.onMessage.addListener((msg, sender, response) => {
//   // First, validate the message's structure
//   if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
//     console.log(document, 'document')
//     // Collect the necessary data
//     // (For your specific requirements `document.querySelectorAll(...)`
//     //  should be equivalent to jquery's `$(...)`)
//     var domInfo = {
//       total:   document.querySelectorAll('*').length,
//       inputs:  document.querySelectorAll('input').length,
//       buttons: document.querySelectorAll('button').length
//     };

//     console.log({domInfo});

//     // Directly respond to the sender (popup),
//     // through the specified callback */
//     response(domInfo);
//   }
// });