import "./App.css";
import { Table } from "antd";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        setDataSource(res.data);
        setLoading(false);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: " User ID",
      dataIndex: "userId",
      render: (userId) => {
        return <p>{userId === 1 ? "id is one" : "other"}</p>;
      },
      sorter: (record1, record2) => {
        return record1.userId > record2.userId;
      },
    },
    {
      key: "3",
      title: "Status",
      dataIndex: "completed",
      render: (completed) => {
        return <p>{completed ? "Completed" : "In Progress"}</p>;
      },
      filters: [
        {
          text: "Complete",
          value: true,
        },
        {
          text: "In Progress",
          value: false,
        },
      ],
      onFilter: (value, record) => {
        return record.completed === value;
      },
    },
  ];
  return (
    <div className="App">
      <header className="App-header">
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
        ></Table>
      </header>
    </div>
  );
}

export default App;
