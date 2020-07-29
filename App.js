import React, {Component, Fragment} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  AsyncStorage,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import store from './store';
import DrawerNavigator from './DrawerNavigator';
import firebase from 'react-native-firebase';
//import PushNotification from "react-native-push-notification";
import type { Notification, NotificationOpen } from 'react-native-firebase';


import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import ChatList  from "./src/components/Chat/ChatList ";
import { NavigationActions } from 'react-navigation';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const MyTheme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: '#009bd9',
    accent: '#009bd9',
  },
};


export default class App extends Component {

    getToken = () => {
     fcmToken = firebase.messaging().getToken();
      if (fcmToken) {
      // console.log(fcmToken);
          }
    };
                 checkPermission = async () => {
                   const enabled = await firebase.messaging().hasPermission();
                   if (enabled) {
                     this.getToken();
                   } else {
                     this.requestPermission();
                   }
                 };

                 requestPermission = async () => {
                   try {
                     await firebase.messaging().requestPermission();
                     this.getToken();
                   } catch (error) {
                     //console.log("permission rejected");
                   }
                 };

                createNotificationListeners =   async () => {
                   this.onUnsubscribeNotificaitonListener = firebase
                     .notifications()
                     .onNotification(notification => {
                       firebase
                         .notifications()
                         .displayNotification(notification)
                     })
                 };

                 removeNotificationListeners = () => {
                   this.onUnsubscribeNotificaitonListener();
                 };

                 componentDidMount() {
                   const channel = new firebase.notifications.Android.Channel(
                     "test-channel",
                     "Test Channel",
                     firebase.notifications.Android.Importance.Max
                   ).setDescription("My apps test channel");
                     firebase.notifications().android.createChannel(channel);
                     this.checkPermission();
                     this.createNotificationListeners();
                     this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
                      // Process your notification as required
                      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
                  });

                  
                    this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
                      // Process your notification as required
                    });

                     this.removeNotificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
                         this._navigatorRef.dispatch(
                             NavigationActions.navigate({ routeName: 'ChatList'})
                         );
                     });
                 }

                
                 componentWillUnmount() {
                   this.removeNotificationListeners();
                   this.notificationDisplayedListener();
                   this.removeNotificationOpenedListener();
                 }

                 render() {
                      return (
                     <PaperProvider theme={MyTheme}>
                       <StoreProvider store={store}>
                         <DrawerNavigator
                             ref={(navigatorRef) => {
                                 this._navigatorRef = navigatorRef;
                             }}
                         />
                       </StoreProvider>
                       
                      </PaperProvider>

                   );
                 }
               }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
