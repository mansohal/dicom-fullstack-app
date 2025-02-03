// import React, { useEffect, useRef } from "react";
// import cornerstone from "cornerstone-core";
// import cornerstoneTools from "cornerstone-tools";
// import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
// import dicomParser from "dicom-parser";

// // ✅ Ensure cornerstone uses WADO image loader
// cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
// cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

// // ✅ Prevent undefined error by checking cornerstone.imageLoaders
// if (cornerstone.imageLoaders && !cornerstone.imageLoaders.hasOwnProperty("wadouri")) {
//   cornerstone.registerImageLoader("wadouri", cornerstoneWADOImageLoader.loadImage);
// } else {
//   console.warn("⚠️ cornerstone.imageLoaders is undefined or 'wadouri' is already registered.");
// }

// const DicomViewer = ({ filePath }) => {
//   const elementRef = useRef(null);

//   useEffect(() => {
//     if (!filePath) {
//       console.warn("⚠️ No file path provided for DICOM rendering.");
//       return;
//     }

//     console.log("🖼️ Loading DICOM Image:", filePath);
//     const imageId = `wadouri:http://localhost:4000/${filePath}`;

//     const element = elementRef.current;
//     if (!element) {
//       console.error("❌ Viewer Element Not Found");
//       return;
//     }

//     try {
//       cornerstone.enable(element);
//       cornerstone.loadImage(imageId)
//         .then(image => {
//           console.log("✅ DICOM Image Loaded Successfully");
//           const viewport = cornerstone.getDefaultViewportForImage(element, image);
//           cornerstone.displayImage(element, image, viewport);
//         })
//         .catch(err => {
//           console.error("❌ Error loading DICOM image:", err);
//         });
//     } catch (err) {
//       console.error("❌ Unexpected Error in DICOM Viewer:", err);
//     }

//     return () => {
//       cornerstone.disable(element);
//     };
//   }, [filePath]);

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

// import React, { useEffect, useRef } from "react";
// import cornerstone from "cornerstone-core";
// import cornerstoneTools from "cornerstone-tools";
// import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
// import dicomParser from "dicom-parser";

// // ✅ Ensure cornerstone uses WADO image loader
// cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
// cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

// if (cornerstone.imageLoaders && !cornerstone.imageLoaders.hasOwnProperty("wadouri")) {
//   cornerstone.registerImageLoader("wadouri", cornerstoneWADOImageLoader.loadImage);
// } else {
//   console.warn("⚠️ cornerstone.imageLoaders is undefined or 'wadouri' already registered.");
// }

// const DicomViewer = ({ filePath }) => {
//   const elementRef = useRef(null);

//   useEffect(() => {
//     if (!filePath) {
//       console.warn("⚠️ No file path provided for DICOM rendering.");
//       return;
//     }

//     console.log("🖼️ Loading DICOM Image:", filePath);
//     const imageId = `wadouri:http://localhost:4000/${filePath.replace("uploads/", "")}`;

//     const element = elementRef.current;
//     if (!element) {
//       console.error("❌ Viewer Element Not Found");
//       return;
//     }

//     try {
//       cornerstone.enable(element);
//       cornerstone.loadImage(imageId)
//         .then(image => {
//           console.log("✅ DICOM Image Loaded Successfully");
//           const viewport = cornerstone.getDefaultViewportForImage(element, image);
//           cornerstone.displayImage(element, image, viewport);
//         })
//         .catch(err => {
//           console.error("❌ Error loading DICOM image:", err);
//         });
//     } catch (err) {
//       console.error("❌ Unexpected Error in DICOM Viewer:", err);
//     }

//     return () => {
//       cornerstone.disable(element);
//     };
//   }, [filePath]);

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

////////////////////////////////////////////////////////////////////////////////////////// eh use karna hai 

// import React, { useEffect, useRef } from "react";
// import cornerstone from "cornerstone-core";
// import cornerstoneTools from "cornerstone-tools";
// import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
// import dicomParser from "dicom-parser";

// // ✅ Ensure cornerstone uses WADO image loader
// cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
// cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

// if (cornerstone.imageLoaders && !cornerstone.imageLoaders.hasOwnProperty("wadouri")) {
//   cornerstone.registerImageLoader("wadouri", cornerstoneWADOImageLoader.loadImage);
// } else {
//   console.warn("⚠️ cornerstone.imageLoaders is undefined or 'wadouri' already registered.");
// }

// const DicomViewer = ({ filePath }) => {
//   const elementRef = useRef(null);

