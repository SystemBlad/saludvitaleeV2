import React, { Component } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  View,StyleSheet,
} from 'react-native';
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import axios from "axios";
import { login } from "../../container/Login/actions/user";

class auth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      p:'', 
      q:''
      
    };
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    this._bootstrapAsync();
    this.getToken();
   
  }
   _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userData')
    const userTok = await AsyncStorage.getItem('userDatos')
    let parsed = JSON.parse(userToken);
    this.setState({ p: parsed });
 
    
    if(userToken==null){
      this.props.navigation.navigate("pais");
    }else{
      var pais= userTok        
      this.login(pais);
    } 
  };

  login(c) {
   // const Buffer = require("buffer").Buffer;
    const { navigation } = this.props;
    axios
    .post(c + "/api/authentication/login", {
         email: this.state.p.email,
         password:  this.state.p.password,      //new Buffer(c.password).toString("base64"),//this.state.p.password,
         device_token: this.state.token,
      })
      .then(response => {
        if (response.data && response.data.success == true) {
          pais = c;
          const target = response.data.data[0];
          const source =  { pais: c };
          const returnedTarget = Object.assign(target, source);
          this.props.onLogin(returnedTarget);
          this.props.navigation.navigate("HomeScreen");
         
        } else {
        }
      })
      .catch(error => {
      });
  }

  getToken() {
    firebase
      .messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          this.setState({ token: fcmToken });
        } else {
        }
      });

  }

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#009bd9" animating />
       
      </View>
    );
  }
 }

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})
function mapStateToProps() {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    onLogin: user => dispatch(login(user))
  };

}

export default connect(mapStateToProps, mapDispatchToProps)(auth);
