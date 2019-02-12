import React, { Component } from 'react'
import styled from 'styled-components';

const TrackContainer = styled.div`
  background-color: rgba(0,0,0,0.5);
  width: 150px;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;

export default class Track extends Component {
  constructor(props) {
    super(props);

    this.state = {
      xPosition: 0,
      width: 100,
      marginLeft: 0,
      xOffset: 0,
      parentRef: this.props.parentRef,
      parentRect: {},
      rect: {},
      isDragging: false,
    }

    this.trackRef = React.createRef();
  }

  dragStartHandler = event => {
    console.log('drag start');
    this.setState({isDragging: true});
  }
    
  dragHandler = event => {
    if(!this.state.isDragging) return;

    this.setState({
      parentRect: this.state.parentRef.current.getBoundingClientRect(),
      xOffset: this.state.parentRef.current.getBoundingClientRect().left,
      rect: this.trackRef.current.getBoundingClientRect(),
    });

    this.updatePosition(event);
  }

  updatePosition = (event) => {
    const calculatedPosition = event.pageX - this.state.xOffset;
    const sliderWidth = this.state.parentRect.width - this.state.rect.width;

    let newPosition = calculatedPosition;
    if (calculatedPosition > sliderWidth) newPosition = sliderWidth;
    if (calculatedPosition < 0) newPosition = 0;
    this.setState({xPosition: newPosition});
  }

  dragEndHandler = event => {
    console.log('drag end');
    this.setState({isDragging: false});
  }

  render() {
    return (
      <>
        <TrackContainer 
          onPointerDown={this.dragStartHandler}
          onPointerMove={this.dragHandler}
          onPointerUp={this.dragEndHandler}
          onPointerOut={this.dragEndHandler}
          style={{left: this.state.xPosition}}
          ref={this.trackRef}>
        </TrackContainer>
        <div>xOffset: {this.state.xOffset}</div>
        <div>xPosition: {this.state.xPosition}</div>
      </>
    )
  }
}
