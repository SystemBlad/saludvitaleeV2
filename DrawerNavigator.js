import React from "react";
import {
  Platform,
  Dimensions,
  Linking,
  Text,
  Button,
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
  createSwitchNavigator,
  DrawerItems,
} from "react-navigation";
import PasswordResetScreen from "./src/components/passrecover/PasswordResetScreen";
import LoginScreen from "./src/screen/login/LoginScreen";
import HomeScreen from "./src/screen/home/HomeScreen";
import AuthLoading from "./src/screen/login/AuthLoading";
import LogoTitle from "./src/screen/home/LogoTitle";
import CerrarSesion from "./src/screen/menu/CerrarSesion";
import Contacto from "./src/screen/menu/Contacto";
import CalendarsScreen from "./src/components/appointment/Calendars";
import AddAppointment from "./src/components/appointment/AddAppointment ";
import Chat from "./src/components/Chat/Chat";
import ChatList from "./src/components/Chat/ChatList ";
import pais from "./src/screen/login/pais";
import auth from "./src/screen/login/auth";
import AppointmentDetail from "./src/components/appointment/AppointmentDetail ";
import ZoomImagen from "./src/components/Chat/ZoomImagen";
//import videoconsultation from "./src/components/Videocall/videoCall";
import ChatVideocall from "./src/components/Chat/ChatVideocall";
import { Container, Header, View } from "native-base";
import Calendars from "./src/components/appointment/Calendars";
import VIDEOCALL from "./src/components/Videocall/VIDEOCALL";

const WIDTH = Dimensions.get("window").width;

const DrawerConfig = {
  drawerWidth: WIDTH * 0.83,
};

const navigationRef = React.createRef();

function navigate(name, params) {
  navigationRef.current && navigationRef.current.navigate(name, params);
}

const HomeNavigator = createStackNavigator(
  {
    auth: {
      screen: auth,
      navigationOptions: ({ navigation }) => ({
        //title: "",
        //headerTitleStyle: { textAlign: "center", color: "#5d7fba" },
        //headerBackTitle: null
      }),
    },
    pais: {
      screen: pais,
      navigationOptions: ({ navigation }) => ({
        title: "",
        //headerTitleStyle: { textAlign: "center", color: "#5d7fba" },
        headerBackTitleStyle: {
          color: "white",
        },
        headerTintColor: "white",
      }),
    },

    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: ({ navigation }) => ({
        title: "",
        headerTitleStyle: { textAlign: "center", color: "#5d7fba" },
        headerBackTitle: null,
      }),
    },

    Inicio: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <LogoTitle />,
        headerLeft: (
          <Text
            style={{ fontSize: 28, marginLeft: 20 }}
            onPress={() => {
              console.log("press");
              navigation.toggleDrawer();
            }}
          >
            &#9776;
          </Text>
        ),
      }),
    },

    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: <LogoTitle />,
        headerLeft: (
          <Text
            style={{ fontSize: 28, marginLeft: 20 }}
            onPress={() => {
              console.log("press");
              navigation.toggleDrawer();
            }}
          >
            &#9776;
          </Text>
        ),
      }),
    },

    Chat: {
      screen: ChatList,
      navigationOptions: ({ navigation }) => ({
        title: "Chat",
        headerLeft: (
          <Text
            style={{ fontSize: 28, marginLeft: 20 }}
            onPress={() => {
              console.log("press");
              navigation.toggleDrawer();
            }}
          >
            &#9776;
          </Text>
        ),
      }),
    },

    ChatLista: {
      screen: Chat,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam("name", "name"),

        headerTitleStyle: {
          backgroundColor: "",
        },

        //headerLeft: navigation.getParam("chatRoom", "chatRoom"),
        headerBackTitle: null,
      }),
    },

    ChatVideocall: {
      screen: ChatVideocall,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam("name", "name"),
        headerTitleStyle: {
          backgroundColor: "",
        },
        headerBackTitle: null,
      }),
    },

    CalendarsScreen: {
      screen: Calendars,
      navigationOptions: ({ navigation }) => ({
        title: "",

        headerLeft: (
          <Text
            style={{ fontSize: 28, marginLeft: 20 }}
            onPress={() => {
              console.log("press");
              navigation.toggleDrawer();
            }}
          >
            &#9776;
          </Text>
        ),
        // headerBackTitle: null
      }),
    },

    ZoomImagen: {
      screen: ZoomImagen,
      navigationOptions: (navigation) => ({
        headerBackTitle: null,
      }),
    },

    AgregarCita: {
      screen: AddAppointment,
      navigationOptions: (navigation) => ({
        headerBackTitle: null,
        title: "Crear Cita",
      }),
    },

    VIDEOCALL: {
      screen: VIDEOCALL,
      navigationOptions: (navigation) => ({
        title: "",
        headerBackTitleStyle: {
          color: "white",
        },
        headerTintColor: "white",
      }),
    },

    ChatList: {
      screen: ChatList,

      navigationOptions: ({ navigation }) => ({
        title: "Chat",
        status: true,
        //  headerBackTitle: null

        headerLeft: (
          <Text
            style={{ fontSize: 28, marginLeft: 20 }}
            onPress={() => {
              console.log("press");
              navigation.toggleDrawer();
            }}
          >
            &#9776;
          </Text>
        ),
      }),
    },

    detalle: {
      screen: AppointmentDetail,
      navigationOptions: ({ navigation }) => ({
        title: "",
        status: true,
        headerBackTitle: null,
      }),
    },

    PasswordResetScreen: {
      screen: PasswordResetScreen,
      navigationOptions: ({ navigation }) => ({
        title: "",
        headerBackTitle: null,
        headerTitleStyle: { textAlign: "center", color: "#5d7fba" },
        headerLeft: (
          <Text
            style={{ fontSize: 28, marginLeft: 20 }}
            onPress={() => {
              console.log("press");
              navigation.toggleDrawer();
            }}
          >
            &#9776;
          </Text>
        ),
      }),
    },

    Contacto: {
      screen: Contacto,
    },

    AuthLoading: {
      screen: AuthLoading,
      navigationOptions: ({ navigation }) => ({
        title: "",
        headerTitleStyle: { textAlign: "center", color: "#5d7fba" },
        headerBackTitle: null,
        headerLeft: (
          <Text
            style={{ fontSize: 28, marginLeft: 20 }}
            onPress={() => {
              console.log("press");
              navigation.toggleDrawer();
            }}
          >
            &#9776;
          </Text>
        ),
      }),
    },
  },

  DrawerConfig,
  {
    navigationOptions: {
      header: (navigation) => ({
        title: "",
        left: <MenuButton navigation={navigation} />,
      }),
    },
  }
);

const AppNavigator = createDrawerNavigator({
  SaludVitale: {
    screen: HomeNavigator,
  },

  Inicio: {
    screen: HomeScreen,
  },

  Chat: {
    screen: ChatList,
  },

  CalendarsScreen: {
    screen: Calendars,
  },

  CerrarSesion: {
    screen: CerrarSesion,
  },
  Contacto: {
    screen: Contacto,
  },
  PAIS: {
    screen: pais,
  },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      App: AppNavigator,
      Auth: auth,
    },
    {
      initialRouteName: "Auth",
    }
  )
);
