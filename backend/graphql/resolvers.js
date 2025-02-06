
/////////////////////////////////////////newone(((((((((((((((((((((())))))))))))))))))))))

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
                const patient = await Patient.findByPk(idPatient);
                const study = await Study.findByPk(idStudy);
                const series = await Series.findByPk(idSeries);

                if (!patient || !study || !series) {
                    throw new Error("Patient, Study, or Series does not exist in DB.");
                }

                const actualFilename = path.basename(FilePath);
                const backendFilePath = path.join("/shared/uploads", actualFilename);
                const flaskUploadsPath = backendFilePath;

                console.log(`Ensuring file is available for Flask at ${flaskUploadsPath}`);

                // Ensure file exists in the shared volume
                if (!fs.existsSync(backendFilePath)) {
                    throw new Error(`File not found in backend storage: ${backendFilePath}`);
                }

                const newFile = await File.create({
                    idPatient,
                    idStudy,
                    idSeries,
                    FilePath: `uploads/${actualFilename}`
                });

                console.log(`File uploaded & saved in DB: ${FilePath}`);
                return newFile;
            } catch (error) {
                console.error("Error uploading DICOM file:", error.message);
                throw new Error(error.message);
            }
        },

        extractDicomMetadata: async (_, { FilePath }) => {
            try {
                console.log(`Extracting metadata for FilePath: ${FilePath}`);

                const fileRecord = await File.findOne({ where: { FilePath } });
                if (!fileRecord) {
                    throw new Error(`FilePath not found in database: ${FilePath}`);
                }

                const flaskUploadsPath = path.join("/shared/uploads", path.basename(FilePath));

                console.log(`Checking file at Flask Path: ${flaskUploadsPath}`);

                if (!fs.existsSync(flaskUploadsPath)) {
                    throw new Error(`File missing in Flask uploads: ${flaskUploadsPath}`);
                }

                console.log(`Sending file to Flask API for metadata extraction.`);
                const formData = new FormData();
                formData.append("file", fs.createReadStream(flaskUploadsPath));

                const response = await axios.post(
                    "http://dicom-flask:5001/extract-metadata",
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
