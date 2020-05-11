import React, {Component} from 'react';
import axios from 'axios';
export default class Scan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            context: null
        }
    }
    componentDidMount() {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true}, this.handleVideo, this.videoError);
        }
        
    }
    handleVideo (stream) {
        // Update the state, triggering the component to re-render with the correct stream
        this.setState({ videoSrc: window.URL.createObjectURL(stream) });
        this.videoElement.play();
      }
    videoError() {
        console.log("video error");
    }
    //grabs target file from event and store in selectedFile
    fileSelectHandler = event => {
        console.log(event);
        this.setState({
            selectedFile: event.target.files[0]
        })
    }
    //grabs selectedFile -> stores in fd
    //Post sends file fd -> '/api/scan' - backend point
    //console log should show upload progress 
    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        axios.post('/api/scan', fd, {
            onUploadProgress: progressEvent => {
                console.log('Upload Progress ' + Math.round(progressEvent.loaded/progressEvent.total *100) + '%')
            } 
        })
            .then(res => {
                console.log(res);
            });

    }
    setTimeout=() => {
            if (!this.props.isOpen) {
                return;
            }
            this.context = this.canvasElement.getContext('2d');
            this.context.drawImage(this.props.video, 0, 0, 640, 480);
        };
    render() {
        const video = (<video id="video" width="640" height="480" className="cameraFrame" src={this.state.videoSrc} autoPlay={true}
        ref={(input) => { this.videoElement = input; }}></video>);
        
        const canvasEl = (<canvas id="canvas" width="640" height="480" className="photoCard" ref={(input) => this.canvasElement = this.context} />);
        return (
            <div>
                {video}
                {canvasEl}
                <input style={{display: 'none'}} 
                    type="file" 
                    onChange={this.fileSelectedHandler} 
                    ref={fileInput => this.fileInput = fileInput}/>
                    <br/>
                <button onClick={() => this.fileInput.click()}>Pick File</button>
                <button onClick={this.fileUploadHandler}>Upload</button>
            </div>
        );
    }



}