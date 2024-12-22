import { body, validationResult } from "express-validator";

export const validateUser = [
    body("firstName").notEmpty().withMessage("First name is required."),
    body("middleName")
    .optional()
    .notEmpty().withMessage("Middle name is required bye."),
    body("lastName").notEmpty().withMessage("Last name is required."),
    body("mobileNumber")
        .notEmpty().withMessage("Mobile number is required.")
        .isMobilePhone().withMessage("Invalid mobile number."),
    body("isActive").isBoolean().withMessage("isActive must be true or false."),
    body("email").isEmail().withMessage("Invalid email format."),
    body("password")
        .isLength({ min: 9 }).withMessage("Password must be at least 9 characters long."),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
