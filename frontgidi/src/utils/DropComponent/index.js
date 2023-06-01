import React, { Component } from "react";
import Uploader from "./Uploader";
import Preview from "./Preview";
import "./uploader.css";

class DropComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesPreviewUrls: [],
      imagenesDefault: props.imagenesDefault,
    };
  }

  imagesPreviewUrls = (result) => {
    const { subirImagen } = this.props;
    let arrayM = this.state.imagesPreviewUrls;

    arrayM.push(result);
    this.setState({
      imagesPreviewUrls: arrayM,
    });
    subirImagen(arrayM);
  };

  deleteImage = (id) => {
    try {
      const { imagesPreviewUrls } = this.state;
      if (imagesPreviewUrls.length > 0) {
        const filterImages = imagesPreviewUrls.filter(
          (image) => image.id !== id
        );
        this.setState({
          imagesPreviewUrls: filterImages,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { imagesPreviewUrls, imagenesDefault } = this.state;
    const { subirImagen } = this.props;
    subirImagen(imagesPreviewUrls);
    return (
      <div>
        <Uploader
          imagenesDefault={imagenesDefault}
          imagesPreviewUrls={this.imagesPreviewUrls}
        />

        {/* <button onClick={subirImagen(imagesPreviewUrls)} /> */}
        {imagesPreviewUrls.length > 0 ? (
          <Preview
            imagesPreviewUrls={imagesPreviewUrls}
            deleteImage={this.deleteImage}
          />
        ) : null}
      </div>
    );
  }
}

export default DropComponent;

