import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
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
    })
  }


  renderItem = ({ item }) => (
    <ListItem title={item} />
  );

  renderIcon = (props) => (
    <TouchableWithoutFeedback
       onPress={this.onComment}
      // onPress={
      //   () => this.login(this.state.comment)
      // }

    >
      <Icon {...props} name={'paper-plane-outline'} />
    </TouchableWithoutFeedback>
  );

  onComment = (Input) => {
    const { data, comment } = this.state;

    console.log("data", data)
    // this.setState({ comment: Input })

    /*
      - If comment is empty show error and not allow to post comment
    */

    // let newArray = [...this.state.data]
    // let foundIndex = data.findIndex(e => e.id === item.id)
    // let foundItem = data.find(e => e.id === item.id)
    // newArray[foundIndex] = {...newArray[foundIndex], comments: [comment, ...newArray[foundIndex]['comments']]}
    // foundItem.comments.unshift(comment)

    /*
      - Update state variables and data local storage
    */
  //  this.setState(
  //    { comment: Input },
  //   async () => {
  //     await AsyncStorage.setItem('data', JSON.stringify(sampleData))
  //  })
   
  }

  login = (comment) => {
    alert('comment: ' + comment);
  }

  render() {
    const { item, comment, error } = this.state;
    // if (item) {
    return (
      <Layout style={styles.container}>
        { error && <Text style={styles.text} status='danger'>Comment cannot be empty!</Text>}
        <List
          style={styles.list}
          contentContainerStyle={styles.listContent}
          renderItem={this.renderItem}
          ListEmptyComponent={() => <Text>There are no any comments.</Text>}
        />
        <Input
          // onChangeText={this.onComment}
          value={comment}
          placeholder='Add comment'
          accessoryRight={this.renderIcon}
          onChangeText={nextValue => this.setState({ comment: nextValue, error: false })}

        />
      </Layout>
    );
    // }
    // return null;
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