import { ActivityIndicator } from "react-native";

export default (state = {}, action) => {
  
  switch (action.type) {
    case 'LOG_IN':
      //console.log(action.user);
      return action.user;
      
     case 'LOG_OUT':
      return {
        ...initialstate
      };
  
    default:
      return state;
      
  };
};
















