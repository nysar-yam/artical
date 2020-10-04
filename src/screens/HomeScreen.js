import React from 'react';
import { View, StyleSheet, ImageBackground, ToastAndroid, Alert } from 'react-native';
import { Avatar, Button, Card, List, Text } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';
import { HeartIcon, MessageCircleIcon } from '../icons';
import sampleData from '../data.json';
import { TextInput } from 'react-native-gesture-handler';

export default class Cards extends React.Component {
  static navigationOptions = {
    title: 'Articles',
  };

  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
    this.state = { isToggleOn: true }
    this.onLike = this.onLike.bind(this);
    // console.log(likes);
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    /*
      Get data from asyncStorage and set it to state component
    */
    let data = await AsyncStorage.getItem('data')
    if (data) {
      let data1 = JSON.parse(data)
      //console.log("Home", this.state.data);
      this.setState({
        data: data1,
      })
    }
  }

  onItemPress = (id) => {
    /*
      Navigate to DetailScreen and pass data's id as param
    */
    this.props.navigation.navigate('Detail', {
      id: id,
    });

  };
  // Dislike and like
  onLike = (item) => {
    /*
      Toggle likes button when user press on it and also update asyncStorage to keep data refreshing
    */
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));

  }

  onComment = (item) => {
    /*
      Navigate to CommentScreen and pass item as param
    */
    this.props.navigation.navigate('Comment', {
      id: id,
    });
  }

  render() {
    // var str = item.content;
    // if(str.length > 10) str = str.substring(0,10);
    return (
      <>
        <NavigationEvents
          onWillFocus={this.fetchData}
        />
        <List
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={this.state.data}
          renderItem={this.renderItem}
        />
      </>
    );
  }

  renderItem = ({ item }) => (
    <Card
      style={styles.item}
      header={() => this.renderItemHeader(item)}
      footer={() => this.renderItemFooter(item)}
      onPress={() => this.onItemPress(item.id)}>
      <Text category='h5'>
        {item.title}
      </Text>
      <Text numberOfLines={5} style={{width:85}}
        style={styles.itemContent}
        appearance='hint'
        category='s1'>
        {item.content}
      </Text>
    </Card>
  );

  renderItemFooter = (item) => (
    <View style={styles.itemFooter}>
      <Avatar source={{ uri: item.image }} />
      <View style={styles.itemAuthoringContainer}>
        <Text
          category='s2'>
          {item.name}
        </Text>
        <Text
          appearance='hint'
          category='c1'>
          {item.date}
        </Text>
      </View>

      <Button
        onPress={this.onLike}
        style={styles.iconButton}
        appearance='ghost'
        status='basic'
        accessoryLeft={MessageCircleIcon}>
        1234567
      </Button>

      <Button
        onPress={this.onLike}
        style={styles.iconButton}
        appearance='ghost'
        status={this.state.isToggleOn ? 'danger' : 'basic'}
        accessoryLeft={HeartIcon} />
    </View>
  );

  renderItemHeader = (item) => {

    return (
      <ImageBackground
        style={styles.itemHeader}
        source={{ uri: item.avatar }}
      />
    );
  };
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  item: {
    marginVertical: 8,
  },
  itemHeader: {
    height: 220,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: "center",
    marginHorizontal: 8,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  itemAuthoringContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
});