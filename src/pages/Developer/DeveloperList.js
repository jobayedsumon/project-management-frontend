import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import instance from "../../helpers/fetchWrapper";
import { confirmAlert, errorAlert, successAlert } from "../../helpers/alerts";

const url = process.env.REACT_APP_BACKEND_URL + "/developers/";

const DeveloperList = () => {
  const [developers, setDevelopers] = useState([]);

  const columns = [
    {
      name: "Developer",
      selector: (row) => (
        <span>
          {row.image ? (
            <img
              src={url + row.image}
              alt={row.name}
              width={50}
              className="img-fluid rounded-circle"
            />
          ) : (
            <i className="fa fa-user" />
          )}{" "}
          {row.name}
        </span>
      ),
    },

    {
      name: "Designation",
      selector: (row) => row.designation,
      sortable: true,
    },

    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Total Projects",
      selector: (row) => row.projects_count,
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row) => (
        <span>
          <Link className="text-success" to={`/developers/${row.id}`}>
            <i className="fa fa-edit" />
          </Link>
          &nbsp;&nbsp;
          <Link
            className="text-danger"
            onClick={() => confirmAlert(() => deleteDeveloper(row.id))}
          >
            <i className="fa fa-trash" />
          </Link>
        </span>
      ),
    },
  ];

  const deleteDeveloper = (id) => {
    instance
      .delete(`/developers/${id}`)
      .then((res) => {
        if (res.status === 200) {
          successAlert(res.data.message);
          fetchDevelopers();
        } else {
          errorAlert(res.data.message);
        }
      })
      .catch((err) => {
        errorAlert(err.message);
      });
  };

  const fetchDevelopers = async () => {
    instance
      .get("/developers")
      .then((response) => {
        if (response.status === 200) {
          setDevelopers(response.data.data);
        } else {
          setDevelopers([]);
        }
      })
      .catch((error) => {
        setDevelopers([]);
      });
  };

  useEffect(() => {
    fetchDevelopers();

    return () => {
      setDevelopers([]);
    };
  }, []);

  return (
    <DataTable
      title={
        <div className="d-flex justify-content-between">
          <h3>Developer List</h3>
          <Link className="btn btn-dark" to="/developers/new">
            <i className="fa fa-plus" /> Add Developer
          </Link>
        </div>
      }
      pagination
      customStyles={{
        headRow: {
          style: {
            borderTop: "1px solid #ddd",
            backgroundColor: "#f5f5f5",
          },
        },
      }}
      columns={columns}
      data={developers}
    />
  );
};

export default DeveloperList;
