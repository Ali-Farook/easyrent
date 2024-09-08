const { z, Schema } = require('zod');

const userSignUpSchema = z.object({
   firstName: z.string({ required_error: "First Name is required" }).min(2),
   lastName: z.string({ required_error: "Last Name is required" }).min(2),
   email: z.string().email({ message: "Invalid email address" }),
   password: z.string().min(3)
})

const signUpValidation = async (req, res, next) => {
   try {
      const body = await userSignUpSchema.parseAsync(req.body);
      req.body = body;
      next();
   } catch (error) {
      const message = error.errors[0].message;
      return res.status(400).send({ message });
   }
}

module.exports = { signUpValidation };
