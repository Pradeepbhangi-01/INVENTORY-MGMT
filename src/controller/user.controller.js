import UserModel from "../model/user.model.js";
import ProductModel from "../model/product.model.js";

export default class UserController {
  // get registration form
  getRegister(req, res) {
    res.render("register");
  }

  //To Login
  getLogin(req, res) {
    res.render("login", { errorMessage: null });
  }

  //To Post
  postRegister(req, res) {
    const { name, email, password } = req.body;
    UserModel.add(name, email, password);
    res.render("login", { errorMessage: null });
  }

  //Is valid User
  postLogin(req, res) {
    const { email, password } = req.body;
    const user = UserModel.isValidUser(email, password);

    if (!user) {
      return res.render("login", { errorMessage: "Invalid Credentials" });
    }
    //  using session
    req.session.userEmail = email;
    var products = ProductModel.getAll();
    res.render("index", { products, userEmail: req.session.userEmail });
  }

  // For logout
  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("login");
      }
    });

    // To delete the cookie
    res.clearCookie("lastVisit");
  }
}
