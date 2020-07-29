import React, { Component } from "react";
import {
  View,
  Text,
  Linking,
  Image,
} from "react-native";
import { TextInput, Button, Title, withTheme } from "react-native-paper";
// import base64 from "react-native-base64";
import { Base64 } from 'js-base64';
import styles from "../../styles/stylesheets/login.stylesheet";
import LoginScreen from "../../screen/login/LoginScreen";

class AuthenticatorUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "", 
    };
  }

  
  setEmail = email => {
    this.setState({
      email
    });
  };

  setPassword = password => {
    this.setState({
      password
      // JavaScript moderno
    });
  };

  storateData = async () => {
    try {
      await AsyncStorage.setItem("Email", this.state.email);
    } catch (error) {
      alert(error);
    }
  };

  submitAndClear = () => {
    this.props.writeText(this.state.text);
    this.setState({
      text: ""
    });
  };

  hola=()=>{
    if(this.props.hola2=="https://www.saludvitale.com/ecuador_"){
        Linking.openURL(
        "https://www.saludvitale.com/ecuador/user/password/reset"
      )
    }else
      Linking.openURL(
      "https://www.saludvitale.com/panama/user/password/reset"
    )
  }

  hola2=()=>{
    if(this.props.hola2=="https://www.saludvitale.com/ecuador_"){
        Linking.openURL(
        "https://api.whatsapp.com/send?phone=593995509104&text=Hola"
      )
    }else
      Linking.openURL(
      "https://api.whatsapp.com/send?phone=50769486913&text=Hola" )
  }
  
  render() {
    const { props } = this;
    const base = Base64.encode(this.state.password);
    //const base2 = Base64.decode(this.state.password);
    
    //console.log(this.props.hola);
    return (
      <View style={styles.container}>
        <Title style={styles.title}>
          Si tienes incovenientes para iniciar sesión{" "}
        </Title>
        <Image
          source={require("../../../src/images/Logo2.png")}
          style={styles.imagen}
        />

        <TextInput
          style={styles.formControl}
          label="Email"
          value={this.state.email}
          textContentType="emailAddress"
          //keyboardType="email-address"
          onChangeText={text => this.setEmail(text)}
          ref={input => {
            this.textInput = input;
          }}
        />

        <TextInput
          style={styles.formControl}
          label="Contraseña"
          value={this.state.password}
          textContentType="password"
          secureTextEntry
          onChangeText={text => this.setPassword(text)}
          ref={input => {
            this.textInput = input;
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly"
            // ...styles.formControl
          }}
        >
      
          <Button
            style={styles.buton}
            onPress={() =>
              props.mainAction({
                email: this.state.email,
                password: base//this.state.password,
                //base2,  
              })
            }
            color={props.theme.colors.accent}
            mode="contained"
          >
            {props.mainButtonTitle}
          </Button>

          <Button 
            style={styles.buton2}
            onPress={() =>
              this.hola()
             // Linking.openURL(
               // "https://www.saludvitale.com/panama/user/password/reset"
             // )
            }
            mode="outlined"
            //props.navigationAction()} mode="outlined">
            //{props.secondaryButtonTitle}
          >
            {props.secondaryButtonTitle}
          </Button>

          <Button
            style={styles.buton3}
            onPress={() =>
              this.hola2()
            }
            mode="outlined"
          >
            {props.contactButtonTitle}
          </Button>

          {/* <View style={styles.hairline} /> */}

          {/* <Button
            style={styles.buton4}
            onPress={() =>
              Linking.openURL("https://www.saludvitale.com/doctor/")
            }
            mode="contained"
          >
            {props.registroButtonTitle}
          </Button> */}
        </View>
      </View>
    );
  }
}

export default withTheme(AuthenticatorUI);
