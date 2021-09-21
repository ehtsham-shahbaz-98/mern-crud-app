const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const EmployeeModel = require("./models/Employees");

app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(
  "mongodb://localhost:27017/tutorialmern?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
  { useNewUrlParser: true }
);

app.post("/addEmployee", async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;

  const employee = new EmployeeModel({ name: name, age: age });
  await employee.save();
  res.send(employee);
});

app.get("/read", async (req, res) => {
  EmployeeModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", async (req, res) => {
  const newAge = req.body.newAge;
  const id = req.body.id;
  console.log(newAge, id);

  try {
    await EmployeeModel.findById(id, (error, employeeToUpdate) => {
      employeeToUpdate.age = Number(newAge);
      employeeToUpdate.save();
    });
  } catch (err) {
    console.log(err);
  }

  res.send("updated");
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await EmployeeModel.findByIdAndRemove(id).exec();
  res.send("Employee Deleted");
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server connected successfully on localhost:${PORT}`);
});
