import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  SafeAreaView,
  ScrollView,
  Button,
  Alert,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import {
  withTheme,
  TextInput,
  //Button,
  DataTable,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import DateTimePicker from "react-native-modal-datetime-picker";
import axios from "axios";
import { Header } from "react-native-elements";
import moment, { relativeTimeThreshold } from "moment";
import {
  Autocomplete,
  withKeyboardAwareScrollView,
} from "react-native-dropdown-autocomplete";
import shortid from "shortid";
import { Dropdown } from "react-native-material-dropdown";
import styles from "../../styles/stylesheets/login.stylesheet";
import baseStyles from "../../styles/stylesheets/base.stylesheets";
//import { FlingGestureHandler } from "react-native-gesture-handler";
import { StackActions, NavigationActions } from "react-navigation";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function convertToCustomTimeFormat(time) {
  const PM = !!time.match("PM");
  time = time.split(":");

  let hour = "";
  let min = "";
  hour = time[0];
  if (PM) {
    min = time[1].replace("PM", "p. m.");
  } else {
    min = time[1].replace("AM", "a. m.");
  }

  return `${hour}:${min}`;
}

class AddAppointment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clinicas: [],
      user: [],
      busqnombre: [],
      pacienteId: "",
      idClinica: "",
      data2: "",
      idUser: "",
      isVisible: false,
      chosenDate: "",
      chosenDate2: "",
      chonseDate3: "",
      email: "",
      TipoIdentificacion: "",
      data2: "",
      nombre: "",
      apellido: "",
      cedula: "",
      telefono: "",
      correo: "",
      isDateTimePickerVisible: false,
      nacimiento: "",
      isEditable: true,
      show: false,
      isDisabled: true,
      isVisible2: false,
      yo: "",
      isFocused: true,
      isLoading: "",
    };
  }

  handleInputFocus = () => this.setState({ isFocused: false });

  handleInputBlur = () => this.setState({ isFocused: false });

  validar = () => {
    validar = () => {
      if (this.state.tipo_identificacion == 999) {
        this.state.nombre ||
          this.state.apellido ||
          this.state.nacimiento ||
          this.state.data2 ||
          this.state.chosenDate ||
          this.state.chonseDate3 ||
          this.state.idClinica == "";

        alert("por favor Rellene los Campos");
      } else {
        this.state.nombre ||
          this.state.apellido ||
          this.state.cedula ||
          this.state.data2 ||
          this.state.chosenDate ||
          this.state.chonseDate3 ||
          this.state.idClinica ||
          this.state.tipo_identificacion ||
          Alert.alert("", "Por favor Rellene los Campos");
      }
    };
  };

  clickhandler() {
    this.setState({ isEditable: !this.state.isEditable });
  }

  clickhandler2() {
    this.setState({ disabled: !this.state.isdisabled });
  }

  ShowHideComponent() {
    if (this.state.TipoIdentificacion == 999) {
      this.setState({ show: true });
    } else {
      this.setState({ show: false });
    }
  }

  setcorreo = (correo) => {
    this.setState({
      correo,
    });
  };

  setNacimiento = (nacimiento) => {
    this.setState({
      nacimiento,
    });
  };

  setTipoIdentificacion = (TipoIdentificacion) => {
    this.setState({
      TipoIdentificacion,
    });
  };

  setdata2 = (data2) => {
    this.setState({
      data2,
    });
  };

  setApellido = (apellido) => {
    this.setState({
      apellido,
    });
  };

  setTelefono = (telefono) => {
    this.setState({
      telefono,
    });
  };

  setAsunto = (asunto) => {
    this.setState({
      asunto,
    });
  };

  setCedula = (cedula) => {
    this.setState({
      cedula,
    });
  };

  setEmail = (email) => {
    this.setEmail({
      email,
    });
  };

  showDateTimePicker = () => {
    this.setState({
      isDateTimePickerVisible: true,
    });
  };

  hideDateTimePicker = () => {
    this.setState({
      isDateTimePickerVisible: false,
      chonseDate3: moment().format("YYYY-MM-DD"),
    });
  };

  handleDatePicked = (date) => {
    //console.log("A date has been picked: ", date);
    this.hideDateTimePicker();
  };

  handlePicker = (datetime) => {
    this.setState({
      isVisible: false,
      chosenDate: moment(datetime).format("YYYY-MM-DD"),
      chosenDate2: moment(datetime).format("HH:mm"),
    });
  };

  hidePicker = () => {
    this.setState({
      isVisible: false,
    });
  };

  showPicker = () => {
    this.setState({
      isVisible: true,
    });
  };

  hidePicker2 = () => {
    this.setState({
      isVisible2: false,
    });
  };

  showPicker2 = () => {
    this.setState({
      isVisible2: true,
    });
  };

  handlePicker2 = (date) => {
    this.setState({
      isVisible2: false,
      chonseDate3: moment(date).format("YYYY-MM-DD"),
    });
  };

  setNombre = (nombre) => {
    this.setState({
      nombre,
    });
  };

  fetchDataClinicas = async () => {
    const response = await fetch(
      this.props.loggedUser.pais +
        `/api/getClinicasUser?id=${this.props.loggedUser.user_id}`
      // `https://www.saludvitale.com/panama/api/NombreSucursalesCitas?id=${this.props.loggedUser.user_id}`,
    );
    const sucursales = await response.json();
    this.parseData(sucursales.clinicas);
  };

  parseData(ApiResultData) {
    const value = {};
    const clinicas = [];
    ApiResultData.map((data, index) => {
      value[data.clinicas] = {
        value: data.nombre,
      };
      clinicas.push({
        label: data.nombre,
        value: data.clinica_id, //data.id,
      });
    });
    this.setState({ data: value });
    this.setState({ clinicas: clinicas });
    //console.log("clinicas", clinicas);
  }

  //
  componentDidMount() {
    this.fetchDataClinicas();
    this.ShowHideComponent();
  }

  // api por nombre y cedula para settear

  searchUserByPaciente = async (searchTerm) => {
    const response = await fetch(
      this.props.loggedUser.pais +
        `/api/getClinicasUser?id=${this.props.loggedUser.user_id}`
      // `https://www.saludvitale.com/panama/api/NombreSucursalesCitas?id=${this.props.loggedUser.user_id}`,
    );
    const busqueda = await response.json();
    //console.log("busqueda", busqueda);
    if (busqueda) {
    }
    this.setNombre(busqueda.nombre);
    this.setApellido(busqueda.apellido);
    this.setTelefono(busqueda.telefono);
    this.setcorreo(busqueda.email);
    this.setCedula(busqueda.cedula);
    this.setTipoIdentificacion(busqueda.tipo_identificacion);
  };

  //Guardar la cita
  cita = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "CalendarsScreen" })],
    });

    //console.log(this.props);
    axios
      // .post("http://phplaravel-227278-1009310.cloudwaysapps.com/panama/api/crearcita",{
      .post(this.props.loggedUser.pais + "/api/crearcita", {
        nombre: this.state.nombre,
        apellido: this.state.apellido,
        tipo_identificacion: this.state.TipoIdentificacion,
        fecha_nacimiento: `${this.state.chonseDate3}${this.state.nacimiento}`, // this.state.nacimiento,
        cedula: this.state.cedula,
        correo: this.state.correo,
        celular: this.state.telefono,
        hora_cita: this.state.chosenDate2,
        fecha_cita: this.state.chosenDate,
        clinica: this.state.idClinica,
        duracion_cita: this.state.data2,
        detalle_cita: this.state.asunto,
        idUser: this.props.loggedUser.user_id,
        id_paciente: 0,
      })

      .then((response) => {
        if (response.data.success == true) {
          Alert.alert("", "Cita creada con éxito");
          status: true, this.props.navigation.dispatch(resetAction);
        } else if (response.data.success == false) {
          this.setState({ isLoading: false });
          var message = response.data.message;
          Alert.alert("", message);
        } else {
          this.setState({ isLoading: false });
          Alert.alert("", "Por favor Rellene los Campos");
        }
      })
      .catch((error) => {});
  };

  render() {
    const { show, date, mode } = this.state;
    const autocompletes = [...Array(1).keys()];
    const { scrollToInput, onDropdownClose, onDropdownShow } = this.props;

    if (this.state.TipoIdentificacion == 999) {
      this.setState.show;
    }

    const data2 = [
      {
        value: "10 minutos",
      },
      {
        value: "15 minutos",
      },
      {
        value: "20 minutos",
      },
      {
        value: "30 minutos",
      },
      {
        value: "1 hora",
      },
    ];

    const TipoIdentificacion = [
      {
        value: "Cédula",
        isdisabled: false,
      },
      {
        value: "Pasaporte",
        isdisabled: true,
      },
      {
        value: "999",
        label: "Niño sin cédula",
        isdisabled: true,
      },
    ];

    return (
      <View>
        {this.state.isLoading == true ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : null}

        <View style={baseStyles.autocompletesContainer}>
          <Text style={baseStyles.seleccionpaciente}> Buscar Paciente</Text>
          <SafeAreaView>
            <Autocomplete
              key={shortid.generate()}
              inputStyle={baseStyles.input11}
              highLightColor="#009bd9"
              spinnerColor="#009bd9"
              scrollStyle={baseStyles.input1}
              handleSelectItem={(item, index) => {
                if (item.tipo_identificacion == 999) {
                  this.setTipoIdentificacion(item.tipo_identificacion);
                  this.setNacimiento(item.fecha_nacimiento);
                  this.setNombre(item.nombre);
                  this.setApellido(item.apellido);
                  this.setTelefono(item.celular);
                  this.setcorreo(item.email);
                } else {
                  this.setNombre(item.nombre);
                  this.setApellido(item.apellido);
                  this.setTelefono(item.celular);
                  this.setCedula(item.cedula);
                  this.setcorreo(item.email);
                  this.setTipoIdentificacion(item.tipo_identificacion);
                  this.clickhandler();
                  this.clickhandler2();
                }
                //console.log("item", item);
              }}
              onDropdownClose={() => {}}
              onDropdownShow={() => {}}
              noDataText="No Existe"
              noDataTextStyle={baseStyles.input12}
              minimumCharactersCount={2}
              highlightText
              valueExtractor={(item) =>
                `${item.cedula} ${item.nombre} ${item.apellido}`
              } //item.nombre || `${item.nombre} ${item.apellido}` || item.cedula}          //{item =>`${item.cedula}${item.nombre}${item.apellido}`}
              rightContent
              rightTextExtractor={(item) => item.properties}
              placeholder="Por nombre o cédula"
              fetchData={async (searchTerm) => {
                //console.log(fetchData);
                const response = await fetch(
                  this.props.loggedUser.pais +
                    `/api/buscarpacienteL?paciente=${searchTerm}${"&doctorid="}
                                  ${this.props.loggedUser.user_id}`
                );
                return await response.json();
              }}
            />
          </SafeAreaView>
        </View>

        <View style={{ marginTop: 15 }}></View>

        <View>
          <ScrollView
            style={{
              backgroundColor: "white",
              marginVertical: 60,
              top: -40,
            }}
          >
            <View>
              <Text style={baseStyles.agregarcitas}>Datos del Paciente</Text>
              <View
                style={{
                  top: Platform.OS === "ios" ? 30 : 31,
                  width: 135,
                  marginLeft: 38,
                }}
              >
                <Dropdown
                  label="Seleccione"
                  data={TipoIdentificacion}
                  onChangeText={(text) => this.setTipoIdentificacion(text)}
                  value={this.state.TipoIdentificacion}
                  isOptionDisabled={(TipoIdentificacio) =>
                    TipoIdentificacio.disabled === "false"
                  }
                />
              </View>

              {this.state.TipoIdentificacion != 999 ? (
                <TextInput
                  style={styles.formControl6}
                  label="Nº Identificación"
                  value={this.state.cedula}
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  //ref={input1 => { this.textInput = input1 }}
                  editable={this.state.isEditable}
                  onChangeText={(text) => this.setCedula(text)}
                />
              ) : null}
              {this.state.TipoIdentificacion == 999 ? (
                <TextInput
                  style={styles.formControl6}
                  onTouchStart={this.showPicker2} //{this.showDateTimePicker}
                  placeholder="Fecha nacimiento"
                  value={`${this.state.chonseDate3}${this.state.nacimiento}`}
                  //value={this.state.chonseDate3}
                  onChangeText={(text) => this.setNacimiento(text)}
                  //ref={input1 => { this.textInput = input1 }}
                  editable={this.state.isEditable}
                />
              ) : null}
              <TextInput
                //editable={false}
                //selectTextOnFocus={false}
                style={styles.formControl5}
                label="Nombre"
                value={this.state.nombre}
                textContentType="emailAddress"
                keyboardType="email-address"
                ref={(input) => {
                  this.textInput = input;
                }}
                onChangeText={(text) => this.setNombre(text)}
                editable={this.state.isEditable}
              />
              <TextInput
                style={styles.formControl3}
                label="Apellido"
                value={this.state.apellido}
                textContentType="emailAddress"
                keyboardType="email-address"
                //ref={input1 => { this.textInput = input1 }}
                editable={this.state.isEditable}
                onChangeText={(text) => this.setApellido(text)}
              />
              <TextInput
                style={styles.formControl10}
                label="Email"
                value={this.state.correo}
                textContentType="emailAddress"
                keyboardType="email-address"
                onChangeText={(text) => this.setcorreo(text)}
                //editable={this.state.isEditable}
                //ref={input1 => { this.textInput = input1 }}
              />
              <Text style={baseStyles.recomendacion}>
                Recomendamos colocarlo para recordar la cita al
                <Text style={baseStyles.recomendacion2}> paciente </Text>
              </Text>

              <TextInput
                style={styles.formControl10}
                label="Celular"
                value={this.state.telefono}
                textContentType="number-pad"
                keyboardType="number-pad"
                onChangeText={(text) => this.setTelefono(text)}
              />
            </View>

            <View>
              <Text style={baseStyles.selecionFecha}>
                {" "}
                Selecciona Lugar, Fecha y Hora{" "}
              </Text>

              <View
                style={{
                  top: Platform.OS === "ios" ? -285 : -275,
                  width: 290,
                  marginLeft: 38,
                }}
              >
                <Dropdown
                  data={this.state.clinicas}
                  label="Lugar"
                  value=""
                  onChangeText={(text) => {
                    this.setState({ idClinica: text });
                    //console.log(this.state.idClinica);
                  }}
                />
              </View>

              <TextInput
                style={styles.formControl4}
                label="Asunto de la Cita "
                value={this.state.asunto}
                textContentType="emailAddress"
                onChangeText={(text) => this.setAsunto(text)}
              />

              <TextInput
                onTouchStart={this.showPicker}
                style={styles.formControl8}
                label="Fecha y Hora"
                value={`${this.state.chosenDate}  ${this.state.chosenDate2}`}
              />
              <DateTimePicker
                isVisible={this.state.isVisible}
                onConfirm={this.handlePicker}
                onCancel={this.hidePicker}
                mode="datetime"
                locale="es"
              />
              <DateTimePicker
                isVisible={this.state.isVisible2}
                onConfirm={this.handlePicker2}
                onCancel={this.hidePicker2}
                mode="date"
                locale="es"
                mode="date"
                locale="es"
                is24Hour="false"
              />
              <View
                style={{
                  top: Platform.OS === "ios" ? -450 : -432,
                  width: 290,
                  marginLeft: 38,
                }}
              >
                <Dropdown
                  label="Duración de la cita"
                  data={data2}
                  onChangeText={(text) => this.setdata2(text)}
                  value={this.state.data2}
                />
              </View>
            </View>

            <View style={styles.buttonn}>
              <TouchableHighlight
                style={styles.but2}
                onPress={() => {
                  {
                    this.setState({ isLoading: true });
                    this.cita();
                  }
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                  }}
                >
                  {" "}
                  Guardar{" "}
                </Text>
              </TouchableHighlight>
            </View>

            <View style={{ marginBottom: Platform.OS === "ios" ? 210 : 0 }}>
              <Text></Text>
            </View>

            <View>
              <Text></Text>
            </View>
          </ScrollView>
        </View>

        <View></View>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddAppointment);
