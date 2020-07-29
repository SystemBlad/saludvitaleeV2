import Apiconstantes from "./ APIs";
import axios from "axios";
import { email, password, device_token } from "../screen/login/LoginScreen";

export const login1 = () => {
  let URL = pais + Apiconstantes.login;
  //  return axios.post(URL), {
  //           email: "pix.appmovil@gmail.com",
  //           password: "j_12345",//new Buffer(user.password).toString("base64"),
  //           device_token: "",
  //         }.then(
  //     response => {
  //         if (response.data && response.data.success == true) {
  //           if (response.data.data[0].user_type==2){
  //           this.props.navigation.navigate("HomeScreen");
  //           }else{
  //             Alert.alert('', "Disculpe App solo para Profesionales");
  //           }
  //         } else {
  //           Alert.alert('', "Usuario o Contraseña Inconrrecta");
  //         }
  //       })
  //       .catch(error => {
  //      });
};

export default login1;
