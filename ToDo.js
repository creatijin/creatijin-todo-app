import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import PropTypes from "prop-types";

const { height, width } = Dimensions.get("window");

export default class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false, toDoValue: props.text };
  }
  static propTypes = {
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    deleteToDo: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
  }
  render() {
    const { isCompleted, isEditing, toDoValue } = this.state;
    const { text, id, deleteToDo } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleComplete}>
            <View style={[
              styles.circle,
              isCompleted ? styles.completedCircle : styles.uncompletedCircle
              ]}></View>
          </TouchableOpacity>
          {isEditing ? (
            <TextInput style={[
              styles.text,
              styles.input,
              isCompleted ? styles.completedText : styles.uncompletedText
            ]} 
            value={toDoValue}
            multiline={true}
            onChangeText={this._controllInput}
            returnKeyType={"done"}
            onBlur={this._finishEditing}
            />
            ) : (
            <Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}>
              {text}
            </Text>)
          }
        </View>
        
          {isEditing ? (
            <View style={styles.action}>
              <TouchableOpacity onPressOut={this._finishEditing}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>✅</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.action}>
              <TouchableOpacity onPressOut={this._startEditing}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>✏️</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPressOut={()=> deleteToDo(id)}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>❌</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
    );
  }
  _toggleComplete = () => {
    this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted
      }
    });
  };
  _startEditing = () => {
    this.setState({ isEditing: true });
  };
  _finishEditing = () => {
    this.setState({
      isEditing: false
    });
  }
  _controllInput = ( text ) => {
    this.setState({
      toDoValue: text
    });
  }
}


const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 15,
    marginLeft: 15,
    borderWidth: 4
  },
  text: {
    fontWeight: "600",
    fontSize: 16,
    marginVertical: 20
  },
  completedCircle: {
    borderColor: "#bbb"
  },
  uncompletedCircle: {
    borderColor: "#f45d11"
  },
  completedText: {
    color: "#bbb",
    textDecorationLine: "line-through"
  },
  uncompletedText: {
    color: "#353839"
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    width: width / 2
  },
  action: {
    flexDirection: "row"
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  input: {
    marginVertical: 15,
    width: width / 2,
    paddingBottom: 5
  }
});