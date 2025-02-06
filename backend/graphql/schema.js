const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Patient {
        idPatient: ID!
        Name: String!
        CreatedDate: String
    }

    type Study {
        idStudy: ID!
        idPatient: ID!
        StudyName: String!
        CreatedDate: String
    }

    type Modality {
        idModality: ID!
        Name: String!
    }

    type Series {
        idSeries: ID!
        idPatient: ID!
        idStudy: ID!
        idModality: ID!
        SeriesName: String!
        CreatedDate: String
    }

    type File {
        idFile: ID!
        idPatient: ID!
        idStudy: ID!
        idSeries: ID!
        FilePath: String!
        CreatedDate: String
    }

    type DicomMetadata {
        PatientName: String
        PatientBirthDate: String
        StudyDescription: String
        Modality: String
        SeriesDescription: String
        Manufacturer: String
        FilePath: String
    }

    type Query {
        getPatients: [Patient]
        getStudies: [Study]
        getModalities: [Modality]
        getSeries: [Series]
        getFiles: [File]
    }

    type Mutation {
    uploadDicomFile(idPatient: Int!, idStudy: Int!, idSeries: Int!, idModality: Int!, FilePath: String!): File
    extractDicomMetadata(FilePath: String!): DicomMetadata
}


`;

module.exports = typeDefs;
