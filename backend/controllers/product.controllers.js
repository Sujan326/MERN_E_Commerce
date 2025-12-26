import { v2 as cloudinary } from "cloudinary";
import { ProductModel } from "../models/product.models.js";

// API for adding product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    // get images from req.files.imageArray: check if image is present first and then store.
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    // filter image: if the image is undefined dont consider it.
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    // upload images on cloudinary and get the URL
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // create product data
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestSeller: bestSeller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    // save in DB
    const product = new ProductModel(productData);
    await product.save();
    res.json({ success: true, message: "Product Added Succesfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for list product
const listProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({}); // get all data
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for removing product
const removeProduct = async (req, res) => {
  try {
    // find the product_id from the req.body.id
    await ProductModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for single product information
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.json({ success: false, message: "Product Does Not Exists" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
