const elementToJSON = (data) => { // element.children
  const text = data[0].outerText;
  const times = [...data]
  .filter((_, idx) => idx > 0)
  .map((el, idx) => el.textContent)

  return { text, times }
}

const projectsToJSON = (data) => {
  return data
  .map(el => ({id: el.value, text: el.text}))
  .filter(el => el.id)
}

const workingTimeToJSON = (data) => {
  return data
  .filter((_, idx) => idx < data.length -1)
  .map(({ children }) => elementToJSON(children))
}

const getData = (cb) => {
  // Get table dom
  const $form = document.querySelectorAll('form table')[1];
  // Get all tr in table dom
  const $formItem = $form.querySelectorAll(':scope > tbody > tr');
  // get time working form
  const currentList = [...$formItem].splice(2, $formItem.length - 4);
  // get project form DOM
  const lastItemCurrentList = currentList[currentList.length - 1]
  // get project list DOM
  const $list = lastItemCurrentList.querySelectorAll('select option');
  // get project list as JSON
  const products = projectsToJSON([...$list])
  // get working time as JSON
  const workingTime = workingTimeToJSON(currentList);

  cb({
    products, workingTime
  })
}

getData((data) => {
  chrome.runtime.sendMessage({ type: '_DATA_', data });
})

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if(request.type === "GET_DATA") {
    console.log({ request, _, sendResponse })
    getData(sendResponse)
  }
});

