const { makeFinalPng } = require("./../makepdf");

exports.genratePdf = async (req, res) => {
  try {
    const { xldata } = req.body;

    let pdfData;
    try {
      pdfData = await makeFinalPng(xldata);
    } catch (err) {
      res
        .status(500)
        .json({ ok: false, msg: err?.message || "Cannot create pdf" });
    }

    const pdfFileName = "my_generated_file.pdf";

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${pdfFileName}`);
    res.setHeader("Content-Length", pdfData.length);

    res.end(pdfData);
  } catch (err) {
    res
      .status(500)
      .json({ ok: false, msg: err?.message || "Something went wrong!" });
  }
};
