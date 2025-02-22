import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const Reports = ({ classrooms }) => {
  const [savedReports, setSavedReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState("");

  useEffect(() => {
    // Load saved reports from localStorage
    const reports = Object.keys(localStorage)
      .filter((key) => key.startsWith("report-"))
      .map((key) => key.replace("report-", ""));
    setSavedReports(reports);
  }, []);

  const downloadExcel = () => {
    if (classrooms.length === 0) {
      alert("No reports available to download.");
      return;
    }

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
    const timestamp = `${now.getDate().toString().padStart(2, "0")}.${(
      now.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}.${now.getFullYear()} ${now
      .getHours()
      .toString()
      .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

    const reportData = classrooms.flatMap((room) =>
      Object.entries(room.data).map(([device, status]) => ({
        Classroom: room.id,
        Device: device,
        Status: status ? "Working" : "Not Working",
        CheckedAt: timestamp,
      }))
    );

    // Save report in localStorage with a date key
    localStorage.setItem(`report-${formattedDate}`, JSON.stringify(reportData));

    // Prepare data for Excel file
    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    XLSX.writeFile(workbook, `classroom_report_${formattedDate}.xlsx`);
  };

  const downloadOldReport = () => {
    if (!selectedReport) {
      alert("Please select a report to download.");
      return;
    }

    const reportData = JSON.parse(
      localStorage.getItem(`report-${selectedReport}`)
    );

    if (!reportData) {
      alert("Report not found!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    XLSX.writeFile(workbook, `classroom_report_${selectedReport}.xlsx`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">Reports</h2>
      <button
        onClick={downloadExcel}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg mb-4"
      >
        Download Current Report
      </button>

      {savedReports.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold">Download Past Reports</h3>
          <select
            className="mt-2 p-2 border rounded w-full"
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
          >
            <option value="">Select a date</option>
            {savedReports.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
          <button
            onClick={downloadOldReport}
            className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
          >
            Download Selected Report
          </button>
        </div>
      )}
    </div>
  );
};

export default Reports;
