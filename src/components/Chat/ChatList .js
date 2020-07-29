import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import baseStyles from "../../styles/stylesheets/base.stylesheets";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import { StackActions, NavigationActions, DrawerItems } from "react-navigation";

class ChatList extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    DrawerItems: () => {
      let total = this.navigation.state.contador;
      if (total == 2) {
        return "Chat";
      } else if (total == 0) {
        return `${"Chat22"} ${this.navigation.state.contador}`;
      }
    },

    //drawerLabel:`${navigation.state.params.name}'s Profile'`,

    drawerIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name="chat" size={20} color="black" />
    ),
  });

  constructor(props) {
    super(props);
    this.state = {
      Lista: [],
      Lista2: [],
      show: false,
      prue: "",
      showIndicator: true,
      isLoading: true,
      contador: "",
    };
  }

  listenForItems2 = (itemsRef2) => {
    itemsRef2.on("value", (snap) => {
      var Lista2 = [];
      snap.forEach((child) => {
        for (var prop in child.val()) {
          if (Object.prototype.hasOwnProperty.call(child.val(), prop)) {
            Lista2.push({
              unreadMessages: child.val()[prop].unreadMessages,
            });
          }
        }
      });
      var lista = Lista2;
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

  listenForItems = (itemsRef) => {
    itemsRef.on("value", (snap) => {
      var Lista = [];
      snap.forEach((child) => {
        if (child.key == "Conversations") {
          for (var prop in child.val()) {
            if (Object.prototype.hasOwnProperty.call(child.val(), prop)) {
              Lista.push({
                name: child.val()[prop].name,
                timestamp: child.val()[prop].timestamp,
                unreadMessages: child.val()[prop].unreadMessages,
                chatRoom: child.val()[prop].chatRoom,
                id: child.val()[prop].id,
                image: child.val()[prop].image,
                senderId: child.val().senderId,
                rol: child.val().role,
                timestampNoFormat: moment(
                  child.val()[prop].timestamp,
                  "DD/MM/YYYY HH:mm A"
                ).toDate(),
              });
            }
          }
          Lista.sort(function (a, b) {
            if (a.timestampNoFormat >= b.timestampNoFormat) return -1;
            if (a.timestampNoFormat < b.timestampNoFormat) return 1;
            return 0;
          });
        }
      });

      Lista.forEach((item, i) => {
        let NjAA =
          this.props.loggedUser.pais == "https://www.saludvitale.com/panama_"
            ? "Chat/Conversations/panama/"
            : "Chat/Conversations/ecuador/";
        var numero = firebase
          .database()
          .ref(NjAA + item.chatRoom + "/Session")
          .child(this.props.loggedUser.user_id + "/status")
          .set(false);
      });

      this.setState({
        Lista: Lista,
      });
    });
  };

  ShowHideActivityIndicator = () => {
    if (this.state.isLoading == true) {
      this.setState({ isLoading: false });
    } else {
      this.setState({ isLoading: false });
    }
  };

  /*closeActivityIndicator = () =>
    setTimeout(
      () =>
        this.setState({
          isLoading: false
        }),
      10000
    );*/

  componentDidMount() {
    if (this.props.loggedUser.pais == "https://www.saludvitale.com/panama_") {
      const itemsRef2 = firebase
        .database()
        .ref("Users")
        .child("panama")
        .child(this.props.loggedUser.user_id);
      this.listenForItems2(itemsRef2);
    } else {
      const itemsRef2 = firebase
        .database()
        .ref("Users")
        .child("ecuador")
        .child(this.props.loggedUser.user_id);
      this.listenForItems2(itemsRef2);
    }
    // console.log();

    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      if (this.props.loggedUser.pais == "https://www.saludvitale.com/panama_") {
        // if (this.props.loggedUser.pais == "https://phplaravel-227278-1009310.cloudwaysapps.com/panama_") {
        this.nuevo();
      } else {
        const itemsRef = firebase
          .database()
          .ref("Users")
          .child("ecuador")
          .child(this.props.loggedUser.user_id);

        this.listenForItems(itemsRef);
      }
    });
  }
  componentWillUnmount() {
    this.focusListener.remove();
  }

  //cambio de pais de firebase
  nuevo = () => {
    const itemsRef = firebase
      .database()
      .ref("Users")
      .child("panama")
      .child(this.props.loggedUser.user_id);
    this.listenForItems(itemsRef);
  };

  //

  renderRow = ({ item }) => {
    {
      this.setState({ isLoading: false });
    }

    if (item.image) {
      data = item.image;
      data2 = item.chatRoom;
      this.setState({ prue: item.chatRoom });
    } else {
      data = "https://www.saludvitale.com/panama/img/default.png";
    }

    return (
      <TouchableOpacity
        style={baseStyles.touchat}
        onPress={() => {
          if (
            this.props.loggedUser.pais == "https://www.saludvitale.com/panama_"
          ) {
            //  if (this.props.loggedUser.pais == "https://phplaravel-227278-1009310.cloudwaysapps.com/panama_") {
            var numer = firebase
              .database()
              .ref("Users")
              .child("panama")
              .child(this.props.loggedUser.user_id)
              .child("Conversations/" + item.chatRoom + "/unreadMessages")
              .set(0);
          } else {
            var numer = firebase
              .database()
              .ref("Users")
              .child("ecuador")
              .child(this.props.loggedUser.user_id)
              .child("Conversations/" + item.chatRoom + "/unreadMessages")
              .set(0);
          }

          this.props.navigation.navigate("ChatLista", {
            chatRoom: item.chatRoom,
            name: item.name,
            image: data,
            rol: item.role,
            id: item.id,
            timestamp: item.timestamp,
            senderId: item.senderId,
          });
        }}
      >
        <Image style={baseStyles.imagechat} source={{ uri: data }} />
        <View style={baseStyles.textChat}>
          <Text style={baseStyles.nombrechat}>{item.name}</Text>
          <Text style={baseStyles.fechachat}>{item.timestamp} </Text>
          {item.unreadMessages != 0 ? (
            <Text style={baseStyles.cantdmensajes}> {item.unreadMessages}</Text>
          ) : null}
          <View style={baseStyles.separadorchat}></View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View>
        {this.state.isLoading == true ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : null}

        <View style={baseStyles.flatLisChat}>
          <FlatList data={this.state.Lista} renderItem={this.renderRow} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
