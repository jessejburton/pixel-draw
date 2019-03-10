import React, { Component } from 'react'
import styled from 'styled-components'
import { SketchPicker } from 'react-color';

let StyledGrid = styled.div`
  display: grid;
  height: ${(props) => props.height};
  width: 100%;
  grid-template-columns: repeat(${(props) => props.size}, 1fr);
  grid-template-rows: repeat(${(props) => props.size}, 1fr);
`;

let Pixel = styled.div`
  border: 1px solid black;
  background-color: ${(props) => props.bgColor};
`;

export default class Grid extends Component {

  constructor(props) {
    super(props);
    this.ref = React.createRef();

    this.state = {
      height: '320px',
      size: props.size,
      color: "#005596",
      isDrawing: false
    }

    this.onHandleDrawing = this.onHandleDrawing.bind(this);
    this.onHandleDrawing = this.onHandleDrawing.bind(this);
    this.onHandleMove = this.onHandleMove.bind(this);
    this.setColor = this.setColor.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
  }

  componentDidMount() {
    this.setState({
      height: `${this.ref.current.offsetWidth}px`
    });
  }

  componentDidUpdate() {
    console.log(this.state.isDrawing);
  }

  onHandleDrawing(e) {
    e.preventDefault();
    this.setState((prevState) => {
      return {
        isDrawing: !prevState.isDrawing
      }
    });
  }

  onHandleMove(e) {
    e.preventDefault();
    if (this.state.isDrawing) {
      this.setColor(e);
    }
  }

  setColor(e) {
    e.target.style.backgroundColor = this.state.color;
  }

  onChangeColor(color) {
    this.setState({
      color: color.hex
    });
  }

  drawGrid() {

    let grid = [];

    for (let i = 0; i < this.props.size; i++) {
      let children = []

      for (let j = 0; j < this.props.size; j++) {
        children.push(
          <Pixel key={i + j}
            onClick={this.onSetColor}
            onTouchStart={this.onHandleDrawing}
            onTouchEnd={this.onHandleDrawing}
            onTouchMove={this.onHandleMove}
            onMouseDown={this.onHandleDrawing}
            onMouseUp={this.onHandleDrawing}
            onMouseMove={this.onHandleMove}
          ></Pixel >
        );
      }

      grid.push(children)
    }

    return grid;
  }

  render(props) {
    return (
      <div>
        <StyledGrid
          ref={this.ref}
          height={this.state.height}
          size={this.state.size}
          onClick={this.onMouseDown}
          onMouseMove={this.onMouseMove}>
          {this.drawGrid()}
        </StyledGrid>
        <SketchPicker color={this.state.color} onChangeComplete={this.onChangeColor} />
      </div>
    )
  }
}
