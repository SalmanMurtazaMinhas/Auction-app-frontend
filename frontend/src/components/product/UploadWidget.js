import React, { Component } from 'react'

export default class UploadWidget extends Component {
    
    componentDidMount() {
        
        console.log(this.props)
        let myWidget = window.cloudinary.createUploadWidget(
        {
            cloudName: "auction-app",
            uploadPreset: "rcqzwz5n",
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                console.log("Yay! You just uploaded an image of your item.", result.info.url);
                this.props.parentCallBack(result.info.url)
            }
        }
    );
    document.getElementById("upload-widget").addEventListener(
        "click", 
        function () {
            myWidget.open();
        },
        false
    )
    
    }
    
  render() {
    return (
      <div>
        <p>Upload images here.</p>
        <button className="cloudinary-button" id="upload-widget">Upload</button>
      </div>
    )
  }
}

