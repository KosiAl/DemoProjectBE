import { Router } from "express";
import jwt from "jsonwebtoken";
const passport = require("passport");
import { getUser } from "./temp.service";

interface User {
    email: string;
    password?: string;
}

export default function login() {
    const router = Router();
    if (jwt) {
        console.log("jsonwebtoken library is installed and imported correctly");
    } else {
        console.error(
            "jsonwebtoken library is not installed or imported correctly"
        );
    }

    router
        .get(
            "/",
            passport.authenticate("jwt", { session: false }),
            async (req: any, res: any, next: any) => {
                // Make a call to the database to get the user's information
                let user: User = getUser();
                delete user.password;
                res.json(user);
            }
        )
        .post("/", async (req: any, res: any, next: any) => {
            let userCopy = { ...getUser() };
            let recivedUser = { ...req.body };
            let isUserLegit = false;

            if (
                recivedUser.email === userCopy.email &&
                recivedUser.password === userCopy.password
            ) {
                isUserLegit = true;
            } else {
                isUserLegit = false;
            }

            try {
                // Make a call to the database to get the user's information
                // Use bcrypt to compare the password the user sent with the password stored in the database
                // check if user exists
                if (!isUserLegit) {
                    return res
                        .status(400)
                        .json({ error: "User does not exist" });
                } else {
                    const jwToken = jwt.sign(
                        { id: userCopy.id },
                        "secret" /* , {expiresIn: '1h'} */
                    );
                    delete userCopy.password;
                    res.json({ fUser: userCopy, jwt: jwToken });
                }
            } catch (error: any) {
                res.status(500).json(error);
            }
        });

    return router;
}
