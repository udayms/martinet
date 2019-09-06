import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { WebBrowser, Constants } from 'expo';
import moment from 'moment';
import data from '../data/db.json';

import { MonoText } from '../components/StyledText';

export default class OngoingActivity extends React.Component {

  static navigationOptions = {
    header: null
  };

  state = {
    isLoadingComplete: false
  };

  componentWillUnmount = () => {
    console.log('Will Unmount...');
  }

  componentWillMount = () => {
    console.log('Will Mount...');
  }

  componentDidMount = () => {
    console.log('Did Mount...');

    startTimer(5)
  }

  componentWillReceiveProps(nextProps) {
    console.log('Will Receive Props...');
  }

  render() {
    console.log('Render...');
    const { navigation } = this.props;
    const task = navigation.getParam('task', {});
    let activity = navigation.getParam('activity', {});

    processActivityTimers = (tasks) => {
      let checkPoints = [];
      let activityDuration = 0;
      let tasksConsolidatedDuration = 0;

      //calculating activityDuration 
      //based on task durations
      tasks.map((eachTask, eachTaskIndex) => {
        tasksConsolidatedDuration += eachTask.duration;
        checkPoints.push({
          taskIndex: eachTaskIndex,
          taskName: eachTask.name,
          checkpoint: tasksConsolidatedDuration
        });
      })

      activity.duration = tasksConsolidatedDuration;
      activity.checkpoints = checkPoints;

      return activity;
    }

    activity = processActivityTimers(activity.tasks)

    convertTextToUpperCase = (text) => {
      if (text)
        return text.toUpperCase();

      return '';
    }

    startTimer = (duration) => {
      var timer = duration, minutes, seconds;
      setInterval(function () {
          minutes = parseInt(timer / 60, 10)
          seconds = parseInt(timer % 60, 10);
  
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
  
          document.querySelector('#time').textContent = minutes + ":" + seconds;
  
          if (--timer < 0) {
              timer = duration;
          }
      }, 1000);
  }

    return (
      <View style={styles.container}>
        <NavigationEvents
          onDidBlur={onBlur => this.setState({
            taskDuration: 0
          })}
        />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.timer}>
            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={[styles.codeHighlightText, styles.taskName]}>{convertTextToUpperCase(task.name)} ({task.duration}s)</MonoText>
            </View>
            <Text style={styles.activityName}>{activity.name} - {activity.duration}s</Text>
            <Text id="time">05:00</Text>
          </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ActivityTimerTextMins: {
    fontSize: 60
  },
  ActivityTimerTextSeconds: {
    fontSize: 22
  },
  taskTimerTextMins: {
    fontSize: 132
  },
  taskTimerTextSeconds: {
    fontSize: 52
  },
  timer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    // backgroundColor: '#ecf0f1',
  },
  activityName: {
    // textTransform: 'uppercase'
    fontSize: 52
  },
  taskName: {
    // textTransform: 'uppercase'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
    //textTransform: 'uppercase'
  },

  getStartedText: {
    fontSize: 32,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 34,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    // backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    // color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
