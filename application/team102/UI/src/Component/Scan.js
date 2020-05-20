import React, { Component } from 'react';
import MediaHandler from './MediaHandler';
import { Button } from 'reactstrap';
import axios from 'axios';
//import Example from './scanModal';

const gatewayUrl = process.env.gatewayUrl || 'http://localhost:3004';

export default class Scan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMedia: false,
            imageString: "",
            rawData: [],
            foods: [],
        };
        this.mediaHandler = new MediaHandler();
    }
    componentDidMount() {
        this.mediaHandler.getPermissions()
            .then((stream) => {
                this.setState({ hasMedia: true });
                try {
                    this.myVideo.srcObject = stream;
                } catch (e) {
                    this.myVideo.src = URL.createObjectURL(stream);
                }
                this.myVideo.play();
            })
    }
    captureImage = () => {
        console.log('inside captureImage function')
        const context = this.canvas.getContext('2d');
        context.drawImage(this.myVideo, 0, 0, 400, 350);
        const image = this.canvas.toDataURL('image/jpeg', 0.5);
        this.setState({ imageString: image });
        this.processImage();
        return image;
    }
    processImage = () => {
        console.log('inside processImage function')
        const url = 'http://localhost:3010/api/image/save';
        const img = this.state.imageString;
        if (img !== "") {
            let formData = new FormData();
            formData.set('file', img);
            axios.post(url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then((res) => {
                console.log(res.data);
                this.setState({ rawData: res.data });
                this.processData();
            }).catch((e) => {
                console.log(e)
            });
        }
    }
    processData = () => {// returns a array with description and qty
        const processedData = [];
        let hashKey = {};
        this.state.rawData.forEach((item) => {
          if (hashKey.hasOwnProperty(item)) {
            hashKey[item] += 1;
          } else {
            hashKey[item] = 1;
          }
        });
        Object.keys(hashKey).forEach((k) => {
          let newItem = { description: "", quantity: 0 };
          newItem.description = k;
          newItem.quantity = hashKey[k];
          processedData.push({ newItem });
          /*processedData.push({
            description: k,
            quantity: hashKey[k]
          })*/
        })
        console.log(hashKey);
        console.log(processedData);
        this.props.onFoods(processedData);
        this.props.onPop();
      }
    render() {
        return (
            <div className="container">
                <div className="video-container">
                    <video className="video" width="400" height="350" ref={(ref) => { this.myVideo = ref; }}></video>
                </div>
                <Button id="capture" onClick={this.captureImage}>Capture</Button>
                
                <div className="image-container">
                    <canvas ref={(canvas) => { this.canvas = canvas }} width='400' height='350' ></canvas>
                </div>
            </div>
        )
    }
}

//<Button id="process" onClick={this.processImage}>Process</Button>