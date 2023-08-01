const Jimp = require("jimp");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const XLSX = require("xlsx");
const { makeSingleEntitySticker } = require("./draw.js");

async function addImageOverImage(
  baseImage,
  overlayImage,
  posx,
  posy,
  scl,
  rot
) {
  try {
    overlayImage.scale(scl);
    overlayImage.rotate(rot);

    const posX = posx;
    const posY = posy;

    baseImage.composite(overlayImage, posX, posY, {
      mode: Jimp.BLEND_SOURCE_OVER, // This sets the blending mode
      opacitySource: 1, // The opacity of the overlay image
      opacityDest: 1, // The opacity of the base image
    });

    console.log("Image manipulation complete. Output saved ");
  } catch (error) {
    console.error("Error:", error);
    throw Error(error);
  }
}
const getDateToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = today.getDate();
  return `${day}-${month}-${year}`;
};
const makeFinalPng = async () => {
  try {
    // xl raw data - start
    const workbook = XLSX.readFile("devsample.xlsx");
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const xldata = XLSX.utils.sheet_to_json(worksheet);
    // xl raw data - over

    const pdfDoc = await PDFDocument.create();

    const root = getDateToday();
    let folderNum = 1;
    let fileNum = 1;
    let flag = 0;

    while (1) {
      let apos1x = 116; //vert
      let apos1y = 268; //vert
      let initVertx = 116;

      let apos2x = 376; //hori 1
      let apos2y = 186; //hori 1
      let initHorix1 = 376;

      let apos3x = 376; //hori 2
      let apos3y = 343; //hori 2
      let initHorix2 = 376;

      const baseImage = await Jimp.read("template.png");

      for (let i = 1; i <= 6; i++) {
        for (let j = 1; j <= 4; j++) {
          // vertical image

          let overlayImage;

          if (fileNum <= xldata.length) {
            try {
              overlayImage = await makeSingleEntitySticker(
                "",
                xldata[fileNum - 1]
              );
            } catch (err) {
              console.log(err);
            }
          } else {
            overlayImage = await Jimp.read("StickerTemplate.png");
            flag = 1;
          }

          let overlay1 = overlayImage.clone();
          let overlay2 = overlayImage.clone();
          let overlay3 = overlayImage.clone();

          await addImageOverImage(
            baseImage,
            overlay1,
            apos1x,
            apos1y,
            0.53,
            90
          );
          apos1x += 540;

          //horizontal one
          await addImageOverImage(baseImage, overlay2, apos2x, apos2y, 0.32, 0);
          apos2x += 542;

          // horizontal two
          await addImageOverImage(baseImage, overlay3, apos3x, apos3y, 0.31, 0);
          apos3x += 542;

          fileNum++;
        }
        apos1x = initVertx;
        apos1y += 495;

        apos2x = initHorix1;
        apos2y += 496;

        apos3x = initHorix2;
        apos3y += 496;
      }
      // await baseImage.writeAsync(`final${folderNum}.pdf`);
      const dat = await baseImage.getBufferAsync(Jimp.MIME_PNG);
      const pdfImage = await pdfDoc.embedPng(dat);
      const page = pdfDoc.addPage([pdfImage.width, pdfImage.height]);
      const pageWidth = page.getWidth();
      const pageHeight = page.getHeight();

      page.drawImage(pdfImage, {
        x: 0,
        y: 0,
        width: pageWidth,
        height: pageHeight,
      });

      folderNum++;
      if (flag === 1) break;
    }

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync("test.pdf", pdfBytes);
  } catch (err) {
    console.log(err);
  }
};

makeFinalPng();
