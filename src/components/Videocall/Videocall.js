import React, { Component, useRef, useEffect } from "react";
import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo,
} from "react-native-twilio-video-webrtc";
import {
  View,
  Platform,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import axios from "axios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "react-native-firebase";
import callvideo from "../../styles/stylesheets/callvideo.stylesheet";

import {
  checkMultiple,
  request,
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from "react-native-permissions";

const _checkPermissions = (callback) => {
  const iosPermissions = [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE];
  const androidPermissions = [
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.ANDROID.RECORD_AUDIO,
  ];
  checkMultiple(
    Platform.OS === "ios" ? iosPermissions : androidPermissions
  ).then((statuses) => {
    const [CAMERA, AUDIO] =
      Platform.OS === "ios" ? iosPermissions : androidPermissions;
    if (
      statuses[CAMERA] === RESULTS.UNAVAILABLE ||
      statuses[AUDIO] === RESULTS.UNAVAILABLE
    ) {
      Alert.alert("Error", "Hardware to support video calls is not available");
    } else if (
      statuses[CAMERA] === RESULTS.BLOCKED ||
      statuses[AUDIO] === RESULTS.BLOCKED
    ) {
      Alert.alert(
        "Error",
        "Permission to access hardware was blocked, please grant manually"
      );
    } else {
      if (
        statuses[CAMERA] === RESULTS.DENIED &&
        statuses[AUDIO] === RESULTS.DENIED
      ) {
        requestMultiple(
          Platform.OS === "ios" ? iosPermissions : androidPermissions
        ).then((newStatuses) => {
          if (
            newStatuses[CAMERA] === RESULTS.GRANTED &&
            newStatuses[AUDIO] === RESULTS.GRANTED
          ) {
            callback && callback();
          } else {
            Alert.alert("Error", "One of the permissions was not granted");
          }
        });
      } else if (
        statuses[CAMERA] === RESULTS.DENIED ||
        statuses[AUDIO] === RESULTS.DENIED
      ) {
        request(statuses[CAMERA] === RESULTS.DENIED ? CAMERA : AUDIO).then(
          (result) => {
            if (result === RESULTS.GRANTED) {
              callback && callback();
            } else {
              Alert.alert("Error", "Permission not granted");
            }
          }
        );
      } else if (
        statuses[CAMERA] === RESULTS.GRANTED ||
        statuses[AUDIO] === RESULTS.GRANTED
      ) {
        callback && callback();
      }
    }
  });
};

class VIDEOCALL extends Component {
  state = {
    isAudioEnabled: true,
    isVideoEnabled: true,
    status: "disconnected",
    participants: new Map(),
    videoTracks: new Map(),
    roomName: "",
    token: "",
    enabled: true,
  };

  componentDidMount() {
    // this.prueba(),
    //this._checkPermissions();
    this._onConnectButtonPress();
  }
  //

  _locuras = () => {
    const { navigation } = this.props;
    const id = navigation.getParam("id", "id");
    axios
      .post(this.props.loggedUser.pais + "/api/state_call", {
        paciente: id,
        doctor: this.props.loggedUser.user_id,
      })
      .then((response) => {
        if (response.data.success === true) {
        } else {
          console.log("algo salio mal");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  _onConnectButtonPress = () => {
    _checkPermissions(() => {
      // _checkPermissions();
      //this.conectartoken();
      const { navigation } = this.props;
      const chatRoom2 = navigation.getParam("room", "room");
      axios
        .post(this.props.loggedUser.pais + "/api/access_token", {
          //.post("https://phplaravel-227278-1009310.cloudwaysapps.com/panama_/api/access_token",{
          roomName: chatRoom2,
          identity: `${this.props.loggedUser.first_name} ${this.props.loggedUser.last_name}`,
        })
        .then((response) => {
          if (response.data.success === true) {
            try {
              this.twilioRef.connect({
                roomName: chatRoom2,
                accessToken: response.data.token,
              });
            } catch (error) {
              console.log(error);
            }
            this.setState({ status: "connecting" });
          } else {
            console.log("algo salio mal");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  // ocultar = () => {
  //   this.setState({
  //     enabled: !this.state.enabled,
  //   });
  // };

  _onEndButtonPress = () => {
    // this.twilioRef.disconnect();
    // this.props.navigation.navigate("Chat1");
    this.end();
  };

  end() {
    Alert.alert(
      "",
      "¿Desea Salir?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "SI",
          onPress: () => {
            //this.twilioRef.disconnect();
            //this._Call();
            this.props.navigation.navigate("ChatLista");
          },
        },
      ],
      { cancelable: false }
    );
  }

  _Call = () => {
    const { navigation } = this.props;
    const chatRoom2 = navigation.getParam("room", "room");
    const id = navigation.getParam("id2", "id2");
    let urlref =
      this.props.loggedUser.pais == "https://www.saludvitale.com/panama_"
        ? "Chat/Conversations/panama/"
        : "Chat/Conversations/ecuador/";
    var ChatRef = firebase
      .database()
      .ref(urlref + chatRoom2 + "/Messages/" + id);
    ChatRef.update({ callStatus: "rating" });
    this._locuras();
  };

  _onMuteButtonPress = () => {
    this.twilioRef
      .setLocalAudioEnabled(!this.state.isAudioEnabled)
      .then((isEnabled) => this.setState({ isAudioEnabled: isEnabled }));
  };

  _onFlipButtonPress = () => {
    this.twilioRef.flipCamera();
  };

  _onRoomDidConnect = () => {
    this.setState({ status: "connected" });
  };

  _onRoomDidDisconnect = ({ roomName, error }) => {
    console.log("ERROR: ", error);
    this.setState({ status: "disconnected" });
  };

  _onRoomDidFailToConnect = (error) => {
    console.log("ERROR: ", error);
    this.setState({ status: "disconnected" });
  };

  _onParticipantAddedVideoTrack = ({ participant, track }) => {
    console.log("onParticipantAddedVideoTrack: ", participant, track);
    this.setState({
      videoTracks: new Map([
        ...this.state.videoTracks,
        [
          track.trackSid,
          { participantSid: participant.sid, videoTrackSid: track.trackSid },
        ],
      ]),
    });
  };

  _onParticipantRemovedVideoTrack = ({ participant, track }) => {
    console.log("onParticipantRemovedVideoTrack: ", participant, track);
    const videoTracks = this.state.videoTracks;
    videoTracks.delete(track.trackSid);
    this.setState({ videoTracks: new Map([...videoTracks]) });
  };

  setTwilioRef = (ref) => {
    this.twilioRef = ref;
  };

  render() {
    return (
      <View style={callvideo.container}>
        <View style={callvideo.callContainer}>
          <View style={callvideo.remoteGrid}>
            {Array.from(
              this.state.videoTracks,
              ([trackSid, trackIdentifier]) => {
                return (
                  <TwilioVideoParticipantView
                    style={callvideo.remoteVideo}
                    key={trackSid}
                    trackIdentifier={trackIdentifier}
                  />
                );
              }
            )}
          </View>

          <View style={callvideo.optionsContainer}>
            <TouchableOpacity
              style={callvideo.optionButton}
              onPress={this._onEndButtonPress}
            >
              <MaterialCommunityIcons
                name="phone-outline"
                size={23}
                color="#ffffff"
                style={((justifyContent = "center"), (alignItems = "center"))}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={callvideo.optionButton2}
              onPress={this._onMuteButtonPress}
            >
              {this.state.isAudioEnabled == true ? (
                <MaterialCommunityIcons
                  name="microphone"
                  size={23}
                  color="#ffffff"
                  style={((justifyContent = "center"), (alignItems = "center"))}
                  //   onPress={() => {{this.state.isAudioEnabled}}
                  // }
                />
              ) : (
                <MaterialCommunityIcons
                  name="microphone-off"
                  size={23}
                  color="#ffffff"
                  style={((justifyContent = "center"), (alignItems = "center"))}
                  // onPress={() => {{this.state.isAudioEnabled}}}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={callvideo.optionButton2}
              onPress={this._onFlipButtonPress}
            >
              <MaterialCommunityIcons
                //name="video-outline"
                name="video-switch"
                size={23}
                color="#ffffff"
                style={((justifyContent = "center"), (alignItems = "center"))}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={callvideo.optionButton2}
              onPress={() => {
                //this.props.navigation.navigate("Chat1");
                const { navigation } = this.props;
                const chatRoom = navigation.getParam("room", "room");
                const name = navigation.getParam("name", "name");
                const id = navigation.getParam("id", "id");
                const image = navigation.getParam("image", "image");
                this.props.navigation.navigate("ChatVideocall", {
                  chatRoom: chatRoom,
                  id: id,
                  name: name,
                  image: image,
                });
              }}
            >
              <MaterialCommunityIcons
                name="message-reply-text"
                size={25}
                color="#ffffff"
                style={((justifyContent = "center"), (alignItems = "center"))}
              />
            </TouchableOpacity>
            <TwilioVideoLocalView enabled={true} style={callvideo.localVideo} />
            <View />
          </View>
        </View>
        {/* ) : null} */}

        <TwilioVideo
          ref={this.setTwilioRef}
          onRoomDidConnect={this._onRoomDidConnect}
          onRoomDidDisconnect={this._onRoomDidDisconnect}
          onRoomDidFailToConnect={this._onRoomDidFailToConnect}
          onParticipantAddedVideoTrack={this._onParticipantAddedVideoTrack}
          onParticipantRemovedVideoTrack={this._onParticipantRemovedVideoTrack}
        />
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

//export default connect(mapStateToProps, mapDispatchToProps)(videoconsultation);
export default connect(mapStateToProps, mapDispatchToProps)(VIDEOCALL);
