import React, { useState } from "react";
import axios from "axios";
import Nav from "./Nav";

function CreateJob() {
  const [job, setJob] = useState({
    title: "",
    companyName: "",
    location: "",
    description: "",
    minSalary: "",
    maxSalary: "",
    experienceRequired: "",
    jobType: "",
    applicationDeadline: "",
  });

  const [message, setMessage] = useState("");

  // handle input change
  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/jobs", job);
      setMessage("✅ Job posted successfully!");
      setJob({
        title: "",
        companyName: "",
        location: "",
        description: "",
        minSalary: "",
        maxSalary: "",
        experienceRequired: "",
        jobType: "",
        applicationDeadline: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Error posting job. Please try again.");
    }
  };

  return (
    <div>
    
      <div className="container py-5">
        <h2 className="mb-4 text-center">Post a New Job</h2>

        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Job Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={job.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              className="form-control"
              name="companyName"
              value={job.companyName}
              onChange={handleChange}
              // required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={job.location}
              onChange={handleChange}
              
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Job Type</label>
            <select
              className="form-select"
              name="jobType"
              value={job.jobType}
              onChange={handleChange}
              // required
            >
              <option value="">Choose...</option>
              {/* , , FULL_TIME, , REMOTE */}
              <option value="FULL_TIME">Full-Time</option>
              <option value="PART_TIME">Part-Time</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="CONTRACT">Contract</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Min Salary</label>
            <input
              type="number"
              className="form-control"
              name="minSalary"
              value={job.minSalary}
              onChange={handleChange}
              // required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Max Salary</label>
            <input
              type="number"
              className="form-control"
              name="maxSalary"
              value={job.maxSalary}
              onChange={handleChange}
              // required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Experience Required (years)</label>
            <input
              type="number"
              className="form-control"
              name="experienceRequired"
              value={job.experienceRequired}
              onChange={handleChange}
              // required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Application Deadline</label>
            <input
              type="datetime-local"
              className="form-control"
              name="applicationDeadline"
              value={job.applicationDeadline}
              onChange={handleChange}
              
            />
          </div>

          <div className="col-12">
            <label className="form-label">Job Description</label>
            <textarea
              className="form-control"
              rows="4"
              name="description"
              value={job.description}
              onChange={handleChange}
              // required
            ></textarea>
          </div>

          <div className="col-12 text-center">
            <button type="submit" className="btn btn-success px-5">
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJob;
