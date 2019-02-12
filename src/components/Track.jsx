import React, { Component } from 'react'
import styled from 'styled-components';

const TrackContainer = styled.div`
  background-color: rgba(0,0,0,0.5);
  width: 50px;
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
    }

    this.trackRef = React.createRef();
  }

  componentDidMount() {
    // create an empty <span>
    this.dragImgEl = document.createElement('span');

    // set its style so it'll be effectively (but not technically) invisible and
    // won't change document flow
    this.dragImgEl.setAttribute('style',
      'position: absolute; display: block; top: 0; left: 0; width: 0; height: 0;' );

    // add it to the document
    document.body.appendChild(this.dragImgEl);
  }
    
  dragHandler = (event) => {
    event.dataTransfer.setDragImage(this.dragImgEl, 0, 0);

    const calculatedPosition = event.pageX - this.state.xOffset;
    const trackWidth = this.state.parentRect.width - this.state.rect.width;

    let newPosition = calculatedPosition;
    if (calculatedPosition > trackWidth) newPosition = trackWidth;
    if (calculatedPosition < 0) newPosition = 0;


    this.setState({
      parentRect: this.state.parentRef.current.getBoundingClientRect(),
      xOffset: this.state.parentRef.current.getBoundingClientRect().left,
      rect: this.trackRef.current.getBoundingClientRect(),
      xPosition: newPosition,
    });

    // if (calculatedPosition < 0) {

    // }

    // if (calculatedPosition > )
    // this.setState({xPosition: position > 0 ? position : 0});
  }

  render() {
    return (
      <TrackContainer 
        draggable
        onDragStart={this.dragStartHandler}
        onDrag={this.dragHandler}
        onDragEnd={this.dragHandler}
        style={{left: this.state.xPosition}}
        ref={this.trackRef}>
      </TrackContainer>
    )
  }
}
