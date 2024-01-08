const { z } = require('zod');

const SignUpSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
});

const AddressSchema = z.object({
    lineOne:z.string(),
    lineTwo:z.string(z.nullable()),
    pincode: z.string().length(5),
    country:z.string(),
    city:z.string(),
    
   
});

const UpdateUserSchema = z.object({
    name:z.string().optional(),
    defaultShippingAddress:z.number().optional(),
    defaultBillingAddress: z.number().optional(),
}) 

module.exports = { SignUpSchema, AddressSchema, UpdateUserSchema };
