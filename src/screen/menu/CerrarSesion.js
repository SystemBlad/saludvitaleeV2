import React, { Component } from "react";
import { connect } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { StackActions, NavigationActions  } from 'react-navigation';
import {
  View,
  AsyncStorage,Alert, Text, 
  Image,
  TouchableOpacity
} from "react-native";

class CerrarSesion extends Component {
  static navigationOptions = {
    drawerLabel: "Cerrar Sesion",
    drawerIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name="logout" size={20} color="black" />
    )
  };

  _signOutAsync = async () => {
     await AsyncStorage.clear();
     }

  componentDidMount() {
      this.focusListener = this.props.navigation.addListener('didFocus', () => {
          this._signOutAsync();
          this.logout();
      });
  }

  componentWillUnmount() {
        this.focusListener.remove();
  }

  logout() {
          const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'auth' })],
            });
          const { navigation} = this.props;
    axios
      .post(this.props.loggedUser.pais + "/api/authentication/logout", {
         user_id: this.props.loggedUser.user_id
      })
      .then(response => {
         if (response.data.success == true) {
           
            this.props.navigation.dispatch(resetAction);
          } else {
        }

      }).catch(error => {
        //console.log(error);

      });
      //
  }

  render() {
    return(
       <View>
          
          
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

export default connect(mapStateToProps, mapDispatchToProps)(CerrarSesion);
