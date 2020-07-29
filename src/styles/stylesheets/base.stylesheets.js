import { StyleSheet, Platform } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  fab: {
    position: "absolute",
    margin: Platform.OS === "ios" ? 12 : 12,
    right: 0,
    bottom: Platform.OS === "ios" ? 30 : 30,
    color: "white",
    backgroundColor: "#21A0D8" // '#005094',
  },

  joa: {
    backgroundColor: "blue"
  },

  card: {
    margin: 10
  },

  icon1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    top: 120
  },
  
  icon2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    top: Platform.OS === "ios" ? -20 : 40
  },

  citas: {
    fontWeight: "bold",
    right: 38,
    top: 70,
    color: "black"
  },

  citas2: {
    fontWeight: "bold",
    right: -16
    ,
    top: 70,
    color: "black"
  },

  agregarcitas: {
    fontWeight: "bold",
    top: Platform.OS === "ios" ? 27 : 27,
    marginLeft: 115,
    fontSize: 17
  },

   recomendacion:{
    top: Platform.OS === "ios" ? -180 : -180,
    marginLeft: 33,
    fontSize: 13,
    color:"grey"

   },

   recomendacion2:{
    top: Platform.OS === "ios" ? -175 : -175,
    marginLeft:-60,
    fontSize: 13,
    color:"grey",
    alignItems:'center', 
    justifyContent:'center'

   },

  selecionFecha: {
    fontWeight: "bold",
    top: Platform.OS === "ios" ? -290 : -270,
    marginLeft: 70,
    fontSize: 16
  },

  seleccionpaciente: {
    top: -30,
    fontWeight: "bold",
    marginLeft: 30,
    fontSize: 19
  },

  titulo: {
    top: -100,
    fontSize: 28,
    marginLeft: 30,
    fontWeight: "bold"
  },

  chat: {
    fontWeight: "bold",
    right: 10,
    top: 70,
    color: "black"
  },

  chat2: {
    fontWeight: "bold",
    right: 47,
    top: 70,
    color: "black"
  },

  atencionalcliente1: {
    fontWeight: "bold",
    left: 8,
    top: 65,
    color: "black"
  },

  atencionalcliente2: {
    fontWeight: "bold",
    right: 55,
    top: 85,
    color: "black"
  },

  micuenta: {
    fontWeight: "bold",
    right: 50,
    top: 65,
    color: "black"
  },
  image: {
    height: "15%",
    width: "27%",
    borderRadius: 64,
    marginLeft: Platform.OS === "ios" ? 140 : 128,
    top: Platform.OS === "ios" ? 130 : 115
  },

  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: 64,
    top: -80
  },

  tex: {
    fontWeight: "bold",
    top: 90,
    marginLeft: 120
  },

  alerta: {
    top: 350
  },

  nombre: {
    fontWeight: "bold",
    marginRight: -240,
    marginLeft: Platform.OS === "ios" ? -35 : -28,
    top: Platform.OS === "ios" ? -65 : -65
  },

  lupa: {
    top: Platform.OS === "ios" ? -410 : 0,
    marginLeft: Platform.OS === "ios" ? 310 : 0
  },

  check: {
    width: "29%",
    marginLeft: 268,
    top: -85
  },

  buthora: {
    width: 258,
    height: 58,
    backgroundColor: "blue",
    top: -190
  },

  input: {
    //maxHeight: 150,
    borderColor: "#009bd9"

    
    
    //height: 50,
   
  },

  input1: {
    borderColor: "white",// "#c7c6c1",
    width: 313,
    top: -10 , //5,
  
  
  },
  
  input11: {
    borderColor:  "#c7c6c1",
    width: 313,
    top: -10 , //5,
  
  },

  input12: {
    borderColor:  "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
 
  
  },


  input2: {
    borderColor:"#c7c6c1",
    width: 250,//313
    top: -10, //5,
    
    marginLeft:-25,
    // maxHeight: 150,
    //height: '300%',
    zIndex: 1000
  },

  inputContainer: {
    display: "flex",
    flexShrink: 0,
    flexGrow: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor:"#c7c6c1", //"#ffffff",
    paddingVertical: 13,
    paddingLeft: 1,
    paddingRight: "5%",
    width: "130%",
    justifyContent: "flex-start"
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },

  tex2: {
    color: "black", //'#6C6C6C',
    fontSize: 20,
    marginLeft: 103,
    top: Platform.OS === "ios" ? 125 : 90
  },
  tex3: {
    color: "#6C6C6C",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 98,
    top: 130
  },
  tex4: {
    color: "#6C6C6C",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 40,
    top: 130
  },

  tex5: {
    color: "#6C6C6C",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 152,
    top: 130
  },

  plus: {
    position: "absolute",
    left: 1,
    top: 1
  },

  autocompletesContainer: {
    paddingTop: 0,
    //top: Platform.OS === 'ios' ? -8 : -28,
    top: 40,
    borderColor:"#c7c6c1",
    //zIndex: 1,
    width:"87%",
    paddingHorizontal: 4,
    marginLeft: 20
  },

  textChat: {
    flexDirection: "column",
    marginLeft: 2,
    marginRight: 2,
    flex: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5
  },

  imagechat: {
    height: 50,
    width: 50,
    borderRadius: 64,
    borderWidth: 2,
    borderColor: "#C5C4C4",
    top: 7
    // marginLeft: -50
  },

  imagec: {
    height: 100,
    width: 100,
    borderRadius: 64,
    borderWidth: 2,
    borderColor: "#009bd9",
    marginLeft: Platform.OS === "ios" ? 105 : 105,
    //marginRight: 70
  },
  AVATAR: {
    height: 40,
    width: 40,
    borderRadius: 64,
    borderWidth: 2,
    borderColor: "#C5C4C4",
    marginTop: 15,
    marginLeft: Platform.OS === "ios" ? 320 : 308,
    //marginRight:-40,
    justifyContent: "flex-start",
    flexDirection: "row",
    zIndex: 0
  },

  Avatar2: {
    height: 40,
    width: 40,
    borderRadius: 64,
    borderWidth: 2,
    borderColor: "#C5C4C4",
    marginTop: 15,
    marginRight: 30, //58,
    marginLeft: 8,
    flexDirection: "column"
  },

  separadorchat: {
    backgroundColor: "#C5C4C4",
    height: 1,
    width: 370,
    marginTop: 11,
    marginLeft: -75
  },

  separadorcita: {
    backgroundColor: "#CAC8C8", //'#A2A2A2',
    height: 1,
    width: 250,
    marginTop: 20,
    marginLeft: 30
  },
  nombrechat: {
    fontSize: 16,
    fontWeight: "bold",
    top: 6
  },

  fechachat: {
    fontSize: 16,
    marginTop: 6
  },

  cantdmensajes: {
    fontSize: 18,
    marginLeft: 235,
    marginTop: -34,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "gray",
    backgroundColor: "#C5C4C4",
    alignItems: "center",
    width: 30,
    height: 30,
    paddingLeft: 3,
    paddingTop: 1.5,
    fontWeight: "bold"
  },

  touchat: {
    top: 4,
    padding: -5,
    flexDirection: "row",
    marginLeft: 25,
    borderBottomColor: "#ccc",
     //height: hp('20%'), // 70% of height device screen
    width: wp('85%') 
 
  },

  imageGaleria: {
    marginTop: 20,
    minWidth: 200,
    height: 200
  },

  disabledBtn4: {
    backgroundColor: 'rgba(3,155,229,0.5)'
  },

  btn4: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: 'rgb(3, 154, 229)',
    marginTop: 20,
    alignItems: 'center'
  },

  touchat2: {
    top: -21,
    padding: 20,
    flexDirection: "row",
    borderBottomColor: "#ccc"
  },

  flatLisChat: {
    top: 2
    //marginTop: 15,
  },

  separadorchat2: {
    width: 380,
    backgroundColor: "black",
    top: -150
  },

  flexLayout: {
    flex: 0.5,
    flexDirection: "row"
  },

  flexLayout2: {
    flex: 2,
    flexDirection: "row"
  },

  flexLayout3: {
    flex: 5,
    flexDirection: "row"
  },

  flexLayout4: {
    flex: 3,
    flexDirection: "row"
  },

  flexLayout5: {
    flex: 1,
    flexDirection: "row"
  },

  send21: {
    top: Platform.OS === "ios" ? -31 : 13,
    marginLeft: Platform.OS === "ios" ? 336 : 323,
    marginRight: Platform.OS ==="ios" ? 0 : 0
  },

  send22: {
    top: Platform.OS === "ios" ? -67 : -18,
    marginLeft: Platform.OS === "ios" ? 13 : 11,
    marginRight: Platform.OS ==="ios" ? -5: 0,
  },

  agregarcalendar: {
    top: Platform.OS === "ios" ? -70 : -72,
    marginLeft: Platform.OS === "ios" ? 290 : 258,
    margin: 6
  }
});
