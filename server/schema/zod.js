const {z} = require("zod");

const Schema = z.object( {
   
     name: z.string().max(30),
     dept:z.string().min(1),
     dob: z.date(),
     gender:z.string(),
     designation:z.string(),
     salary:z.number().max(8),
     email:z.string().email(),


})


module.exports ={
    Schema
}


// employee_id SERIAL PRIMARY KEY,
// name VARCHAR(255),
// dept VARCHAR(255),
// dob VARCHAR(255),
// gender VARCHAR(255),
// designation VARCHAR(255),
// salary int,
// email VARCHAR(255) UNIQUE