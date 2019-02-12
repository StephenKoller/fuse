import React, { Component } from 'react';
import styled from 'styled-components';

import Track from './Track.jsx';

const FuseContainer = styled.div`
  height: 50px;
  border: 1px solid black;
  border-radius: 5px;
  width: 50vw;
  margin: 30px auto;
`;

export default class Fuse extends Component {
  constructor(props) {
    super(props);

    this.fuseRef = React.createRef();
  }

  render() {
    return (
      <FuseContainer ref={this.fuseRef}>
        <Track parentRef={this.fuseRef} />
      </FuseContainer>
    );
  }
}
