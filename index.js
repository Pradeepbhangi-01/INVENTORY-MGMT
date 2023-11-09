import express, { urlencoded } from "express";
import ProductController from "./src/controller/product.controller.js";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import validationMiddleware from "./src/middleware/validation.middleware.js";
const app = express();

app.use(express.static("public"));
//parse  form data
app.use(urlencoded({ extended: true }));

// setup view engine
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

app.use(ejsLayouts);

const productController = new ProductController();

app.get("/", productController.getProducts);
app.get("/add-product", productController.getAddProduct);
app.get("/update-product/:id", productController.getUpdateProductView);
app.post("/", validationMiddleware, productController.postAddProduct);
app.post("/update-product", productController.postUpdateProduct);
app.post("/delete-product/:id", productController.deleteProduct);

app.use(express.static("src/views"));
app.listen(3500, () => {
  console.log("App is running in port 3500");
});
