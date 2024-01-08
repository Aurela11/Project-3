const { z } = require('zod');

const CreateCartSchema = z.object({
  productId: z.number(),
  quantity: z.number()
});

const ChangeQuantitySchema = z.object({
    quantity: z.number(),
})

module.exports = { CreateCartSchema, ChangeQuantitySchema };
