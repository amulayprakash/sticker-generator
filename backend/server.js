const express = require("express");
const app = express();
const pdfController = require("./controller/pdfGenerator-controller");
let cors = require("cors");
app.use(cors());

//middleware
app.use(express.json());

// route
app.post("/api/wesafepdf/download", pdfController.genratePdf);

// Start the server
const PORT = 5555;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