//   useEffect(() => {
//     if (!filePath) {
//       console.warn("⚠️ No file path provided for DICOM rendering.");
//       return;
//     }

//     // ✅ Ensure file path includes "uploads/"
//     let correctedPath = filePath;
//     if (!filePath.startsWith("uploads/")) {
//       correctedPath = `uploads/${filePath}`;
//     }

//     console.log("🖼️ Loading DICOM Image:", correctedPath);

//     // ✅ Corrected Image URL
//     const imageId = `wadouri:http://localhost:4000/${correctedPath}`;

//     // ✅ Debug: Check if the image actually exists on the backend
//     fetch(`http://localhost:4000/${correctedPath}`)
//       .then(response => {
//         if (!response.ok) {
//           console.error("❌ Image not found on server:", correctedPath);
//         } else {
//           console.log("✅ Image exists on server:", correctedPath);
//         }
//       })
//       .catch(err => console.error("❌ Error checking image on server:", err));

//     const element = elementRef.current;
//     if (!element) {
//       console.error("❌ Viewer Element Not Found");
//       return;
//     }

//     try {
//       cornerstone.enable(element);
//       cornerstone.loadImage(imageId)
//         .then(image => {
//           console.log("✅ DICOM Image Loaded Successfully");
//           const viewport = cornerstone.getDefaultViewportForImage(element, image);
//           cornerstone.displayImage(element, image, viewport);
//         })
//         .catch(err => {
//           console.error("❌ Error loading DICOM image:", err);
//         });
//     } catch (err) {
//       console.error("❌ Unexpected Error in DICOM Viewer:", err);
//     }

//     return () => {
//       cornerstone.disable(element);
//     };
//   }, [filePath]);

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

//////////////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useRef } from "react";
// import cornerstone from "cornerstone-core";
// import cornerstoneTools from "cornerstone-tools";
// import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
// import dicomParser from "dicom-parser";

// // ✅ Ensure cornerstone uses WADO image loader
// cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
// cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

// if (cornerstone.imageLoaders && !cornerstone.imageLoaders.hasOwnProperty("wadouri")) {
//   cornerstone.registerImageLoader("wadouri", cornerstoneWADOImageLoader.loadImage);
// } else {
//   console.warn("⚠️ cornerstone.imageLoaders is undefined or 'wadouri' already registered.");
// }

// const DicomViewer = ({ filePath, showImage }) => {
//   const elementRef = useRef(null);

//   useEffect(() => {
//     if (!filePath || !showImage) {
//       console.warn("⚠️ No file path provided or Show Image is false. Skipping render.");
//       return;
//     }

//     console.log("🖼️ Loading DICOM Image:", filePath);
//     const imageId = `wadouri:http://localhost:4000/${filePath.replace("uploads/", "")}`;

//     const element = elementRef.current;
//     if (!element) {
//       console.error("❌ Viewer Element Not Found");
//       return;
//     }

//     try {
//       cornerstone.enable(element);
//       cornerstone.loadImage(imageId)
//         .then(image => {
//           console.log("✅ DICOM Image Loaded Successfully");
//           const viewport = cornerstone.getDefaultViewportForImage(element, image);
//           cornerstone.displayImage(element, image, viewport);
//         })
//         .catch(err => {
//           console.error("❌ Error loading DICOM image:", err);
//         });
//     } catch (err) {
//       console.error("❌ Unexpected Error in DICOM Viewer:", err);
//     }

//     return () => {
//       cornerstone.disable(element);
//     };
//   }, [filePath, showImage]); // ✅ Now updates only when showImage is true

//   return (
//     <div>
//       <h3>DICOM Viewer</h3>
//       {showImage ? (
//         <div
//           ref={elementRef}
//           style={{ width: "512px", height: "512px", backgroundColor: "black" }}
//         />
//       ) : (
//         <p>Click "Show DICOM Image" to display the image.</p>
//       )}
//     </div>
//   );
// };

// export default DicomViewer;

//////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useRef } from "react";
// import cornerstone from "cornerstone-core";
// import cornerstoneTools from "cornerstone-tools";
// import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
// import dicomParser from "dicom-parser";

// // ✅ Ensure cornerstone uses WADO image loader
// cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
// cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

// if (cornerstone.imageLoaders && !cornerstone.imageLoaders.hasOwnProperty("wadouri")) {
//   cornerstone.registerImageLoader("wadouri", cornerstoneWADOImageLoader.loadImage);
// } else {
//   console.warn("⚠️ cornerstone.imageLoaders is undefined or 'wadouri' already registered.");
// }

