# Project-3
E-commerce webpage with Express.js and Angular js
E-Commerce Managment System (Backend) -  using Express.js, Prisma

-Clone the project git clone 
   https://github.com/Aurela11/Project-3.git

-Open terminal and navigate to the project 
   cd Project-3

-Install packages 
   npm install (npm i)

-Migrate database 
 npx prisma migrate dev"initial"
 npx prisma deploy

-Start the project 
npm run start
----------------------------------------------------------------

Test the project requests with Postman, for example:

Make a POST request
Enter Url: http://localhost:3000/api/products/
In body do the JSON format and give the necessary parameters 
{
"name":"bagg",
"description":"hand bag",
"price":"25",
"tags":["bag","luxury"],
"imageUrl":"foto.PNG"
}


#Author: Aurela Gashi