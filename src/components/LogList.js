import React, { useState, useEffect } from "react";
import LogDataService from "../Services/LogService";
import { Link } from "react-router-dom";
const LogList = () => {
  const [logs, setLogs] = useState([]);
  const [currentLog, setCurrentLog] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveLogs();
  }, []);

  const retrieveLogs = () => {
    LogDataService.getAll()
      .then((response) => {
        setLogs(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const refreshList = () => {
    retrieveLogs();
    setCurrentLog(null);
    setCurrentIndex(-1);
  };
  const setActiveLog = (log, index) => {
    setCurrentLog(log);
    setCurrentIndex(index);
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Lista de Logs</h4>
        <ul className="list-group">
          {logs &&
            logs.map((log, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveLog(log, index)}
                key={index}
              >
                {log.metodo}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentLog ? (
          <div>
            <h4>Log</h4>
            <div>
              <label>
                <strong>Identificacion:</strong>
              </label>{" "}
              {currentLog.id}
            </div>
            <div>
              <label>
                <strong>Metodo:</strong>
              </label>{" "}
              {currentLog.metodo}
            </div>
            <div>
              <label>
                <strong>Fecha:</strong>
              </label>{" "}
              {currentLog.fecha}
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Elija un Log</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default LogList;
