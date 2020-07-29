import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Calendar } from "react-native-calendars";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { FAB } from "react-native-paper";
import baseStyles from "../../styles/stylesheets/base.stylesheets";
import { LocaleConfig } from "react-native-calendars";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import detailStylesheets from "../../styles/stylesheets/detail.stylesheets";

class AppointmentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state = {
      data1: "",
      data2: "",
      data3: "",
      data4: "",
      data5: "",
      data6: "",
      data7: "",
      data8: "",
      data9: "",
      data10: "",
      data11: "",
      id: "",
      isLoading2: "",
    };
  }

  componentDidMount() {
    this.detalle();
  }

  detalle = () => {
    this.setState({ isLoading2: true });
    const { navigation } = this.props;
    const id = navigation.getParam("id", "id");
    axios
      .get(this.props.loggedUser.pais + "/api/getUserDoc?", {
        params: {
          slot_id: id, //167857,
        },
      })
      .then((response) => {
        if (response.data.success === true) {
          if (response.data.user[0].nombre) {
            this.setState({ data1: response.data.user[0].paciente_nombre });
          } else {
            this.setState({ data1: response.data.user[0].paciente_nombre });
          }

          if (response.data.user[0].slot_status == 0) {
            this.setState({ data6: "Confirmada" });
          } else {
            this.setState({ data6: "No Confirmada" });
          }

          if (response.data.user[0].paciente_celular != "") {
            this.setState({ data8: response.data.user[0].paciente_celular });
          } else {
            this.setState({ data8: response.data.user[0].paciente_telefono });
          }

          this.setState({ data2: response.data.user[0].paciente_apellido });
          this.setState({ data3: response.data.user[0].inicio });
          this.setState({ data4: response.data.user[0].fin });
          this.setState({ data5: response.data.user[0].slot_date });
          this.setState({ data7: response.data.user[0].detalle });
          this.setState({ data9: response.data.user[0].tipoConsulta });
          this.setState({ data10: response.data.user[0].sucursal_nombre });
          this.setState({ data11: response.data.user[0].paciente_profile_pic });
          this.setState({ isLoading2: false });
        }
      })
      .catch((error) => {});
  };

  render() {
    return (
      <View>
        {this.state.isLoading2 == true ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : null}

        <View style={detailStylesheets.vista}>
          <View style={detailStylesheets.vista2}>
            <Text style={detailStylesheets.text1}>Detalle Reserva</Text>

            <View style={detailStylesheets.vista3}>
              <Image
                style={baseStyles.imagec}
                source={{ uri: this.state.data11 }}
              />
              <Text style={detailStylesheets.text4}> Paciente: </Text>

              <Text style={detailStylesheets.text5}>
                {this.state.data1} {this.state.data2}
              </Text>
              <Text style={detailStylesheets.text6}> Centro: </Text>

              <Text style={detailStylesheets.text7}>{this.state.data10}</Text>

              <Text style={detailStylesheets.text8}> Consulta: </Text>

              <Text style={detailStylesheets.text9}>{this.state.data9} </Text>

              <Text style={detailStylesheets.text10}> Estatus Cita: </Text>

              <Text style={detailStylesheets.text11}>{this.state.data6} </Text>

              <Text style={detailStylesheets.text12}> Fecha Consulta: </Text>

              <Text style={detailStylesheets.text13}>{this.state.data5} </Text>

              <Text style={detailStylesheets.text14}>
                {this.state.data3} - {this.state.data4}{" "}
              </Text>

              <Text style={detailStylesheets.text15}> Celular: </Text>
              <Text style={detailStylesheets.text16}> {this.state.data8} </Text>
              <Text style={detailStylesheets.text17}> Asunto: </Text>
              <View style={detailStylesheets.vista14}>
                <Text style={detailStylesheets.text18}>
                  {this.state.data7}{" "}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={detailStylesheets.text19}>
          <TouchableHighlight
            style={detailStylesheets.text20}
            onPress={() => {
              {
                this.props.navigation.navigate("CalendarsScreen");
                //this.setModalVisible(!this.state.modalVisible);
              }
            }}
          >
            <Text style={detailStylesheets.text21}> Cerrar </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { loggedUser: state.user };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDetail);
