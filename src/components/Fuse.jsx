import React, { Component } from 'react';
import styled from 'styled-components';

const FuseContainer = styled.div`
  height: 120px;
`;

const PlayButton = () => <button>Play</button>;

export default class Fuse extends Component {
  componentDidMount() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    const audioElement = document.querySelector('audio');
    const track = audioCtx.createMediaElementSource(audioElement);
  }

  render() {
    return (
      <FuseContainer>
        <audio />
        <PlayButton />
      </FuseContainer>
    );
  }
}
