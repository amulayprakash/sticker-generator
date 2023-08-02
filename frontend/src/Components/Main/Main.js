import React, { useState } from "react";
import MainNavbar from "../Common/Navbar";
import Form from "react-bootstrap/Form";
import * as XLSX from "xlsx";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import "./Main.css";

const Main = () => {
  const [xlData, setXlData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const finalArray = [];
      for (let i = 1; i < excelData.length; i++) {
        const obj = { pin: "", id: "", url: "" };
        obj.pin = String(excelData[i][0]);
        obj.id = String(excelData[i][1]);
        obj.url = String(excelData[i][2]);
        finalArray.push(obj);
      }
      setXlData(() => finalArray);
    };

    reader.readAsBinaryString(file);
  };

  const getPdfFile = async () => {
    if (xlData && xlData.length === 0) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_backend_url}/wesafepdf/download`,
        { xldata: xlData },
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "final_result.pdf";
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
    setLoading(false);
  };
  return (
    <div>
      <MainNavbar />
      <div className="main">
        <Form.Group controlId="formFileLg" className="mb-3">
          <Form.Label>Upload .xlsx file</Form.Label>
          <Form.Control
            type="file"
            size="lg"
            onChange={(e) => handleFileChange(e)}
          />
        </Form.Group>
        <div className="tablestyle">
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>S. No.</th>
                <th>PIN</th>
                <th>ID</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              {xlData.map((curr, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{curr.pin}</td>
                    <td>{curr.id}</td>
                    <td>{curr.url}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div className="mb-2 mt-2 mid">
          <Button variant="primary" size="lg" onClick={getPdfFile}>
            {loading ? (
              <>
                {" "}
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                {"  "}Loading...
              </>
            ) : (
              "Download QR PDF"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Main;
