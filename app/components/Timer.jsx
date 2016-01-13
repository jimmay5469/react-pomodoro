var React = require('react');
var moment = require('moment');
require('moment-duration-format');

module.exports = React.createClass({
  propTypes: {
    minutes: React.PropTypes.number.isRequired,
    onComplete: React.PropTypes.func
  },
  getInitialState() {
    return {
      start: null,
      timeRemainingDisplay: moment.duration(this.props.minutes, 'm').format('mm:ss', {trim: false})
    };
  },
  componentWillUnmount() {
    clearInterval(this.interval);
  },

  start() {
    this.setState({start: moment()});
    this.interval = setInterval(this.updateDuration, 50);
  },
  updateDuration() {
    if(this.state.start) {
      var timeElapsed = moment.duration(moment().diff(this.state.start));
      var timeRemaining = moment.duration(this.props.minutes, 'm').subtract(timeElapsed);
      if(timeRemaining <= 0) {
        this.ring();
      }
      else if(timeRemaining !== this.state.timeRemaining) {
        this.setState({timeRemainingDisplay: timeRemaining.format('mm:ss', {trim: false})});
      }
    }
  },
  ring() {
    clearInterval(this.interval);
    this.setState(this.getInitialState());
    if(this.props.onComplete) {
      this.props.onComplete();
    }
  },

  render() {
    return (
      <button onClick={this.start} disabled={this.state.start}>{this.state.timeRemainingDisplay}</button>
    );
  }
});
