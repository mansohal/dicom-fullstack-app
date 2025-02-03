import React, { useState, useEffect } from "react";
import { Container, Button } from "@mui/material";
import axios from "axios";
import FileUpload from "./FileUpload";
import MetadataTable from "./MetadataTable";
import DicomViewer from "./DicomViewer";

const DicomUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [filePath, setFilePath] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (filePath) console.log("Updated filePath:", filePath);
  }, [filePath]);

  const handleDrop = async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      console.log("File Selected:", file.name);
      await uploadFile(file);
    } else {
      console.error("No file selected.");
      setError("No file selected.");
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("dicomFile", file);

    console.log("Uploading file:", file.name);

    try {
      const response = await axios.post("http://localhost:4000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      console.log("Backend Response:", response.data);

      if (response.data?.storedFile?.FilePath) {
        console.log("FilePath Received from Backend:", response.data.storedFile.FilePath);
        setError(null);
        setFilePath(response.data.storedFile.FilePath);
      } else {
        console.error("FilePath not received in response");
        setError("File path not received from server.");
      }
    } catch (error) {
      console.error("Upload Failed:", error);
      setError("Upload failed. Please try again.");
    }
  };

  const fetchMetadata = async () => {
    if (!filePath) {
        console.error("File path is missing.");
        setError("File path is missing. Cannot fetch metadata.");
        return;
    }

    setError(null); // Reset error before fetching metadata

    try {
        console.log("🔍 Fetching metadata for:", filePath);

        const response = await axios.post("http://localhost:4000/graphql", {
            query: `
                mutation extractDicomMetadata($FilePath: String!) {
                    extractDicomMetadata(FilePath: $FilePath) {
                        PatientName
                        PatientBirthDate
                        StudyDescription
                        Modality
                        SeriesDescription
                        Manufacturer
                        FilePath
                    }
                }
            `,
            variables: { FilePath: filePath }
        }, {
            headers: { "Content-Type": "application/json" } // Ensure correct headers
        });

        console.log("🔄 GraphQL Response:", response.data);

        if (response.data.errors) {
            console.error("GraphQL Error:", response.data.errors);
            setError("GraphQL Error: Failed to extract metadata");
        } else {
            console.log("Metadata Fetched:", response.data.data.extractDicomMetadata);
            setMetadata(response.data.data.extractDicomMetadata);
        }
    } catch (error) {
        console.error("Failed to fetch metadata:", error);
        setError("Error fetching metadata.");
    }
};

  return (
    <Container>
      <h2>DICOM File Upload & Metadata Viewer</h2>
      {error && <p style={{ color: "red" }}>⚠️ {error}</p>}

      <FileUpload onDrop={handleDrop} selectedFile={selectedFile} />

      <Button 
        onClick={fetchMetadata} 
        variant="contained" 
        color="primary" 
        disabled={!filePath}
      >
        Fetch Metadata
      </Button>

      <MetadataTable metadata={metadata} />
      <DicomViewer filePath={filePath} />
    </Container>
  );
};

export default DicomUploader;
