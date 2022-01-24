import {Component} from 'react'

import './index.css'

const initialState = {
  started: false,
  secondsElapsed: 0,
  timerLimit: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecrement = () => {
    const {timerLimit} = this.state

    if (timerLimit > 0) {
      this.setState(prevState => ({timerLimit: prevState.timerLimit - 1}))
    }
  }

  onIncrement = () => {
    this.setState(prevState => ({timerLimit: prevState.timerLimit + 1}))
  }

  onReset = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimit, secondsElapsed} = this.state
    const isTimerCompleted = secondsElapsed === timerLimit * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({started: false})
    } else {
      this.setState(prevState => ({
        secondsElapsed: prevState.secondsElapsed + 1,
      }))
    }
  }

  onStart = () => {
    const {timerLimit, secondsElapsed, started} = this.state
    const isTimerCompleted = secondsElapsed === timerLimit * 60

    if (isTimerCompleted) {
      this.setState({secondsElapsed: 0})
    }
    if (started) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }

    this.setState(prevState => ({started: !prevState.started}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimit, secondsElapsed} = this.state
    const totalRemainingSeconds = timerLimit * 60 - secondsElapsed
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {started, timerLimit, secondsElapsed} = this.state
    const buttonDisabled = secondsElapsed > 0

    return (
      <div className="app-container">
        <div className="card-container">
          <h1 className="main-heading">Digital Timer</h1>
          <div className="timer-container">
            <div className="time-container">
              <div className="time-display-container">
                <h1 className="time-display">
                  {this.getElapsedSecondsInTimeFormat()}
                </h1>
                <p className="timer-status">{started ? 'Running' : 'Paused'}</p>
              </div>
            </div>
            <div className="operations-container">
              <div className="pause-start-container">
                <div className="operations">
                  <button
                    type="button"
                    className="operation-buttons"
                    onClick={this.onStart}
                  >
                    <img
                      src={
                        started
                          ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                          : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                      }
                      alt={started ? 'pause icon' : 'play icon'}
                      className="operation-icon"
                    />
                    <p className="operation-title">
                      {started ? 'Pause' : 'Start'}
                    </p>
                  </button>
                </div>
                <div className="operations">
                  <button
                    type="button"
                    className="operation-buttons"
                    onClick={this.onReset}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      alt="reset icon"
                      className="operation-icon"
                    />
                  </button>

                  <p className="operation-title">Reset</p>
                </div>
              </div>
              <p className="set-timer-heading">Set Timer limit</p>
              <div className="limit-setter-container">
                <button
                  className="time-setter-button"
                  type="button"
                  onClick={this.onDecrement}
                  disabled={buttonDisabled}
                >
                  -
                </button>
                <p className="time-set">{timerLimit}</p>
                <button
                  className="time-setter-button"
                  type="button"
                  onClick={this.onIncrement}
                  disabled={buttonDisabled}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
