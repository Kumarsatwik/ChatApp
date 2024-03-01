import Joi from "joi";

export const validate = (schema) => (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "Validation Error", error: error.details[0].message });
    }
  } catch (err) {
    console.log("Error during validation", err);
    return res.status(400).json({ error: "Server Error" });
  }
};
