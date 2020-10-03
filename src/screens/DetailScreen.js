import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Avatar, Button, Layout, Text, Divider } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';
import { HeartIcon, MessageCircleIcon } from '../icons';

export default class DetailScreen extends Component {
  static navigationOptions = {
    title: 'Details',
  };

  async componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    /*
      Get data from asyncStorage and set it to state component
      Find matching item and set it to state component
    */
  }

  onLike = (item) => {
    /*
      Toggle likes button when user press on it and also update asyncStorage to keep data refreshing
    */
  }

  onComment = (item) => {
    /*
      Navigate to CommentScreen and pass item as param
    */
  }

  render() {
    const { item } = this.state;
    if (item) {
      return (
        <Layout style={styles.container}>
          <NavigationEvents
            onWillFocus={this.fetchData}
          />
          <ImageBackground
            style={styles.headerContainer}
            source={{ uri: '' }}
          >
            <View style={[
              StyleSheet.absoluteFill,
              { backgroundColor: 'rgba(0, 0, 0, 0.45)' },
            ]} />
            <Text
              style={styles.headerTitle}
              category='h1'
              status='control'>
              title
              </Text>
          </ImageBackground>
          <Layout
            style={styles.contentContainer}
            level='1'>
            <Text>
              content
              </Text>
          </Layout>
          <Divider />
          <View style={styles.activityContainer}>
            <Avatar source={{ uri: '' }} />
            <View style={styles.authoringInfoContainer}>
              <Text>
                name
                </Text>
              <Text
                appearance='hint'
                category='p2'>
                date
                </Text>
            </View>
            <Button
              style={styles.iconButton}
              appearance='ghost'
              status='basic'
              accessoryLeft={MessageCircleIcon}>
              0
                </Button>
            <Button
              style={styles.iconButton}
              appearance='ghost'
              status={true ? 'danger' : 'basic'}
              accessoryLeft={HeartIcon}
            />
          </View>
        </Layout>
      );
    }

    return null;
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    minHeight: 256,
    paddingVertical: 24,
  },
  headerTitle: {
    textAlign: 'center',
    marginVertical: 24,
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  activityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  authoringInfoContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});