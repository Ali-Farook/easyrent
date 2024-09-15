const { z } = require('zod');

const userSchema = z.object({
    firstName: z.string({ required_error: "First Name is required" }).min(2),
    lastName: z.string({ required_error: "Last Name is required" }).min(2),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(3),
});

const agencySchema = z.object({
    name: z.string({ required_error: "Agency name is required" }).min(6),
    location: z.string({ required_error: "Location is required" }),
});

module.exports = { agencySchema, userSchema };
