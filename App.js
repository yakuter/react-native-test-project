import React from 'react';
import { Button, ActivityIndicator, Text, TextInput, Alert, View  } from 'react-native';

export default class FetchExample extends React.Component {

  // GetValueFunction = () =>{
  //   const { text }  = this.state ;
  //   return text
  // }

  SendData = () =>{
    const { text }  = this.state ;
    
    fetch('http://192.168.1.29:8080', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Data: this.state.text,
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

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      text: ''
    }
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
          placeholder="Metin"
          // onChange={event => setMetin(event.target.value)}
          onChangeText={(text) => this.setState({text})}
          // onChangeText={(text)=> this.SendData(text)}
          // value={this.state.text}
        />
        <Button
            // onPress={this.SendData()}
            onPress={this.SendData}
            title="Press Me"
            color="#841584"
          />
        <Text>{this.state.dataSource}</Text>
      </View>
    );
  }
}