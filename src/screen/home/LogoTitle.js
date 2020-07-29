import React from "react";
import { Image, Platform } from "react-native";

export default class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require("../../images/Logoj.png")}
        style={{
          width: Platform.OS === "ios" ? "60%" : "50%",//220, //"57%",
          height: Platform.OS === "ios" ? "60%" : "50%",// 35,
          alignItems: "center",
          justifyContent: "center",
          marginLeft: Platform.OS === "ios" ? 0 : 50
        }}
      />
    );
  }
}