// const DicomViewer = ({ filePath, showImage }) => {
//   const elementRef = useRef(null);

//   useEffect(() => {
//     if (!filePath)  {
//       console.warn("⚠️ No file path provided OR 'Show Image' is false. Skipping render.");
//       return;
//     }

//     console.log("🖼️ Loading DICOM Image:", filePath);

//     // ✅ Ensure file path includes "uploads/"
//     let correctedPath = filePath;
//     if (!filePath.startsWith("uploads/")) {
//       correctedPath = `uploads/${filePath}`;
//     }

//     // ✅ Corrected Image URL
//     const imageId = `wadouri:http://localhost:4000/${correctedPath}`;

//     // ✅ Debug: Check if the image actually exists on the backend
//     fetch(`http://localhost:4000/${correctedPath}`)
//       .then(response => {
//         if (!response.ok) {
//           console.error("❌ Image not found on server:", correctedPath);
//         } else {
//           console.log("✅ Image exists on server:", correctedPath);
//         }
//       })
//       .catch(err => console.error("❌ Error checking image on server:", err));

//     const element = elementRef.current;
//     if (!element) {
//       console.error("❌ Viewer Element Not Found");
//       return;
//     }

//     try {
//       cornerstone.enable(element);
//       cornerstone.loadImage(imageId)
//         .then(image => {
//           console.log("✅ DICOM Image Loaded Successfully");
//           const viewport = cornerstone.getDefaultViewportForImage(element, image);
//           cornerstone.displayImage(element, image, viewport);
//         })
//         .catch(err => {
//           console.error("❌ Error loading DICOM image:", err);
//         });
//     } catch (err) {
//       console.error("❌ Unexpected Error in DICOM Viewer:", err);
//     }

//     return () => {
//       cornerstone.disable(element);
//     };
//   }, [filePath]); // updates only when showImage is true

//   return (
//     <div>
//       <h3>DICOM Viewer</h3>
//       {/* ✅ Always render the viewer, but only process the image when showImage is true */}
//       <div
//         ref={elementRef}
//         style={{ width: "512px", height: "512px", backgroundColor: "black" }}
//       >
//         {/* {!showImage && <p>Click "Show DICOM Image" to display the image.</p>} */}
//       </div>
//     </div>
//   );
// };

// export default DicomViewer;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7

// import React, { useEffect, useRef } from "react";
// import cornerstone from "cornerstone-core";
// import cornerstoneTools from "cornerstone-tools";
// import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
// import dicomParser from "dicom-parser";

// // ✅ Ensure cornerstone uses WADO image loader
// cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
// cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

// if (cornerstone.imageLoaders && !cornerstone.imageLoaders.hasOwnProperty("wadouri")) {
//   cornerstone.registerImageLoader("wadouri", cornerstoneWADOImageLoader.loadImage);
// } else {
//   console.warn("⚠️ cornerstone.imageLoaders is undefined or 'wadouri' already registered.");
// }

// const DicomViewer = ({ filePath }) => {
//   const elementRef = useRef(null);

//   useEffect(() => {
//     if (!filePath) {
//       console.warn("⚠️ No file path provided for DICOM rendering.");
//       return;
//     }

//     console.log("🖼️ Loading DICOM Image:", filePath);
//     const imageId = `wadouri:http://localhost:4000/uploads/${filePath.replace("uploads/", "")}`;
//     console.log("Final Image Path:", imageId);


//     const element = elementRef.current;
//     if (!element) {
//       console.error("❌ Viewer Element Not Found");
//       return;
//     }

//     try {
//       cornerstone.enable(element);
//       cornerstone.loadImage(imageId)
//         .then(image => {
//           console.log("✅ DICOM Image Loaded Successfully");
//           const viewport = cornerstone.getDefaultViewportForImage(element, image);
//           cornerstone.displayImage(element, image, viewport);
//         })
//         .catch(err => {
//           console.error("❌ Error loading DICOM image:", err);
//         });
//     } catch (err) {
//       console.error("❌ Unexpected Error in DICOM Viewer:", err);
//     }

//     return () => {
//       cornerstone.disable(element);
//     };
//   }, [filePath]); // ✅ The effect runs only when filePath changes

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useRef } from "react";
// import cornerstone from "cornerstone-core";
// import cornerstoneTools from "cornerstone-tools";
// import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
// import dicomParser from "dicom-parser";

