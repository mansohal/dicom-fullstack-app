import React from "react";
import Dropzone from "react-dropzone";

const FileUpload = ({ onDrop, selectedFile }) => {
  return (
    <Dropzone onDrop={onDrop} accept=".dcm">
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()} style={{ border: "2px dashed #333", padding: "20px", textAlign: "center" }}>
          <input {...getInputProps()} />
          {selectedFile ? <p>{selectedFile.name}</p> : <p>Drag & drop a DICOM file here, or click to select one</p>}
        </div>
      )}
    </Dropzone>
  );
};

export default FileUpload;
