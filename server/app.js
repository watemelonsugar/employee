const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

// Route to handle creation of employee details
app.post("/create", async (req, res) => {
    try {
        const {name, dept, dob, gender, designation, salary, email} = req.body;
        const newDetails = await pool.query("INSERT INTO details (name, dept, dob, gender, designation, salary, email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [name, dept, dob, gender, designation, salary, email]);
        res.status(200).json(newDetails.rows[0]); 
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" }); 
    }
});

app.get("/display", async (req, res) => {
    try {
        const allEmployees = await pool.query("SELECT * FROM details");
        res.status(200).json(allEmployees.rows); 
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Failed to fetch books" });
    }
});
app.post("/otherdetails/:name", async (req, res) => {
    const name = req.params.name;
    console.log(name)
    try {
        const { preferedDomain, doj, experience, address } = req.body;
        console.log(req.body);
        const otherDetails = await pool.query(
            "UPDATE details SET preferedDomain = $1, doj = $2, experience = $3 ,address = $4 WHERE name = $5",
            [preferedDomain, doj,  experience,address, name]
        );
        res.status(200).json({ message: "success" });
        console.log(otherDetails.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/employee-count-by-dept', async (req, res) => {
    try {
      const query = `
        SELECT dept, COUNT(*) as count 
        FROM details 
        GROUP BY dept;
      `;
      const { rows } = await pool.query(query);
      const counts = rows.reduce((acc, row) => {
        acc[row.dept] = row.count;
        return acc;
      }, {});
      res.json(counts);
    } catch (error) {
      console.error('Error fetching employee count by department:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, async () => {
    console.log("Server running on port", PORT);
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS details(
                employee_id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                dept VARCHAR(255),
                dob VARCHAR(255),
                gender VARCHAR(255),
                designation VARCHAR(255),
                salary int,
                email VARCHAR(255) UNIQUE,
                prefereddomain VARCHAR(255),
                doJ VARCHAR(255),
                address VARCHAR(255),
                experience INT
            );
        `;
        await pool.query(query);
        console.log("Table created successfully");
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = app;
