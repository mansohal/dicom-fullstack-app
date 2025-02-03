// const express = require("express");
// const { ApolloServer } = require("apollo-server-express");
// const cors = require("cors");
// const sequelize = require("./database");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const { File } = require("./models");

// // ✅ Import GraphQL Schema and Resolvers
// const typeDefs = require("./graphql/schema");
// const resolvers = require("./graphql/resolvers");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ Serve uploaded DICOM files correctly
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// console.log("✅ Backend is now serving uploaded files at /uploads");

// // ✅ Initialize Apollo GraphQL Server **BEFORE STARTING IT**
// const server = new ApolloServer({ typeDefs, resolvers });

// const startServer = async () => {
//     await server.start();
//     server.applyMiddleware({ app });

//     // ✅ Start Express Server
//     const PORT = process.env.PORT || 4000;
//     app.listen(PORT, async () => {
//         console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);

//         try {
//             await sequelize.authenticate();
//             console.log("✅ MySQL Database Connected!");

//             // ✅ Sync Database
//             await sequelize.sync({ alter: true });
//             console.log("✅ Database Synced!");
//         } catch (error) {
//             console.error("❌ MySQL Connection Failed:", error);
//         }
//     });
// };

// // ✅ Call startServer()
// startServer().catch(err => console.error("❌ Error starting server:", err));

// // ✅ Configure Multer for File Uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadPath = path.join(__dirname, "uploads");
//         if (!fs.existsSync(uploadPath)) {
//             fs.mkdirSync(uploadPath, { recursive: true });
//         }
//         cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// });

// const upload = multer({ storage });

// // ✅ Single File Upload Endpoint
// app.post("/upload", upload.single("dicomFile"), async (req, res) => {
//     if (!req.file) {
//         console.error("❌ No file uploaded.");
//         return res.status(400).json({ error: "No file uploaded!" });
//     }

//     try {
//         console.log("✅ File Uploaded:", req.file.path);

//         // ✅ Move file to Flask uploads folder
//         const flaskUploadsPath = path.join(__dirname, "..", "python-pydicom-ms", "uploads", req.file.filename);
//         fs.renameSync(req.file.path, flaskUploadsPath);
//         console.log(`✅ File moved to Flask uploads: ${flaskUploadsPath}`);

//         const storedFile = await File.create({
//             idPatient: 1,
//             idStudy: 1,
//             idSeries: 1,
//             FilePath: `uploads/${req.file.filename}`
//         });

//         console.log("✅ File Saved to Database:", storedFile);

//         res.status(200).json({
//             message: "File uploaded successfully!",
//             storedFile
//         });
//     } catch (error) {
//         console.error("❌ Error saving file details:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// // ✅ DICOM File Download Route
// app.get("/download/:filename", (req, res) => {
//     const fileName = req.params.filename;
//     const filePath = path.join(__dirname, "uploads", fileName);

//     if (fs.existsSync(filePath)) {
//         res.download(filePath, fileName, (err) => {
//             if (err) {
//                 console.error("❌ Error sending file:", err);
//                 res.status(500).json({ error: "Failed to download file" });
//             }
//         });
//     } else {
//         console.error("❌ File not found:", filePath);
//         res.status(404).json({ error: "File not found" });
//     }
// });

//////////////////////////////////////////////////////////
// const express = require("express");
// const { ApolloServer } = require("apollo-server-express");
// const cors = require("cors");
// const sequelize = require("./database");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const { File } = require("./models");

// const typeDefs = require("./graphql/schema");
// const resolvers = require("./graphql/resolvers");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ Serve uploaded DICOM files correctly
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // ✅ Ensure download endpoint serves files correctly
// app.get("/download/:filename", (req, res) => {
//   const filePath = path.join(__dirname, "uploads", req.params.filename);
//   if (fs.existsSync(filePath)) {
//     res.download(filePath);
//   } else {
//     res.status(404).json({ error: "File not found" });
//   }
// });

// console.log("✅ Backend is now serving uploaded files at /uploads");

// // ✅ Initialize Apollo GraphQL Server
// const server = new ApolloServer({ typeDefs, resolvers });
// const startServer = async () => {
//   await server.start();
//   server.applyMiddleware({ app });
// };

// // ✅ Configure Multer for File Uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, "uploads");
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }
// });

// const upload = multer({ storage });

// // ✅ Single File Upload Endpoint
// app.post("/upload", upload.single("dicomFile"), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded!" });
//   }

//   try {
//     const storedFile = await File.create({
//       idPatient: 1,
//       idStudy: 1,
//       idSeries: 1,
//       FilePath: `uploads/${req.file.filename}`  // ✅ Ensure correct path format
//     });

//     res.status(200).json({
//       message: "File uploaded successfully!",
//       storedFile
//     });
//   } catch (error) {
//     console.error("❌ Error saving file details:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // ✅ Ensure Database Connection & Start Server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, async () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);

//   try {
//     await sequelize.authenticate();
//     console.log("✅ MySQL Database Connected!");

