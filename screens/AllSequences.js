import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

const db = {
  "activities": [
    {
      "name": "Brushing",
      "uuid": "brushing_id",
      "color": "#ff00ff",
      "tasks": [
        {
          "name": "rinsing",
          "queue-position": 0,
          "time": 120,
          "audio-ticker": "ticker.wav",
          "audio-completion": "trumpet.wav",
          "pause": 5
        },
        {
          "name": "brushing",
          "queue-position": 1,
          "time": 360,
          "audio-ticker": "ticker.wav",
          "audio-completion": "trumpet.wav",
          "pause": 5
        }
      ],
      "startup-pause": 5
    },
    {
      "name": "Dressing",
      "uuid": "dressing_id",
      "color": "#ff00ff",
      "tasks": [
        {
          "name": "rinsing",
          "queue-position": 0,
          "time": 120,
          "audio-ticker": "ticker.wav",
          "audio-completion": "trumpet.wav",
          "pause": 5
        },
        {
          "name": "brushing",
          "queue-position": 1,
          "time": 360,
          "audio-ticker": "ticker.wav",
          "audio-completion": "trumpet.wav",
          "pause": 5
        }
      ],
      "startup-pause": 5
    }
  ],
  "sequences": [
    {
      "name": "Getting ready for school",
      "activities": ["brushing_id", "dressing_id"]
    }
  ]
};

export default class AllSequences extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <ExpoLinksView />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
