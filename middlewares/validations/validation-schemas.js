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

const addSchema = z.object({
    title: z.string({ required_error: "Title is required" }).min(6),
    price: z.number({ required_error: "Price is required" }),
    address: z.string({ required_error: "Address is required" }),
    heroImage: z.string({ required_error: "Image is required" }),
    size: z.number({ required_error: "Size is required" }),
    propertyType: z.string({ required_error: "Property type is required" }),
    saleType: z.string({ required_error: "Rent or Buy is required" }),
    phoneNumber: z.string({ required_error: "phone Number is required" })
})

module.exports = { agencySchema, userSchema, addSchema };
