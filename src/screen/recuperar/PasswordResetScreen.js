import React, { Component } from "react";
import ResetUI from "../../components/restaurarcontr/ResetUI";

class PasswordResetScreen extends Component {
  render() {
    return (
      <ResetUI
        setEmail={this.setEmail}
        mainButtonTitle="Recuperar"
        mainAction={this.createUser}
      />
    );
  }
}

export default PasswordResetScreen;
