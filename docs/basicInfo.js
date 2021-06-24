module.exports = {
  swagger: "2.0",
  info: {
    description: "Profiler API",
    version: "1.0.0",
    title: "Profile Rest API",
    contact: {
      name: "chuks Remi",
      url: "chuksremi.com",
      email: "chuksremi@gmail.com",
    },
    license: {
      name: "MIT",
      url: "http://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  host: "localhost:3000",
  basePath: "/",
  tags: [
    {
      name: "Profiler",
      description: "A cool profile API",
    },
  ],
  paths: {
    "/api/users": {
      get: {
        tags: ["profiler"],
        summary: "View all User",
        operationId: "getUserUsingGET",
        produces: ["*/*"],
        responses: {
          200: {
            description: "Successfully retrieved all User",
            schema: {
              $ref: "#/definitions/Iterable",
            },
          },
          401: {
            description: "You are not authorized to view the resource",
          },
          403: {
            description:
              "Accessing the resource you were trying to reach is forbidden",
          },
          404: {
            description: "The resource you were trying to reach is not found",
          },
          500: {
            description: "Application failed to process the request",
          },
        },
        deprecated: false,
      },
      post: {
        tags: ["profiler"],
        summary: "Create a new user",
        operationId: "createuserUsingPOST",
        consumes: ["application/json"],
        produces: ["*/*"],
        parameters: [
          {
            in: "body",
            name: "user",
            description: "user",
            required: true,
            schema: {
              $ref: "#/definitions/user",
            },
          },
        ],
        responses: {
          200: {
            description: "Successfully created a new user",
            schema: {
              $ref: "#/definitions/ResponseEntity",
            },
          },
          201: {
            description: "Created",
          },
          401: {
            description: "You are not authorized to view the resource",
          },
          403: {
            description:
              "Accessing the resource you were trying to reach is forbidden",
          },
          404: {
            description: "The resource you were trying to reach is not found",
          },
          500: {
            description: "Application failed to process the request",
          },
        },
        deprecated: false,
      },
      //   put: {
      //     tags: ["user-controller"],
      //     summary: "Update a user information",
      //     operationId: "UpdateuserUsingPUT",
      //     consumes: ["application/json"],
      //     produces: ["*/*"],
      //     parameters: [
      //       {
      //         in: "body",
      //         name: "user",
      //         description: "user",
      //         required: true,
      //         schema: {
      //           $ref: "#/definitions/user",
      //         },
      //       },
      //     ],
      //     responses: {
      //       200: {
      //         description: "Successfully updated user information",
      //         schema: {
      //           $ref: "#/definitions/ResponseEntity",
      //         },
      //       },
      //       201: {
      //         description: "Created",
      //       },
      //       401: {
      //         description: "You are not authorized to view the resource",
      //       },
      //       403: {
      //         description:
      //           "Accessing the resource you were trying to reach is forbidden",
      //       },
      //       404: {
      //         description: "The resource you were trying to reach is not found",
      //       },
      //       500: {
      //         description: "Application failed to process the request",
      //       },
      //     },
      //     deprecated: false,
      //   },
    },
    "/api/users/login": {
      post: {
        tags: ["profiler"],
        summary: "Login user",
        operationId: "loginuserUsingPOST",
        consumes: ["application/json"],
        produces: ["*/*"],
        parameters: [
          {
            in: "body",
            name: "user",
            description: "user",
            required: true,
            schema: {
              $ref: "#/definitions/loginuser",
            },
          },
        ],
        responses: {
          200: {
            description: "Successfully Logged in user",
            schema: {
              $ref: "#/definitions/ResponseEntity",
            },
          },
          201: {
            description: "Logged in",
          },
          401: {
            description: "You are not authorized to view the resource",
          },
          403: {
            description:
              "Accessing the resource you were trying to reach is forbidden",
          },
          404: {
            description: "The resource you were trying to reach is not found",
          },
          500: {
            description: "Application failed to process the request",
          },
        },
        deprecated: false,
      },
    },
    "/api/Users/{id}": {
      get: {
        tags: ["user-controller"],
        summary: "Retrieve specific user with the supplied user id",
        operationId: "getuserUsingGET",
        produces: ["*/*"],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "id",
            required: true,
            type: "integer",
            format: "int64",
          },
        ],
        responses: {
          200: {
            description: "Successfully retrieved the user with the supplied id",
            schema: {
              $ref: "#/definitions/ResponseEntity",
            },
          },
          401: {
            description: "You are not authorized to view the resource",
          },
          403: {
            description:
              "Accessing the resource you were trying to reach is forbidden",
          },
          404: {
            description: "The resource you were trying to reach is not found",
          },
          500: {
            description: "Application failed to process the request",
          },
        },
        deprecated: false,
      },
      //   delete: {
      //     tags: ["user-controller"],
      //     summary: "Deletes specific user with the supplied user id",
      //     operationId: "deleteUsingDELETE",
      //     produces: ["*/*"],
      //     parameters: [
      //       {
      //         name: "id",
      //         in: "path",
      //         description: "id",
      //         required: true,
      //         type: "integer",
      //         format: "int64",
      //       },
      //     ],
      //     responses: {
      //       200: {
      //         description: "Successfully deletes the specific user",
      //       },
      //       204: {
      //         description: "No Content",
      //       },
      //       401: {
      //         description: "You are not authorized to view the resource",
      //       },
      //       403: {
      //         description:
      //           "Accessing the resource you were trying to reach is forbidden",
      //       },
      //       404: {
      //         description: "The resource you were trying to reach is not found",
      //       },
      //       500: {
      //         description: "Application failed to process the request",
      //       },
      //     },
      //     deprecated: false,
      //   },
    },
  },
  definitions: {
    user: {
      type: "object",
      properties: {
        firstname: {
          type: "string",
        },
        lastname: {
          type: "string",
        },
        email: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
      title: "user",
    },
    loginuser: {
      type: "object",
      properties: {
        email: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
      title: "loginuser",
    },
    Iterable: {
      type: "object",
      title: "Iterable",
    },
    "Iterable«user»": {
      type: "object",
      title: "Iterable«user»",
    },
    ResponseEntity: {
      type: "object",
      properties: {
        body: {
          type: "object",
        },
        statusCode: {
          type: "string",
          enum: [
            "100 CONTINUE",
            "101 SWITCHING_PROTOCOLS",
            "102 PROCESSING",
            "103 CHECKPOINT",
            "200 OK",
            "201 CREATED",
            "202 ACCEPTED",
            "203 NON_AUTHORITATIVE_INFORMATION",
            "204 NO_CONTENT",
            "205 RESET_CONTENT",
            "206 PARTIAL_CONTENT",
            "207 MULTI_STATUS",
            "208 ALREADY_REPORTED",
            "226 IM_USED",
            "300 MULTIPLE_CHOICES",
            "301 MOVED_PERMANENTLY",
            "302 FOUND",
            "302 MOVED_TEMPORARILY",
            "303 SEE_OTHER",
            "304 NOT_MODIFIED",
            "305 USE_PROXY",
            "307 TEMPORARY_REDIRECT",
            "308 PERMANENT_REDIRECT",
            "400 BAD_REQUEST",
            "401 UNAUTHORIZED",
            "402 PAYMENT_REQUIRED",
            "403 FORBIDDEN",
            "404 NOT_FOUND",
            "405 METHOD_NOT_ALLOWED",
            "406 NOT_ACCEPTABLE",
            "407 PROXY_AUTHENTICATION_REQUIRED",
            "408 REQUEST_TIMEOUT",
            "409 CONFLICT",
            "410 GONE",
            "411 LENGTH_REQUIRED",
            "412 PRECONDITION_FAILED",
            "413 PAYLOAD_TOO_LARGE",
            "413 REQUEST_ENTITY_TOO_LARGE",
            "414 URI_TOO_LONG",
            "414 REQUEST_URI_TOO_LONG",
            "415 UNSUPPORTED_MEDIA_TYPE",
            "416 REQUESTED_RANGE_NOT_SATISFIABLE",
            "417 EXPECTATION_FAILED",
            "418 I_AM_A_TEAPOT",
            "419 INSUFFICIENT_SPACE_ON_RESOURCE",
            "420 METHOD_FAILURE",
            "421 DESTINATION_LOCKED",
            "422 UNPROCESSABLE_ENTITY",
            "423 LOCKED",
            "424 FAILED_DEPENDENCY",
            "425 TOO_EARLY",
            "426 UPGRADE_REQUIRED",
            "428 PRECONDITION_REQUIRED",
            "429 TOO_MANY_REQUESTS",
            "431 REQUEST_HEADER_FIELDS_TOO_LARGE",
            "451 UNAVAILABLE_FOR_LEGAL_REASONS",
            "500 INTERNAL_SERVER_ERROR",
            "501 NOT_IMPLEMENTED",
            "502 BAD_GATEWAY",
            "503 SERVICE_UNAVAILABLE",
            "504 GATEWAY_TIMEOUT",
            "505 HTTP_VERSION_NOT_SUPPORTED",
            "506 VARIANT_ALSO_NEGOTIATES",
            "507 INSUFFICIENT_STORAGE",
            "508 LOOP_DETECTED",
            "509 BANDWIDTH_LIMIT_EXCEEDED",
            "510 NOT_EXTENDED",
            "511 NETWORK_AUTHENTICATION_REQUIRED",
          ],
        },
        statusCodeValue: {
          type: "integer",
          format: "int32",
        },
      },
      title: "ResponseEntity",
    },
  },
};
