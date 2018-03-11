/* global window,document */
import React, {Component} from 'react';
import {render} from 'react-dom';
import {experimental} from 'deck.gl';

import DeckGLOverlay from './deckgl-overlay.js';

const {OrbitController} = experimental;

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        lookAt: [0, 0, 0],
        distance: 3,
        rotationX: -30,
        rotationOrbit: 30,
        orbitAxis: 'Y',
        fov: 50,
        minDistance: 1,
        maxDistance: 1000,
        width: 500,
        height: 500
      },
      x: this.props.x,
      y: this.props.y
    };

    this._resize = this._resize.bind(this);
    this._onViewportChange = this._onViewportChange.bind(this);
    this._onHover = this._onHover.bind(this);
    this._equation = this._equation.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  _equation() {
    return Math.sin(this.state.x * this.state.x + this.state.y * this.state.y) * this.state.x / Math.PI
  }

  _resize() {
    const size = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    const newViewport = OrbitController.getViewport(
      Object.assign(this.state.viewport, size)
    ).fitBounds([3, 3, 3]);

    this._onViewportChange(newViewport);
  }

  _onViewportChange(viewport) {
    Object.assign(this.state.viewport, viewport);
    this.setState({viewport: this.state.viewport});
  }

  _onHover(info) {
    const hoverInfo = info.sample ? info : null;
    if (hoverInfo !== this.state.hoverInfo) {
      this.setState({hoverInfo});
    }
  }

  render() {
    const {viewport, hoverInfo} = this.state;

    return (
      <OrbitController {...viewport} onViewportChange={this._onViewportChange}>
        <DeckGLOverlay
          viewport={OrbitController.getViewport(viewport)}
          equation={this._equation}
          resolution={200}
          showAxis={true}
          onHover={this._onHover}
        />

        {hoverInfo && (
          <div className="tooltip" style={{left: hoverInfo.x, top: hoverInfo.y}}>
            {hoverInfo.sample.map(x => x.toFixed(3)).join(', ')}
          </div>
        )}
      </OrbitController>
    );
  }
}

export default Graph;

