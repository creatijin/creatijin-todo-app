import React from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, Platform, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import ToDo from "./ToDo";


const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: ""
  };
  render() {
    const { newToDo } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <Text style={styles.title}>Creatijin To DO</Text>
        <View style={styles.card}>
          <TextInput 
          style={styles.input} 
          placeholder={"New To Do"} 
          value={newToDo} 
          onChangeText={this._crontollNewToDo}
          placeholderTextColor={"#999"} 
          returnKeyType={"done"}
          autoCorrect={false}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo text={"Hello I'm a To Do"}/>
          </ScrollView>
        </View>
      </View>
    );
  }
  _crontollNewToDo = text => {
    this.setState({
      newToDo: text
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f45d11',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: "white",
    fontSize: 30,
    margin: 50,
    fontWeight: "200"
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    width: width - 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50,50,50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 20
  },
  toDos: {
    alignItems: "center"
  }
});
