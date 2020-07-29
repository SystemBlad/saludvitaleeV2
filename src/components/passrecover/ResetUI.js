import React, { Component } from 'react';
import { View, TouchableHighlight } from 'react-native';
import {
  TextInput, Button, Title, withTheme
} from 'react-native-paper';
import styles from '../../styles/stylesheets/login.stylesheet';

class ResetUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  setEmail = (email) => {
    this.setState({
      email
    });
  };

  render() {
    const { props } = this;
    return (
      <View style={styles.container}>
        <Title style={{ top: -160, fontFamily: props.theme.fonts.medium }}>
          Recupera el acceso a tu cuenta
        </Title>
        <TextInput
          style={styles.formControl}
          label="Correo electrónico"
          value={this.state.email}
          textContentType="emailAddress"
          keyboardType="email-address"
          onChangeText={text => this.setEmail(text)}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            ...styles.formControl
          }}
        >
          <TouchableHighlight>
            <Button
              onPress={() => props.mainAction({ email: this.state.email })}
              color={props.theme.colors.accent}
              mode="contained"
            >
              {props.mainButtonTitle}
            </Button>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default withTheme(ResetUI);
