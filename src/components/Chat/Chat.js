import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableHighlight,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  AsyncStorage,
  Dimensions,
  Animated,
  Modal,
  ActivityIndicator,
  Alert,
  Button,
  TouchableOpacity,
} from "react-native";
import { Header } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import {
  sendMessage,
  fetchMessage,
} from "../../container/Login/actions/ChatAction";
import baseStyles from "../../styles/stylesheets/base.stylesheets";
import { bindActionCreators } from "redux";
import axios from "axios";
import firebase from "react-native-firebase";
import moment from "moment";
import ImagePicker from "react-native-image-picker";
import chatStylesheets from "../../styles/stylesheets/chat.stylesheets";
import detailStylesheets from "../../styles/stylesheets/detail.stylesheets";
import VIDEOCALL from "../Videocall/Videocall";

function convertToCustomTimeFormat(time) {
  const PM = !!time.match("PM");
  time = time.split(":");

  let hour = "";
  let min = "";
  hour = time[0];
  if (PM) {
    min = time[1].replace("PM", "p. m.");
  } else {
    min = time[1].replace("AM", "a. m.");
  }

  return `${hour}:${min}`;
}

const { width } = Dimensions.get("window");

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      handle: "",
      Lista: [],
      data: [],
      Messages: "",
      orderBy: [],
      Lista2: [],
      show: false,
      Lista3: [],
      vasquez: "",
      imgSource: "",
      photo: "",
      isLoading: false,
      idMessage: "",
      cantidadMensajes: "",
      stadoline: "",
      ver: "",
      ver2: "",
      ver3: "",
    };
  }
  listenForItems = (itemsRef) => {
    itemsRef.on("value", (snap) => {
      var Lista3 = [];
      snap.forEach((child) => {
        for (var prop in child.val()) {
          if (Object.prototype.hasOwnProperty.call(child.val(), prop)) {
            Lista3.push({
              status: child.val()[prop].status,
            });
          }
        }
      });
      this.setState({
        Lista3: Lista3,
      });
      //console.log(this.state.Lista3);
    });
  };

  componentDidMount() {
    let images;
    const { navigation } = this.props;
    const chatRoom = navigation.getParam("chatRoom", "chatRoom");
    const name = navigation.getParam("name", "name");
    const id = navigation.getParam("id", "id");
    let urlref =
      this.props.loggedUser.pais == "https://www.saludvitale.com/panama_"
        ? "Chat/Conversations/panama/" + chatRoom + "/Session"
        : "Chat/Conversations/ecuador/" + chatRoom + "/Session";
    const itemsRef = firebase
      .database()
      .ref(urlref)
      .child(id + "/status");
    this.listenForItems(itemsRef);
    this.fetchMessage(chatRoom);
    this.quantityMessage(chatRoom, id);
    let state_sec =
      this.props.loggedUser.pais == "https://www.saludvitale.com/panama_"
        ? "Chat/Conversations/panama/"
        : "Chat/Conversations/ecuador/";
    var numero = firebase
      .database()
      .ref(state_sec + chatRoom + "/Session")
      .child(this.props.loggedUser.user_id + "/status")
      .set(true);
  }
  onTyping(text) {
    if (text && text.length >= 1) {
      this.setState({
        disabled: false,
        Messages: text,
      });
    } else {
      this.setState({ disabled: true });
    }
    AsyncStorage.getItem("images")
      .then((data) => {
        images = JSON.parse(data) || [];
        this.setState({ images: images });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // subir imagen
  handleChoosePhoto = () => {
    const options = {
      title: "Selecciona La Imagen",
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({ isLoading: true });
        //this.setState({photo:""});
        //this.setState({Messages:""})
        const { navigation } = this.props;
        const chatRoom = navigation.getParam("chatRoom", "chatRoom");
        //console.log(chatRoom);
        var hola = Math.random();
        let urlref =
          this.props.loggedUser.pais == "https://www.saludvitale.com/panama_"
            ? "Conversation_Images/panama/" + chatRoom + "/"
            : "Conversation_Images/ecuador/" + chatRoom + "/";
        const storageRef = firebase
          .storage()
          .ref(urlref + hola)
          .put(response.uri);

        storageRef.on(
          `state_changed`,
          (snapshot) => {
            // console.log(snapshot);
            if (snapshot.bytesTransferred == snapshot.totalBytes) {
              snapshot.ref.getDownloadURL().then((url) => {
                var photo = url;
                this.setState({
                  photo: photo,
                });
              });
            }
          },
          (error) => {
            console.log(error.message);
          },
          () => {
            var refe = this;
            setTimeout(function () {
              refe.onSendBtnPressed();
            }, 500);
            // refe.setState({isLoading: false });
          }
        );
      }
    });
  };

  // finaliza el codigo de subir imagen!!!
  push = () => {
    const { navigation } = this.props;
    const id = navigation.getParam("id", "id");
    axios
      .post(this.props.loggedUser.pais + "/api/NotificacionChatPaciente", {
        user_id: id,
        doctor_id: this.props.loggedUser.user_id,
        mensaje: this.state.Messages, //this.state.vasquez
      })
      .then((response) => {
        if (response.data.success === true) {
        } else {
        }
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  fetchMessage(chatRoom) {
    let urlref =
      this.props.loggedUser.pais == "https://www.saludvitale.com/panama_"
        ? "Chat/Conversations/panama"
        : "Chat/Conversations/ecuador";
    firebase
      .database()
      .ref(urlref)
      .child(chatRoom)
      .child("Messages")
      .orderByKey()
      .on("value", (snapshot) => {
        //console.log("snapshot.val()", snapshot.val());
        //console.log("lista", this.state.Lista);
        var Lista = [];
        snapshot.forEach((child) => {
          //console.log(child.key, child.val());
          Lista.push({
            message: child.val().message,
            senderName: child.val().senderName,
            timestamp: child.val().timestamp,
            senderId: child.val().senderId,
            type: child.val().type,
            callStatus: child.val().callStatus,
            id: child.val().id,
            chatRoom: chatRoom,
            senderImage: child.val().senderImage,
            orderBy: ["timestamp", "desc"],
            key: child.key,

            timestampNoFormat: moment(
              child.val().timestamp,
              "DD/MM/YYYY HH:mm:ss A"
            ).toDate(),
          });
        });

        var total = "";
        var total3 = "";
        var total2 = "";
        for (var i = 0; i < Lista.length; i++) {
          var data = Lista[i];
          if (data.type == "videocall") {
            if (data.callStatus == "active") {
              total = data.type;
              total3 = data.key;
              total2 = data.callStatus;
            }
          }
        }
        this.setState({
          ver: total,
          ver2: total2,
          ver3: total3,
        });

        console.log(this.state.ver);
        console.log(this.state.ver2);
        console.log(this.state.ver3);

        Lista.sort(function (a, b) {
          // DESCENDING order.
          if (a.timestampNoFormat == a.timestampNoFormat) return -1;
          return 0;
        });
        this.setState({ Lista: Lista });
        console.log("lista", this.state.Lista);
      });
  }
  end(id) {
    Alert.alert(
      "",
      "¿Desea finalizar con la videoconsulta?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "SI", onPress: () => this.endCall(id) },
      ],
      { cancelable: false }
    );
  }
  endCall(id) {
    const { navigation } = this.props;
    const chatRoom2 = navigation.getParam("chatRoom", "chatRoom");
    let urlref =
      this.props.loggedUser.pais == "https://www.saludvitale.com/panama_"
        ? "Chat/Conversations/panama/"
        : "Chat/Conversations/ecuador/";
    var ChatRef = firebase
      .database()
      .ref(urlref + chatRoom2 + "/Messages/" + id);
    ChatRef.update({ callStatus: "rating" });
  }

  onSendBtnPressed() {
    const { navigation } = this.props;
    const chatRoom = navigation.getParam("chatRoom", "chatRoom");
    const id = navigation.getParam("id", "id");
    this.sendMessage();
    this.push();
    this.textInput.clear();
    var neww = parseInt(this.state.cantidadMensajes);
    if (this.state.stadoline == true) {
      var unreadMsg = 0;
    }
    if (this.state.stadoline == false) {
      var unreadMsg = neww + 1;
    }
    let urlref =
      this.props.loggedUser.pais == "https://www.saludvitale.com/panama_"
        ? "Users/panama"
        : "Users/ecuador";
    var numer = firebase
      .database()
      .ref(urlref)
      .child(id)
      .child("Conversations/" + chatRoom + "/unreadMessages")
      .set(unreadMsg);
    this.setState({ photo: "" });
    this.setState({ Messages: "" });
    Keyboard.dismiss();
    // //
  }
  quantityMessage(romm, id) {
    let urlref =
      this.props.loggedUser.pais == "https://www.saludvitale.com/panama_"
        ? "Users/panama"
        : "Users/ecuador";
    firebase
      .database()
      .ref(urlref)
      .child(id)
      .child("Conversations")
      .child(romm)
      .orderByKey()
      .on("value", (snapshot) => {
        let hola = [];
        snapshot.forEach((child) => {
          hola.push(child.val());
        });
        var ultimo = hola[hola.length - 1];
        this.setState({
          cantidadMensajes: ultimo,
        });
      });
    let urlref2 =
      this.props.loggedUser.pais == "https://www.saludvitale.com/panama_"
        ? "Chat/Conversations/panama"
        : "Chat/Conversations/ecuador";
    firebase
      .database()
      .ref(urlref2)
      .child(romm)
      .child("Session")
      .child(id)
      .on("value", (snapshot) => {
        snapshot.forEach((child) => {
          this.setState({
            stadoline: child.val(),
          });
        });
      });
  }

  sendMessage = (Messages) => {
    var now = moment().format();
    // var currentDate = moment().format("DD/MM/YYYY HH:mm A");
    const { navigation } = this.props;
    const chatRoom2 = navigation.getParam("chatRoom", "chatRoom");
    const id = navigation.getParam("id", "id");
    const name = navigation.getParam("name", "name");
    const image = navigation.getParam("image", "image");
    //console.log(currentDate);
    if (this.state.Messages != "" || this.state.photo != "") {
      var currentDate =
        moment().format("DD/MM/YYYY") +
        " " +
        convertToCustomTimeFormat(moment().format("HH:mm A"));

      let urlref =
        this.props.loggedUser.pais == "https://www.saludvitale.com/panama_"
          ? "Chat/Conversations/panama/" + chatRoom2 + "/Messages"
          : "Chat/Conversations/ecuador/" + chatRoom2 + "/Messages";
      var ChatRef = firebase.database().ref(urlref);

      var num = this.props.loggedUser.user_id;
      var n = num.toString();
      var nom = `${this.props.loggedUser.first_name} ${this.props.loggedUser.last_name}`;

      var newMessageRef = ChatRef.push();
      var idMessage = newMessageRef.key;
      if (this.state.photo == "") {
        newMessageRef.set(
          {
            id: idMessage,
            message: this.state.Messages,
            senderId: n,
            senderImage: this.props.loggedUser.image,
            senderName: nom,
            timestamp: currentDate,
            type: "text",
          },
          function (err) {}
        );
        this.setState({ photo: "" });
        this.setState({ Messages: "" });
      } else {
        newMessageRef.set(
          {
            id: idMessage,
            message: this.state.photo, // Messages,
            senderId: n,
            senderImage: this.props.loggedUser.image,
            senderName: nom,
            timestamp: currentDate,
            type: "image",
          },
          function (err) {
            // console.log("callback complete! ", err);
          }
        );
        this.setState({ photo: "" });
        this.setState({ Messages: "" });
        this.setState({ isLoading: false });
      }
    }
  };

  keyExtractor = (item, index) => index;

  render() {
    const { navigation } = this.props;
    //recordar que en estas constantes estoy manejando los stilos de imag primeras 4 linea
    const { uploading, imgSource, progress, images } = this.state;
    const windowWidth = Dimensions.get("window").width;
    const disabledStyle = uploading ? baseStyles.disabledBtn4 : {};
    const actionBtnStyles = [baseStyles.btn4, disabledStyle];
    const { photo } = this.state;
    const chatRoom3 = navigation.getParam("chatRoom", "chatRoom");
    const id3 = this.state.ver3;
    const image3 = navigation.getParam("image", "image");
    const name3 = navigation.getParam("name", "name");
    const timestamp3 = navigation.getParam("timestamp", "timestamp");
    const senderId = navigation.getParam("senderId", "senderId");
    var now = moment().format();
    const { Lista } = this.state;
    console.log(id3);
    const name = navigation.getParam("name", "name");
    const extraBtnStyle = this.state.disabled
      ? chatStylesheets.disableBtn
      : chatStylesheets.enableBtn;
    let behavior = "";
    if (Platform.OS == "ios") {
      behavior = "padding";
    }

    return (
      <View style={chatStylesheets.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={chatStylesheets.container}
        >
          {this.state.ver == "videocall" && this.state.ver2 == "active" ? (
            <View>
              <Text style={chatStylesheets.tex44}>Consulta</Text>
              <Text style={chatStylesheets.tex45}>Online</Text>
              <View style={chatStylesheets.buttonEmpezar1}>
                <TouchableHighlight
                  style={chatStylesheets.text20}
                  onPress={() =>
                    this.props.navigation.navigate("VIDEOCALL", {
                      room: chatRoom3,
                      name: name3,
                      image: image3,
                      id: senderId,
                      timestamp: timestamp3,
                      id2: id3,
                    })
                  }
                >
                  <Text style={chatStylesheets.text21}> INICIAR </Text>
                </TouchableHighlight>
              </View>
              <View style={chatStylesheets.butonFinalizar1}>
                <TouchableHighlight
                  style={chatStylesheets.text20}
                  onPress={() => this.end(id3)}
                >
                  <Text style={chatStylesheets.text22}> FINALIZAR</Text>
                </TouchableHighlight>
              </View>
              <View style={chatStylesheets.hairline3} />
            </View>
          ) : null}

          <FlatList
            inverted
            data={this.state.Lista}
            renderItem={({ item }) => (
              (isMyMessage = item.senderId == this.props.loggedUser.user_id),
              (textContainerExtra = isMyMessage
                ? chatStylesheets.textContainerRight
                : chatStylesheets.textContainerleft),
              (textContainerExtra2 = isMyMessage
                ? chatStylesheets.textContainer
                : chatStylesheets.textContainer21),
              (image21 = isMyMessage = isMyMessage
                ? baseStyles.AVATAR
                : baseStyles.Avatar2),
              (
                <View style={chatStylesheets.messageContainer}>
                  <Image style={[image21]} source={{ uri: item.senderImage }} />
                  <View style={[textContainerExtra2, textContainerExtra]}>
                    <Text style={chatStylesheets.sender}>
                      {item.senderName}
                    </Text>

                    {item.type == "image" ? (
                      <TouchableHighlight
                        style={styles.but2}
                        onPress={() => {
                          {
                            this.props.navigation.navigate("ZoomImagen", {
                              name2: item.message,
                            });
                          }
                        }}
                      >
                        <Image
                          style={chatStylesheets.chatimage}
                          source={{ uri: item.message }}
                        />
                      </TouchableHighlight>
                    ) : (
                      <Text style={chatStylesheets.message}>
                        {item.message}{" "}
                      </Text>
                    )}
                    {item.type == "videocall" && item.callStatus == "active" ? (
                      <View>
                        <View style={chatStylesheets.buttonEmpezar}>
                          <TouchableHighlight
                            style={chatStylesheets.text200}
                            onPress={() =>
                              this.props.navigation.navigate("VIDEOCALL", {
                                room: item.chatRoom,
                                name: item.senderName,
                                image: item.senderImage,
                                id: item.senderId,
                                timestamp: item.timestamp,
                                id2: item.id,
                              })
                            }
                          >
                            <Text style={chatStylesheets.text21}>
                              {" "}
                              INICIAR{" "}
                            </Text>
                          </TouchableHighlight>
                        </View>
                        <View style={chatStylesheets.butonFinalizar}>
                          <TouchableHighlight
                            style={chatStylesheets.text200}
                            onPress={() => this.end(item.id)}
                          >
                            <Text style={chatStylesheets.text22}>
                              {" "}
                              FINALIZAR
                            </Text>
                          </TouchableHighlight>
                        </View>
                        <Text style={chatStylesheets.time}>
                          {item.timestamp}
                        </Text>
                      </View>
                    ) : null}
                    {item.type == "text" || item.type == "image" ? (
                      <Text tyle={chatStylesheets.hora}>{item.timestamp}</Text>
                    ) : null}
                  </View>
                </View>
              )
            )}
          />
          {this.state.isLoading == true ? (
            <ActivityIndicator
              style={
                ((flex = 1),
                (marginTop = -30),
                (position = "relative"),
                (zIndex = 1000))
              }
              size="large"
              color="#009bd9"
            />
          ) : null}
          <View styles={chatStylesheets.vista}>
            <View styles={chatStylesheets.inputBar}>
              <TextInput
                style={chatStylesheets.textBox}
                multiline
                defaultHeight={30}
                onChangeText={(text) => this.onTyping(text)}
                ref={(input) => {
                  this.textInput = input;
                }}
              />
            </View>
            <MaterialCommunityIcons
              style={[extraBtnStyle]}
              disabled={this.state.disabled}
              name="send"
              o
              size={34}
              color="#009bd9"
              style={baseStyles.send21}
              onPress={this.onSendBtnPressed.bind(this)}
            />

            <View style={{ width: 40 }}>
              <MaterialCommunityIcons
                name="camera-image"
                o
                size={30}
                color="#009bd9"
                style={baseStyles.send22}
                onPress={this.handleChoosePhoto}
                //disabled={uploading}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

function mapStateToProps(state) {
  return {
    loggedUser: state.user,
    fetching: state.chat.fetching,
    messages: state.chat.messages,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchMessage: fetchMessage,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
