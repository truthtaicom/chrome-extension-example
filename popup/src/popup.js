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
  updateData: ({ _DATA_ }) => state => ({ _DATA_ }),
  openLogWorkPage: (url) => () => {
    // console.log(url);
    // chrome.tabs.create({ url: 'https://google.com.vn' })
  },
  selectTime: ([selectedId, selectedDate] = []) => state => ({ selectedId, selectedDate })
};

const LogTimePanel = ({ id, date }) => (
  <iframe
    style={
      {
        "width": "200px",
        "height": "120px",
        "border": "none"
      }
    }
    src={`https://f6wf.com/resource/timesheets/sethours.jsp?resourcegroup=${id}&day=${date}`}>
  </iframe>
)

window.reload = () => "OK"

const view = (state, actions) => {
  const workingTime = get(state, '_DATA_.workingTime', []);

  console.log({ state })

  if (state.selectedId) {
    return <LogTimePanel
      id={state.selectedId}
      date={state.selectedDate}
    />
  }

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
                  item.times.map(time => <td onclick={() => actions.selectTime(time.link)}>{time.value}</td>)
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
