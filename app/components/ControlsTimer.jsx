var React = require('react');

var ControlsTimer = React.createClass({
  propTypes: {
    timerStatus: React.PropTypes.string.isRequired,
  },
  onStatusChange: function(newStatus){
    return () => {
      this.props.onStatusChange(newStatus);
    }
  },
  render: function() {
    var {timerStatus} = this.props;

    var RenderStartPauseButton = () => {
      if (timerStatus === 'stopped' || timerStatus === 'cleared') {
        return(<button className="button primary" onClick={this.onStatusChange('started')}>Start</button>);
      } else if (timerStatus === 'started') {
        return(<button className="button secondary" onClick={this.onStatusChange('stopped')}>Stop</button>);
      }
    };

    return(
      <div className="controls">
        {RenderStartPauseButton()}
        <button className="button alert hollow" onClick={this.onStatusChange('cleared')}>Clear</button>
      </div>
    );
  }
});

module.exports = ControlsTimer;
