import { useEffect, useState } from "react";
import { Table, Alert } from "antd";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const promise = new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });

  throw promise;

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Company",
      dataIndex: ["company", "name"],
      key: "company",
    },
  ];

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey="id"
      pagination={false}
    />
  );
};

export default UserList;
