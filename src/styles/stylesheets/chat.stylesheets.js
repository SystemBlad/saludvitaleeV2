import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  inputBar: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 55,
    paddingVertical: Platform.OS === "ios" ? 10 : 10,
    backgroundColor: "#dadfea",
  },
  textBox: {
    borderRadius: 2,
    borderWidth: 2,
    borderColor: "#C5C4C4",
    fontSize: Platform.OS === "ios" ? 14 : 17,
    paddingHorizontal: Platform.OS === "ios" ? 22 : 22,
    paddingVertical: Platform.OS === "ios" ? 22 : 1,
    //flex: 1,
    top: Platform.OS === "ios" ? 60 : 50,
    marginRight: 47, //40,
    marginLeft: 54, //8,
    //estos campos son para ios
    marginBottom: Platform.OS === "ios" ? 50 : 0,
  },

  sendButton: {
    top: Platform.OS === "ios" ? 640 : 640,
    paddingLeft: 0.5,
    paddingRight: 0.5,
    marginLeft: 330,
  },
  hora: {
    top: 15,
    marginTop: 30,
  },

  enableBtn: {
    backgroundColor: "#005094",
  },

  disableBtn: {
    backgroundColor: "#009bd9",
  },

  vista: {
    flex: 1,
  },

  messageContainer: {
    flexDirection: "row",
    padding: 2,
    flex: 20,
  },

  textContainer: {
    flexDirection: "column",
    marginLeft: -280,
    marginRight: 60,
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: Platform.OS === "ios" ? 10 : 10,
  },

  textContainer21: {
    flexDirection: "column",
    marginRight: 86,
    marginLeft: -24,
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 10,
  },

  textContainerleft: {
    alignItems: "flex-start",
    backgroundColor: "#C5C4C4",
  },

  textContainerRight: {
    alignItems: "flex-end",
    backgroundColor: "#009bd9",
  },

  message: {
    fontSize: 16,
  },

  sender: {
    fontWeight: "bold",
    paddingRight: 10,
    fontSize: 16,
  },
  chatimage: {
    width: 200,
    height: 150,
  },
  buttonEmpezar: {
    marginRight: Platform.OS === "ios" ? 45 : 46,
    marginTop: Platform.OS === "ios" ? 4 : 4,
    width: Platform.OS === "ios" ? 100 : 85,
  },

  butonFinalizar: {
    marginLeft: Platform.OS === "ios" ? 105 : 108,
    marginTop: Platform.OS === "ios" ? -30 : -30,
    width: Platform.OS === "ios" ? 104 : 85,
  },

  buttonEmpezar1: {
    marginLeft: Platform.OS === "ios" ? 124 : 134,
    marginTop: Platform.OS === "ios" ? 4 : 4,
    width: Platform.OS === "ios" ? 100 : 85,
    top: -39,
  },

  butonFinalizar1: {
    marginLeft: Platform.OS === "ios" ? 234 : 244,
    marginTop: Platform.OS === "ios" ? -47 : -47,
    width: Platform.OS === "ios" ? 104 : 85,
    top: -22,
  },

  texthora: {
    top: Platform.OS === "ios" ? -1 : 5,
  },

  but5: {
    marginLeft: 27,
    top: Platform.OS === "ios" ? -362 : -392,
    alignItems: "center",
    backgroundColor: "#009bd9",
    padding: 9,
    borderRadius: 8,
  },

  time: {
    top: 2,
  },
  hairline3: {
    backgroundColor: "lightgrey",
    height: 1,
    width: 375,
    top: 1,
  },

  text20: {
    height: Platform.OS === "ios" ? 30 : 30,
    backgroundColor: "#005094",
    padding: Platform.OS === "ios" ? 2 : 9,
    borderRadius: 8,
    //marginLeft: Platform.OS === 'ios' ? 10 : 10,
  },
  text200: {
    height: Platform.OS === "ios" ? 30 : 30,
    backgroundColor: "#005094",
    padding: Platform.OS === "ios" ? 2 : 9,
    borderRadius: 8,
    //marginLeft: Platform.OS === 'ios' ? 10 : 10,
  },

  text21: {
    alignItems: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: Platform.OS === "ios" ? 15 : 13,
    marginTop: Platform.OS === "ios" ? 3 : -4,
    marginLeft: Platform.OS === "ios" ? 16 : 7,
  },

  text22: {
    alignItems: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: Platform.OS === "ios" ? 15 : 13,
    marginTop: Platform.OS === "ios" ? 3 : -18,
    marginLeft: Platform.OS === "ios" ? 8 : 1,
  },

  tex44: {
    top: 14,
    marginLeft: 35,
    fontWeight: "bold",
    fontSize: 17,
  },

  tex45: {
    marginTop: 11,
    marginLeft: 46,
    fontWeight: "bold",
    fontSize: 17,
  },
});
