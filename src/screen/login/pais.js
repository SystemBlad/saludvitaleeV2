import React, { Component } from "react";
import { connect } from "react-redux";
import baseStyles from "../../styles/stylesheets/base.stylesheets";
import AuthenticatorUI from "../../components/authentication/AuthenticatorUI";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import pais2Stylesheets from "../../styles/stylesheets/pais.stylesheets";
import chatStylesheets from "../../styles/stylesheets/chat.stylesheets";

const hola = "https://www.saludvitale.com/panama";

class pais extends Component {
  static navigationOptions = {
    drawerLabel: "Cambiar País",
    drawerIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name="map" size={20} color="black" />
    )
  };

  render() {

    return (
      <View >
        <Image
          source={require("../../../src/images/SaludVitale.png")}
          style={pais2Stylesheets.imagencentral}
        />

        <Text style={baseStyles.tex2}> Seleccione su país</Text>
        <View
          style={{
            top: Platform.OS === "ios" ? 150 : 120,
            marginLeft: 76,
            fontSize: 20,
            fontWeight: "bold"
          }}
        >
          <TouchableOpacity
            style={pais2Stylesheets.imagen2}
            activeOpacity={0.5}
            onPress={() => {
              const { sortDirection, query, sortBy } = this.props;
              this.props.navigation.navigate("LoginScreen", {
                ecua: "https://www.saludvitale.com/ecuador_"
                //ecua: "https://phplaravel-227278-1009310.cloudwaysapps.com/ecuador_"
              });
            }}
          >
            <Image
              style={pais2Stylesheets.ecuador}
              source={require("../../../src/images/Ecuador.png")}
            />
            <Text
              style={pais2Stylesheets.textecuador}
            >
              {" "}
              Ecuador
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={pais2Stylesheets.textpanama}
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.navigate("LoginScreen", {
                ecua: "https://www.saludvitale.com/panama_"
                //ecua: "https://phplaravel-227278-1009310.cloudwaysapps.com/panama_"
              });
            }}                                                                
          >
            <Image
              style={pais2Stylesheets.image3}
              source={require("../../../src/images/Panama.png")}
            />
            <View />
            <Text
              style={pais2Stylesheets.image4}
            >
              {" "}
              Panamá
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps() {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    onLogin: user => dispatch(login(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(pais);
