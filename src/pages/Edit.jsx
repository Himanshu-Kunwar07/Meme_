import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Text from "../components/Text";
import Button from "react-bootstrap/Button";
import "../App.css";

const EditPage = () => {
  const [params] = useSearchParams();
  const [count, setCount] = useState(0);

  const addText = () => {
    setCount(count + 1);
  };

  const download = () => {
    const url = params.get("url");

    fetch(url, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then((buffer) => {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png");
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="editDiv">
      <div>
        <img src={params.get("url")} width="420px" alt=".." />
        {Array(count)
          .fill(0)
          .map((e) => (
            <Text />
          ))}
      </div>
      <div className="center">
        <Button variant="primary" onClick={addText}>
          AddText
        </Button>
        <button class="btn btn-success" onClick={download}>
          Download
        </button>
      </div>
    </div>
  );
};

export default EditPage;
