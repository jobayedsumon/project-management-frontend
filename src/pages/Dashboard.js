import React, { useEffect, useState } from "react";
import instance from "../helpers/fetchWrapper";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    instance
      .get("/dashboard")
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setData(res.data);
        }
      })
      .catch((err) => {});
  }, []);

  console.log(data);

  return (
    <div className="container">
      <div class="row my-5">
        <div class="col-md-4">
          <div class="card card-stats mb-4 mb-xl-0">
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5 class="card-title text-uppercase text-muted mb-0">
                    Total Projects
                  </h5>
                  <span class="h2 font-weight-bold mb-0">
                    {data.total_projects}
                  </span>
                </div>
                <div class="col-auto">
                  <div class="icon icon-shape bg-dark p-2 text-white rounded-circle shadow">
                    <i class="fa fa-project-diagram dashboardIcon"></i>
                  </div>
                </div>
              </div>
              <p class="mb-0 text-muted text-sm">
                <span class="text-nowrap">Total ongoing projects</span>
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card card-stats mb-4 mb-xl-0">
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5 class="card-title text-uppercase text-muted mb-0">
                    Total Developers
                  </h5>
                  <span class="h2 font-weight-bold mb-0">
                    {data.total_developers}
                  </span>
                </div>
                <div class="col-auto">
                  <div class="icon icon-shape bg-dark p-2 text-white rounded-circle shadow">
                    <i class="fa fa-user dashboardIcon"></i>
                  </div>
                </div>
              </div>
              <p class="mb-0 text-muted text-sm">
                <span class="text-nowrap">Total hired developers</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row my-5">
        <div class="col-md-6">
          <div class="card mb-4 mb-xl-0">
            <div class="card-header d-flex justify-content-between">
              <h6 class="card-title text-uppercase text-muted mb-0 font-weight-bold">
                Unassigned Projects
              </h6>
              <Link to="/projects" className="btn btn-sm btn-dark">
                View All
              </Link>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover table-responsive dashboardTable">
                  <thead>
                    <tr>
                      <th scope="col">Project Name</th>
                      <th scope="col">Start Date</th>
                      <th scope="col">End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.unassigned_projects?.map((project) => (
                      <tr>
                        <td>{project.name}</td>
                        <td>{project.start_date}</td>
                        <td>{project.end_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card mb-4 mb-xl-0">
            <div class="card-header d-flex justify-content-between">
              <h6 class="card-title text-uppercase text-muted mb-0 font-weight-bold">
                Unassigned Developers
              </h6>
              <Link to="/developers" className="btn btn-sm btn-dark">
                View All
              </Link>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover table-responsive dashboardTable">
                  <thead>
                    <tr>
                      <th scope="col">Developer Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.unassigned_developers?.map((developer) => (
                      <tr>
                        <td>{developer.name}</td>
                        <td>{developer.email}</td>
                        <td>{developer.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
