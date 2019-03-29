import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window");

export default class ToDo extends Component {
  state = {
    isEditing: false,
    isCompleted: false
  };
  render() {
    const { isCompleted } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._toggleComplete}>
          <View style={[
            styles.circle,
            isCompleted ? styles.completedCircle : styles.uncompletedCircle
            ]}></View>
        </TouchableOpacity>
        <Text style={styles.text}>Hello I'm a To Do</Text>
      </View>
    );
  }
  _toggleComplete = () => {
    this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted
      }
    });
  }
}


const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row"
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 20,
    marginTop: 15,
    marginLeft: 15,
    borderWidth: 4
  },
  text: {
    fontWeight: "600",
    fontSize: 16,
    marginVertical: 16
  },
  completedCircle: {
    borderColor: "#bbb"
  },
  uncompletedCircle: {
    borderColor: "#f45d11"
  }
});