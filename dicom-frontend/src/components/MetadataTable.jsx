// import React, { useState } from "react";
// import DicomViewer from "./DicomViewer"; // Ensure correct import

// const MetadataTable = ({ metadata }) => {
//   const [showImage, setShowImage] = useState(false);

//   if (!metadata) return null;

//   // ✅ Ensure correct file path extraction
//   const fileName = metadata.FilePath ? metadata.FilePath.replace("uploads/", "") : "";

//   return (
//     <>
//       <table border="1">
//         <thead>
//           <tr>
//             <th>Attribute</th>
//             <th>Value</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Patient Name</td>
//             <td>{metadata.PatientName || "N/A"}</td>
//             <td rowSpan="4">
//               {/* ✅ Correct Download Button */}
//               <a href={`http://localhost:4000/uploads/${fileName}`} download>
//                 <button>Download File</button>
//               </a>

//               {/* ✅ Prevent Multiple Renderings */}
//               <button onClick={() => setShowImage((prev) => !prev)}>
//                 {showImage ? "Hide DICOM Image" : "Show DICOM Image"}
//               </button>
//             </td>
//           </tr>
//           <tr>
//             <td>Patient Birth Date</td>
//             <td>{metadata.PatientBirthDate || "N/A"}</td>
//           </tr>
//           <tr>
//             <td>Series Description</td>
//             <td>{metadata.SeriesDescription || "N/A"}</td>
//           </tr>
//         </tbody>
//       </table>

//       {/* ✅ Show DICOM Image Only When Clicked */}
//       {showImage && <DicomViewer filePath={`uploads/${fileName}`} />}
//     </>
//   );
// };

// export default MetadataTable;
/////////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import DicomViewer from "./DicomViewer"; // Ensure correct import

// const MetadataTable = ({ metadata }) => {
//   const [showImage, setShowImage] = useState(false);

//   if (!metadata) return null;

//   // Ensure FilePath is properly extracted and not undefined
//   const fileName = metadata.FilePath ? metadata.FilePath.split("/").pop() : "";

//   return (
//     <div>
//       <table border="1">
//         <thead>
//           <tr>
//             <th>Attribute</th>
//             <th>Value</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Patient Name</td>
//             <td>{metadata.PatientName || "N/A"}</td>
//             <td rowSpan="3">
//               {/* ✅ Corrected Download Button */}
//               <a href={`http://localhost:4000/uploads/${fileName}`} download>
//                 <button>Download File</button>
//               </a>

//               {/* ✅ Toggle Show/Hide Image */}
//               <button onClick={() => setShowImage(!showImage)}>
//                 {showImage ? "Hide DICOM Image" : "Show DICOM Image"}
//               </button>
//             </td>
//           </tr>
//           <tr>
//             <td>Patient Birth Date</td>
//             <td>{metadata.PatientBirthDate || "N/A"}</td>
//           </tr>
//           <tr>
//             <td>Series Description</td>
//             <td>{metadata.SeriesDescription || "N/A"}</td>
//           </tr>
//         </tbody>
//       </table>

//       {/* ✅ Only one DICOM Viewer appears when button is clicked */}
//       {showImage && <DicomViewer filePath={`uploads/${fileName}`} />}
//     </div>
//   );
// };

// export default MetadataTable;

//////////////////////////////////////////////////////////////////////////777

// import React, { useState } from "react";
// import DicomViewer from "./DicomViewer"; // Ensure correct import

// const MetadataTable = ({ metadata }) => {
//   const [showImage, setShowImage] = useState(false);

//   if (!metadata) return null;

//   // ✅ Extract correct filename (avoid duplicate "uploads/uploads/")
//   const fileName = metadata.FilePath ? metadata.FilePath.replace("uploads/", "") : "";

//   return (
//     <div>
//       <table border="1">
//         <thead>
//           <tr>
//             <th>Attribute</th>
//             <th>Value</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Patient Name</td>
//             <td>{metadata.PatientName || "N/A"}</td>
//             <td rowSpan="4">
//               {/* ✅ Fixed Download Button */}
//               <a href={`http://localhost:4000/uploads/${fileName}`} download>
//                 <button>Download File</button>
//               </a>

