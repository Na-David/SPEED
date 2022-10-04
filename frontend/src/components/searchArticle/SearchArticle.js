import React from "react";
import "./SearchArticle.css";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useState } from "react";

export const SearchArticle = (props) => {
  const { articles } = props;
  const [practice, setPractice] = useState("");
  const [claim, setClaim] = useState("");
  const [startPubDate, setStartPubDate] = useState("");
  const [endPubDate, setEndPubDate] = useState("");

  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };
  const navigateSubmit = () => {
    navigate("/post");
  };

  const filterData = async () => {
    await axios
      .get("http://localhost:8082/api/articles/filter", {
        params: {
          practice: practice,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("error:" + err);
      });
  };

  const columns = [
    { field: "id", headerName: "ID", hide: true },``
    {
      field: "title",
      headerName: "Title",
      width: 150,
      editable: false,
    },
    {
      field: "journal",
      headerName: "Journal",
      width: 150,
      editable: false,
    },
    {
      field: "volume",
      headerName: "Volume",
      width: 150,
      editable: false,
    },
    {
      field: "pages",
      headerName: "Pages",
      width: 150,
      editable: false,
    },
    {
      field: "doi",
      headerName: "DOI",
      width: 150,
      editable: false,
    },
    {
      field: "practice",
      headerName: "Practice",
      width: 150,
      editable: false,
    },
    {
      field: "claim",
      headerName: "Claim",
      width: 150,
      editable: false,
    },
    {
      field: "researchType",
      headerName: "Research",
      width: 150,
      editable: false,
    },
    {
      field: "author",
      headerName: "Author",
      type: "string",
      width: 110,
      editable: false,
    },
    {
      field: "description",
      headerName: "Description",
      type: "string",
      width: 110,
      editable: false,
    },
    {
      field: "publishedDate",
      headerName: "Published Date",
      type: "string",
      width: 110,
      editable: false,
    },
    {
      field: "publishers",
      headerName: "Publishers",
      type: "string",
      width: 110,
      editable: false,
    },
  ];

  const rows = articles.map((row) => ({
    id: row._id,
    title: row.title,
    journal: row.journalName,
    volume: row.volume,
    pages: row.pages,
    doi: row.doi,
    practice: row.practice,
    claim: row.claim,
    researchType: row.researchType,
    author: row.author,
    description: row.description,
    publishedDate: row.published_date,
    publishers: row.publisher,
  }));
  return (
    <body>
      <button id="homeButton" onClick={navigateHome}>
        <h6 className="gradient-text">Home</h6>
      </button>
      <button id="submitButton" onClick={navigateSubmit}>
        <h6 className="gradient-text">Submit Article</h6>
      </button>
      <div id="contentContainer">
        <div id="selectionContainer">
          <select onChange={(data) => setPractice(data.target.value)}>
            <option disabled selected>
              SE Practice
            </option>
            <option>TDD</option>
            <option>BDD</option>
            <option>Agile</option>
          </select>
          <select onChange={(data) => setClaim(data.target.value)}>
            <option disabled selected>
              Claim
            </option>
            <option>Beneficial to quality</option>
            <option>Detrimental to development</option>
            <option>Reduces development time</option>
          </select>
          <select onChange={(data) => setStartPubDate(data.target.value)}>
            <option disabled selected>
              Start Publication Year
            </option>
            <option>2020</option>
            <option>2021</option>
            <option>2022</option>
          </select>
          <select onChange={(data) => setEndPubDate(data.target.value)}>
            <option disabled selected>
              End Publication Year
            </option>
            <option>2020</option>
            <option>2021</option>
            <option>2022</option>
          </select>
          <button id="searchButton" onClick={filterData}>
            <h6 className="gradient-text">Search</h6>
          </button>
        </div>
        <Box sx={{ height: 400, width: "80%", marginTop: "5%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      </div>
    </body>
  );
};
