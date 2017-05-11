var React = require('react');
var Clock = require('Clock');
var ControlsTimer = require('ControlsTimer');

var Timer = React.createClass({
    getInitialState: function(){
      return {
        count: 0,
        timerStatus: 'stopped'
      };
    },
    componentDidUpdate: function(prevProps, prevState) {
      if (this.state.timerStatus != prevState.timerStatus){
        switch (this.state.timerStatus) {
          case 'started':
            this.startTimer();
            break;
          case 'cleared':
            this.setState({count: 0});
          case 'stopped':
            clearInterval(this.timer);
            this.timer = undefined;
            break;
        }
      }
    },
    componentWillUnmount: function () {
      clearInterval(this.timer);
      this.timer = undefined;
    },
    startTimer: function() {
      this.timer = setInterval( () => {
        var newCount = this.state.count + 1;
        this.setState({
          count: newCount
        });
      }, 1000);
    },
    handleStatusChange: function(newStatus){
      this.setState({
        timerStatus: newStatus
      });
    },
    render: function() {
      var {count, timerStatus} = this.state;

      var renderControlArea = () => {
        return <ControlsTimer timerStatus={timerStatus}  onStatusChange={this.handleStatusChange}/>
      };
      return (
        <div>
          <Clock totalSeconds={count}/>
          {renderControlArea()}
        </div>
      );
    }
});

module.exports = Timer;
