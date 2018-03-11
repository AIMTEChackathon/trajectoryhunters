import Plot from 'react-plotly.js';
import React, { Component } from 'react';
import LineChart from 'react-linechart';
import '../../node_modules/react-linechart/dist/styles.css'

class Graphy extends Component {


  constructor(props) {
    super(props);


    this.getData = this.getData.bind(this)
    this.getCameraView = this.getCameraView.bind(this)

  }


  componentWillMount() {
    this.setState({
      allvalue1: [],
      wvalue1: [],
      xvalue1: [],
      yvalue1: [],
      zvalue1: [],
      allvalue2: [],
      xvalue2: [],
      yvalue2: [],
      zvalue2: [],
      allvalue3: [],
      xvalue3: [],
      yvalue3: [],
      zvalue3: [],
      time: [],
      launchtime: [],
      cameraView: null,
      graphXCounter1: 1,
      graphXCounter2: 1,
      graphPosition1: 0,
      graphPosition2: 0,
      graph1Data: {m: [{x:0, y:0}], n: [{x:0, y:0}], o: [{x:0, y:0}], p: [{x:0, y:0}]},
      graph2Data: {m: [{x:0, y:0}], n: [{x:0, y:0}], o: [{x:0, y:0}]}
    })
  }

  componentDidMount() {

    if(this.props.load) {
      this.getData()

      setInterval(()=>{
        this.addCoordinates()
      }, 1000);

    }

  }

  addCoordinates() {

    this.getData()

    let w1 = this.state.allvalue1.w
    let x1 = this.state.allvalue1.x
    let y1 = this.state.allvalue1.y
    let z1 = this.state.allvalue1.z

    let x2 = this.state.allvalue2.x
    let y2 = this.state.allvalue2.y
    let z2 = this.state.allvalue2.z

    let x3 = this.state.allvalue3.x
    let y3 = this.state.allvalue3.y
    let z3 = this.state.allvalue3.z

    let launchtime = new Date(this.state.allvalue.time)
    let time = new Date(this.state.allvalue.time)


    time = time.getFullYear() + "-" + time.getMonth() + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()

    this.setState({

      wvalue1: [...this.state.wvalue1, w1],
      xvalue1: [...this.state.xvalue1, x1],
      yvalue1: [...this.state.yvalue1, y1],
      zvalue1: [...this.state.zvalue1, z1],
      graphPosition1: this.state.graphPosition1 + 1,

      xvalue2: [...this.state.xvalue2, x2],
      yvalue2: [...this.state.yvalue2, y2],
      zvalue2: [...this.state.zvalue2, z2],
      graphPosition2: this.state.graphPosition2 + 1,

      xvalue3: [...this.state.xvalue3, x3],
      yvalue3: [...this.state.yvalue3, y3],
      zvalue3: [...this.state.zvalue3, z3],

      launchtime: [...this.state.time, launchtime],
      time: [...this.state.time, time]
    })


    this.graphPointGenerator()

  }

  getData() {
    if(this.props.load) {
    return fetch('http://89.203.248.237:8086/query?db=hack&u=root&p=malina&q=select+*+from+gyro+order+by+time+desc+limit+1')
      .then((res) => res.json())
      .then((responseJson) => {

        this.setState({
          allvalue: {
            "time": responseJson.results[0].series[0].values[0][0],
            "launchtime": responseJson.results[0].series[0].values[0][1]
          },
          allvalue1: {
            "w": responseJson.results[0].series[0].values[0][2],
            "x":responseJson.results[0].series[0].values[0][3],
            "y":responseJson.results[0].series[0].values[0][4],
            "z":responseJson.results[0].series[0].values[0][5]
          },
          allvalue2: {
            "x":responseJson.results[0].series[0].values[0][6],
            "y":responseJson.results[0].series[0].values[0][7],
            "z":responseJson.results[0].series[0].values[0][8]
          },
          allvalue3: {
            "x":responseJson.results[0].series[0].values[0][12],
            "y":responseJson.results[0].series[0].values[0][13],
            "z":responseJson.results[0].series[0].values[0][14]
          }
        })

        return responseJson.results[0].series[0];
      })
      .catch((error) => {
        console.error(error);
      })
    }
  }

  getCameraView(e) {
    this.setState({
      cameraView: e
    })
  }

