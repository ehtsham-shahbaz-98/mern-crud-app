import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [listOfEmployees, setListOfEmployees] = useState([]);

  const addEmployee = () => {
    Axios.post("http://localhost:4000/addEmployee", {
      name: name,
      age: age,
    }).then((response) => {
      setListOfEmployees([
        ...listOfEmployees,
        { _id: response.data._id, name: name, age: age },
      ]);
    });
  };

  const updateEmployee = (id) => {
    const newAge = prompt("Enter new age: ");

    Axios.put("http://localhost:4000/update", { newAge: newAge, id: id }).then(
      () => {
        setListOfEmployees(
          listOfEmployees.map((val) => {
            return val._id == id
              ? { _id: id, name: val.name, age: newAge }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:4000/delete/${id}`).then(() => {
      setListOfEmployees(
        listOfEmployees.filter((val) => {
          return val._id != id;
        })
      );
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:4000/read")
      .then((response) => {
        setListOfEmployees(response.data);
      })
      .catch(() => {
        console.log("Err");
      });
  }, []);

  return (
    <div className="container">
      <div className="row mt-5">
        <header>
          <h2>Employee Data</h2>
        </header>
      </div>
      <form>
        <div className="mb-3">
          <label className="form-label">Employee Name</label>
          <input
            type="text"
            placeholder="Name..."
            className="form-control"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Employee Age</label>
          <input
            type="number"
            placeholder="Age..."
            className="form-control"
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
        </div>
        <div className="d-grid gap-2 col-2 mx-auto">
          <button
            onClick={addEmployee}
            className="btn btn-success"
            type="button"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="table-responsive-md mt-5">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {listOfEmployees.map((val) => {
              return (
                <tr>
                  <td>{val.name}</td>
                  <td>{val.age}</td>
                  <td>
                    <button
                      onClick={() => updateEmployee(val._id)}
                      className="btn btn-sm btn-primary"
                    >
                      <i className="fas fa-user-edit"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteEmployee(val._id)}
                      className="btn btn-sm btn-danger"
                    >
                      <i className="far fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
