import express from "express";
import { json } from "body-parser";
import api from "./api";
import cors from "cors";
require("../Auth/passport");

export default function configure(app: any) {
    app.use(cors())
        .get("/", (req: any, res: any, next: any) => {
            res.send({ text: "Hello World" });
        })
        .use(express.static("public"))
        .use(json())

        .use("/api", api())
        .use((req: any, res: any, next: any) => {
            next(new Error("Not Found"));
        });
}
