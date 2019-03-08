import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import PropTypes from 'prop-types'
import Timer from './Timer'

export default class TimerContainer extends React.Component {
  state = {
    initialTimer: this.props.taskDuration,
    timeLeft: this.initializeTimer(),
    timerRunning: false,
  }

  componentDidMount() {
    this.timerID = setInterval(this.decrement, 1000)
    this.setState({
      timerRunning: false
    })
  }

  componentWillReceiveProps() {
    setTimeout(
      () => {this.setState({
        initialTimer: this.props.taskDuration,
        timeLeft: this.initializeTimer(),
      })},
      1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  initializeTimer() {
    let timer = this.props.taskDuration
    let timerEndTime = new Date(Date.now() + timer * 60000)
    let currentTime = new Date()
    return timerEndTime - currentTime
  }

  decrement = () => {
    if (this.state.timeLeft < 1000) {
      this.props.onTimerEnd()
      this.setState({
        initialTimer: this.props.taskDuration,
        timeLeft: this.initializeTimer(),
      })
    } else {
      this.setState(prevState => ({
        timeLeft: prevState.timeLeft - 1000
      }))
    }
  }

  onReset = () => {
    this.setState({
      initialTimer: this.props.taskDuration,
      timeLeft: this.initializeTimer(),
    })
  }

  onStart = () => {
    if (!this.state.timerRunning) {
      this.timerID = setInterval(this.decrement, 1000)
    }
    this.setState({
      timerRunning: true
    })
  }

  onStop = () => {
    clearInterval(this.timerID)
    this.setState({
      timerRunning: false
    })
  }

  render() {
    return (
      <View style={styles.container}>
        
        <Timer timeLeft={this.state.timeLeft}></Timer>
        <View style={styles.buttons}>
          <Button onPress={this.onStart} title='Start' />
          <Button onPress={this.onStop} title='Stop' />
          <Button onPress={this.onReset} title='Reset' />
        </View>
      </View>
    )
  }
}

TimerContainer.propTypes = {
  taskDuration: PropTypes.number.isRequired,
  onTimerEnd: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  buttons: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 250,
  },
  container: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: '#FFF',
    fontSize: 32,
  }
})