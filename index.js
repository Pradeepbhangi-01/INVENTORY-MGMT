import express, { urlencoded } from "express";
import ProductController from "./src/controller/product.controller.js";
import UserController from "./src/controller/user.controller.js";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import validationMiddleware from "./src/middleware/validation.middleware.js";
import { uploadFile } from "./src/middleware/file-upload-middleware.js";
import session from "express-session";
import { auth } from "./src/middleware/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middleware/lastVisit.middleware.js";
const app = express();

// from session
app.use(
  session({
    secret: "Secreat Key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
// setup view engine
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));
app.use(ejsLayouts);

// for cookies
app.use(cookieParser());
// app.use(setLastVisit);

app.use(express.static("public"));
//parse  form data
app.use(urlencoded({ extended: true }));
app.use(express.static("src/views"));

const productController = new ProductController();
const userController = new UserController();

app.get("/", setLastVisit, auth, productController.getProducts);
app.get("/add-product", auth, productController.getAddProduct);
app.get("/update-product/:id", auth, productController.getUpdateProductView);
app.get("/register", userController.getRegister);
app.get("/login", userController.getLogin);
app.get("/logout", userController.logout);

app.post(
  "/",
  auth,
  uploadFile.single("imageUrl"),
  validationMiddleware,
  productController.postAddProduct
);
app.post("/update-product", auth, productController.postUpdateProduct);
app.post("/delete-product/:id", auth, productController.deleteProduct);
app.post("/register", userController.postRegister);
app.post("/login", userController.postLogin);

app.listen(3500, () => {
  console.log("App is running in port 3500");
});
