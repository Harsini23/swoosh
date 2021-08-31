import React, { Component } from "react";
import "./Upload.css";
import MyDropzone from "./Dropbox";
import axios from "axios";
class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };
  }
  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
    console.log(event.target.files[0]);
  };
  onClickHandler = () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    axios
      .post("http://localhost:8000/upload", data, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        console.log(res.statusText);
      });
  };
  render() {
    return (
      <>
        <section>
          <h1>Swoosh</h1>
          <div className="container">
            <React.Fragment>
              <MyDropzone />
            </React.Fragment>
          </div>
          <div className="manual">
            <div>
              <input type="file" name="file" onChange={this.onChangeHandler} />
            </div>
            <button className="mybtn" onClick={this.onClickHandler}>
              Submit
            </button>
          </div>
        </section>
      </>
    );
  }
}

export default Upload;
