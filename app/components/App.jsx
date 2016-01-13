var React = require('react');
var ReactDOM = require('react-dom');
var Timer = require('./Timer.jsx');

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

    return (
      <div>
        {timers.map((timer)=> (
          <Timer
            key={timer.type}
            minutes={timer.duration}
            onStart={this.timerStarted.bind(this, timer)}
            onComplete={this.timerFinished} />
        ))}
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
