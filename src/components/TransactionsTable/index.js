import { Popconfirm, Radio, Select, Table, Button} from "antd";
import { parse, unparse } from "papaparse";
import React, { useState } from "react";
import { toast } from "react-toastify";
import searchImg from "../../assets/search.svg";
const TransactionTable = ({ transactions, addTransaction, fetchTransactions, deleteTransaction }) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const { Option } = Select;
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      key: "action",
      render:(_, record) => (
        <Popconfirm title="Are you sure to delete this transaction?"
        onConfirm={() => handleDelete(record.key)}
        okText="Yes"
        cancelText="No">
          <Button type="primary" danger >Delete</Button>
        </Popconfirm>
      )
    },
  ];

  let filteredTransactions = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
  );

  let sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortKey == "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  const handleDelete = async (key) => {
    try {
      await deleteTransaction(key);
      toast.success("Transaction deleted successfully");
      fetchTransactions();
    } catch (error) {
      toast.error("Failed to delete transaction");
    }
  };

  const exportCSV = () => {
    var csv = unparse({
      fields: ["name", "type", "category", "date", "customerName", "amount"],
      data: transactions,
    });

    var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    var csvURL = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importCSV = (event) => {
    event.preventDefault();
    try{
      parse(event.target.parse[0],{
        header:true,
        complete: async function(results){

          //results.data is an array of objects representing CSV rows
          for(const transaction of results.data){
            //Write each transaction to Firebase, you can use the addTransaction function here
            console.log("Transactions",transaction);
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount)
            }
            await addTransaction(newTransaction,true);
          }
        }
      });
      toast.success("All Transaction Added");
      fetchTransactions();
      event.target.files=null;
    }catch(e){
      toast.error(e.message);
    }
  };
  return (
    <div style={{ width: "96vw", padding: "0rem 2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div className="input-flex">
          <img src={searchImg} width="16" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={"Search by Name"}
          />
        </div>
        <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>{" "}
      <div className="table">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          <h2>My Transactions</h2>

          <Radio.Group
            className="input-radio"
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort By Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              width: "400px",
            }}
          >
            <button className="btn" onClick={exportCSV}>
              Export to CSV
            </button>
            <label for="file-csv" className="btn btn-blue">
              Import to CSV
            </label>
            <input
              onChange={importCSV}
              id="file-csv"
              type="file"
              accept=".csv"
              required
              style={{ display: "none" }}
            />
          </div>
        </div>

        <Table dataSource={sortedTransactions} columns={columns} rowKey="key" />
      </div>{" "}
    </div>
  );
};

export default TransactionTable;
