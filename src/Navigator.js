import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import PasswordResetScreen from './screen/recuperar/PasswordResetScreen';
import LoginScreen from './screen/login/LoginScreen';
import HomeScreen from './screen/home/HomeScreen';
import AuthLoading from './screen/login/AuthLoading';

const AuthNavigator = createStackNavigator(
  {
    // Navegador
    Reset: PasswordResetScreen,
    Login: LoginScreen
  },
  {
    initialRouteName: 'Login'
  }
);

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: 'SaludVitale Doctores'
    }),
    initialRouteName: 'Home'
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthNavigator,
      App: AppNavigator,
      AuthLoading
    },
    {
      initialRouteName: 'Auth'
    }
  )
);
