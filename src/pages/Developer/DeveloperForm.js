import React, { useEffect, useState } from "react";
import Select from "react-select";
import { errorAlert, successAlert } from "../../helpers/alerts";
import instance from "../../helpers/fetchWrapper";
import { Link, useNavigate, useParams } from "react-router-dom";

const url = process.env.REACT_APP_BACKEND_URL + "/developers/";

const DeveloperForm = ({ mode }) => {
  const [formState, setFormState] = useState({});
  const [projects, setProjects] = useState([]);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const addNewDeveloper = (formData) => {
    instance
      .post("/developers", formData)
      .then((res) => {
        if (res.status === 201) {
          successAlert(res.data.message);
          const developer = res.data.data;
          navigate(`/developers/${developer.id}`);
        } else {
          errorAlert(res.data.message);
        }
      })
      .catch((err) => {
        errorAlert(err.message);
      });
  };

  const updateDeveloper = (formData) => {
    formData.append("_method", "PUT");
    instance
      .post(`/developers/${id}`, formData)
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

  const getDeveloper = (id) => {
    instance
      .get(`/developers/${id}`)
      .then((res) => {
        if (res.status === 200) {
          const developer = res.data.data;
          setFormState({
            name: developer.name,
            designation: developer.designation,
            email: developer.email,
            phone: developer.phone,
            project_ids: developer.projects.map((project) => project.id),
          });
          if (developer.image) {
            setImage(url + developer.image);
          }
        } else {
          errorAlert(res.data.message);
        }
      })
      .catch((err) => {
        errorAlert(err.message);
      });
  };

  const getProjects = () => {
    instance
      .get("/projects")
      .then((res) => {
        if (res.status === 200) {
          const projects = res.data.data;
          setProjects(
            projects.map((project) => ({
              value: project.id,
              label: project.name,
            }))
          );
        } else {
          setProjects([]);
        }
      })
      .catch((err) => {
        setProjects([]);
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
    if (!formState.email) {
      errorAlert("Email is required");
      return;
    }
    if (!formState.phone) {
      errorAlert("Phone is required");
      return;
    }

    if (!formState.designation) {
      errorAlert("Designation is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("designation", formState.designation);
    formData.append("email", formState.email);
    formData.append("phone", formState.phone);

    if (formState.project_ids) {
      formData.append("project_ids", formState.project_ids);
    }

    if (image instanceof File) {
      formData.append("image", image);
    }

    if (mode === "edit") {
      updateDeveloper(formData);
    } else {
      addNewDeveloper(formData);
    }
  };

  useEffect(() => {
    getProjects();
    if (mode === "edit" && id) {
      getDeveloper(id);
    }
  }, [mode, id]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          {mode === "edit" ? (
            <h3>Update Developer Data</h3>
          ) : (
            <h3>Add New Developer</h3>
          )}

          <form className="mt-4">
            <div className="form-group mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleChange}
                value={formState.name}
              />
            </div>
            <div className="form-group mb-3">
              <label>Designation</label>
              <input
                type="text"
                className="form-control"
                name="designation"
                onChange={handleChange}
                value={formState.designation}
              />
            </div>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleChange}
                value={formState.email}
              />
            </div>
            <div className="form-group mb-3">
              <label>Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                onChange={handleChange}
                value={formState.phone}
              />
            </div>
            <div className="form-group mb-3">
              <label>Image</label>
              <input
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
                  width={100}
                  height={100}
                  className="img-fluid rounded-circle"
                />
              </div>
            )}
            <div className="form-group mb-3">
              <label>Assign Projects</label>
              <Select
                isMulti
                name="project_ids"
                options={projects}
                className="basic-multi-select"
                classNamePrefix="select"
                isSearchable={true}
                value={projects.filter((project) =>
                  formState.project_ids?.includes(project.value)
                )}
                onChange={(selected) => {
                  setFormState({
                    ...formState,
                    project_ids: selected.map((item) => item.value),
                  });
                }}
              />
            </div>
            <div className="form-group mt-4">
              <button className="btn btn-dark" onClick={handleSubmit}>
                {mode === "edit" ? "Update" : "Create"}
              </button>
              <Link to="/developers" className="btn btn-danger ms-3">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeveloperForm;
