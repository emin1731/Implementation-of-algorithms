import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import styled from "styled-components";
import "./algorithm-page.css";

// Components
import AlgorithmDisplay from "../../components/AlgorithmDisplay";
import ComplexityDisplay from "../../components/ComplexityDisplay";
import Description from "../../components/Description";
import ArrayInput from "../../components/ArrayInput";
import SpeedInput from "../../components/SpeedInput";

// Algorithms
import BubbleSort from "../../algorithms/bubble-sort";
import SelectionSort from "../../algorithms/selection-sort";
import MergeSort from "../../algorithms/merge-sort";
import InsertionSort from "../../algorithms/insertion-sort";
import quickSort from "../../algorithms/quick-sort";
import GnomeSort from "../../algorithms/gnome-sort";
import ShakerSort from "../../algorithms/shaker-sort";
import OddEvenSort from "../../algorithms/odd-even-sort";
import HeapSort from "../../algorithms/heap-sort";

import playNote from "./sound";

export default class AlgorithmPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      steps: [],
      colorKey: [],
      colors: [],
      timouts: [],
      currentStep: 0,
      speed: 50,
      size: 40,
      isStopped: true,
      algorithm: props.algorithm,
    };
    this.alg = {
      selection: (array, position, steps, colors) => {
        SelectionSort(array, position, steps, colors);
      },
      bubble: (array, position, steps, colors) => {
        BubbleSort(array, position, steps, colors);
      },
      merge: (array, position, steps, colors) => {
        MergeSort(array, position, steps, colors);
      },
      insertion: (array, position, steps, colors) => {
        InsertionSort(array, position, steps, colors);
      },
      quick: (array, position, steps, colors) => {
        quickSort(array, position, steps, colors);
      },
      gnome: (array, position, steps, colors) => {
        GnomeSort(array, position, steps, colors);
      },
      shaker: (array, position, steps, colors) => {
        ShakerSort(array, position, steps, colors);
      },
      oddeven: (array, position, steps, colors) => {
        OddEvenSort(array, position, steps, colors);
      },
      heap: (array, position, steps, colors) => {
        HeapSort(array, position, steps, colors);
      },
      test: (fir, sec) => {
        this.test(fir, sec);
      },
    };
  }

  clearTimeouts = () => {
    this.state.timouts.forEach((timeout) => clearTimeout(timeout));
    this.setState({ timeouts: [] });
  };

  clearColorKey = () => {
    let blank = new Array(this.state.size).fill(0);
    this.setState({ colorKey: blank, colors: [blank] });
  };

  handleStart = () => {
    if (!this.state.isStopped) {
      return;
    }
    this.setState({ isStopped: false });

    let steps = this.state.steps.slice();
    let colors = this.state.colors.slice();
    let i = 0;

    let interval = setInterval(() => {
      let currentStep = this.state.currentStep;
      this.setState({
        array: steps[currentStep],
        colorKey: colors[currentStep],
        currentStep: currentStep + 1,
      });
      let isSoundOn = localStorage.getItem("sound");
      if (isSoundOn === "true") {
        playNote(
          (1400 / 40) * steps[currentStep][colors[currentStep].indexOf(1) + 1],
          100,
        );
      }
      i++;
      if (this.state.isStopped) {
        console.log(this.state.isStopped);
        clearInterval(interval);
        this.clearColorKey();
        let size = this.state.size;
        let arr = this.state.array.slice();

        this.setState(
          {
            array: arr,
            steps: [arr],
            size: size,
            currentStep: 0,
          },
          () => this.generateSteps(),
        );
      }
      if (i === steps.length) {
        console.log("CLEAR INT");
        clearInterval(interval);
      }
    }, this.state.speed);
  };
  test = () => {
    this.setState({ isStopped: true });
  };
  generateSteps = () => {
    let array = this.state.array.slice();
    let steps = this.state.steps.slice();
    let colors = this.state.colors.slice();
    this.runAlgorithm(array, 0, steps, colors);
    this.setState({
      steps: steps,
      colors: colors,
    });
  };
  runAlgorithm = (array, position, steps, colors) => {
    let name = this.state.algorithm;
    // let name = 'test'
    this.get(this.alg, name)(array, position, steps, colors);
  };
  generateArray = () => {
    if (!this.state.isStopped) {
      return;
    }
    this.clearColorKey();

    let size = this.state.size;
    let arr = this.state.array.slice();

    for (let i = size - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    this.setState(
      {
        array: arr,
        steps: [arr],
        size: size,
        currentStep: 0,
      },
      () => this.generateSteps(),
    );
  };

  get(object, path, defval = null) {
    if (typeof path === "string") path = path.split(".");
    return path.reduce((xs, x) => (xs && xs[x] ? xs[x] : defval), object);
  }

  componentDidMount() {
    this.onChangeSize(this.state.size);
  }

  onChangeSize = (value) => {
    if (!this.state.isStopped) {
      return;
    }
    this.setState(
      (state) => {
        let newlist = Array.from({ length: value }, (_, i) => i + 1);
        return {
          array: newlist,
          size: value,
          currentStep: 0,
        };
      },
      () => this.generateArray(),
    );
  };
  onChangeSpeed = (value) => {
    if (!this.state.isStopped) {
      return;
    }
    this.setState((state) => {
      return { speed: value };
    });
  };

  render() {
    return (
      <Container>
        <h1>{this.props.name}</h1>

        <Row>
          <Col xs="12" sm="12" md="12" lg="2">
            <ControlButton onClick={() => this.handleStart()}>
              Start
            </ControlButton>
          </Col>
          <Col xs="6" sm="6" md="6" lg="2">
            <ControlButton onClick={() => this.test()}>Stop</ControlButton>
          </Col>
          <Col xs="6" sm="6" md="6" lg="2">
            <ControlButton onClick={this.generateArray}>Mix</ControlButton>
          </Col>
          <Col xs="12" sm="12" md="6" lg="6">
            <SpeedInput
              onSubmit={this.onChangeSpeed}
              value={this.state.speed}
            />
          </Col>
          <Col xs="12" sm="12" md="6" lg="6">
            <ArrayInput onSubmit={this.onChangeSize} value={this.state.size} />
          </Col>
        </Row>

        <Row>
          <Col>
            <AlgorithmDisplay
              array={this.state.array}
              colorKey={this.state.colorKey}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={8}>
            <Description content={this.props.description} />
          </Col>
          <Col>
            <ComplexityDisplay complexity={this.props.complexity} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const ControlButton = styled.button`
  width: 100%;
  height: 45px;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.secondary};
  border-radius: 10px;
  border: none;
  margin-bottom: 12px;
  margin-left: 0;
  font-size: 16px;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background-color: ${(props) => props.theme.hover};
    transition: 0.2s;
  }
`;
