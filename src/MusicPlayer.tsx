import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

type MusicPlayerState = {
    isPlaying: boolean;
    audioContext: AudioContext | null;
    audioBuffer: AudioBuffer | null; 
    audioSource: AudioBufferSourceNode | null;
};

class MusicPlayer extends Component<{}, MusicPlayerState> {
    private fileInput: React.RefObject<HTMLInputElement>;

    constructor(props: {}) {
      super(props);
      const AudioContext = (window.AudioContext || (window as any).webkitAudioContext) as typeof window.AudioContext;
      this.state = {
          isPlaying: false,
          audioBuffer: null,
          audioSource: null, 
          audioContext: new AudioContext()
          
          
      };
      this.fileInput = React.createRef();
  } 

  repeatAudio = () => {
    const { audioBuffer, audioContext, audioSource } = this.state;

    if (audioBuffer && audioContext) {
        // Stops the current playback if there's an existing audio source
        if (audioSource) {
            audioSource.stop();
        }

        // Create a new source for the audio buffer
        const newSource = audioContext.createBufferSource();
        newSource.buffer = audioBuffer;
        newSource.connect(audioContext.destination);
        newSource.start(0); // Start playback immediately

        newSource.onended = () => {
            this.setState({ isPlaying: false, audioSource: null });
        };

        // Update the state with the new source and set isPlaying to true
        this.setState({ isPlaying: true, audioSource: newSource });
    }
};

    handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0 && this.state.audioContext) {
            const audioContext = this.state.audioContext;
            const file = files[0];
            const reader = new FileReader();
            

            reader.onload = async (e) => {
                const arrayBuffer = e.target?.result as ArrayBuffer;
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                this.setState({ audioBuffer });
                const source = audioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(audioContext.destination);
                source.start();
                this.setState({ isPlaying: true });
                source.onended = () => this.setState({ isPlaying: false });
              
            };
console.log(AudioBuffer);
            reader.readAsArrayBuffer(file);
        // } let repeatUser = Element.getElementById("Repeatbutton")
        // if repeatUser.onclick()
        //     i++;
        // }
        // else {

        // } // not then do nothing
        // if repeat is clicked while running , Repeat song
        // if repeat is clicked then repeat / restart
        // if (repeat.onclick) then {
        //     i++;}
            // I need to make sure that a spec of information of the last song that is or has been played
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
                        <Button onClick={this.repeatAudio} variant="primary" id=' Repeatbutton'>
                            {this.state.isPlaying ? 'Repeat' : 'Repeated'}
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