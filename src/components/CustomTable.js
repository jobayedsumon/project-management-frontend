import React from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const CustomTable = ({ columns, data, title, buttonLink, buttonText }) => {
  return (
    <div className="mt-5">
      <DataTable
        title={
          <div className="d-flex justify-content-between align-items-start">
            <h3>{title}</h3>
            <Link className="btn btn-dark" to={buttonLink}>
              <i className="fa fa-plus" /> {buttonText}
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
        data={data}
      />
    </div>
  );
};

export default CustomTable;
