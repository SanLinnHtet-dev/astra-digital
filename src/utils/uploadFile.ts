
import AWS from "aws-sdk";
import { UploadedFile } from "express-fileupload";
import fs from "fs";

const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACES_URL || "");
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_SPACES_ID,
  region: process.env.DO_SPACES_REGION,
  secretAccessKey: process.env.DO_SPACES_SECRET,
});

const uploadFile = async (files: UploadedFile, cbFn: (url: string) => void) => {
  const fileName = new Date().getTime();


  // const fileName = Date.now() + '_' + Math.round(Math.random() * 1e9)
  
  return s3.putObject(
    {
      Bucket: process.env.DO_SPACES_BUCKET || "",
      Key: fileName + ".png",
      Body: fs.createReadStream(files.tempFilePath),
      ACL: "public-read",
    },
    (err) => {
      if (err) {
        throw new Error(err.message);
      } else {
        cbFn(
          `https://diginetspace.sgp1.digitaloceanspaces.com/${fileName}.png`
        );
      }
    }
  );
};

export default uploadFile;
