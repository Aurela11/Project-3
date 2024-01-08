
const express = require('express');
const { PORT } = require('./secret');
const rootRouter = require('./routes');
const {PrismaClient}= require('@prisma/client');
const { errorMiddleware } = require('./middlewares/errors');
const { SignUpSchema } = require('./schema/users');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use('/api', rootRouter);
 
app.use(cors());
app.use(bodyParser.json()); 

const prisma = new PrismaClient({
  log: ['query']
}).$extends({
  result:{
      address:{
          formattedAddress: {
              needs: {
                  lineOne: true,
                  lineTwo: true,
                  city: true,
                  country: true,
                  pincode: true
              },
              compute: (addr) => {
                  return `${addr.lineOne}, ${addr.lineTwo}, ${addr.city}, ${addr.country}-${addr.pincode}`
              }
          }
      }
  }
})

app.use(errorMiddleware);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { PrismaClient: prisma };

