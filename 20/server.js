const express = require('express');
const mongoose = require('mongoose');
const Employee = require('./model/Employee');

const app = express();
app.use(express.json());

// MongoDB Connection
const connectToDB = async () => {
  try {
    await mongoose.connect( 'mongodb://localhost:27017/bookstore');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); 
  }
};


// Add new employee
app.post('/api/employees', async (req, res) => {
  try {
    const { name, department, designation, salary, joiningDate } = req.body;
    const employee = new Employee({ name, department, designation, salary, joiningDate });
    await employee.save();
    res.status(201).json({ message: 'Employee added successfully', employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all employees
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update employee
app.put('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee updated successfully', updatedEmployee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete employee
app.delete('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
const startServer = async () => {
  await connectToDB();
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
