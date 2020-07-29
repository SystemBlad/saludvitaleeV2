import React, { Component } from "react";
import { View, Text, Image, Linking } from "react-native";
import { withTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import baseStyles from "../../styles/stylesheets/base.stylesheets";
import UserAvatar from "../../screen/home/useravatar";
import { connect } from "react-redux";
import firebase from "react-native-firebase";

class HomeComponent extends Component {
  /*componentDidMount() {
    this.props.setNavigationColor(this.props.theme.colors.primary);
  }*/
  constructor(props) {
    super(props);
    this.state = {
      Lista: [],
      contador: "",
    };
  }

  listenForItems = (itemsRef) => {
    itemsRef.on("value", (snap) => {
      var Lista = [];
      var contador = "";
      snap.forEach((child) => {
        if (child.key == "Conversations") {
          for (var prop in child.val()) {
            if (Object.prototype.hasOwnProperty.call(child.val(), prop)) {
              Lista.push({
                unreadMessages: child.val()[prop].unreadMessages,
              });
            }
          }
        }
      });
      var lista = Lista;
      var total = 0;
      for (var i = 0; i < lista.length; i++) {
        var data = lista[i];
        total = total + data.unreadMessages;
      }
      this.setState({
        contador: total,
      });
    });
  };

  componentDidMount() {
    if (this.props.loggedUser.pais == "https://www.saludvitale.com/panama_") {
      const itemsRef = firebase
        .database()
        .ref("Users")
        .child("panama")
        .child(this.props.loggedUser.user_id);
      this.listenForItems(itemsRef);
    } else {
      const itemsRef = firebase
        .database()
        .ref("Users")
        .child("ecuador")
        .child(this.props.loggedUser.user_id);
      this.listenForItems(itemsRef);
    }
    // console.log();
  }

  hola2 = () => {
    if (this.props.hola2 == "https://www.saludvitale.com/ecuador_") {
      Linking.openURL(
        "https://api.whatsapp.com/send?phone=593995509104&text=Hola"
      );
    } else
      Linking.openURL(
        "https://api.whatsapp.com/send?phone=50769486913&text=Hola"
      );
  };

  render() {
    return (
      <View style={{ flex: 1, marginLeft: 4, marginRight: 20 }}>
        {this.props.loggedUser ? (
          <UserAvatar loggedUser={this.props.loggedUser} />
        ) : null}
        <View style={baseStyles.icon1}>
          {this.state.contador > 0 ? (
            <MaterialCommunityIcons
              name="calendar-blank-outline"
              size={60}
              color="#009bd9"
              style={{ left: 62 }}
              onPress={() => {
                this.props.navigation.navigate("CalendarsScreen");
              }}
            />
          ) : (
            <MaterialCommunityIcons
              name="calendar-blank-outline"
              size={60}
              color="#009bd9"
              style={{ left: 10 }}
              onPress={() => {
                this.props.navigation.navigate("CalendarsScreen");
              }}
            />
          )}
          {this.state.contador > 0 ? (
            <Text style={baseStyles.citas2}>Citas</Text>
          ) : (
            <Text style={baseStyles.citas}>Citas</Text>
          )}

          {this.state.contador == 0 ? (
            <MaterialCommunityIcons
              name="chat"
              size={60}
              color="#009bd9"
              style={{ left: 40 }}
              //iconStyle={this.state.contador}
              onPress={() => {
                this.props.navigation.navigate("ChatList");
                // alert('Modulo actualmente en desarrollo');
              }}
            />
          ) : (
            <MaterialCommunityIcons
              name="chat"
              size={60}
              color="#009bd9"
              style={{ left: 90 }}
              //iconStyle={this.state.contador}
              onPress={() => {
                this.props.navigation.navigate("ChatList");
                // alert('Modulo actualmente en desarrollo');
              }}
            />
          )}

          {this.state.contador > 0 ? (
            <Text
              style={{
                top: 4,
                marginLeft: 70,
                color: "white",
                fontWeight: "bold",
                fontSize: 8,
                borderWidth: 1,
                borderColor: "red",
                borderRadius: 12,
                height: 23,
                width: 23,
                paddingLeft: 8,
                paddingTop: 5,
                backgroundColor: "red",
              }}
            >
              {this.state.contador}{" "}
            </Text>
          ) : null}

          {this.state.contador > 0 ? (
            <Text style={baseStyles.chat2}>Chat</Text>
          ) : (
            <Text style={baseStyles.chat}>Chat</Text>
          )}
        </View>

        <View style={baseStyles.icon2}>
          <MaterialCommunityIcons
            name="lifebuoy"
            size={60}
            color="#009bd9"
            style={{ left: 75 }}
            onPress={
              () => {
                this.hola2();
              }
              //alert('Modulo actualmente en desarrollo');
              // }
            }
          />

          <Text style={baseStyles.atencionalcliente1}>Atención al</Text>

          <Text style={baseStyles.atencionalcliente2}>Cliente</Text>

          <MaterialCommunityIcons
            name="account"
            size={60}
            color="#009bd9"
            style={{ left: 13 }}
            onPress={() => {
              alert("Modulo actualmente en desarrollo");
            }}
          />

          <Text style={baseStyles.micuenta}>Mi Cuenta</Text>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { loggedUser: state.user };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

//export default withTheme(HomeComponent);
