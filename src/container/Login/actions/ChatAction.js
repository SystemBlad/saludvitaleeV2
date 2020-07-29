import {FETCHING, MESSAGE_RECIVED} from '../reducers/index';
import firebase from 'react-native-firebase';

export const sendMessage = (text, /*user*/) => {
    return (dispatch) => {
        const chatMessages = {
            text,
            //id:user
        };
        firebase.database().ref('Chat').push(Conversations);  
    }
}

//function fetchMessage () {
export const fetchMessage = () => {
    return (dispatch) => {
        dispatch({ type: FETCHING });
        firebase.database().ref('Chat').child('chatRoom')
        //firebase.database().ref('Chat')
            .arderBykey()
            .limitToLast(60)
            .on('value', (snapshot) => {
                const data = snapshot.val() || [];
                handleData(dispatch, data);
         });
    }
        
}

const handleData = (data) => {
    const Messages = [];
    Object.values(data).forEach(msg => {
        Messages.unshift(msg)
    });

    dispatch({ type: MESSAGE_RECIVED, payload: Messages })
    
}



