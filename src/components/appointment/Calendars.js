import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  RefreshControl, ActivityIndicator
} from "react-native";
import { Calendar } from "react-native-calendars";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import { FAB } from "react-native-paper";
import baseStyles from "../../styles/stylesheets/base.stylesheets";
import { LocaleConfig } from "react-native-calendars";
//import Citas from "../../screen/SolicitudCitas/Citas";
import moment from "moment";
import axios from "axios";
import { StackActions, NavigationActions  } from 'react-navigation';
import calendarStylesheets from "../../styles/stylesheets/calendar.stylesheets";


moment.locale("es");

LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ],
  monthNamesShort: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado"
  ],
  dayNamesShort: ["Dom.", "Lun.", "Mar.", "Mie.", "Jue.", "Vie.", "Sab."],
  today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = "es";

const { width } = Dimensions.get("window");

function formatDateToString(date) {
  const dd = (date.day < 10 ? "0" : "") + date.day;
  const MM = (date.month < 10 ? "0" : "") + date.month;
  const yyyy = date.year;
  return `${yyyy.toString().substr(2, 2)}-${MM}-${dd}`;
}

class Calendars extends Component {
  static navigationOptions = {
    drawerLabel: "Citas",
    drawerIcon: ({ tintColor }) => (
      <MaterialCommunityIcons
        name="calendar-blank-outline"
        size={20}
        color="black"
      />
    )
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.onDayPress = this.onDayPress.bind(this);
    this.state = {
      date: "",
      events: [],
      reserva: [],
      fecha: "",
      modalVisible: false,
      summary: "",
      use: false, 
      isLoading: "", 
    };
    const date = new Date().getDate();
  }

   

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    const { navigation } = this.props;
    const status = navigation.getParam("status", "status");
    if (status == true) {
      this.fetchData();

    } else {
      this.fetchData();
    }
           
    this.fetchData2();
  }

 /* componentDidUpdate() {
    this.fetchData();

  }*/

  fetchData = async () => {
    //console.log(this.props.loggedUser.pais);
    const response = await fetch(
      this.props.loggedUser.pais +
        `/api/getDisponibilidadColor?id=${this.props.loggedUser.user_id}`
    );
    const cita = await response.json();
    if (this._isMounted) {
      this.setState({ show: false });
    }
    //console.log("loggedUser cita", cita);
    // this.setState({ data: cita });
    this.parseData(cita.disponibilidad);
    //this.setState({ data: cita.disponibilidad.slot_date[0]});
  };
  parseData(ApiResultData) {
    const markedDates = {};
    ApiResultData.map((data, index) => {
      markedDates[data.slot_date] = {
        color: data.color,
        selected: true,
        marked: true,
        text: data.nombre
      };
    });
    this.setState({ data: markedDates });
  }

  fetchData2 = async date => {
    // const {navigation} = this.props;
    const selectedDate = formatDateToString(date); //navigation.getParam('selectedDate', 'NO-Date');
    const response = await fetch(
      this.props.loggedUser.pais +
        `/api/getReservasId?id=${
          this.props.loggedUser.user_id
        }${"&fecha="}${selectedDate}`
    );
    const reserva = await response.json();
    //console.log("reserva", reserva);
    this.parseData2(reserva.horarios);
  };

  parseData2(ApiResultData2) {
    const resultArray = [];
    
    ApiResultData2.map((data, index) => {

      //console.log(ApiResultData);
      resultArray.push({
        start: data.inicio,
        //'HH:mm:A',
        end: data.fin,
        //end: moment(`${data.slot_date} ${' '} ${data.fin}`).format('HH:mm:A'),
        summary: data.id.toString(),
        title: data.nombre,
        nombre: data.nombre_paciente,
        apellido: data.apellido_paciente, 
        timestampNoFormat: moment(
          data.inicio,
          "HH:mm a"
        ).toDate()
      });
     
    });

    resultArray.sort(function(a, b) {
      if (a.timestampNoFormat <= b.timestampNoFormat) return -1;

      return 0;

    });
    //console.log("resultArray", resultArray);

    this.setState({ events: resultArray });
    this.setState({isLoading: false }); 
    //console.log("events", this.state.events);
  }

  renderRow = ({ item }) => {
    return (
      <TouchableOpacity
        style={baseStyles.touchat2}
        onPress={() => {
          this.props.navigation.navigate("detalle", {
            id: item.summary,
          });
        }}
      >
        <View
          style={calendarStylesheets.vista1 }
        >
          <Text
            style={calendarStylesheets.text1}
          >
            {item.start}
            {"-"}
            {item.end}
            {""} {"-"} {""}
            {item.nombre} {item.apellido}
          </Text>
          <Text
            style={calendarStylesheets.text3}
          >
            {" "}
            {item.title}
          </Text>
          <View style={baseStyles.separadorcita}></View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {

      const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'AgregarCita' })],
    
  });


  const didBlurSubscription = this.props.navigation.addListener(
    'didBlur',
    payload => {
      console.debug('didBlur', payload);
    }
  );

    didBlurSubscription.remove();

    return (
      <View
        style={calendarStylesheets.vista2}
      >
        <Calendar
          onDayPress={day => {
            let hola="";
            this.setState({ events: hola });
            this.fetchData2(day);
            if (day.month == 1) {
              mes = "Enero";
            }
            if (day.month == 2) {
              mes = "Febrero";
            }
            if (day.month == 3) {
              mes = "Marzo";
            }
            if (day.month == 4) {
              mes = "Abril";
            }
            if (day.month == 5) {
              mes = "Mayo";
            }
            if (day.month == 6) {
              mes = "Junio";
            }
            if (day.month == 7) {
              mes = "Julio";
            }
            if (day.month == 8) {
              mes = "Agosto";
            }
            if (day.month == 9) {
              mes = "Septiembre";
            }
            if (day.month == 10) {
              mes = "Octubre";
            }
            if (day.month == 11) {
              mes = "Noviembre";
            }
            if (day.month == 12) {
              mes = "Diciembre";
            }
            //console.log(day);
            fecha = `${"Citas"} ${day.day} ${mes}`;

            //console.log(fecha);

            this.setState({ fecha: fecha });
            this.setState({isLoading: true });
          }}
          hideExtraDays
          current={this.state.date}
          minDate="2019-01-01"
          markingType="custom"
          markedDates={this.state.data}
          hideArrows={false}
          locale="es"
          style={{ fontSize: 300 }}
          theme={{
            textMonthFontSize: 25,
            textMonthFontWeight: "bold"
          }}
        />
        <View
          style={calendarStylesheets.vista3}
        >
          <Text
            style={calendarStylesheets.textfin}
          >
            {this.state.fecha}
          </Text>

          {this.state.isLoading == true ? ( 
           <ActivityIndicator size="large" color="#009bd9"/> 
           ) : null} 

          <ScrollView>
           <FlatList
              data={this.state.events}
              keyExtractor={(x, i) => i.toString()}
              renderItem={this.renderRow}
            />         
          </ScrollView>
        </View>
        <View>
          <FAB
            icon="add"
            color="white"
            style={baseStyles.fab}
            onPress={() => {
              //this.props.navigation.dispatch(resetAction);
            this.props.navigation.navigate("AgregarCita");
            
            }}
          />
        </View>
       
      </View>
    );
  }

  onDayPress(day) {
    this.setState({
      selected: this.props.navigation.navigate("AgregarCita") // day.dateString
    });
  }
}

function mapStateToProps(state) {
  return { loggedUser: state.user };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendars);



