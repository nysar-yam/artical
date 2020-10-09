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
      this.setState({
        data: data1,
      });
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
 /**
  * Dislike and like
  * @param {prevState} item 
  */
  onLike = async (item) => {
    /*
      Toggle likes button when user press on it and also update asyncStorage to keep data refreshing
    */
   const {data} = this.state;
      let newData = data.map((element, index) => {
        if(element.id === item.id){
           element.likes = !element.likes;
           return element;
        }
        return element
      });
      /**
       *  To store data into async storage
          stringify to convert data object to json
       */
      this.setState({data},
          async () => {
            await AsyncStorage.setItem('data', JSON.stringify(newData));
          }
        );
  }
   /**
    * Link to page comment
    * @param {item} item 
    */
  onComment = (item) => {
    console.log(item);
    /*
      Navigate to CommentScreen and pass item as param
    */
      this.props.navigation.navigate('Comment',{
        item:item,
      });
  }

  render() {
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
/**
 * 
 * @param {*} param0 
 * hide the content of text
 */
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
      <Avatar source={{ uri: item.avatar}} />
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
      {/* link to page comment */}
      <Button
       onPress= {() => this.onComment(item)}
        style={styles.iconButton}
        appearance='ghost'
        status='basic'
        accessoryLeft={MessageCircleIcon}>
        {item.comments.length}
      </Button>
   
      <Button
        onPress={() => this.onLike(item)}
        style={styles.iconButton}
        appearance='ghost'
        status={item.likes ? 'danger' : 'basic'}
        accessoryLeft={HeartIcon} />

    </View>
    
  );
  renderItemHeader = (item) => {

    return (
      <ImageBackground
        style={styles.itemHeader}
        source={{ uri: item.image}}
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