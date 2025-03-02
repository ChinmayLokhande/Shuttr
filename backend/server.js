const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

const imageDir = path.join(__dirname, "images");
app.use("/images", express.static(imageDir));

app.get("/api/images", (req, res) => {
    fs.readdir(imageDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: "Error reading image directory" });
        }
        const imageUrls = files.map(file => `/images/${file}`);
        res.json(imageUrls);
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🖼️  Place images inside the "backend/images" folder`);
});
