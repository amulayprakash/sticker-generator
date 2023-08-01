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

/*const getDateToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = today.getDate();
  return `${day}-${month}-${year}`;
};
const makeAllSticker = async () => {
  try {
    const workbook = XLSX.readFile("devsample.xlsx");
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    const promises = [];

    let fileNum = 1;
    const root = getDateToday();
    for (let i = 0; i < data.length; i++) {
      promises.push(
        makeSingleEntitySticker(
          `generatedFiles/${root}/lot${fileNum}/${(i % 24) + 1}.png`,
          data[i]
        )
      );
      if ((i + 1) % 24 === 0) fileNum++;
    }
    await Promise.all(promises);
  } catch (err) {
    console.log(err);
  }
};

// makeAllSticker();
// makeSingleEntitySticker();*/
