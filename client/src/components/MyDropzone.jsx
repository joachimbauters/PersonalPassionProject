import React, { Component } from "react";
import Dropzone from "react-dropzone";
import styles from "./MyDropzone.module.css";
import Resizer from "react-image-file-resizer";

class MyDropzone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: null
    };
  }

  handleOnDrop = ([file]) => {
    if (file) {
      const currentFile = file;

      Resizer.imageFileResizer(
        currentFile,
        100,
        100,
        "JPEG",
        100,
        0,
        uri => {
          this.props.submitFile(uri);
          this.setState({
            imgSrc: uri
          });
        },
        "base64"
      );
    }
  };

  render() {
    const { imgSrc } = this.state;
    return (
      <>
        <div className={styles.imagepreviewsflex}>
          <Dropzone
            accept="image/jpeg, image/png"
            multiple={false}
            onDrop={this.handleOnDrop}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()} className={styles.draganddrop}>
                  <input {...getInputProps()} required />
                  <p>
                    Drag 'n' drop your profile picture, or click to select a
                    picture, for best result make picture 500x500px
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
          {imgSrc !== null ? (
            <img
              src={imgSrc}
              alt="previewimage"
              className={styles.previewImage}
            />
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}

export default MyDropzone;
