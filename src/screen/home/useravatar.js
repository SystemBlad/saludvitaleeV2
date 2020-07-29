import React, {Component} from 'react';
import {Image, View, Text} from 'react-native';
import baseStyles from '../../styles/stylesheets/base.stylesheets';
import {login} from '../../container/Login/actions/user';

class useravatar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.loggedUser.image) {
      data = this.props.loggedUser.image;
    } else {
      data = 'https://www.saludvitale.com/panama/img/default.png';
    }

    return (
      <View style={baseStyles.image}>
        <Image style={baseStyles.imageContainer} source={{uri: data}} />
        {this.props.loggedUser.first_name ? (
          <Text style={baseStyles.nombre}>
            {`Hola, ${this.props.loggedUser.first_name} ${this.props.loggedUser.last_name} `}
          </Text>
        ) : null}
      </View>
    );
  }
}

export default useravatar;
