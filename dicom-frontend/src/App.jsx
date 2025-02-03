import React from "react";
import { Container } from "@mui/material";
import DicomUploader from "./components/DicomUploader.jsx";

function App() {
  return (
    <Container>
      <h2>DICOM File Upload & Metadata Viewer</h2>
      <DicomUploader />
    </Container>
  );
}

export default App;
