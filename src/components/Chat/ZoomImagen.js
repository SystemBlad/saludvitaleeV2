import React, { Component } from "react";
import { connect } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { StackActions, NavigationActions } from "react-navigation";
import { View, AsyncStorage, Alert, Image, Dimensions } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
import { Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

class ZoomImagen extends Component {
  render() {
    const { navigation } = this.props;
    const name2 = navigation.getParam("name2", "name2");
    const images = [
      {
        // Simplest usage.
        url: name2,
        //   width:
        //   height:
        //   Optional, if you know the image size, you can set the optimization performance

        //   You can pass props to <Image />.
        //   props: {
        //     // headers: ...
        //   },
        // },
        // {
        //   url: "",
        //   props: {
        //     // Or you can set source directory.
        //     //source: require('../background.png')
        //   },
      },
    ];

    return <ImageViewer imageUrls={images} />;
  }

  //   render() {
  //     const { navigation } = this.props;
  //     const name2 = navigation.getParam("name2", "name2");
  //     return (
  //       <View
  //         style={{
  //           justifyContent: "center",
  //           alignItems: "center",
  //           marginTop: -50,
  //         }}
  //       >
  //         <ImageZoom
  //           cropWidth={Dimensions.get("window").width}
  //           cropHeight={Dimensions.get("window").height}
  //           imageWidth={400}
  //           imageHeight={700}
  //         >
  //           <Image
  //             style={{ width: "100%", height: "100%" }}
  //             source={{ uri: name2 }}
  //           />
  //           {/* nota: el height para android es 300, el width:400, imageheight:300 */}
  //         </ImageZoom>
  //       </View>
  //     );
  //   }
}

function mapStateToProps(state) {
  return { loggedUser: state.user };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ZoomImagen);
