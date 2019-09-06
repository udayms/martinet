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

import Timer from 'react-compound-timer';

import { MonoText } from '../components/StyledText';

export default class OngoingActivity extends React.Component {

  static navigationOptions = {
    header: null
  };

  state = {
    isLoadingComplete: false,
    startActivityTimer: (start) => {
      console.log('Start Activity Timer');
      // setTime(data.value)
      start()
    },
    resetActivityTimer: (reset) => {
      console.log('Reset Activity Timer');
      reset()
    }
  };

  componentWillUnmount = () => {
    console.log('Will Unmount...');
  }

  componentWillMount = () => {
    console.log('Will Mount...');
  }

  componentDidMount = () => {
    console.log('Did Mount...');
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
  
      activity.duration = tasksConsolidatedDuration ;
      activity.checkpoints = checkPoints;
  
      return activity;
    }

    activity = processActivityTimers( activity.tasks )
    //console.log( JSON.stringify( activity ) )

    convertTextToUpperCase = (text) => {
      if (text)
        return text.toUpperCase();

      return '';
    };
    
    let taskCheckpoints = [
      {
        time: 8 * 1000,
        callback: () => console.log('Checkpoint A'),
      },
      {
        time: 5 * 1000,
        callback: () => console.log('Checkpoint B'),
      },
      {
        time: 0,
        callback: () => console.log('Done'),
      }
    ];

    

    return (
      <View style={styles.container}>
        <NavigationEvents
          onDidBlur={onBlur => this.setState({
            taskDuration: 0
          })}
        />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}
          </View>



          <View style={styles.timer}>
            <Text style={styles.getStartedText}>{activity.name} - {activity.duration}s </Text>
            <Timer
                startImmediately={false} 
                initialTime={0}
                direction="forward"
                lastUnit="m"
              >
                {( { start, resume, pause, stop, reset } ) => {
                  this.state.startActivityTimer(start)
                  
                  return (
                  <React.Fragment>
                    <Text style={styles.activityTimerTextMins}><Timer.Minutes />:<Timer.Seconds /></Text>
                  
                    <Button onPress={start} title="Start"><Text>Start</Text></Button>
                    <Button onPress={pause} title="pause"><Text>Pause</Text></Button>
                    <Button onPress={reset} title="reset"><Text>Reset</Text></Button>
                </React.Fragment>
    )}}
              </Timer>

            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={[styles.codeHighlightText, styles.taskName]}>{convertTextToUpperCase(task.name)} ({task.duration})s</MonoText>
            </View>

            <Text style={styles.timer}>
              {/* <Timer
                startImmediately="false" 
                initialTime={task.duration * 1000}
                direction="backward"
                lastUnit="m"
                checkpoints={taskCheckpoints}
              >
                {() => (
                  <React.Fragment>
                    <Text style={styles.taskTimerTextMins}><Timer.Minutes /></Text>
                    <Text style={styles.taskTimerTextSeconds}><Timer.Seconds /></Text>
                  </React.Fragment>
                )}
              </Timer>             */}
            </Text>
            
          </View>
        </ScrollView>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
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
    backgroundColor: '#ecf0f1',
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
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
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
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
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
