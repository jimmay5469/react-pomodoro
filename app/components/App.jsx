var React = require('react');
var ReactDOM = require('react-dom');
var Timer = require('./Timer.jsx');

var App = React.createClass({
  timerFinished() {
    alert('Timer finished!');
  },
  render() {
    return (
      <div>
        <Timer minutes={1} onComplete={this.timerFinished} />
        <Timer minutes={25} onComplete={this.timerFinished} />
        <Timer minutes={5} onComplete={this.timerFinished} />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
