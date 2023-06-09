import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import { errorAlert, successAlert } from "../../helpers/alerts";
import instance from "../../helpers/fetchWrapper";
import { Link, useNavigate, useParams } from "react-router-dom";

const url = process.env.REACT_APP_BACKEND_URL + "/projects/";

const ProjectForm = ({ mode }) => {
  const [formState, setFormState] = useState({});
  const [developers, setDevelopers] = useState([]);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const fileRef = useRef(null);

  const createNewProject = (formData) => {
    instance
      .post("/projects", formData)
      .then((res) => {
        if (res.status === 201) {
          successAlert(res.data.message);
          const project = res.data.data;
          navigate(`/projects/${project.id}`);
        } else {
          errorAlert(res.data.message);
        }
      })
      .catch((err) => {
        errorAlert(err.message);
      });
  };

  const updateProject = (formData) => {
    formData.append("_method", "PUT");
    instance
      .post(`/projects/${id}`, formData)
      .then((res) => {
        if (res.status === 200) {
          successAlert(res.data.message);
        } else {
          errorAlert(res.data.message);
        }
      })
      .catch((err) => {
        errorAlert(err.message);
      });
  };

  const getProject = (id) => {
    instance
      .get(`/projects/${id}`)
      .then((res) => {
        if (res.status === 200) {
          const project = res.data.data;
          setFormState({
            name: project.name,
            description: project.description,
            start_date: project.start_date,
            end_date: project.end_date,
            developer_ids: project.developers?.map((developer) => developer.id),
          });
          if (project.image) {
            setImage(url + project.image);
          }
        } else {
          errorAlert(res.data.message);
        }
      })
      .catch((err) => {
        errorAlert(err.message);
      });
  };

  const getDevelopers = () => {
    instance
      .get("/developers")
      .then((res) => {
        if (res.status === 200) {
          const developers = res.data.data;
          setDevelopers(
            developers.map((developer) => ({
              value: developer.id,
              label: developer.name,
            }))
          );
        } else {
          setDevelopers([]);
        }
      })
      .catch((err) => {
        setDevelopers([]);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formState.name) {
      errorAlert("Name is required");
      return;
    }
    if (!formState.start_date) {
      errorAlert("Start date is required");
      return;
    }
    if (!formState.end_date) {
      errorAlert("End date is required");
      return;
    }

    if (formState.start_date > formState.end_date) {
      errorAlert("Start date cannot be greater than end date");
      return;
    }

    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("description", formState.description);
    formData.append("start_date", formState.start_date);
    formData.append("end_date", formState.end_date);

    if (formState.developer_ids) {
      formData.append("developer_ids", formState.developer_ids);
    }

    if (image instanceof File) {
      formData.append("image", image);
    }

    if (mode === "edit") {
      updateProject(formData);
    } else {
      createNewProject(formData);
    }

    fileRef.current.value = "";
  };

  useEffect(() => {
    getDevelopers();
    if (mode === "edit" && id) {
      getProject(id);
    }
  }, [mode, id]);

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8">
          {mode === "edit" ? (
            <h3>Update Project</h3>
          ) : (
            <h3>Create New Project</h3>
          )}

          <form className="mt-4">
            <div className="form-group mb-3">
              <label>Name*</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleChange}
                value={formState.name}
              />
            </div>
            <div className="form-group mb-3">
              <label>Start Date*</label>
              <input
                type="date"
                className="form-control"
                name="start_date"
                onChange={handleChange}
                value={formState.start_date}
              />
            </div>
            <div className="form-group mb-3">
              <label>End Date*</label>
              <input
                type="date"
                className="form-control"
                name="end_date"
                onChange={handleChange}
                value={formState.end_date}
              />
            </div>

            <div className="form-group mb-3">
              <label>Image</label>
              <input
                ref={fileRef}
                type="file"
                className="form-control"
                name="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            {image && (
              <div className="form-group mb-3">
                <img
                  src={
                    image instanceof File ? URL.createObjectURL(image) : image
                  }
                  alt="Developer"
                  className="img-fluid rounded-circle formRoundImage"
                />
              </div>
            )}
            <div className="form-group mb-3">
              <label>Assign Developers</label>
              <Select
                isMulti
                name="project_ids"
                options={developers}
                className="basic-multi-select"
                classNamePrefix="select"
                isSearchable={true}
                value={developers.filter((developer) =>
                  formState.developer_ids?.includes(developer.value)
                )}
                onChange={(selected) => {
                  setFormState({
                    ...formState,
                    developer_ids: selected.map((item) => item.value),
                  });
                }}
              />
            </div>
            <div className="form-group mb-3">
              <label>Description</label>
              <textarea
                className="form-control"
                name="description"
                onChange={handleChange}
                value={formState.description}
                rows={5}
              />
            </div>
            <div className="form-group mt-4">
              <button className="btn btn-dark" onClick={handleSubmit}>
                {mode === "edit" ? "Update" : "Create"}
              </button>
              <Link to="/projects" className="btn btn-danger ms-3">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
