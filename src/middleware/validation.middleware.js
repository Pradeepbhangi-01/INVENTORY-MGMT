import { body, validationResult } from "express-validator";

const validateRequest = async (req, res, next) => {
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be a Positive Value"),
    body("imageUrl").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required");
      }
      return true;
    }),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  var valiadtionErrors = validationResult(req);

  if (!valiadtionErrors.isEmpty()) {
    return res.render("new-product", {
      errorMessage: valiadtionErrors.array()[0].msg,
    });
  }

  next();
};

export default validateRequest;