//               {/* ✅ Toggle Show/Hide Image (Prevents Duplicate Viewers) */}
//               <button onClick={() => setShowImage(!showImage)}>
//                 {showImage ? "Hide DICOM Image" : "Show DICOM Image"}
//               </button>
//             </td>
//           </tr>
//           <tr>
//             <td>Patient Birth Date</td>
//             <td>{metadata.PatientBirthDate || "N/A"}</td>
//           </tr>
//           <tr>
//             <td>Series Description</td>
//             <td>{metadata.SeriesDescription || "N/A"}</td>
//           </tr>
//         </tbody>
//       </table>

//       {/* ✅ Only render ONE DICOM Viewer (No duplicates!) */}
//       {showImage && <DicomViewer filePath={`uploads/${fileName}`} />}
//     </div>
//   );
// };

// export default MetadataTable;

////////////////////////////////////////////////////////////////////7

// import React, { useState } from "react";
// import DicomViewer from "./DicomViewer"; // Ensure correct import

// const MetadataTable = ({ metadata }) => {
//   const [showImage, setShowImage] = useState(false);

//   if (!metadata) return null;

//   // ✅ Extract correct filename (avoid duplicate "uploads/uploads/")
//   // const fileName = metadata.FilePath ? metadata.FilePath.replace("uploads/", "") : "";

//   const fileName = metadata.FilePath ? metadata.FilePath.replace(/^uploads[\\/]/, "") : "";


//   return (
//     <div>
//       <table border="1">
//         <thead>
//           <tr>
//             <th>Attribute</th>
//             <th>Value</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Patient Name</td>
//             <td>{metadata.PatientName || "N/A"}</td>
//             <td rowSpan="4">
//               {/* ✅ Fixed Download Button using /download/:fileName */}
//               <a href={`http://localhost:4000/download/${fileName}`} download>
//                 <button>Download File</button>
//               </a>

//               {/* ✅ Toggle Show/Hide Image (Prevents Duplicate Viewers) */}
//               <button onClick={() => setShowImage(!showImage)}>
//                 {showImage ? "Hide DICOM Image" : "Show DICOM Image"}
//               </button>
//             </td>
//           </tr>
//           <tr>
//             <td>Patient Birth Date</td>
//             <td>{metadata.PatientBirthDate || "N/A"}</td>
//           </tr>
//           <tr>
//             <td>Series Description</td>
//             <td>{metadata.SeriesDescription || "N/A"}</td>
//           </tr>
//         </tbody>
//       </table>

//       {/* ✅ Only render ONE DICOM Viewer (No duplicates!) */}
//       {showImage && <DicomViewer filePath={`uploads/${fileName}`} />}
//     </div>
//   );
// };

// export default MetadataTable;

/////////////////////7777777777777777777777777////////////////////////////////////////777777777777777777777

// import React, { useState } from "react";
// import DicomViewer from "./DicomViewer"; // Ensure correct import

// const MetadataTable = ({ metadata }) => {
//   const [showImage, setShowImage] = useState(false);

//   if (!metadata) return null;

//   // ✅ Extract correct filename (avoid duplicate "uploads/uploads/")
//   const fileName = metadata.FilePath ? metadata.FilePath.replace(/^uploads[\\/]/, "") : "";

//   return (
//     <div>
//       <table border="1">
//         <thead>
//           <tr>
//             <th>Attribute</th>
//             <th>Value</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Patient Name</td>
//             <td>{metadata.PatientName || "N/A"}</td>
//             <td rowSpan="4">
//               {/* ✅ Fixed Download Button using /download/:fileName */}
//               <a href={`http://localhost:4000/download/${fileName}`} download>
//                 <button>Download File</button>
//               </a>

//               {/* ✅ Toggle Show/Hide Image */}
//               <button onClick={() => setShowImage(prev => !prev)}>
//                 {showImage ? "Hide DICOM Image" : "Show DICOM Image"}
//               </button>
//             </td>
//           </tr>
//           <tr>
//             <td>Patient Birth Date</td>
//             <td>{metadata.PatientBirthDate || "N/A"}</td>
//           </tr>
//           <tr>
//             <td>Series Description</td>
//             <td>{metadata.SeriesDescription || "N/A"}</td>
//           </tr>
//         </tbody>
//       </table>

//       {/* ✅ Pass "showImage" as a prop to control when the DICOM Viewer renders */}
//       <DicomViewer filePath={`uploads/${fileName}`} showImage={showImage} />
//     </div>
//   );
// };