//     // ✅ Sync Database
//     await sequelize.sync({ alter: true });
//     console.log("✅ Database Synced!");
//   } catch (error) {
//     console.error("❌ MySQL Connection Failed:", error);
//   }
// });

// startServer();

///////////////////////////////////////////////////////////////////7777777777777777

const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const sequelize = require("./database");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { File } = require("./models");

const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded DICOM files correctly
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
console.log("✅ Backend is now serving uploaded files at /uploads");

// ✅ API for downloading files
// app.get("/download/:filename", (req, res) => {
//     let fileName = req.params.filename;

//     // ✅ Ensure no duplicate "uploads/" in the filename
//     if (fileName.startsWith("uploads/")) {
//         fileName = fileName.replace("uploads/", "");
//     }

//     const filePath = path.join(__dirname, "uploads", fileName);
    
//     console.log(`📥 File Download Requested: ${filePath}`);

//     if (fs.existsSync(filePath)) {
//         res.download(filePath);
//     } else {
//         console.error(`❌ File not found: ${filePath}`);
//         res.status(404).json({ error: "File not found!" });
//     }
// });

// ✅ API Route to Download DICOM Files
// app.get("/download/:filename", (req, res) => {
//     let fileName = req.params.filename;

//     // ✅ Remove any accidental "uploads/" prefix
//     if (fileName.startsWith("uploads/")) {
//         fileName = fileName.replace("uploads/", "");
//     }

//     // ✅ Define the correct file paths
//     const filePath = path.join(__dirname, "uploads", fileName);

//     console.log(`📥 File Download Requested: ${filePath}`);

//     if (fs.existsSync(filePath)) {
//         res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
//         res.setHeader("Content-Type", "application/dicom"); // ✅ Set correct MIME type
//         res.download(filePath, fileName, (err) => {
//             if (err) {
//                 console.error("❌ Error in file download:", err);
//                 res.status(500).json({ error: "Error downloading the file." });
//             }
//         });
//     } else {
//         console.error(`❌ File not found: ${filePath}`);
//         res.status(404).json({ error: "File not found!" });
//     }
// });

// 
// ✅ API Route to Download DICOM Files
// ✅ API Route to Download DICOM Files
app.get("/download/:filename", (req, res) => {
    let fileName = req.params.filename;

    // ✅ Fix Windows-style backslashes
    fileName = fileName.replace(/\\/g, "/");

    // ✅ Remove extra "uploads/" if present
    if (fileName.startsWith("uploads/")) {
        fileName = fileName.replace("uploads/", "");
    }

    // ✅ Define the correct file path
    const filePath = path.join(__dirname, "..", "python-pydicom-ms", "uploads", fileName);

    console.log(`📥 File Download Requested: ${filePath}`);

    if (fs.existsSync(filePath)) {
        res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
        res.setHeader("Content-Type", "application/dicom"); // Ensure proper MIME type
        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error("❌ Error in file download:", err);
                res.status(500).json({ error: "Error downloading the file." });
            }
        });
    } else {
        console.error(`❌ File not found: ${filePath}`);
        res.status(404).json({ error: "File not found!" });
    }
});


// ✅ Initialize Apollo GraphQL Server
const server = new ApolloServer({ typeDefs, resolvers });
const startServer = async () => {
    await server.start();
    server.applyMiddleware({ app });
};

// ✅ Configure Multer for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "uploads");
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

// ✅ Single File Upload Endpoint
app.post("/upload", upload.single("dicomFile"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded!" });
    }

    try {
        const storedFile = await File.create({
            idPatient: 1,
            idStudy: 1,
            idSeries: 1,
            FilePath: `uploads/${req.file.filename}`  
        });

        res.status(200).json({
            message: "File uploaded successfully!",
            storedFile
        });
    } catch (error) {
        console.error("Error saving file details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ API Route to Download DICOM Files via POST
// app.post("/download", (req, res) => {
//     const { fileName } = req.body;
//     const filePath = path.join(__dirname, "uploads", fileName);

//     console.log(`📥 Download request received for: ${filePath}`);

//     if (fs.existsSync(filePath)) {
//         res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
//         res.setHeader("Content-Type", "application/dicom"); // Ensure MIME type
//         res.download(filePath, fileName, (err) => {
//             if (err) {
//                 console.error("❌ Error in file download:", err);
//                 res.status(500).json({ error: "Error downloading the file." });
//             }
//         });
//     } else {
//         console.error(`❌ File not found: ${filePath}`);
//         res.status(404).json({ error: "File not found." });
//     }
// });


// ✅ Ensure Database Connection & Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);

    try {
        await sequelize.authenticate();
        console.log("✅ MySQL Database Connected!");
        await sequelize.sync({ alter: true });
        console.log("✅ Database Synced!");
    } catch (error) {
        console.error("❌ MySQL Connection Failed:", error);
    }
});

startServer();

/////////////////////////////////////////////////////////////////////7

