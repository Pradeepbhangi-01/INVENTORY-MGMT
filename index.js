import express, { urlencoded } from "express";
import ProductController from "./src/controller/product.controller.js";
import UserController from "./src/controller/user.controller.js";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import validationMiddleware from "./src/middleware/validation.middleware.js";
import { uploadFile } from "./src/middleware/file-upload-middleware.js";
const app = express();

// setup view engine
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));
app.use(ejsLayouts);

app.use(express.static("public"));
//parse  form data
app.use(urlencoded({ extended: true }));
app.use(express.static("src/views"));

const productController = new ProductController();
const userController = new UserController();

app.get("/", productController.getProducts);
app.get("/add-product", productController.getAddProduct);
app.get("/update-product/:id", productController.getUpdateProductView);
app.post(
  "/",
  uploadFile.single("imageUrl"),
  validationMiddleware,
  productController.postAddProduct
);
app.post("/update-product", productController.postUpdateProduct);
app.post("/delete-product/:id", productController.deleteProduct);
app.get("/register", userController.getRegister);

app.listen(3500, () => {
  console.log("App is running in port 3500");
});
