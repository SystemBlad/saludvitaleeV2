import React, { Component } from 'react';
import { AsyncStorage, View } from 'react-native';
import { connect } from 'react-redux';
import { login } from '../../container/Login/actions/user';

 class AuthLoading extends Component {
  constructor(props) {
    super(props);
    this.storeToke();
  }
  
   /*storeToke = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.props.navigation.navigate(userToken ? 'HomeScreen' : 'LoginScreen');
  };*/

  render() {
    return <View />;
  }
}

 export default connect(
  () => ({}),
  {
    login
  }
)(AuthLoading); 
