var React = require('react');
var ReactDOM = require('react-dom');
var Timer = require('./Timer.jsx');
var moment = require('moment');

const TimerTypes = {
  Pomodoro: 'Pomodoro',
  Break: 'Break',
};

var App = React.createClass({
  getInitialState() {
    return {
      timerStart: null,
      activeTimer: null,
      timers: [
        { type: 'Test', duration: 1 },
        { type: TimerTypes.Pomodoro, duration: 25 },
        { type: TimerTypes.Break, duration: 5 },
      ],
      history: []
    };
  },

  timerStarted(timer, startTime) {
    this.setState({activeTimer: timer, timerStart: startTime});
  },
  timerFinished() {
    var activeTimer = this.state.activeTimer;
    var history = this.state.history;
    history.push({
      type: activeTimer.type,
      startTime: this.state.timerStart,
      duration: activeTimer.duration
    });
    this.setState({activeTimer: null, history});
    alert(`${activeTimer.type} timer finished!`);
  },

  render() {
    var timers;
    if(this.state.activeTimer) {
      timers = [this.state.activeTimer];
    }
    else {
      timers = this.state.timers;
    }

    var header;
    if(this.state.activeTimer) {
      header = `${this.state.activeTimer.type} time!`;
    }
    else {
      header = 'Choose a timer:';
    }

    var history;
    if(this.state.history.length) {
      history = (
        <div>
          <h3>History</h3>
          <ul>
            {this.state.history.map((event)=> (
              <li key={event.startTime}>{moment(event.startTime).format('LT')} - started {event.duration} minute {event.type.toLowerCase()}</li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div>
        <h3>{header}</h3>
        <div>
          {timers.map((timer)=> (
            <Timer
              key={timer.type}
              minutes={timer.duration}
              onStart={this.timerStarted.bind(this, timer)}
              onComplete={this.timerFinished} />
          ))}
        </div>
        {history}
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
