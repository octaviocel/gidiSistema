import { _s3KeyId, _s3Secret, _s3Region, _s3Bucket } from './../constants';

import S3 from "aws-sdk/clients/s3";
import crypto from "crypto";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import { Request, Response } from "express";


const randomBytes = promisify(crypto.randomBytes);

const s3 = new S3({
    accessKeyId: _s3KeyId,
    secretAccessKey: _s3Secret,
    region: _s3Region,
});

export const getImagen = async (key: any) => {
    const url = s3.getSignedUrl("getObject", {
        Bucket: _s3Bucket,
        Key: key,
        Expires: 100000,
    });
    return url;
}

const deleteImagen = async (key: any) => {
    try {
        const bucketParams = { Bucket: `${_s3Bucket}`, Key: key };
        await s3
            .deleteObject(bucketParams)
            .promise()
            .then(() => { })
            .catch((err: any) => {
                console.log("error: " + err);
            });
    } catch (error) {
        console.log(error)
        return error
    }
}

export const uploadImage = async (req: Request, res: Response) => {
    try {
        if (req.file) {

            const stream = fs.createReadStream(req.file.path);
            const ext = path.extname(req.file.originalname).toLowerCase();

            let fileType = "";

            if (ext == ".png") {
                fileType = "image/png";
            } else if (ext == ".jpg" || ext == ".jpeg") {
                fileType = "image/jpg";
            } else {
                res.send({ data: "error" });
            }

            stream.on("error", function (err: any) {
                console.log("error in read stream: ", err);
                throw err;
            });

            const rawBytes = await randomBytes(16);
            const imageName = rawBytes.toString("hex");

            let params = {
                Bucket: `${_s3Bucket}`,
                Body: stream,
                Key: imageName,
                ContentType: fileType,
            };
            const data = await s3.upload(params).promise();

            res.send({ data: data.Key });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
    }
};

export const getImage = async (req: Request, res: Response) => {
    const { key } = req.params;
    const imagen = await getImagen(key);
    res.send(imagen);
};

export const deleteImage = async (req: Request, res: Response) => {
    try {
        const { key } = req.params;
        const data = await deleteImagen(key);
        res.send(data);
    } catch (err: any) {
        console.log(err);
    }
};