import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Avatar, Button, Layout, Text, Divider } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';
import { HeartIcon, MessageCircleIcon } from '../icons';

export default class DetailScreen extends Component {
  /**
   * 
   * @param {navigation} param exstend navigation on property
   * 
   */
  
  static navigationOptions = ({ navigation }) => ({
    title: 'Details',
  });

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      item: null,
    };
    this.state = { isToggleOn: true }
    // this.onLike = this.onLike.bind(this);
  }


  async componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    /*
      Get data from asyncStorage and set it to state component
      Find matching item and set it to state component
    */

    /**
     * loop data form json
     */

    let data = await AsyncStorage.getItem("data")
    if (data) {
      let data1 = JSON.parse(data);
      let item_id = this.props.navigation.state.params.id;
      console.log(item_id);
      /**
       * declear new object and push data to value
       */
      let matchItem = null;
      data1.forEach(function (value, index) {
        if (value.id == item_id) {
          matchItem = value;
        }
      });
      //** edit on setState */
      this.setState({
        data,
        item : matchItem
      })
    }
  }

  // like and dislike on icon heart
  onLike = (item) => {
    /*
      Toggle likes button when user press on it and also update asyncStorage to keep data refreshing
    */
    // this.setState(prevState => ({
    //   isToggleOn: !prevState.isToggleOn
    // }));
    if(this.state.isToggleOn == true){
      this.setState({isToggleOn: false})
    }else{
      this.setState({isToggleOn: true})
    }


  }

  onComment = (item) => {
    /*
      Navigate to CommentScreen and pass item as param
    */
    this.props.navigation.navigate('Comment',{
      item: item,
    });
  }
  

  render() {
    /** 
     * access to object article
     */
    const item = this.state;
    if (item.item != null) {
      let article = item.item;
      return (
        <Layout style={styles.container}>
          <NavigationEvents
            onWillFocus={this.fetchData}
            data={this.state.data}
            renderItem={this.renderItem}
          />

          <ImageBackground
            style={styles.headerContainer}
            source={{ uri: article.image }}
          >
            <View style={[
              StyleSheet.absoluteFill,
              { backgroundColor: 'rgba(0, 0, 0, 0.45)' },
            ]} />
            <Text
              style={styles.headerTitle}
              category='h1'
              status='control'>
              {article.title}
            </Text>
          </ImageBackground>
          <Layout
            style={styles.contentContainer}
            level='1'>
            <Text>
              {article.content}
            </Text>
          </Layout>
          <Divider />
          <View style={styles.activityContainer}>
            <Avatar source={{ uri: article.avatar }} />
            <View style={styles.authoringInfoContainer}>
              <Text>
                {article.title}
              </Text>
              <Text
                appearance='hint'
                category='p2'>
                {this.state.date}
              </Text>
            </View>
            <Button
               onPress= {() => this.onComment(item.item)}
              style={styles.iconButton}
              appearance='ghost'
              status='basic'
              accessoryLeft={MessageCircleIcon}>
              0
                </Button>
            <Button
              onPress={this.onLike}
              style={styles.iconButton}
              appearance='ghost'
              status={this.state.isToggleOn ? 'danger' : 'basic'}
              accessoryLeft={HeartIcon} />
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
