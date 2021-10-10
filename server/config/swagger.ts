import { SwaggerConfig } from "@ioc:Adonis/Addons/Swagger";

export default {
  uiEnabled: true, //disable or enable swaggerUi route
  uiUrl: "docs", // url path to swaggerUI
  specEnabled: true, //disable or enable swagger.json route
  specUrl: "/swagger.json",

  middleware: [], // middlewares array, for protect your swagger docs and spec endpoints

  options: {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "venture // swagger docs",
        version: "2.0.0",
        description: "OpenAPI Specification to Venture RESTful API",
      },
      servers: [
        {
          url: "https://virtserver.swaggerhub.com/gisabernardess/venture/1.0.0",
          description: "SwaggerHub API Auto Mocking",
        },
      ],
      tags: [
        {
          name: "auth",
        },
        {
          name: "user",
        },
        {
          name: "post",
        },
        {
          name: "comment",
        },
      ],
      components: {
        securitySchemes: {
          authorization: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },

    apis: ["app/**/*.ts", "docs/swagger/**/*.yml", "start/routes.ts"],
    basePath: "/",
  },
  mode: process.env.NODE_ENV === "production" ? "PRODUCTION" : "RUNTIME",
  specFilePath: "docs/swagger.json",
} as SwaggerConfig;
