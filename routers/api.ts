import { Router } from "express";
import register from "./register";
import login from "./login";

export default function api() {
    const router = Router();

    router
        .use((req, res, next) => {
            if (!req.body) {
                next(new Error("Bad request"));
                return;
            }
            next();
        })
        .use("/v1", apiV1())
        .use((req: any, res: any, next: any) => {
            console.log("Invalid route");
            res.status(404).json({
                error: "Invalid route",
            });
        })
        .use((err: any, req: any, res: any, next: any) => {
            res.status(500).json({
                error: err.message,
            });
        });

    return router;
}

function apiV1() {
    const router = Router();

    router
        .use((req: any, res: any, next: any) => {
            console.log("API V1");
            next();
        })
        .use("/register", register())
        .use("/login", login());

    return router;
}
