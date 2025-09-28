import React, { useState, useEffect } from "react";
import axios from "axios";

function Homes() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [editingJob, setEditingJob] = useState(null); // job being updated
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    location: "",
    minSalary: "",
    maxSalary: "",
    experienceRequired: "",
    description: "",
    applicationDeadline: "",
    jobType: "",
  });

  // Fetch jobs
  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch= async (e) =>{
    const value=e.target.value;
    const res =await axios.get(`http://localhost:8080/jobs/search?title=${value}`);
    setJobs(res.data);
  }
  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:8080/jobs"
      );
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      setError("Could not fetch jobs");
    }
  };

  // Delete job
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/jobs/${id}`);
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete job");
    }
  };

  // Start editing
  const handleEdit = (job) => {
    setEditingJob(job.id);
    setFormData(job);
  };

  // Update form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save update
  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:8080/jobs/${id}`, formData);
      setEditingJob(null);
      fetchJobs(); // reload jobs after update
    } catch (err) {
      console.error(err);
      setError("Failed to update job");
    }
  };

  return (
    <div>
        

      {/* Full width container */}
      <div className="container py-5 bg-light min-vh-100">
        <h1 className="text-center mb-5">Job Listings</h1>
        <input type="text" placeholder="Search by title" onChange={handleSearch} className="form-control"/>
        <br/>   

        {error && <p className="text-danger text-center">{error}</p>}

        <div className="row">
          {jobs.map((job) => (
            <div className="col-md-4 mb-4" key={job.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-success text-white">
                  {job.jobType}
                </div>
                <div className="card-body">
                  {editingJob === job.id ? (
                    // Update form
                    <form >
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-control mb-2"
                        placeholder="Title"
                      />
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="form-control mb-2"
                        placeholder="Company"
                      />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="form-control mb-2"
                        placeholder="Location"
                      />
                      <input
                        type="number"
                        name="minSalary"
                        value={formData.minSalary}
                        onChange={handleChange}
                        className="form-control mb-2"
                        placeholder="Min Salary"
                      />
                      <input
                        type="number"
                        name="maxSalary"
                        value={formData.maxSalary}
                        onChange={handleChange}
                        className="form-control mb-2"
                        placeholder="Max Salary"
                      />
                      <input
                        type="number"
                        name="experienceRequired"
                        value={formData.experienceRequired}
                        onChange={handleChange}
                        className="form-control mb-2"
                        placeholder="Experience Required"
                      />
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-control mb-2"
                        placeholder="Description"
                      />
                      <input
                        type="date"
                        name="applicationDeadline"
                        value={formData.applicationDeadline}
                        onChange={handleChange}
                        className="form-control mb-2"
                      />

                      <div className="d-flex justify-content-between">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => handleUpdate(job.id)}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setEditingJob(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    // Normal job card
                    <>
                      <h5 className="card-title">{job.title}</h5>
                      <p className="card-text">
                        <strong>Company:</strong> {job.companyName}
                      </p>
                      <p className="card-text">
                        <strong>Location:</strong> {job.location}
                      </p>
                      <p className="card-text">
                        <strong>Salary:</strong> ₹{job.minSalary} - ₹{job.maxSalary}
                      </p>
                      <p className="card-text">
                        <strong>Experience:</strong> {job.experienceRequired} year(s)
                      </p>
                      <p className="card-text">{job.description}</p>
                    </>
                  )}
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <small className="text-muted">
                    Apply by:{" "}
                    {new Date(job.applicationDeadline).toLocaleDateString()}
                  </small>
                  {editingJob !== job.id && (
                    <div>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(job)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(job.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4 mt-auto">
        <p className="mb-0">&copy; 2025 Job Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Homes;
