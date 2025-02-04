import React from "react";
import ReactDOM from "react-dom";
import DicomUploader from "./components/DicomUploader";
import DicomViewer from "./components/DicomViewer";

const App = () => {
  return (
    <div>
      <h1>Dicom Fullstack App</h1>
      <DicomUploader />
      <DicomViewer />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
