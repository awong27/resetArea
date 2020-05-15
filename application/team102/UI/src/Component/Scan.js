import React, {Component} from 'react';
import MediaHandler from './MediaHandler';
import { Button } from 'reactstrap';
import axios from 'axios';

const gatewayUrl = process.env.gatewayUrl || 'http://localhost:3004';

export default class Scan extends Component {

    constructor() {
        super();

        this.state = {
            hasMedia: false
        };

        this.mediaHandler = new MediaHandler();
    }

    componentDidMount() {
        this.mediaHandler.getPermissions()
        .then( (stream) => {
            this.setState({hasMedia : true});

            try {
                this.myVideo.srcObject = stream;
            } catch (e) {
                this.myVideo.src = URL.createObjectURL(stream);
            }
            this.myVideo.play();
        })
    }

    captureImage = () => {
        const context = this.canvas.getContext('2d');
        context.drawImage(this.myVideo, 0, 0, 400, 350);
        const image = this.canvas.toDataURL('image/jpeg', 0.5);
        const url = 'http://localhost:3010/api/image/save';

        let formData = new FormData();
        formData.set('file', image);


        axios.post(url, formData, {
            headers: {'Content-Type' : 'multipart/form-data' }
        });

        return image;
    }



    render() {
        
        return (
            <div className="container">
                <div className="video-container">
                    <video className="video" width="400" height="350" ref={(ref) => {this.myVideo = ref;}}></video>
                </div>
                <Button onClick={this.captureImage}>Capture</Button>
                <div className="image-container">
                    <canvas ref={ (canvas) => {this.canvas = canvas}} width='400' height= '350' ></canvas>
                </div>
            </div>
        )
    }



}