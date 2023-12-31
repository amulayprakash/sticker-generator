const Jimp = require("jimp");
const axios = require("axios");

async function saveImageFromAPI(imageUrl) {
  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });
    const imageData = response.data;
    return imageData;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function addTextToImage(image, idText, pinText) {
  try {
    const baseHeight = image.getHeight();
    const baseWidht = image.getWidth();

    const textPosX = 92;
    const textPosY = 120;

    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
    const shadowOffset = 1; // Increase this value for a more pronounced bold effect

    image.print(font, textPosX + shadowOffset, textPosY + shadowOffset, {
      text: idText,
    });
    image.print(font, textPosX, textPosY, {
      text: idText,
    });

    const pinx = 120;
    const piny = 190;

    image.print(font, pinx + shadowOffset, piny + shadowOffset, {
      text: pinText,
    });
    image.print(font, pinx, piny, {
      text: pinText,
    });

    const small = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
    image.print(small, baseWidht - 605, baseHeight - 50, {
      text: "Courtesy of",
    });

    image.print(small, baseWidht - 605, baseHeight - 30, {
      text: "Global Holidays",
    });

    // // Save the manipulated image
    // const outputFilePath = "output-image.png";
    // await image.writeAsync(outputFilePath);

    console.log("Text added to image. Output saved");
  } catch (error) {
    console.error("Error:", error);
  }
}

async function addImageOnImage(baseImage, url) {
  try {
    const res = await saveImageFromAPI(
      `https://api.qrserver.com/v1/create-qr-code/?size=270x270&data=${url}`
    );

    const overlayImage = await Jimp.read(res);

    const posX = 420; // X position of the overlay image
    const posY = 145; // Y position of the overlay image

    baseImage.composite(overlayImage, posX, posY, {
      mode: Jimp.BLEND_SOURCE_OVER, // This sets the blending mode
      opacitySource: 1, // The opacity of the overlay image
      opacityDest: 1, // The opacity of the base image
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

const makeSingleEntitySticker = async (outputFilePath, obj) => {
  try {
    const imageFile = "StickerTemplate.png";
    const image = await Jimp.read(imageFile);
    await addTextToImage(image, obj.id, obj.pin);
    await addImageOnImage(image, obj.url);

    return image;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { makeSingleEntitySticker };
