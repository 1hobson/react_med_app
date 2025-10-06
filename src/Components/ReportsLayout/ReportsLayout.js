import React, { useState, useEffect } from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    setReports([
      {
        doctorName: 'Dr. John Doe',
        speciality: 'Cardiologist',
        reportUrl: '/Report_PDFs/JohnDoeReport.pdf',
        active: true, // User has access
      },
      {
        doctorName: 'Dr. Jane Smith',
        speciality: 'Dermatologist',
        reportUrl: '/Report_PDFs/JaneSmithReport.pdf',
        active: false, // User does NOT have access
      },
    ]);
  }, []);

  const handleViewReport = (url) => {
    window.open(url, '_blank');
  };

  const handleDownloadReport = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    link.click();
  };

  return (
    <div className="reviews-page">
      <h2>Reports</h2>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{report.doctorName}</td>
              <td>{report.speciality}</td>
              <td>
                <button
                  className="review-btn"
                  onClick={() => handleViewReport(report.reportUrl)}
                  disabled={!report.active} // disable if inactive
                >
                  View Report
                </button>
              </td>
              <td>
                <button
                  className="review-btn"
                  onClick={() => handleDownloadReport(report.reportUrl)}
                  disabled={!report.active} // disable if inactive
                >
                  Download Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;