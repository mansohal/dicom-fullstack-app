
/////////////////////////////////////////////////////////////////////new functionality/////////////////////////////////

const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const sequelize = require("./database");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { File, Patient, Study, Modality, Series } = require("./models");
const resolvers = require("./graphql/resolvers");

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded DICOM files correctly
app.use("/uploads", express.static(path.join("/shared/uploads")));
console.log("Backend is now serving uploaded files at /uploads");

// API Route to Download DICOM Files
app.get("/download/:filename", (req, res) => {
    let fileName = req.params.filename;
    fileName = fileName.replace(/\\/g, "/");
    if (fileName.startsWith("uploads/")) {
        fileName = fileName.replace("uploads/", "");
    }
    const filePath = path.join("/shared/uploads", fileName);

    console.log(`File Download Requested: ${filePath}`);

    if (fs.existsSync(filePath)) {
        res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
        res.setHeader("Content-Type", "application/dicom");
        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error("Error in file download:", err);
                res.status(500).json({ error: "Error downloading the file." });
            }
        });
    } else {
        console.error(`File not found: ${filePath}`);
        res.status(404).json({ error: "File not found!" });
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = "/shared/uploads";
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

app.post("/upload", upload.single("dicomFile"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded!" });
    }

    try {
        console.log(`Handling file upload via REST API: ${req.file.filename}`);

        let idPatient = 1;
        let idStudy = 1;
        let idModality = 1;
        let FilePath = `uploads/${req.file.filename}`;

        let patient = await Patient.findByPk(idPatient);
        if (!patient) {
            patient = await Patient.create({ idPatient, Name: "Auto-Generated Patient" });
        }

        let study = await Study.findByPk(idStudy);
        if (!study) {
            study = await Study.create({ idStudy, idPatient, StudyName: "Auto-Generated Study" });
        }

        let modality = await Modality.findByPk(idModality);
        if (!modality) {
            modality = await Modality.create({ idModality, Name: "Auto-Generated Modality" });
        }

        let series = await Series.findOne({ where: { idPatient, idStudy, idModality } });
        if (!series) {
            series = await Series.create({
                idPatient,
                idStudy,
                idModality,
                SeriesName: "Auto-Generated Series"
            });
        }

        const idSeries = series.idSeries;

        const newFile = await File.create({
            idPatient,
            idStudy,
            idSeries,
            idModality,
            FilePath
        });

        console.log(`File uploaded & saved in DB: ${FilePath}`);

        res.status(200).json({
            message: "File uploaded successfully!",
            storedFile: newFile
        });
    } catch (error) {
        console.error("Error handling file upload:", error.message);
        res.status(500).json({ error: error.message });
    }
});

const server = new ApolloServer({ typeDefs: require("./graphql/schema"), resolvers });
const startServer = async () => {
    await server.start();
    server.applyMiddleware({ app });
};

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);

    try {
        await sequelize.authenticate();
        console.log("MySQL Database Connected!");
        await sequelize.sync({ alter: true });
        console.log("Database Synced!");
        await startServer();
    } catch (error) {
        console.error("MySQL Connection Failed:", error);
    }
});

