const { Patient, Study, Modality, Series, File } = require("../models");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

const resolvers = {
    Query: {
        getPatients: async () => await Patient.findAll(),
        getStudies: async () => await Study.findAll(),
        getModalities: async () => await Modality.findAll(),
        getSeries: async () => await Series.findAll(),
        getFiles: async () => await File.findAll(),
    },

    Mutation: {
        uploadDicomFile: async (_, { idPatient, idStudy, idSeries, FilePath }) => {
            try {
                console.log(`Uploading DICOM file: ${FilePath}`);

                // Ensure required entities exist
                const patientExists = await Patient.findByPk(idPatient);
                const studyExists = await Study.findByPk(idStudy);
                const seriesExists = await Series.findByPk(idSeries);

                if (!patientExists || !studyExists || !seriesExists) {
                    throw new Error("Patient, Study, or Series does not exist in DB.");
                }

                // Extract filename from FilePath
                const actualFilename = path.basename(FilePath);

                // Backend file location (where the file is initially stored)
                const backendFilePath = path.join(__dirname, "..", FilePath);

                // Flask uploads directory (where Flask expects the file)
                const flaskUploadsPath = path.join(__dirname, "..", "..", "python-pydicom-ms", "uploads", actualFilename);

                console.log(`Moving file from backend storage to Flask uploads: ${flaskUploadsPath}`);

                // Ensure Flask's upload directory exists before moving the file
                if (!fs.existsSync(path.dirname(flaskUploadsPath))) {
                    fs.mkdirSync(path.dirname(flaskUploadsPath), { recursive: true });
                }

                // Move the file from backend to Flask's directory
                fs.renameSync(backendFilePath, flaskUploadsPath);

                console.log(`File successfully moved to Flask uploads: ${flaskUploadsPath}`);

                // Store the correct relative path in MySQL
                const storedFilePath = `uploads/${actualFilename}`;

                const newFile = await File.create({
                    idPatient,
                    idStudy,
                    idSeries,
                    FilePath: storedFilePath
                });

                console.log(`File uploaded & saved in DB: ${storedFilePath}`);
                return newFile;
            } catch (error) {
                console.error("Error uploading DICOM file:", error.message);
                throw new Error(error.message);
            }
        },

        extractDicomMetadata: async (_, { FilePath }) => {
            try {
                console.log(`Metadata extraction request for FilePath: ${FilePath}`);

                // Fetch File from Database
                const fileRecord = await File.findOne({ where: { FilePath } });
                if (!fileRecord) {
                    throw new Error(`❌ FilePath not found in database: ${FilePath}`);
                }

                // Define expected paths
                const backendFilePath = path.join(__dirname, "..", fileRecord.FilePath);
                const flaskUploadsPath = path.join(__dirname, "..", "..", "python-pydicom-ms", fileRecord.FilePath);

                console.log(`Checking file at Backend Path: ${backendFilePath}`);
                console.log(`Flask uploads expected Path: ${flaskUploadsPath}`);

                // Ensure Flask's `uploads/` directory exists
                if (!fs.existsSync(path.dirname(flaskUploadsPath))) {
                    fs.mkdirSync(path.dirname(flaskUploadsPath), { recursive: true });
                }

                // If the file is missing in Flask `uploads/`, move it from backend storage
                if (!fs.existsSync(flaskUploadsPath)) {
                    console.warn(`File missing in Flask uploads. Moving from backend storage.`);

                    if (!fs.existsSync(backendFilePath)) {
                        throw new Error(`File is missing in both backend & Flask: ${backendFilePath}`);
                    }

                    fs.renameSync(backendFilePath, flaskUploadsPath);
                    console.log(`File successfully moved to Flask uploads: ${flaskUploadsPath}`);
                } else {
                    console.log(`File already exists in Flask uploads.`);
                }

                // Send the file to Flask for metadata extraction
                console.log(`Sending file to Flask API for metadata extraction.`);
                const formData = new FormData();
                formData.append("file", fs.createReadStream(flaskUploadsPath));

                const response = await axios.post(
                    "http://localhost:5001/extract-metadata",
                    formData,
                    { headers: { ...formData.getHeaders() } }
                );

                console.log("Flask Response:", response.data);

                if (!response.data || !response.data.metadata) {
                    throw new Error("Flask API did not return metadata.");
                }

                return response.data.metadata;

            } catch (error) {
                console.error("GraphQL Error extracting DICOM metadata:", error.message);
                throw new Error("Failed to extract metadata");
            }
        }
    }
};

module.exports = resolvers;
