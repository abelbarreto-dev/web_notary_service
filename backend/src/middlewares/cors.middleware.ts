import { CorsOptions } from "cors";

const origins: string[] = (process.env.CORS_ORIGINS ?? "").split(",");

export const graphqlCorsContext: CorsOptions = {
    origin: origins,

    credentials: true,

    methods: ["POST"],

    allowedHeaders: ["Content-Type", "Authorization"],
};
