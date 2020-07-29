import { StyleSheet, Platform } from "react-native";

 export default StyleSheet.create({

    vista1:{
        top: 25,
        marginTop: 35
    },

    text1:{
        fontSize: 16,
        marginTop: -40,
        marginLeft: 30
    },

    text3:{
        fontSize: 16,
        marginLeft: Platform.OS === "ios" ? 29 : 27
    },

    vista2:{
        flex: 4
    },

    vista3:{
        flex: 1
    },

    textfin:{
        fontWeight: "bold",
        fontSize: 19,
        marginTop: Platform.OS === "ios" ? 30 : 15,
        marginLeft: 122
    },

    calendar: {
        top: 25,
        borderTopWidth: 1,
        paddingTop: 5,
        borderBottomWidth: 1,
        borderColor: "#eee",
        height: 350
      },
      text: {
        textAlign: "center",
        borderColor: "#bbb",
        padding: 10,
        backgroundColor: "#eee"
      },
      container: {
        flex: 1,
        backgroundColor: "white"
      }

 })