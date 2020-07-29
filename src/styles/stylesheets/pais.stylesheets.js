import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({

imagencentral:{
top: Platform.OS === "ios" ? 110 : 80,
marginLeft: 57,
marginRight: 5,
marginTop: 30,
width: 260,
height: 50
},
imagen2:{
    borderColor: "#C5C4C4",
    borderRadius: 1,
    borderWidth: 1,
    padding: Platform.OS === "ios" ? 9 : 9,
    borderRadius: 8,
    width: 230,
    height: 55
},

ecuador:{
    //margintop: 255,
    marginLeft: 30,
    width: 50,
    height: 30
},

 textecuador:{
        top: -25,
        marginLeft: 102,
        fontSize: 20
 },

 textpanama:{
    borderColor: "#C5C4C4",
    borderRadius: 1,
    borderWidth: 1,
    padding: Platform.OS === "ios" ? 9 : 9,
    borderRadius: 8,
    width: 230,
    height: 55,
    marginTop: 20
 },
 image3:{
    top: 2,
    marginLeft: 30,
    width: 50,
    height: 30
 },
 image4:{
    top: -25,
    marginLeft: 105,
    fontSize: 20
 }


})