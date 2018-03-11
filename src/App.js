import React, { Component } from 'react';
import './App.css';
import 'material-ui';
import Graphy from "./Graphs/Graphy";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, IconButton } from "material-ui";
import { DeviceGraphicEq } from "material-ui/svg-icons/index";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      xvalue: null,
      yvalue: null,
      zvalue: null,
      allvalue: null,
      load: true
    };

    this.getData = this.getData.bind(this)
    this.updateData = this.updateData.bind(this)

  }

  componentDidMount() {
      setInterval(()=>{
        this.updateData()

      }, 1000);

      //console.log(this.state.load)
  }

  getData() {
    if (this.state.load) {

    return fetch('http://89.203.248.237:8086/query?db=hack&u=root&p=malina&q=select+*+from+gyro+order+by+time+desc+limit+1')
      .then((res) => res.json())
      .then((responseJson) => {
        this.setState({
          xvalue: responseJson.results[0].series[0].values[0][2],
          yvalue: responseJson.results[0].series[0].values[0][3],
          zvalue: responseJson.results[0].series[0].values[0][4],
          allvalue: [{
            "x":responseJson.results[0].series[0].values[0][2],
            "y":responseJson.results[0].series[0].values[0][3],
            "z":responseJson.results[0].series[0].values[0][4]
          }]
        })

        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      })
    }
  }

  updateData() {
    this.getData()
  }


  render() {

    return (
        <MuiThemeProvider>
          <div className="App">
            <AppBar
              title="Trajectory Hunters"
              iconElementLeft={<IconButton><DeviceGraphicEq /></IconButton>}
            />

            <div className="Main">

              <button onClick={() => { this.setState({load: false}) }}>Zastavit</button>
              <button onClick={() => { this.setState({load: true}) }}>Pustit</button>

              <div className="row">

                <div className="infoTable half-block">
                  <p>Hodnota x: {this.state.xvalue}</p>
                  <p>Hodnota y: {this.state.yvalue}</p>
                  <p>Hodnota z: {this.state.zvalue}</p>
                </div>
                <div className="graph half-block">
                  Čas od zpuštění v sekundách:
                </div>

              </div>
              <Graphy load={this.state.load} />
            </div>

          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