  graphPointGenerator() {

    let n = 20


        //remove old data
        if (this.state.graph1Data.length > 150) {
          this.setState({
            graph1Data: {

              m: this.state.graph1Data.m.splice(0, this.state.graph1Data.m.length - n),

              n: this.state.graph1Data.n.splice(0, this.state.graph1Data.n.length - n),

              o: this.state.graph1Data.o.splice(0, this.state.graph1Data.o.length - n),

              p: this.state.graph1Data.p.splice(0, this.state.graph1Data.p.length - n)

            }
          });
        }

        //add new data
        this.setState({
          graph1Data: {
            m: this.state.graph1Data.m.concat({x: this.state.wvalue1[0], y: this.state.graphPosition1}),

            n: this.state.graph1Data.n.concat({
              x: this.state.xvalue1[0],
              y: this.state.graphPosition1
            }),

            o: this.state.graph1Data.o.concat({
              x: this.state.yvalue1[0],
              y: this.state.graphPosition1
            }),

            p: this.state.graph1Data.p.concat({
              x: this.state.zvalue1[0],
              y: this.state.graphPosition1
            }),
          }
        });




        //remove old data
        if (this.state.graph2Data.length > 150) {
          this.setState({
            graph2Data: {

              m: this.state.graph2Data.m.splice(0, this.state.graph2Data.m.length - n),

              n: this.state.graph2Data.n.splice(0, this.state.graph2Data.n.length - n),

              o: this.state.graph2Data.o.splice(0, this.state.graph2Data.o.length - n),

            }
          });
        }

        //add new data
        this.setState({
          graph2Data: {
            m: this.state.graph2Data.m.concat({
              x: this.state.xvalue1[0],
              y: this.state.graphPosition2
            }),

            n: this.state.graph2Data.n.concat({
              x: this.state.yvalue1[0],
              y: this.state.graphPosition2
            }),

            o: this.state.graph2Data.o.concat({
              x: this.state.zvalue1[0],
              y: this.state.graphPosition2
            })

          }
        });


  }

  chooseAnch(position, anch) {
      if (position === 1) {

        switch (anch) {
          case "m":
            return this.state.graph1Data.m
          case "n":
            return this.state.graph1Data.n
          case "o":
            return this.state.graph1Data.o
          case "p":
            return this.state.graph1Data.p
        }
      } else {
        switch (anch) {
          case "m":
            return this.state.graph2Data.m
          case "n":
            return this.state.graph2Data.n
          case "o":
            return this.state.graph2Data.o
        }
      }
  }

  render () {

    const data1 = [{
        color: "steelblue",
        points: this.chooseAnch(1, "m")
        },
        {
          color: "red",
          points: this.chooseAnch(1, "n")
        },
      {
        color: "blue",
        points: this.chooseAnch(1, "o")
      },
      {
        color: "orange",
        points: this.chooseAnch(1, "p")
      }
    ]

    const data2 = [{
      color: "steelblue",
      points: this.chooseAnch(2, "m")
    },{
      color: "red",
      points: this.chooseAnch(2, "n")
    },
      {
        color: "green",
        points: this.chooseAnch(2, "o")
      }
    ];


    return (
      <div>

        <div className="row">
          <div className="half-block">
            <LineChart
              width={500}
              height={400}
              data={data1}
              name="YPR"
            />
          </div>
          <div className="half-block">
            <LineChart
              width={500}
              height={400}
              data={data2}
              name="WORLD"
            />
          </div>
        </div>




        <Plot
          data={[
            {
              opacity:0.8,
              color:'rgb(0,100,200)',
              type: 'scatter3d',
              x: this.state.xvalue3,
              y: this.state.yvalue3,
              z: this.state.zvalue3,
              mode: 'lines+markers',
              line: {
                width: 6,
                color: "#4efa00",
                colorscale: "Viridis"},
              marker: {
                size: 3.5,
                color: "#63fa00",
                colorscale: "Greens",
                cmin: -20,
                cmax: 50
              },
              scene: "scene5"
          }
          ]}

          layout={{
            width: 1000,
            height: 1000,
            title: 'Graf výkonu',
            scene5: {
              domain: {
                x: [300,  300],
                y: [200 , 100],
                z: [100, 100]
              },
              camera: {
                center: {
                  x: 0, y: 0, z: 0},
                eye: {
                  x:1.2, y:2.1, z:0.1},
                up: {
                  x: 0, y: 0, z: 1}
              },
            },
          }}
        />

      </div>
    );
  }

}

export default Graphy;