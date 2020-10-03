import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import * as eva from '@eva-design/eva';
import { ApplicationProvider,IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AsyncStorage from '@react-native-community/async-storage';
import sampleData from './src/data.json';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import  CommentScreen from './src/screens/CommentScreen';
import { Text, View } from 'react-native'
 
/*
  Import HomeScreen, DetailScreen, CommentScreen
*/

const AppNavigator = createStackNavigator({
  /*
    Add all screens here
  */
 Home: HomeScreen,
 Detail: DetailScreen,
 Comment:  CommentScreen,



});
  
  const AppContainer = createAppContainer(AppNavigator);
  
  export default class App extends React.Component {
    async componentDidMount() {
      let data = await AsyncStorage.getItem('data')
      if(!data) {
        await AsyncStorage.setItem('data', JSON.stringify(sampleData))
      }
    }
    
    render() {
      return (
        <>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={eva.light}>
            <AppContainer />
          </ApplicationProvider>
        </>
      )
    }
  }