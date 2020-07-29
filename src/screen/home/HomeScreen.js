import React, {Component} from 'react';
import {IconButton} from 'react-native-paper';
import {AsyncStorage, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import HomeComponent from '../../components/home/HomeComponent';

class HomeScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    headerStyle: {
      backgroundColor: navigation.getParam('backgroundColor') || '#222',
    },
    headerTitleStyle: {
      color: 'white',
    },

    headerLeft: (
      <Text
        style={{fontSize: 28, marginLeft: 20}}
        onPress={() => {
         // console.log('press');
          navigation.toggleDrawer();
        }}>
        &#9776;
      </Text>
    ),

    headerRight: (
      <IconButton
        icon="power-settings-new"
        color="white"
        onPress={async () => {
          await AsyncStorage.clear();
          navigation.navigate('Auth');
        }}
      />
    ),
  });

  static navigationOptions = {
    drawerLabel: 'Inicio',
    drawerIcon: ({tintColor}) => (
      <MaterialCommunityIcons name="home" size={20} color="black" />
    ),
    headerLeft: (
      <Text
        style={{fontSize: 28, marginLeft: 20}}
        onPress={() => {
          //console.log('press');
          navigation.toggleDrawer();
        }}>
        &#9776;
      </Text>
    ),
  };

  setNavigationColor = color => {
    this.props.navigation.setParams({
      backgroundColor: color,
    });
  };

  render() {
    return (
      <HomeComponent
        setNavigationColor={this.setNavigationColor}
        loggedUser={this.props.loggedUser}
        navigation={this.props.navigation}
      />
    );
  }
}

function mapStateToProps(state) {
  return {loggedUser: state.user};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
