import React from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import data from '../data/db.json';


export default class AllActivities extends React.Component {
  static navigationOptions = {
    title: 'All Activities',
  };

  constructor() {
    super();
  }

  _ActivityTaskRenderer({item}) {
    let parentData = item;
    const { navigate } = this.props.navigation;
    return (    
      <View>
      <Text style={styles.eachActivity}>{item.name}</Text>
        <FlatList
        data={item.tasks} 
          keyExtractor={(item) => item.uuid}
          renderItem={({ item }) => (
            <Text style={styles.eachTask} onPress={() => navigate('OngoingActivity', { activity: parentData, task: item })}>{item.name} - {item.duration}</Text>
          )} />
         </View>
    )
}

  render() {
    
    return (
      <FlatList
        data={data.activities}
        keyExtractor={(item) => item.uuid}
        renderItem={this._ActivityTaskRenderer.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  eachActivity: {
    padding: 20,
    fontWeight: 'bold'
  },
  eachTask: {
    paddingLeft: 50,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ecf0f1',
    textTransform: 'capitalize'
  }
});
