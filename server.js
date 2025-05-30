const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

// Enable CORS (optional, for FCC tests)
if (!process.env.DISABLE_XORIGIN) {
  app.use(function (req, res, next) {
    const allowedOrigins = [
      "https://narrow-plane.gomix.me",
      "https://www.freecodecamp.com",
    ];
    const origin = req.headers.origin || "*";
    if (!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
    }
    next();
  });
}

// Serve static files
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views"))); // Add this line!

// Routes
app.get("/_api/package.json", (req, res) => {
  fs.readFile(path.join(__dirname, "package.json"), (err, data) => {
    if (err) throw err;
    res.type("txt").send(data.toString());
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "package.json"));
});

// 404 handler
app.use((req, res) => {
  res.status(404).type("txt").send("Not found");
});

// Export for Vercel (REQUIRED)
module.exports = app;
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Node.js listening on port " + listener.address().port);
});
