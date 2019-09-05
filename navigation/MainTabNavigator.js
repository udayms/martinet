import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import OngoingActivity from '../screens/OngoingActivity';
import AllActivities from '../screens/AllActivities';
import AllSequences from '../screens/AllSequences';
import SettingsScreen from '../screens/SettingsScreen';

const OngoingActivityStack = createStackNavigator({
  OngoingActivity: OngoingActivity
});

OngoingActivityStack.navigationOptions = {
  tabBarLabel: 'Ongoing Activity',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-timer' : 'ios-timer'}
    />
  ),
};

const AllActivitiesStack = createStackNavigator({
  AllActivities: AllActivities,
});

AllActivitiesStack.navigationOptions = {
  tabBarLabel: 'All Activities',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-list' : 'ios-list'}
    />
  ),
};

const AllSequencesStack = createStackNavigator({
  AllSequences: AllSequences,
});

AllSequencesStack.navigationOptions = {
  tabBarLabel: 'All Sequences',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-apps' : 'ios-apps'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  Ongoing: OngoingActivityStack,
  Activities: AllActivitiesStack,
  Sequences: AllSequencesStack,
  Settings: SettingsStack,
},
  {
    initialRouteName: 'Activities'
  });
