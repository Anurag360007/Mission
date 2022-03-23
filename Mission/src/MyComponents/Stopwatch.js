import React, { Component } from 'react';

export default class Stopwatch extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState = {
            isRunning: false,
            lapTimes: [],
            timeElapsed: 0,
        };
    }
    toggle = () => {
        this.setState({ isRunning: !this.state.isRunning }, () => {
            this.state.isRunning ? this.startTimer() : clearInterval(this.timer)
        });
    }
    lap = () => {
        const { lapTimes, timeElapsed } = this.state;
        this.setState({ lapTimes: lapTimes.concat(timeElapsed) });
    }
    reset = () => {
        clearInterval(this.timer);
        this.setState(this.initialState);
    }
    startTimer () {
        this.startTime = Date.now();
        this.timer = setInterval(this.update, 10);
    }
    update = () => {
        const delta = Date.now() - this.startTime;
        this.setState({ timeElapsed: this.state.timeElapsed + delta });
        this.startTime = Date.now();
    }
    render() {
        const { isRunning, lapTimes, timeElapsed } = this.state;
        return (
            <div className='container my-3'>
                <h1>Stopwatch</h1>
                <TimeElapsed id="timer" timeElapsed={timeElapsed} />
                <button onClick={this.toggle}className="btn btn-sm btn-success" >
                    {isRunning ? false :'Start'}
                </button>
                <button onClick={this.toggle}className="btn btn-sm btn-danger" >
                {isRunning ? 'Stop' :false}
                </button>
                <button
                    onClick={isRunning ? this.lap : this.reset}
                    disabled={!isRunning && !timeElapsed}
                    className="btn btn-sm btn-primary">
                    {isRunning || !timeElapsed ? false : 'Reset'}
                </button>
                <button
                    onClick={isRunning ? this.lap : this.reset}
                    disabled={!isRunning && !timeElapsed}
                    className="btn btn-sm btn-secondary">
                    {isRunning || !timeElapsed ? 'Lap' : false}
                </button>
                {lapTimes.length > 0 && <LapTimes lapTimes={lapTimes} />}
            </div>
        );
    }
}

const TimeElapsed = (props) => {
    const getUnits = () => {
        const seconds = props.timeElapsed / 1000;
        return {
            min: Math.floor(seconds / 60).toString(),
            sec: Math.floor(seconds % 60).toString(),
            msec: (seconds % 1).toFixed(3).substring(2)
        };
    }
        const leftPad = (width, n) => {
            if ((n + '').length > width) {
                return n;
            }
            const padding = new Array(width).join('0');
            return (padding + n).slice(-width);
        };
        const units = getUnits();
        return (
            <div id={props.id}>
                <span>{leftPad(2, units.min)}:</span>
                <span>{leftPad(2, units.sec)}.</span>
                <span>{units.msec}</span>
            </div>
        );
}

const LapTimes = (props) => {
        const rows = props.lapTimes.map((lapTime, index) =>
            <tr key={++index}>
                <td>{index}</td>
                <td><TimeElapsed timeElapsed={lapTime} /></td>
            </tr>
        );
        return (
          <div className='container my-3'>
            <table id="lap-times">
                <thead>
                    <tr>
                        <th>Lap</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
            </div>
        );
}