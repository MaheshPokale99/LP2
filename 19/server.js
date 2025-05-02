const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/Student');

const app = express();
const PORT = 3000;

app.use(express.json());

const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/student');
        console.log('MongoDB connected!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

const insertSampleData = async () => {
    const count = await Student.countDocuments();
    if (count === 0) {
        await Student.insertMany([
            { Name: 'Alice', Roll_No: 1, WAD_Marks: 30, CC_Marks: 28, DSBDA_Marks: 25, CNS_Marks: 22, AI_marks: 29 },
            { Name: 'Bob', Roll_No: 2, WAD_Marks: 19, CC_Marks: 22, DSBDA_Marks: 18, CNS_Marks: 20, AI_marks: 15 },
            { Name: 'Charlie', Roll_No: 3, WAD_Marks: 35, CC_Marks: 30, DSBDA_Marks: 32, CNS_Marks: 31, AI_marks: 33 },
            { Name: 'David', Roll_No: 4, WAD_Marks: 20, CC_Marks: 23, DSBDA_Marks: 21, CNS_Marks: 18, AI_marks: 22 },
            { Name: 'Eve', Roll_No: 5, WAD_Marks: 45, CC_Marks: 48, DSBDA_Marks: 46, CNS_Marks: 44, AI_marks: 47 }
        ]);
        console.log('Sample data inserted!');
    }
};

// ROUTES

// (d) Display total count and list all students
app.get('/students', async (req, res) => {
    const students = await Student.find();
    const count = await Student.countDocuments();
    res.send(`<h2>Total Students: ${count}</h2><pre>${JSON.stringify(students, null, 2)}</pre>`);
});

// (e) List names of students who got more than 20 in DSBDA
app.get('/students/dsbda', async (req, res) => {
    const students = await Student.find({ DSBDA_Marks: { $gt: 20 } });
    const names = students.map(student => student.Name);
    res.send(`<h2>Students with DSBDA Marks > 20:</h2><ul>${names.map(name => `<li>${name}</li>`).join('')}</ul>`);
});

// (f) Update marks of specified student by +10 (pass student name in query params)
app.put('/students/update', async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.send('Please specify a student name in query parameter like /students/update?name=Alice');
    }
    await Student.updateOne(
        { Name: name },
        { $inc: { WAD_Marks: 10, CC_Marks: 10, DSBDA_Marks: 10, CNS_Marks: 10, AI_marks: 10 } }
    );
    res.send(`Marks updated successfully for ${name}`);
});

// (g) List names who got more than 25 in all subjects
app.get('/students/above25', async (req, res) => {
    const students = await Student.find({
        WAD_Marks: { $gt: 25 },
        CC_Marks: { $gt: 25 },
        DSBDA_Marks: { $gt: 25 },
        CNS_Marks: { $gt: 25 },
        AI_marks: { $gt: 25 }
    });
    const names = students.map(student => student.Name);
    res.send(`<h2>Students with Marks > 25 in All Subjects:</h2><ul>${names.map(name => `<li>${name}</li>`).join('')}</ul>`);
});

// (h) List names who got less than 40 in both Maths and Science
// Assuming WAD_Marks as Maths and CNS_Marks as Science
app.get('/students/less40', async (req, res) => {
    const students = await Student.find({
        WAD_Marks: { $lt: 40 },
        CNS_Marks: { $lt: 40 }
    });
    const names = students.map(student => student.Name);
    res.send(`<h2>Students with Maths and Science marks < 40:</h2><ul>${names.map(name => `<li>${name}</li>`).join('')}</ul>`);
});

// (i) Remove specified student
app.delete('/students/delete', async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.send('Please specify a student name in query parameter like /students/delete?name=Alice');
    }
    await Student.deleteOne({ Name: name });
    res.send(`Student ${name} deleted successfully.`);
});

// (j) Display students in Tabular Format
app.get('/students/table', async (req, res) => {
    const students = await Student.find();
    let table = `
    <h2>Students Data</h2>
    <table border="1" cellpadding="5" cellspacing="0">
    <tr>
        <th>Name</th>
        <th>Roll No</th>
        <th>WAD</th>
        <th>DSBDA</th>
        <th>CNS</th>
        <th>CC</th>
        <th>AI</th>
    </tr>
    `;

    students.forEach(student => {
        table += `
        <tr>
            <td>${student.Name}</td>
            <td>${student.Roll_No}</td>
            <td>${student.WAD_Marks}</td>
            <td>${student.DSBDA_Marks}</td>
            <td>${student.CNS_Marks}</td>
            <td>${student.CC_Marks}</td>
            <td>${student.AI_marks}</td>
        </tr>`;
    });

    table += `</table>`;
    res.send(table);
});

// Start Server
connectToDB().then(() => insertSampleData());

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
