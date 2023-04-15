import { Router } from "express";
import { saveUser, getUser } from "./temp.service";

export default function register() {
    const router = Router();

    router.post("/", async (req: any, res: any, next: any) => {
        saveUser({ ...req.body });

        try {
            let userCopy = { ...getUser() };
            delete userCopy.password;
            res.json(userCopy);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}
