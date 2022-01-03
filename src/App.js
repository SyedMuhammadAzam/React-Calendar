import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import moment from "moment";
import { Table } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
export default function App() {
  const [value, setValue] = useState(new Date());
  const [date, setDated] = useState("");
  const [tomorrow, setTomorrow] = useState([]);
  const [birthData, setBirthData] = useState([]);

  useEffect(() => {
    peopleBirths(new Date());
  }, []);

  const dateRendered = (e) => {
    const dateSelected = value.toDateString();
    e.preventDefault();
    console.log("Submitted");
    setDated(dateSelected);
    peopleBirths(dateSelected);
    let localtomorrow = value;
    localtomorrow.setDate(localtomorrow.getDate() + 1 );
    setTomorrow(localtomorrow.toDateString() );
  };

  const peopleBirths = (value) => {
    // date format changed
    const dateFormat = moment(value).format("l");
    const month = dateFormat.split("/")[0];
    const date = dateFormat.split("/")[1];
    axios({
      method: "get",
      url: `https://history.muffinlabs.com/date/${month}/${date}`,
    }).then(function (response) {
      console.log("response is the ", response);
      setBirthData(response.data.data.Births);
    });
  };

  return (
    <div className="container ">
      <div className="d-flex justify-content-center flex-column">
        <div className="d-flex  justify-content-center ">
        
          <Calendar onChange={setValue} value={value} />
        </div>
        <br/>
        <label className="text-center">Current Date : {date}</label>
        <br />
        <label className="text-center">Next Date : {tomorrow}</label>
        <br/>
        <button type="submit" className="btn btn-primary" onClick={dateRendered}>
          Submit
        </button>
        
        <br/>
        <h3 className="text-center">Fetched Data</h3>
        <br/>

        <Table striped bordered hover>
          <thead>
            <tr>
              <td>Title</td>
              <td>Year</td>
            </tr>
          </thead>
          <tbody>
            {birthData.map((singleBirth, index) => (
              <tr key={index}>
                <td>
                  <label>{singleBirth.text}</label>
                </td>
                <td>
                  <label>{singleBirth.year}</label>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
