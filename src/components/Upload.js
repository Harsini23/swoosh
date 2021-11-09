import React, { useState, useEffect } from "react";
import "./Upload.css";
import MyDropzone from "./Dropbox";
import axios from "axios";
import { initObject } from "../initObject";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState({});
  const [active, setActive] = useState(false);

  const onChangeHandler = (event) => {
    let file = event.target.files[0];
    setSelectedFile(file);
    console.log(event.target.files[0]);
  };

  const onClickHandler = () => {
    const data = new FormData();
    console.log("myformdata", data);
    data.append("file", selectedFile);

    axios
      .post("http://localhost:8000/", data, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        console.log(res.statusText);
      });
  };
  const getLink = async () => {
    try {
      const res = await axios.get(`${initObject.url}/api/myfilern/samplee`);
      if (res.status === 200) {
        setData(res.data);
        setActive(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
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
          {active ? (
            <div>
              <a href="#">{data.download}</a>
            </div>
          ) : null}
          <form action="/" method="post" encType="multipart/form-data">
            <div style={{ display: "flex" }}>
              <div>
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={onChangeHandler}
                />
              </div>
              <br />
              <button
                className="mybtn"
                onClick={(e) => {
                  onClickHandler();
                  getLink();
                  e.preventDefault();
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Upload;
