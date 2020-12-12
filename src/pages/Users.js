import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

const Users = () => {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState("online");

  useEffect(() => {
    let URL = "https://jsonplaceholder.typicode.com/users";

    fetch(URL)
      .then((res) => {
        res.json().then((result) => {
          //console.warn(result);
          setData(result);
          setMode("online");
          localStorage.setItem("users", JSON.stringify(result));
          // storing API fetch data to local storage, when user is online
        });
      })
      .catch((err) => {
        //alert("You are offline, connect to internet");
        let collection = JSON.parse(localStorage.getItem("users"));
        // This will fetch API data stored in local storage, when user is offline
        setData(collection);
        setMode("offline");
      });
    return () => {
      //
    };
  }, []);

  return (
    <div>
      <div>
        {mode === "offline" ? (
          <div className="alert alert-warning" role="alert" align="center">
            You are in offline mode or some issue with connection
          </div>
        ) : null}
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {data != null &&
            data.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.address.street}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
