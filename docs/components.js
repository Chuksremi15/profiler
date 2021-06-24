module.exports = {
  components: {
    schemas: {
      // User model
      User: {
        type: "object", // data type
        properties: {
          id: {
            type: "int", // data-type
            description: "User identification number", // desc
            example: "ytyVgh", // example of an id
          },
          firstname: {
            type: "string", // data-type
            description: "User's firstname", // desc
            example: "chudi", // example of a title
          },
          lastname: {
            type: "string", // data-type
            description: "User's lastname", // desc
            example: "samual", // example of a title
          },
          email: {
            type: "string", // data-type
            description: "User's email", // desc
            example: "chidisam@gmail.com", // example of a title
          },
          password: {
            type: "string", // data type
            description: "The password of the User", // desc
            example: "63283jdj2hhhs#", // example of a completed value
          },
        },
      },

      // error model
      Error: {
        type: "object", //data type
        properties: {
          message: {
            type: "int", // data type
            description: "Error message", // desc
            example: "Not found", // example of an error message
          },
          internal_code: {
            type: "int", // data type
            description: "Error internal code", // desc
            example: "Invalid parameters", // example of an error internal code
          },
        },
      },
    },
  },
};
