
import configure from "./routers";
const express = require("express");
const app = express();
const port = 3000;
configure(app);


app.use((err:any, req:any, res:any, next:any) => {
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
    });
});

(async () => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
})();
