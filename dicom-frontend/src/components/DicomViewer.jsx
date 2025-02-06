///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useRef } from "react";
// import cornerstone from "cornerstone-core";
// import cornerstoneTools from "cornerstone-tools";
// import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
// import dicomParser from "dicom-parser";

// // Ensure cornerstone uses WADO image loader
// cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
// cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

// if (cornerstone.imageLoaders && !cornerstone.imageLoaders.hasOwnProperty("wadouri")) {
//   cornerstone.registerImageLoader("wadouri", cornerstoneWADOImageLoader.loadImage);
// } else {
//   console.warn("cornerstone.imageLoaders is undefined or 'wadouri' already registered.");
// }

// const DicomViewer = ({ filePath }) => {
//   const elementRef = useRef(null);

//   useEffect(() => {
//     if (!filePath) {
//       console.warn("No file path provided for DICOM rendering.");
//       return;
//     }

//     // Ensure file path includes "uploads/"
//     let correctedPath = filePath;
//     if (!filePath.startsWith("uploads/")) {
//       correctedPath = `uploads/${filePath}`;
//     }

//     console.log("Loading DICOM Image:", correctedPath);

//     // Corrected Image URL
//     const imageId = `wadouri:http://localhost:4000/${correctedPath}`;

//     // Debug: Check if the image actually exists on the backend
//     fetch(`http://localhost:4000/${correctedPath}`)
//       .then(response => {
//         if (!response.ok) {
//           console.error("Image not found on server:", correctedPath);
//         } else {
//           console.log("Image exists on server:", correctedPath);
//         }
//       })
//       .catch(err => console.error("Error checking image on server:", err));

//     const element = elementRef.current;
//     if (!element) {
//       console.error("Viewer Element Not Found");
//       return;
//     }

//     try {
//       cornerstone.enable(element);
//       cornerstone.loadImage(imageId)
//         .then(image => {
//           console.log("DICOM Image Loaded Successfully");
//           const viewport = cornerstone.getDefaultViewportForImage(element, image);
//           cornerstone.displayImage(element, image, viewport);
//         })
//         .catch(err => {
//           console.error("Error loading DICOM image:", err);
//         });
//     } catch (err) {
//       console.error("Unexpected Error in DICOM Viewer:", err);
//     }

//     return () => {
//       cornerstone.disable(element);
//     };
//   }, [filePath]); // Ensure it runs only when filePath changes

//   return (
//     <div>
//       <h3>DICOM Viewer</h3>
//       <div
//         ref={elementRef}
//         style={{ width: "512px", height: "512px", backgroundColor: "black" }}
//       />
//     </div>
//   );
// };

// export default DicomViewer;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////777

import React, { useEffect, useRef } from "react";
import cornerstone from "cornerstone-core";
import cornerstoneTools from "cornerstone-tools";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";

// Ensure cornerstone uses WADO image loader
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

if (cornerstone.imageLoaders && !cornerstone.imageLoaders.hasOwnProperty("wadouri")) {
  cornerstone.registerImageLoader("wadouri", cornerstoneWADOImageLoader.loadImage);
} else {
  console.warn("cornerstone.imageLoaders is undefined or 'wadouri' already registered.");
}

const DicomViewer = ({ filePath }) => {
  const elementRef = useRef(null);
  const [shouldLoad, setShouldLoad] = React.useState(false);

  useEffect(() => {
    if (!filePath || !shouldLoad) {
      console.warn("No file path provided OR 'Show Image' is false. Skipping render.");
      return;
    }

    // Ensure file path includes "uploads/"
    let correctedPath = filePath;
    if (!filePath.startsWith("uploads/")) {
      correctedPath = `uploads/${filePath}`;
    }

    console.log("Loading DICOM Image:", correctedPath);

    // Corrected Image URL
    // const IMAGE_BASE_URL = process.env.DOCKER_ENV
    //         ? "http://dicom-flask:5001"
    //         : "http://localhost:5001";
    const imageId = `wadouri:http://localhost:4000/${correctedPath}`;
    // const imageId = `wadouri:http://dicom-flask:5001/${correctedPath}`;
    // const IMAGE_BASE_URL = "http://dicom-flask:5001";

    // const imageId = `wadouri:${IMAGE_BASE_URL}/${correctedPath}`;

    // Debug: Check if the image actually exists on the backend
    fetch(`http://localhost:4000/${correctedPath}`)
    // fetch(`${IMAGE_BASE_URL}/${correctedPath}`)
      .then(response => {
        if (!response.ok) {
          console.error("Image not found on server:", correctedPath);
        } else {
          console.log("Image exists on server:", correctedPath);
        }
      })
      .catch(err => console.error("Error checking image on server:", err));

    const element = elementRef.current;
    if (!element) {
      console.error("Viewer Element Not Found");
      return;
    }

    try {
      cornerstone.enable(element);
      cornerstone.loadImage(imageId)
        .then(image => {
          console.log("DICOM Image Loaded Successfully");
          const viewport = cornerstone.getDefaultViewportForImage(element, image);
          cornerstone.displayImage(element, image, viewport);
        })
        .catch(err => {
          console.error("Error loading DICOM image:", err);
        });
    } catch (err) {
      console.error("Unexpected Error in DICOM Viewer:", err);
    }

    return () => {
      cornerstone.disable(element);
    };
  }, [filePath, shouldLoad]); // Ensure it runs only when shouldLoad is true

  return (
    <div>
      <h3>DICOM Viewer</h3>
      <button onClick={() => setShouldLoad(true)}>Load Image</button>
      {shouldLoad && (
        <div
          ref={elementRef}
          style={{ width: "512px", height: "512px", backgroundColor: "black" }}
        />
      )}
    </div>
  );
};

export default DicomViewer;


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////777 je kuch work na kre uparla rakhna//////

