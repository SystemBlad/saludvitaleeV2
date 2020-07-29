import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    //backgroundColor: "#ffffff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formControl: {
    width: "90%",
    marginTop: 20,
    top: Platform.OS === "ios" ? -130 : -130,
  },

  formControl2: {
    width: "75%",
    height: "8%",
    marginTop: 4,
    marginLeft: 25,
    top: -72,
  },

  formControl3: {
    width: "40%",
    height: "8%",
    marginTop: 84,
    marginLeft: 195,
    top: Platform.OS === "ios" ? -193 : -190,
  },

  formControl7: {
    width: "40%",
    height: "8%",
    marginTop: 15,
    marginLeft: 195,
    top: -168, //-205
  },

  formControl10: {
    width: "85%",
    height: "8%",
    marginTop: 18,
    marginLeft: 28,
    top: -182, //-205
  },

  formControl5: {
    width: "40%",
    height: "8%",
    marginTop: -120,
    marginLeft: Platform.OS === "ios" ? 27 : 29,
    top: Platform.OS === "ios" ? -50 : -52, //-140
  },

  formControl6: {
    width: "40%",
    height: "8%",
    marginTop: Platform.OS === "ios" ? 163 : 171,
    marginLeft: 195,
    top: -199, //-213
  },

  formControl7: {
    /* width: '40%',
    height: '5%',
    marginTop: 15,
    marginLeft: 195,
    top: -868//-213*/

    width: "40%",
    height: "8%",
    marginTop: 15,
    marginLeft: 195,
    top: -170, //-213
  },

  formControl8: {
    width: "85%",
    height: "13%",
    fontSize: 20,
    top: Platform.OS === "ios" ? -287 : -297,
    marginLeft: 30,
  },

  formControl4: {
    width: "86%", //era un 85 en android
    height: "16%",
    marginTop: 10,
    marginLeft: 26,
    top: Platform.OS === "ios" ? -105 : -145,
    //marginTop:Platform.OS ==="ios" ? 80 : 0
    //paddingTop:Platform.OS ===  "ios" ? 100 : 0 ,
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
    top: Platform.OS === "ios" ? 240 : 225,
  },

  imagen: {
    top: Platform.OS === "ios" ? -180 : -128,
  },

  buton: {
    alignItems: "center",
    marginLeft: 22,
    width: 320,
    height: 36,
    marginTop: -40,
  },

  buton2: {
    alignItems: "center",
    marginTop: 25,
    width: 320,
    height: 36,
    top: -127,
    // marginRight: 50
    marginLeft: -320,
  },

  buton3: {
    // alignItems: 'center',
    // marginTop: 45,
    width: 320,
    height: 36,
    top: Platform.OS === "ios" ? 70 : 58,
    marginRight: 20,
    marginLeft: -320,
  },

  buton4: {
    // alignItems: 'center',
    // marginTop: 45,
    width: 320,
    height: Platform.OS === "ios" ? 36 : 33,
    top: Platform.OS === "ios" ? 170 : 140,
    marginRight: 440,
    marginLeft: Platform.OS === "ios" ? 50 : 94,
  },

  hairline: {
    backgroundColor: "#A2A2A2",
    height: 2,
    width: 315,
    top: Platform.OS === "ios" ? 140 : 120,
    marginLeft: Platform.OS === "ios" ? 69 : 74,
  },
  hairline2: {
    backgroundColor: "#A2A2A2",
    height: 2,
    width: 375,
    top: 1,
  },

  but2: {
    marginLeft: 27,
    top: Platform.OS === "ios" ? -362 : -392,
    alignItems: "center",
    backgroundColor: "#009bd9",
    padding: 9,
    borderRadius: 8,
  },

  but36: {
    marginTop: -300,
    top: Platform.OS === "ios" ? -150 : 850,
    backgroundColor: "#009bd9",
    padding: 9,
    borderRadius: 8,
  },

  buttonn: {
    // marginLeft: 200,
    width: 340,
    //marginTop: 20
  },

  buttonn2: {
    // marginLeft: 200,
    width: 310,
    // marginTop: 20
  },

  buttonn1: {
    // marginLeft: 200,
    width: 340,

    // marginTop: 20
  },

  calendar: {
    top: 50,
    backgroundColor: "#21A0D8",
    width: 90,
    marginLeft: 40,
  },
  container5: {
    flex: 1,
    marginTop: 1,
  },

  button223: {
    marginTop: Platform.OS === "ios" ? 10 : -30,
    top: Platform.OS === "ios" ? -45 : 60,
  },

  but22: {
    alignItems: "center",
    backgroundColor: "#5d7fba",
    padding: 9,
  },
});
