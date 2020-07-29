import React, { Component } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet, Linking, View } from "react-native";

export default class Contacto extends Component {
  static navigationOptions = {
    drawerLabel: "Contacto",
    drawerIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name="phone" size={20} color="black" />
    )
  };

  hola2=()=>{
    if(this.props.hola2=="https://www.saludvitale.com/ecuador_"){
        Linking.openURL(
        "https://api.whatsapp.com/send?phone=593995509104&text=Hola"
      )
    }else
      Linking.openURL(
      "https://api.whatsapp.com/send?phone=50769486913&text=Hola" )
  }

  componentDidMount() {
  this.hola2();

      //this.props.navigation.navigate("HomeScreen");

      this.focusListener = this.props.navigation.addListener('didFocus', () => {
        this.props.navigation.navigate("HomeScreen");     
    });

  }

  componentWillUnmount() {
     this.props.navigation.navigate("HomeScreen");
   }
   
  render() {
   this.hola2()

       return (
          this.props.navigation.navigate("HomeScreen"));
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  }
});