// export default MetadataTable;

///////////////////////////////////////////////////////////////////////////////////////77

// import React, { useState } from "react";
// import DicomViewer from "./DicomViewer"; // Ensure correct import

// const MetadataTable = ({ metadata }) => {
//   const [showImage, setShowImage] = useState(false);

//   if (!metadata) return null;

//   // ✅ Extract correct filename (avoid duplicate "uploads/uploads/")
//   const fileName = metadata.FilePath ? metadata.FilePath.replace(/^uploads[\\/]/, "") : "";

//   return (
//     <div>
//       <table border="1">
//         <thead>
//           <tr>
//             <th>Attribute</th>
//             <th>Value</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Patient Name</td>
//             <td>{metadata.PatientName || "N/A"}</td>
//             <td rowSpan="4">
//               {/* ✅ Fixed Download Button using /download/:fileName */}
//               <a href={`http://localhost:4000/download/${fileName}`} download>
//                 <button>Download File</button>
//               </a>

//               {/* ✅ Toggle Show/Hide Image */}
//               <button onClick={() => setShowImage((prev) => !prev)}>
//                 {showImage ? "Hide DICOM Image" : "Show DICOM Image"}
//               </button>
//             </td>
//           </tr>
//           <tr>
//             <td>Patient Birth Date</td>
//             <td>{metadata.PatientBirthDate || "N/A"}</td>
//           </tr>
//           <tr>
//             <td>Series Description</td>
//             <td>{metadata.SeriesDescription || "N/A"}</td>
//           </tr>
//         </tbody>
//       </table>

//       {/* ✅ Pass "showImage" as a prop to control when the DICOM Viewer renders */}
//       {showImage && <DicomViewer filePath={`uploads/${fileName}`} />}
//     </div>
//   );
// };

// export default MetadataTable;

////////////////////////////////////////////////////////////////////////////////////7

// import React, { useState } from "react";
// import DicomViewer from "./DicomViewer"; // Ensure correct import

// const MetadataTable = ({ metadata }) => {
//   const [showImage, setShowImage] = useState(false);

//   if (!metadata) return null;

//   // ✅ Extract correct filename (avoid duplicate "uploads/")
//   const fileName = metadata.FilePath ? metadata.FilePath.replace(/^uploads[\\/]/, "") : "";

//   return (
//     <div>
//       <table border="1">
//         <thead>
//           <tr>
//             <th>Attribute</th>
//             <th>Value</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Patient Name</td>
//             <td>{metadata.PatientName || "N/A"}</td>
//             <td rowSpan="4">
//               {/* ✅ Fixed Download Button using /download/:fileName */}
//               <a href={`http://localhost:4000/download/${fileName}`} download>
//                 <button>Download File</button>
//               </a>

//               {/* ✅ Toggle Show/Hide Image */}
//               <button onClick={() => setShowImage(prev => !prev)}>
//                 {showImage ? "Hide DICOM Image" : "Show DICOM Image"}
//               </button>
//             </td>
//           </tr>
//           <tr>
//             <td>Patient Birth Date</td>
//             <td>{metadata.PatientBirthDate || "N/A"}</td>
//           </tr>
//           <tr>
//             <td>Series Description</td>
//             <td>{metadata.SeriesDescription || "N/A"}</td>
//           </tr>
//         </tbody>
//       </table>

//       {/* ✅ Pass "showImage" to DicomViewer so it only loads when needed */}
//       {/* <DicomViewer filePath={`uploads/${fileName}`} showImage={showImage} /> */}
//       {showImage && <DicomViewer filePath={`uploads/${fileName}`} />}
//     </div>
//   );
// };

// export default MetadataTable;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
// import React, { useState } from "react";
// import DicomViewer from "./DicomViewer"; // Ensure correct import

// const MetadataTable = ({ metadata }) => {
//   const [showImage, setShowImage] = useState(false);

//   if (!metadata) return null;

//   // ✅ Extract correct filename (avoid duplicate "uploads/")
//   const fileName = metadata.FilePath ? metadata.FilePath.replace(/^uploads[\\/]/, "") : "";

//   return (
//     <div>
//       <table border="1">
//         <thead>
//           <tr>
//             <th>Attribute</th>
//             <th>Value</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Patient Name</td>
//             <td>{metadata.PatientName || "N/A"}</td>
//             <td rowSpan="4">
//               {/* ✅ Fixed Download Button using /download/:fileName */}
//               <a href={`http://localhost:4000/download/${fileName}`} download>
//                 <button>Download File</button>
//               </a>

