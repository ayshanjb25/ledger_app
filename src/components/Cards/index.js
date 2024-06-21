import React from "react";
import "./styles.css";
import { Card, Row } from "antd";
import Button from "../Button";

const Cards = ({income,
  expense,
  totalBalance,showIncomeModal, showExpenseModal,showCustomerModal,customerCount}) => {

  // const reset = ()=>{

  // }
  // const showIncomeModal = ()=>{

  // }
  // const showExpenseModal = ()=>{

  // }
  return (
    <div>
      <Row className="row">
        {" "}
        <Card className="card" bordered={true}>
          <h2>Current Balance</h2>
          <p> LKR {totalBalance}</p>
          <Button text="Reset Balance" blue={true} />
        </Card>
        <Card className="card" bordered={true}>
        <h2>Total Income</h2>
          <p> LKR {income}</p>
          <Button text="Add Income" blue={true} onClick={showIncomeModal}/>
        </Card>
        <Card className="card" bordered={true}>
        <h2>Total Expense</h2>
          <p> LKR {expense}</p>
          <Button text="Add Expense" blue={true} onClick={showExpenseModal}/>
        </Card>
        <Card className="card" bordered={true}>
        <h2>Total Customers</h2>
          <p>{customerCount}</p>
          <Button text="Add Customer" blue={true} onClick={showCustomerModal}/>
        </Card>
      </Row>
    </div>
  );
};

export default Cards
