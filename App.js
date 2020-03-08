import React from 'react';
import { ActivityIndicator, Text, TextInput, View  } from 'react-native';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      text: ''
    }
  }

  SendData(text) {
    fetch('http://192.168.1.29:8080', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Data: text,
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson.message,
      }, function(){});
    })
    .catch((error) =>{
      console.error(error);
    });
  }

  componentDidMount(){
    return fetch('http://192.168.1.29:8080')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.message,
        }, function(){});
      })
      .catch((error) =>{
        console.error(error);
      });
  }
  
  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(text)=> this.SendData(text)}
          value={this.state.text}
        />
        <Text>{this.state.dataSource}</Text>
      </View>
    );
  }
}