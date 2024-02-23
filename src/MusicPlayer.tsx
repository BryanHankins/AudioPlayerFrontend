import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

type MusicPlayerState = {
    isPlaying: boolean;
    audioContext: AudioContext | null;
};

class MusicPlayer extends Component<{}, MusicPlayerState> {
    private fileInput: React.RefObject<HTMLInputElement>;

    constructor(props: {}) {
      super(props);
      const AudioContext = (window.AudioContext || (window as any).webkitAudioContext) as typeof window.AudioContext;
      this.state = {
          isPlaying: false,
          audioContext: new AudioContext()
      };
      this.fileInput = React.createRef();
  }

    handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0 && this.state.audioContext) {
            const audioContext = this.state.audioContext;
            const file = files[0];
            const reader = new FileReader();

            reader.onload = async (e) => {
                const arrayBuffer = e.target?.result as ArrayBuffer;
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                const source = audioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(audioContext.destination);
                source.start();
                this.setState({ isPlaying: true });
                source.onended = () => this.setState({ isPlaying: false });
            };

            reader.readAsArrayBuffer(file);
        }
    };

    render() {
        return (
            <Container className="p-3 bg-black">
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <h2 className='p-3 text-white'>My Music Player</h2>
                        <input
                            type="file"
                            accept="audio/*"
                            style={{ display: 'none' }}
                            ref={this.fileInput}
                            onChange={this.handleFileSelect}
                        />
                        <Button variant="success" className='mx-2' onClick={() => this.fileInput.current && this.fileInput.current.click()}>
                            Load Music
                        </Button>
                        <Button onClick={() => {}} variant="primary">
                            {this.state.isPlaying ? 'Pause' : 'Play'}
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default MusicPlayer;



// asyncify.start_unwind {
//   asyncify.stop_unwind 
//   // call in the button that when its clicked or loaded when it starts, It plays
//   // then when 
//   Asyncify.start_rewind then asyncify.stop_unwind when button.onclick(showbyid("rewind")) 

//   Onclick.(showelementbyid("load").loadapplication){
//       asyncify.stop_unwind 

//       Asyncify.start_rewind then asyncify.stop_unwind when button.onclick(showbyid("rewind")) 
//   }
// }