import React, { Component } from 'react';
import { Alert, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Layout, List, Input, Icon, Text, ListItem } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';

export default class CommentScreen extends Component {
  static navigationOptions = {
    title: 'Comments',
  };

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      item: null,
      comment: null,
      error: null,
    };
  }

  async componentDidMount() {
    /*
      - Get data from asyncStorage and set it to state component
      - Getting item from navigation params and set it to state component
    */
    //  this.fetchData()
    let data = await AsyncStorage.getItem('data')
    if (data) {
      let data1 = JSON.parse(data)
      this.setState({
        data: data1,
      });
    }

    let item = this.props.navigation.state.params.item;
    this.setState({
      item: item,
    });
  }


  renderItem = ({ item }) => (
    <ListItem title={item} />
  );

  renderIcon = (props) => (
    <TouchableWithoutFeedback

      onPress={this.onComment}
      
    >
      <Icon {...props} name={'paper-plane-outline'} />
    </TouchableWithoutFeedback>
  );


  onEnterText = (comment) => {
    if (comment.trim() != 0) {
      this.setState({ comment: comment, error: false });
    } else {
      this.setState({ comment: comment, error: true });
    }
  }

  onComment = () => {
    const { data, comment, item } = this.state;

    console.log("comment", comment)
    if (comment == null || comment == "") {
      this.setState({ comment: comment, error: true });
      return;
    } else {
      this.setState({ comment: comment, error: false })
    }

    console.log("abc");

    /*
      - If comment is empty show error and not allow to post comment
    */
    let newArray = [...this.state.data]
    let foundIndex = data.findIndex(e => e.id === item.id)
    let foundItem = data.find(e => e.id === item.id)
    newArray[foundIndex] = { ...newArray[foundIndex], comments: [comment, ...newArray[foundIndex]['comments']] }
    foundItem.comments.unshift(comment)

    /*
      - Update state variables and data local storage
    */
   console.log(foundItem)
    this.setState(
      // Clear input in comment
      { item: foundItem, comment: "" },
      
      async () => {
        await AsyncStorage.setItem('data', JSON.stringify(newArray))
      });

  }

  render() {
    const { item, comment, error, data } = this.state;
    if (item) {
      return (
        <Layout style={styles.container}>
          { error && <Text style={styles.text} status='danger'>Comment cannot be empty!</Text>

          }

          <List
            data={item.comments}
            style={styles.list}
            contentContainerStyle={styles.listContent}
            renderItem={this.renderItem}
            ListEmptyComponent={() => <Text>There are no any comments.</Text>}
          />

          <Input
            onChangeText={comment => this.onEnterText(comment)}
            placeholder='Add comment'
            accessoryRight={this.renderIcon}
          // code bong
          // onChangeText={(comment) => this.setState({ comment: comment})}
          value = {this.state.comment}
      />
        </Layout>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});