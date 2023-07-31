const Jimp = require("jimp");
const fs = require("fs");

async function addImageOverImage(
  baseImage,
  overlayImage,
  posx,
  posy,
  scl,
  rot,
  outFile
) {
  try {
    // Load the base image and overlay image using Jimp

    // optional
    // const opacity = 0.5;
    // overlayImage.scan(
    //   0,
    //   0,
    //   overlayImage.bitmap.width,
    //   overlayImage.bitmap.height,
    //   (x, y, idx) => {
    //     const alpha = overlayImage.bitmap.data[idx + 3];
    //     overlayImage.bitmap.data[idx + 3] = Math.floor(alpha * opacity);
    //   }
    // );
    // optional

    // Get the dimensions of the base image
    const baseWidth = baseImage.getWidth();
    const baseHeight = baseImage.getHeight();

    overlayImage.scale(scl);
    overlayImage.rotate(rot);

    // Composite the overlay image over the base image at a specific position
    const posX = posx; // X position of the overlay image
    const posY = posy; // Y position of the overlay image

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
      let overlayFile = "final-output.png";
      for (let i = 1; i <= 6; i++) {
        for (let j = 1; j <= 4; j++) {
          // vertical image
          overlayFile = `generatedFiles/${root}/lot${folderNum}/${fileNum}.png`;
          let overlayImage;
          if (flag !== 1) {
            try {
              overlayImage = await Jimp.read(overlayFile);
            } catch (err) {
              console.log(err);
              flag = 1;
              overlayImage = await Jimp.read("StickerTemplate.png");
              overlayFile = "";
            }
          } else overlayImage = await Jimp.read("StickerTemplate.png");

          await addImageOverImage(
            baseImage,
            overlayImage,
            apos1x,
            apos1y,
            0.53,
            90
          );
          apos1x += 540;
          if (flag !== 1) {
            try {
              overlayImage = await Jimp.read(overlayFile);
            } catch (err) {
              console.log(err);
              flag = 1;
              overlayImage = await Jimp.read("StickerTemplate.png");
              overlayFile = "";
            }
          } else overlayImage = await Jimp.read("StickerTemplate.png");
          //horizontal one
          await addImageOverImage(
            baseImage,
            overlayImage,
            apos2x,
            apos2y,
            0.32,
            0
          );
          apos2x += 542;
          if (flag !== 1) {
            try {
              overlayImage = await Jimp.read(overlayFile);
            } catch (err) {
              console.log(err);
              flag = 1;
              overlayImage = await Jimp.read("StickerTemplate.png");
              overlayFile = "";
            }
          } else overlayImage = await Jimp.read("StickerTemplate.png");
          // horizontal two
          await addImageOverImage(
            baseImage,
            overlayImage,
            apos3x,
            apos3y,
            0.31,
            0
          );
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
      await baseImage.writeAsync(`final${folderNum}.pdf`);
      folderNum++;
      fileNum = 1;
      if (flag === 1) break;
    }
  } catch (err) {
    console.log(err);
  }
};

makeFinalPng();
/*
    // first vertical
    let pos1x = 116;
    let pos1y = 268;
    await addImageOverImage(baseImage, overlayFile, pos1x, pos1y, 0.53, 90);

    await addImageOverImage(
      baseImage,
      overlayFile,
      pos1x + 540,
      pos1y,
      0.53,
      90
    );
    await addImageOverImage(
      baseImage,
      overlayFile,
      pos1x,
      pos1y + 495,
      0.53,
      90
    );

    // second horizontal
    let pos2x = 381;
    let pos2y = 186;
    await addImageOverImage(baseImage, overlayFile, pos2x, pos2y, 0.31, 0);

    await addImageOverImage(
      baseImage,
      overlayFile,
      pos2x + 542,
      pos2y,
      0.31,
      0
    );

    await addImageOverImage(
      baseImage,
      overlayFile,
      pos2x,
      pos2y + 497,
      0.31,
      0
    );

    // third horizontal
    let pos3x = 381;
    let pos3y = 343;
    await addImageOverImage(baseImage, overlayFile, pos3x, pos3y, 0.31, 0);

    await addImageOverImage(
      baseImage,
      overlayFile,
      pos3x + 542,
      pos3y,
      0.31,
      0
    );

    await addImageOverImage(
      baseImage,
      overlayFile,
      pos3x,
      pos3y + 497,
      0.31,
      0
    );
*/
