///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
// import React, { useState } from "react";
// import DicomViewer from "./DicomViewer"; // Ensure correct import

// const MetadataTable = ({ metadata }) => {
//   const [showImage, setShowImage] = useState(false);

//   if (!metadata) return null;

//   // Extract correct filename (avoid duplicate "uploads/")
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
//               {/* Fixed Download Button using /download/:fileName */}
//               <a href={`http://localhost:4000/download/${fileName}`} download>
//                 <button>Download File</button>
//               </a>

//               {/* Toggle Show/Hide Image */}
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

//       {/* Only render when "showImage" is true */}
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

//   // Extract correct filename (avoid duplicate "uploads/")
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
//               {/* Fixed Download Button using /download/:fileName */}
//               <a href={`http://localhost:4000/download/${fileName}`} download>
//                 <button>Download File</button>
//               </a>

//               {/* Toggle Show/Hide Image */}
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

//       {/* Ensure DicomViewer only appears when Show Image is clicked */}
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

  // Extract correct filename (avoid duplicate "uploads/")
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
              {/* Fixed Download Button using /download/:fileName */}
              <a href={`http://localhost:4000/download/${fileName}`} download>
                <button>Download File</button>
              </a>

              {/* Toggle Show/Hide Image */}
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

      {/* Ensure image only appears when Show Image is clicked */}
      {showImage && <DicomViewer filePath={`uploads/${fileName}`} />}
    </div>
  );
};

export default MetadataTable;

//////////////////////////////////////////////////////////////////////////////////////uparlarakhnainworkkarke////

