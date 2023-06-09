import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "../../helpers/fetchWrapper";
import { confirmAlert, errorAlert, successAlert } from "../../helpers/alerts";
import CustomTable from "../../components/CustomTable";

const url = process.env.REACT_APP_BACKEND_URL + "/storage/projects/";

const ProjectList = () => {
  const [projects, setprojects] = useState([]);

  const columns = [
    {
      name: "Project",
      selector: (row) => (
        <span>
          {row.image ? (
            <img
              src={url + row.image}
              alt={row.name}
              className="img-fluid rounded-circle tableRoundImage"
            />
          ) : (
            <i className="fa fa-project-diagram mx-3" />
          )}{" "}
          {row.name}
        </span>
      ),
    },

    {
      name: "Description",
      selector: (row) => row.description?.substring(0, 100),
    },

    {
      name: "Start Date",
      selector: (row) => row.start_date,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.end_date,
      sortable: true,
    },
    {
      name: "Developers Assigned",
      selector: (row) => row.developers_count,
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row) => (
        <span>
          <Link className="text-success" to={`/projects/${row.id}`}>
            <i className="fa fa-edit" />
          </Link>
          &nbsp;&nbsp;
          <Link
            className="text-danger"
            onClick={() => confirmAlert(() => deleteProject(row.id))}
          >
            <i className="fa fa-trash" />
          </Link>
        </span>
      ),
    },
  ];

  const deleteProject = (id) => {
    instance
      .delete(`/projects/${id}`)
      .then((res) => {
        if (res.status === 200) {
          successAlert(res.data.message);
          fetchprojects();
        } else {
          errorAlert(res.data.message);
        }
      })
      .catch((err) => {
        errorAlert(err.message);
      });
  };

  const fetchprojects = async () => {
    instance
      .get("/projects")
      .then((response) => {
        if (response.status === 200) {
          setprojects(response.data.data);
        } else {
          setprojects([]);
        }
      })
      .catch((error) => {
        setprojects([]);
      });
  };

  useEffect(() => {
    fetchprojects();

    return () => {
      setprojects([]);
    };
  }, []);

  return (
    <CustomTable
      columns={columns}
      data={projects}
      title="Projects List"
      buttonLink="/projects/new"
      buttonText="Create Project"
    />
  );
};

export default ProjectList;
