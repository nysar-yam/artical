import React from 'react';
import { View, StyleSheet,ImageBackground, ToastAndroid } from 'react-native';
import { Avatar, Button, Card, List, Text } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';
import { HeartIcon, MessageCircleIcon} from '../icons';
import sampleData from '../data.json';

export default class Cards extends React.Component {
  static navigationOptions = {
      title: 'Articles',
  };

  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    /*
      Get data from asyncStorage and set it to state component
    */
    let data = await AsyncStorage.getItem('data')
    if (data) {
      let data1 = JSON.parse(data)
      this.setState({
        data: data1,
      })
    }
  }

  onItemPress = (id) => {
    /*
      Navigate to DetailScreen and pass data's id as param
    */
  };

  onLike = (item) => {
    /*
      Toggle likes button when user press on it and also update asyncStorage to keep data refreshing
    */
  }

  onComment = (item) => {
    /*
      Navigate to CommentScreen and pass item as param
    */
  }

  render() {
    console.log("DATA", this.state.data);
    return (
      <>
        <NavigationEvents 
          onWillFocus={this.fetchData}
        />
        <List
          style={styles.list}
          contentContainerStyle={styles.listContent}
      //     // data={data}
          data={this.state.data1}
      //     // renderItem={renderItem}
          renderItem={this.state.renderItem}
      // //     data={data}
      // // renderItem={renderItem}
        />
      </>
    );
  }

renderItem = ({item}) => (
     <Card
      style={styles.item}
      header={() => this.renderItemHeader(item)}
      footer={() => this.renderItemFooter(item)}
      onPress={() => this.onItemPress(item.id)}>
      <Text category='h5'>
        title
      </Text>
      <Text
        style={styles.itemContent}
        appearance='hint'
        category='s1'>
        content substring from 0 to 82 charactors.
      </Text>
    </Card>
  // )
)

  renderItemFooter = (item) => (
    <View style={styles.itemFooter}>
      <Avatar source={{ uri: item.image }}/>
      <View style={styles.itemAuthoringContainer}>
        <Text
          category='s2'>
          name
        </Text> 
        <Text
          appearance='hint'
          category='c1'>
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
        status={item.likes ? 'danger' : 'basic'}
        accessoryLeft={HeartIcon} />
    </View>
  );

  renderItemHeader = (item) => {
    return (
      <ImageBackground
        style={styles.itemHeader}
        source={{ uri: item.avatar}}
      />
    );
  };
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  item: {
    marginVertical: 8,
  },
  itemHeader: {
    height: 220,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: "center",
    marginHorizontal: 8,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  itemAuthoringContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
});