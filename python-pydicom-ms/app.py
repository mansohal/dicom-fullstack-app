from flask import Flask, request, jsonify
import pydicom
import os

# Detect Environment Mode (Docker vs. Local)
DOCKER_MODE = os.getenv("DOCKER_MODE", "false").lower() == "true"

# Set Upload Folder Based on Environment
UPLOAD_FOLDER = "/shared/uploads" if DOCKER_MODE else "uploads"
ALLOWED_EXTENSIONS = {"dcm"}

# Ensure upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

def allowed_file(filename):
    """ Check if the file has a valid DICOM extension """
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/extract-metadata", methods=["POST"])
def extract_metadata():
    """Extract metadata from an uploaded DICOM file"""

    print("Incoming Request Data:")
    print("🔹 Form Data:", request.form)
    print("🔹 Files:", request.files)
    print("🔹 Request Content-Type:", request.content_type)

    # Check if a file is present in the request
    if "file" not in request.files:
        print("No file found in request!")
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]

    if file.filename == "":
        print("No file selected!")
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)

        print(f"Saving file to: {file_path}")  # Debugging log
        file.save(file_path)

        try:
            # Load the DICOM file
            dicom_data = pydicom.dcmread(file_path)

            # Extract metadata
            metadata = {
                "PatientName": str(dicom_data.get("PatientName", "N/A")),
                "PatientBirthDate": str(dicom_data.get("PatientBirthDate", "N/A")),
                "StudyDescription": str(dicom_data.get("StudyDescription", "N/A")),
                "Modality": str(dicom_data.get("Modality", "N/A")),
                "SeriesDescription": str(dicom_data.get("SeriesDescription", "N/A")),
                "Manufacturer": str(dicom_data.get("Manufacturer", "N/A")),
                "FilePath": file_path,
            }

            print("Metadata Extracted:", metadata)
            return jsonify({"metadata": metadata}), 200

        except Exception as e:
            print("DICOM Processing Error:", str(e))
            return jsonify({"error": str(e)}), 500

    return jsonify({"error": "Invalid file format"}), 400

if __name__ == "__main__":
    print(f"Starting Flask server in {'DOCKER' if DOCKER_MODE else 'LOCAL'} mode")
    app.run(host="0.0.0.0", port=5001, debug=True)
