import React, { Component } from "react";

class Uploader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageValidationError: null,
      imagenesDefault: props.imagenesDefault,
    };
  }

  async componentDidMount() {
    if (this.state.imagenesDefault) {
      const { imagesPreviewUrls } = this.props;

      try {
        this.state.imagenesDefault.map((record, index) => {
          const result = {
            urlImaen: record,
            id: index,
          };
          imagesPreviewUrls(result);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  filesSelectedHandler = (e) => {
    if (this.checkMimeType(e)) {
      const { imagesPreviewUrls } = this.props;
      const files = Array.from(e.target.files);
      // console.log(files)
      /**
       * Aqui tenemos que pasar las imagenes
       */

      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = file;
          result.id = index;

          this.setState({ imageValidationError: null });
          imagesPreviewUrls(result);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  checkMimeType(event) {
    const { files } = event.target;
    let err = "";
    const types = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    for (let x = 0; x < files.length; x += 1) {
      if (types.every((type) => files[x].type !== type)) {
        err += `${files[x].type} No es un formato de archivo soportado\n`;
      }
    }

    if (err !== "") {
      event.target.value = null;
      this.setState({ imageValidationError: err });
      return false;
    }
    return true;
  }

  render() {
    const { imageValidationError } = this.state;
    return (
      <>
        <div
          id="main"
          style={{
            backgroundImage:
              "url(https://cdn.dribbble.com/users/63485/screenshots/1328810/download-cloud-gif-preloader.gif)",
            padding: "20px",
            margin: "30px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundColor: "rgba(66,154,206,255)",
            borderRadius: "10px",
          }}
        >
          {/* <p
            style={{
              position: "absolute",
              maxWidth: "100%",
              maxHeight: "14%",
              marginLeft: "-12%",
              bottom: "236px",
            }}
          >
            Suelta tus imagenes en esta area
          </p> */}
          <input
            type="file"
            name="file"
            id="file"
            className="custom-file-input"
            onChange={this.filesSelectedHandler}
            accept="image/png, image/jpeg, image/jgp, image/gif"
            multiple
            style={{
              height: "100px",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              width: "-webkit-fill-available",
              border: "dashed",
              position: "relative",
            }}
          />
          {imageValidationError ? (
            <span className="error-msg">{imageValidationError}</span>
          ) : null}
        </div>
      </>
    );
  }
}

export default Uploader;