// // ✅ Ensure cornerstone uses WADO image loader
// cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
// cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

// if (cornerstone.imageLoaders && !cornerstone.imageLoaders.hasOwnProperty("wadouri")) {
//   cornerstone.registerImageLoader("wadouri", cornerstoneWADOImageLoader.loadImage);
// } else {
//   console.warn("⚠️ cornerstone.imageLoaders is undefined or 'wadouri' already registered.");
// }

// const DicomViewer = ({ filePath }) => {
//   const elementRef = useRef(null);

//   useEffect(() => {
//     if (!filePath) {
//       console.warn("⚠️ No file path provided for DICOM rendering.");
//       return;
//     }

//     // ✅ Ensure file path includes "uploads/"
//     let correctedPath = filePath;
//     if (!filePath.startsWith("uploads/")) {
//       correctedPath = `uploads/${filePath}`;
//     }

//     console.log("🖼️ Loading DICOM Image:", correctedPath);

//     // ✅ Corrected Image URL
//     const imageId = `wadouri:http://localhost:4000/${correctedPath}`;

//     // ✅ Debug: Check if the image actually exists on the backend
//     fetch(`http://localhost:4000/${correctedPath}`)
//       .then(response => {
//         if (!response.ok) {
//           console.error("❌ Image not found on server:", correctedPath);
//         } else {
//           console.log("✅ Image exists on server:", correctedPath);
//         }
//       })
//       .catch(err => console.error("❌ Error checking image on server:", err));

//     const element = elementRef.current;
//     if (!element) {
//       console.error("❌ Viewer Element Not Found");
//       return;
//     }

//     try {
//       cornerstone.enable(element);
//       cornerstone.loadImage(imageId)
//         .then(image => {
//           console.log("✅ DICOM Image Loaded Successfully");
//           const viewport = cornerstone.getDefaultViewportForImage(element, image);
//           cornerstone.displayImage(element, image, viewport);
//         })
//         .catch(err => {
//           console.error("❌ Error loading DICOM image:", err);
//         });
//     } catch (err) {
//       console.error("❌ Unexpected Error in DICOM Viewer:", err);
//     }

//     return () => {
//       cornerstone.disable(element);
//     };
//   }, [filePath]); // ✅ Ensure it runs only when filePath changes

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

// ✅ Ensure cornerstone uses WADO image loader
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

if (cornerstone.imageLoaders && !cornerstone.imageLoaders.hasOwnProperty("wadouri")) {
  cornerstone.registerImageLoader("wadouri", cornerstoneWADOImageLoader.loadImage);
} else {
  console.warn("⚠️ cornerstone.imageLoaders is undefined or 'wadouri' already registered.");
}

const DicomViewer = ({ filePath }) => {
  const elementRef = useRef(null);
  const [shouldLoad, setShouldLoad] = React.useState(false);

  useEffect(() => {
    if (!filePath || !shouldLoad) {
      console.warn("⚠️ No file path provided OR 'Show Image' is false. Skipping render.");
      return;
    }

    // ✅ Ensure file path includes "uploads/"
    let correctedPath = filePath;
    if (!filePath.startsWith("uploads/")) {
      correctedPath = `uploads/${filePath}`;
    }

    console.log("🖼️ Loading DICOM Image:", correctedPath);

    // ✅ Corrected Image URL
    const imageId = `wadouri:http://localhost:4000/${correctedPath}`;

    // ✅ Debug: Check if the image actually exists on the backend
    fetch(`http://localhost:4000/${correctedPath}`)
      .then(response => {
        if (!response.ok) {
          console.error("❌ Image not found on server:", correctedPath);
        } else {
          console.log("✅ Image exists on server:", correctedPath);
        }
      })
      .catch(err => console.error("❌ Error checking image on server:", err));

    const element = elementRef.current;
    if (!element) {
      console.error("❌ Viewer Element Not Found");
      return;
    }

    try {
      cornerstone.enable(element);
      cornerstone.loadImage(imageId)
        .then(image => {
          console.log("✅ DICOM Image Loaded Successfully");
          const viewport = cornerstone.getDefaultViewportForImage(element, image);
          cornerstone.displayImage(element, image, viewport);
        })
        .catch(err => {
          console.error("❌ Error loading DICOM image:", err);
        });
    } catch (err) {
      console.error("❌ Unexpected Error in DICOM Viewer:", err);
    }

    return () => {
      cornerstone.disable(element);
    };
  }, [filePath, shouldLoad]); // ✅ Ensure it runs only when shouldLoad is true

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

