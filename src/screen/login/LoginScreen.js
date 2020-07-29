import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { login } from "../../container/Login/actions/user";
import AuthenticatorUI from "../../components/authentication/AuthenticatorUI";
import firebase from "react-native-firebase";
import { Alert, AsyncStorage } from "react-native";

import Apiconstantes from "../../dataAccess/ APIs";
//
import login1 from "../../dataAccess/Api_login";

class LoginScreen extends Component {
  static navigationOptions = {
    drawerLabel: "Mi cuenta",
    drawerIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name="account" size={20} color="black" />
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      p: {},
      pais1: "",
    };
    this.login = this.login.bind(this);
  }

  getToken() {
    firebase
      .messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          this.setState({ token: fcmToken });
        } else {
        }
      });
  }

  submitAndClear = () => {
    this.props.writeText(this.state.text);
    this.setState({
      text: "",
    });
  };

  componentDidMount() {
    const { navigation } = this.props;
    pais = navigation.getParam("ecua", "ecua");
    this.setState({ pais1: pais });
    firebase.messaging().requestPermission();
    this.getToken();
  }
  async storeToken(user) {
    try {
      await AsyncStorage.setItem("userData", user);
    } catch (error) {}
  }

  login(user) {
    const { navigation } = this.props;
    pais = navigation.getParam("ecua", "ecua");
    hola = "" + pais;
    axios
      // .post ("http://phplaravel-227278-1009310.cloudwaysapps.com/panama/api/authentication/login",{
      .post(pais + Apiconstantes.login, {
        email: user.email,
        password: user.password, //new Buffer(user.password).toString("base64"),
        device_token: this.state.token,
      })
      .then((response) => {
        if (response.data && response.data.success == true) {
          this.storeToken(JSON.stringify(user));
          const target = response.data.data[0];
          const source = { pais: pais };
          const returnedTarget = Object.assign(target, source);
          this.props.onLogin(returnedTarget);
          this.setState({ p: returnedTarget });
          AsyncStorage.setItem("userDatos", pais);
          if (response.data.data[0].user_type == 2) {
            this.props.navigation.navigate("HomeScreen");
          } else {
            Alert.alert("", "Disculpe App solo para Profesionales");
          }
        } else {
          Alert.alert("", "Usuario o Contraseña Inconrrecta");
        }
      })
      .catch((error) => {});
  }
  render() {
    return (
      <AuthenticatorUI
        setEmail={this.setEmail}
        setPassword={this.setPassword}
        hola2={this.state.pais1}
        mainButtonTitle="Entrar"
        secondaryButtonTitle="¿Olvidaste tu contraseña?"
        navigationAction={() => {
          this.props.navigation.navigate("PasswordResetScreen");
        }}
        mainAction={this.login}
        contactButtonTitle="Contactanos"
        registroButtonTitle="Registrarse"
      />
    );
  }
}

function mapStateToProps() {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    onLogin: (user) => dispatch(login(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
