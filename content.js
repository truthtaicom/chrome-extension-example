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

  $form.classList.add('table', 'table-hover')

  // Get all tr in table dom
  const $formItem = $form.querySelectorAll(':scope > tbody > tr');
  // get time working form
  const currentList = [...$formItem].splice(2, $formItem.length - 4);

  // get project form DOM
  const lastItemCurrentList = currentList[currentList.length - 1]
  // get project list DOM
  const $list = lastItemCurrentList.querySelectorAll('select option');

  /* CUSTOM */
  // `selectElement` is the element you want to wrap
  const selectElement = lastItemCurrentList.querySelector('select');
  const selectInputElement = lastItemCurrentList.querySelector('input')
  const parent = selectElement.parentNode;
  const wrapper = document.createElement('div');
  wrapper.classList.add("row")

  // set the wrapper as child (instead of the selectElement)
  parent.replaceChild(wrapper, selectElement);
  // set selectElement as child of wrapper
  wrapper.appendChild(selectElement);
  wrapper.appendChild(selectInputElement);


  /* Add color with total time */
  const totalRow = currentList[currentList.length - 2];
  const totalElement = totalRow.children[totalRow.children.length -1];
  const totalTime = parseInt(totalElement.textContent);

  if (totalTime < 40) {
    totalRow.classList.add("table-danger")
  } else {
    totalRow.classList.add("table-info")
  }

  selectElement.classList.add("form-control", "form-control-sm", "col-md-8");
  selectInputElement.classList.add("btn", "btn-primary", "btn-sm", "ml-md-3");

  // get project list as JSON
  const products = projectsToJSON([...$list])
  // get working time as JSON
  const workingTime = workingTimeToJSON(currentList);

  cb({
    products, workingTime
  })
}

getData((data) => {
  chrome.runtime.sendMessage({ type: '_SET_DATA_', data });
})