//               {/* ✅ Toggle Show/Hide Image */}
//               <button onClick={() => setShowImage(prev => !prev)}>
//                 {showImage ? "Hide DICOM Image" : "Show DICOM Image"}
//               </button>
//             </td>
//           </tr>
//           <tr>
//             <td>Patient Birth Date</td>
//             <td>{metadata.PatientBirthDate || "N/A"}</td>
//           </tr>
//           <tr>
//             <td>Series Description</td>
//             <td>{metadata.SeriesDescription || "N/A"}</td>
//           </tr>
//         </tbody>
//       </table>

//       {/* ✅ Only render when "showImage" is true */}
//       {showImage && <DicomViewer filePath={`uploads/${fileName}`} />}
//     </div>
//   );
// };

// export default MetadataTable;

//////////////////////////////////////////////////////////////////////////////////////7 

// import React, { useState } from "react";
// import DicomViewer from "./DicomViewer"; // Ensure correct import

// const MetadataTable = ({ metadata }) => {
//   const [showImage, setShowImage] = useState(false);

//   if (!metadata) return null;

//   // ✅ Extract correct filename (avoid duplicate "uploads/")
//   const fileName = metadata.FilePath ? metadata.FilePath.replace(/^uploads[\\/]/, "") : "";

//   return (
//     <div>
//       <table border="1">
//         <thead>
//           <tr>
//             <th>Attribute</th>
//             <th>Value</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Patient Name</td>
//             <td>{metadata.PatientName || "N/A"}</td>
//             <td rowSpan="4">
//               {/* ✅ Fixed Download Button using /download/:fileName */}
//               <a href={`http://localhost:4000/download/${fileName}`} download>
//                 <button>Download File</button>
//               </a>

//               {/* ✅ Toggle Show/Hide Image */}
//               <button onClick={() => setShowImage((prev) => !prev)}>
//                 {showImage ? "Hide DICOM Image" : "Show DICOM Image"}
//               </button>
//             </td>
//           </tr>
//           <tr>
//             <td>Patient Birth Date</td>
//             <td>{metadata.PatientBirthDate || "N/A"}</td>
//           </tr>
//           <tr>
//             <td>Series Description</td>
//             <td>{metadata.SeriesDescription || "N/A"}</td>
//           </tr>
//         </tbody>
//       </table>

//       {/* ✅ Ensure DicomViewer only appears when Show Image is clicked */}
//       {showImage && <DicomViewer filePath={`uploads/${fileName}`} />}
//     </div>
//   );
// };

// export default MetadataTable;

///////////////////////////////////////////////////////////////////////////////////////////////////7777

import React, { useState } from "react";
import DicomViewer from "./DicomViewer"; // Ensure correct import

const MetadataTable = ({ metadata }) => {
  const [showImage, setShowImage] = useState(false);

  if (!metadata) return null;

  // ✅ Extract correct filename (avoid duplicate "uploads/")
  const fileName = metadata.FilePath ? metadata.FilePath.replace(/^uploads[\\/]/, "") : "";

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Patient Name</td>
            <td>{metadata.PatientName || "N/A"}</td>
            <td rowSpan="4">
              {/* ✅ Fixed Download Button using /download/:fileName */}
              <a href={`http://localhost:4000/download/${fileName}`} download>
                <button>Download File</button>
              </a>

              {/* ✅ Toggle Show/Hide Image */}
              <button onClick={() => setShowImage((prev) => !prev)}>
                {showImage ? "Hide DICOM Image" : "Show DICOM Image"}
              </button>
            </td>
          </tr>
          <tr>
            <td>Patient Birth Date</td>
            <td>{metadata.PatientBirthDate || "N/A"}</td>
          </tr>
          <tr>
            <td>Series Description</td>
            <td>{metadata.SeriesDescription || "N/A"}</td>
          </tr>
        </tbody>
      </table>

      {/* ✅ Ensures image only appears when Show Image is clicked */}
      {showImage && <DicomViewer filePath={`uploads/${fileName}`} />}
    </div>
  );
};

export default MetadataTable;

//////////////////////////////////////////////////////////////////////////////////////7 uparla rakhna je kuch work na kare////

