import React, { Component } from 'react';

class Timer extends Component {
    constructor(){
        super()
        this.state={
            date: new Date()
        }
    }

    updateTimer() {
        setInterval(() => {
            this.setState({date: new Date()})
        }, 1000);
    }
    render() {
        return(
            <div className="Timer">
                <h2 className='f1'>
                   Current Time : {this.state.date.toLocaleTimeString()}
                </h2>
                {this.updateTimer()}
            </div>
        )
    }
}

export default Timer;