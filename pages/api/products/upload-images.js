import connectMongo from "@/database/conn";
import DataURIParser from "datauri/parser";
import cloudinary from "@/config/cloudinary";
import Images from "@/models/ImageSchema";
import nc from "next-connect";
import multer from "multer";
import path from "path";


export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = async (req) => {
  const productCoverImage = req.files.filter(
    (file) => file.fieldname === "productImages"
  )[0];

  if (!productCoverImage) {
    throw new Error("No book cover image found.");
  }

  const parser = new DataURIParser();
  try {
    // Function to create image
    const createImage = async (img) => {
      const base64Image = parser.format(
        path.extname(img.originalname).toString(),
        img.buffer
      );

      const uploadedImageResponse = await cloudinary.uploader.upload(
        base64Image.content,
        "rgs_inventory",
        {
          folder: "rgs_inventory/products/",
          public_id: img.originalname,
          resource_type: "image",
          use_filename: true,
          unique_filename: false,
        }
      );
      return uploadedImageResponse;
    };

    // Upload image and set req.body properties
    const createdProductImage = await createImage(productCoverImage);
    req.body.productPic = createdProductImage.url;
    req.body.productPicId = createdProductImage.public_id;
    req.body.productPicSignature = createdProductImage.signature;

    return {
      fields: req.body,
      files: req.files,
    };
  } catch (error) {
    throw error;
  }
};

const handler = nc({
  onError: (err, req, res) => {
    res.status(500).json({ message: err?.message });
  },
  onNoMatch: (err, req, res) => {
    res.status(404).json({ message: "Not Found" });
  },
})
  .use(multer().any())
  .post(async (req, res) => {
    connectMongo().catch((error) =>
      res.json({ message: "Connection Failed...!" })
    );

    if (req.method === "POST") {
        const uploadResults = await readFile(req);

        if (!uploadResults.fields) {
          return res
            .status(404)
            .json({
              message:
                "Don't have form data...! This may be because of wrong image files provided.",
            });
        }
        const { title, description,image } = uploadResults.fields;

        await Images.create({
          title,
          description,
          image,
          productPic: uploadResults.fields.productPic,
          productPicId: uploadResults.fields.productPicId,
          productPicSignature: uploadResults.fields.productPicSignature,
        })
          .then((data) => {
            return res.status(201).json({ status: true, productImages: data, message:"Image uploaded successfully" });
          })
          .catch((err) => {
            console.log(err);
            return res.status(404).json({ message: err?.message });
          });
    } else {
        return res.status(500).json({ message: "Only POST request are accepted" });
    }
  });

export default handler;
