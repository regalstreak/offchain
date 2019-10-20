import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { PassCodeScreen } from './screens/onboarding/PassCodeScreen';
import { PrivateKeyScreen } from './screens/onboarding/PrivateKeyScreen';

import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import TransactionsScreen from './screens/TransactionsScreen';
import TempDetailsScreen from './screens/TempDetailsScreen';

const TabBarComponent = props => <BottomTabBar {...props} />;

// const MainTabNavigator = createBottomTabNavigator(
//   {
//     Home: {
//       screen: HomeScreen,
//     },
//     Details: TempDetailsScreen,
//     Settings: SettingsScreen,
//     Transactions: TransactionsScreen
//   },
// {
//     tabBarComponent: props => (
//       <TabBarComponent {...props} style={{ borderTopColor: '#605F60' }} />
//     ),
//     headerMode: 'none',
//     navigationOptions: {
//       headerVisible: false,
//     }
//   }
// );

const MainTabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: TempDetailsScreen,
    Settings: SettingsScreen,
    Transactions: TransactionsScreen
  },
  {
    initialRouteName: 'Home',
    activeColor: '#2A64D6',
    inactiveColor: '#000000',
    barStyle: { backgroundColor: 'white' },
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

const OnBoardingNavigator = createStackNavigator({
  PassCode: PassCodeScreen,
  PrivateKey: PrivateKeyScreen
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
})


const AppNavigator = createSwitchNavigator({
  Onboarding: OnBoardingNavigator,
  MainTabNavigator: MainTabNavigator
})

export default createAppContainer(AppNavigator);
