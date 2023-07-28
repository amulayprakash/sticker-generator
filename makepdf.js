const Jimp = require("jimp");
const fs = require("fs");

async function addImageOverImage(
  baseFile,
  overlayFile,
  posx,
  posy,
  scl,
  rot,
  outFile
) {
  try {
    // Load the base image and overlay image using Jimp
    const baseImage = await Jimp.read(baseFile);
    const overlayImage = await Jimp.read(overlayFile);

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

    // Save the manipulated image
    const outputFilePath = `${outFile}.png`;
    await baseImage.writeAsync(outputFilePath);

    console.log(
      "Image manipulation complete. Output saved at:",
      outputFilePath
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

const makeFinalPng = async () => {
  try {
    const filename = "template.png";
    const image = await Jimp.read(filename);

    const baseHeight = image.getHeight();
    const baseWidht = image.getWidth();

    let baseFile = "template.png";
    let overlayFile = "final-output.png";
    let posx = 116;
    let posy = 268;
    await addImageOverImage(
      baseFile,
      overlayFile,
      posx,
      posy,
      0.52,
      90,
      "test"
    );

    await addImageOverImage("test.png", overlayFile, 381, 187, 0.3, 0, "test1");
    await addImageOverImage(
      "test1.png",
      overlayFile,
      381,
      343,
      0.3,
      0,
      "test2"
    );
  } catch (err) {
    console.log(err);
  }
};

makeFinalPng();
