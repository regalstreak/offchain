import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';

import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import TransactionsScreen from './screens/TransactionsScreen';
import TempDetailsScreen from './screens/TempDetailsScreen';

const TabBarComponent = props => <BottomTabBar {...props} />;

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: TempDetailsScreen,
    Settings: SettingsScreen,
    Transactions: TransactionsScreen
  },
  {
    tabBarComponent: props => (
      <TabBarComponent {...props} style={{ borderTopColor: '#605F60' }} />
    ),
  }
);

export default createAppContainer(AppNavigator);
