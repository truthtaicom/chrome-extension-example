import { h, app } from 'hyperapp';
import get from 'lodash.get';

let state = {
  _DATA_: null
};

const getData = () => new Promise((resolve) => {
  chrome.runtime.sendMessage({ type: "_GET_DATA_" }, function(response) {
    resolve(response)
  })
});

const actions = {
  getData: () => async (state, actions) => actions.updateData(await getData()),
  updateData: ({ _DATA_ }) => state => ({ _DATA_ })
};

const view = (state, actions) => {
  const workingTime = get(state, '_DATA_.workingTime', []);

  console.log({ state })

  return (
    <div oncreate={actions.getData}>
      <table class="table table-hover">
        <thead>
          <tr>
            {
              ["#", "Project", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Total"]
              .map(item => <th scope="col">{item}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            workingTime.map((item, idx) => (
              <tr>
                <th scope="row">{idx + 1}</th>
                <td>{item.text}</td>
                {
                  item.times.map(time => <td>{time}</td>)
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export const main = app(state, actions, view, document.body);
