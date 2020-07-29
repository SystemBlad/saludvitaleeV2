import { StyleSheet, Platform } from "react-native";

 export default StyleSheet.create({
     vista:{
        marginTop: Platform.OS === "ios" ? -65 : 45,
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
        marginLeft: 25,
        marginRight: 10


     },

     vista2:{
        marginTop: Platform.OS === "ios" ? -60 : 40,
        top: Platform.OS === "ios" ? 200 : 0,
        alignItems: "center",
        flex: 1,
        flexDirection: "column",
        marginRight: 25
     },
     text1:{
        marginTop: Platform.OS === "ios" ? -48 : -48,
        fontWeight: "bold",
        fontSize: 30,
        marginLeft: Platform.OS === "ios" ? 27 : 27
     },

     vista3:{
        marginTop: Platform.OS === "ios" ? 13 : 13,
        marginLeft: 10,
        flex: 1,
        flexDirection: "column"
     },

     text4:{
        marginTop: Platform.OS === "ios" ? 30 : 30,
        fontWeight: "bold",
        fontSize: 15,
        flexDirection: "column"
   
     },
     text5:{
        marginTop: 7,
        fontSize: 14,
        marginLeft: 3
     }, 
     text6:{
        marginTop: 12,
        fontWeight: "bold",
        fontSize: 15,
        flexDirection: "column"
     },
     text7:{
        marginTop: 9,
        fontSize: 14,
        marginLeft: 3
     },
     text8:{
        marginTop: 10,
        fontWeight: "bold",
        fontSize: 15,
        flexDirection: "column"
     },
     text9:{
        marginTop: 9,
        fontSize: 14,
        marginLeft: 3
     }, 

     text10:{
        marginTop: 10,
        fontWeight: "bold",
        fontSize: 15,
        flexDirection: "column"
     },
     text11:{
        marginTop: 7,
        fontSize: 14,
        marginLeft: 3
     }, 
     text12:{
        marginTop: Platform.OS === "ios" ? -40 : 52,
        fontWeight: "bold",
        fontSize: 15,
        marginLeft: Platform.OS === "ios" ? 160 : 156,

        flexDirection: "column",
        top: Platform.OS === "ios" ? -165 : -276,
     }, 
     text13:{
         
          fontSize: 14,
          marginLeft: 166,
          flexDirection: "column",
          marginTop: Platform.OS === "ios" ? -156 : -270,
          
     },
      text14:{
        marginTop: 36,
        fontSize: 14,
        marginLeft: 166,
        flexDirection: "column",
        marginTop: Platform.OS === "ios" ? 12 : 15,
     }, 
     text15:{
        marginTop: -4,
        fontWeight: "bold",
        fontSize: 15,
        marginLeft: 162,
        flexDirection: "column",
        top: Platform.OS === "ios" ? 15 : 13,
     }, 
     text16:{
        marginTop: 31,
        fontSize: 14,
        marginLeft: 164,
        flexDirection: "column",
        top: Platform.OS === "ios" ? -5 : -9,
    },
        text17:{
            marginTop: 6,
            fontWeight: "bold",
            fontSize: 15,
            marginLeft: 163,
            flexDirection: "column",
            top: Platform.OS === "ios" ? -5 : -5,
        },
  
        vista14:{
            flexDirection:'row', flex: 1, flexWrap: 'wrap',flexShrink: 1,top: Platform.OS === "ios" ? -40 : -40,
        },
        text18:{
                marginTop: 36,
                fontSize: 14,
                marginLeft: 168,
                marginRight: Platform.OS ==="ios" ? 2 : 0,
                flexDirection: "column",
        }, 
        text19:{
            width: 340,
            marginLeft: Platform.OS === "ios" ? 10 : 10,
            top: Platform.OS === "ios" ? 10 : -13
        }, 
        text20:{
            marginTop: Platform.OS === "ios" ? 560 : 430,
            height: Platform.OS === "ios" ? 40 : 40,
            backgroundColor: "#009bd9",
            padding: Platform.OS === "ios" ? 2 : 9,
            borderRadius: 8,
            marginLeft: Platform.OS === 'ios' ? 10 : 10,
        },
         text21:{
            alignItems: "center",
            color: "white",
            //backgroundColor: '#005094',
            fontWeight: "bold",
            fontSize: 18,
            marginLeft: Platform.OS === "ios" ? 131 : 126,
            marginTop: Platform.OS === "ios" ? 8 : 1,
        }




 })