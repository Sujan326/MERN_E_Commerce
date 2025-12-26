import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} from "../controllers/product.controllers.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

productRouter.post(
  "/add-product",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post("/delete-product", removeProduct);
productRouter.post("/single-product", singleProduct);
productRouter.get("/list-product", listProducts);

export default productRouter;
