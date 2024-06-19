import React from "react";
import "./styles.css";
import { Card, Row } from "antd";
import Button from "../Button";

const Cards = ({ showIncomeModal, showExpenseModal,showCustomerModal}) => {

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
          <p> LKR 0</p>
          <Button text="Reset Balance" blue={true} />
        </Card>
        <Card className="card" bordered={true}>
        <h2>Total Income</h2>
          <p> LKR 0</p>
          <Button text="Add Income" blue={true} onClick={showIncomeModal}/>
        </Card>
        <Card className="card" bordered={true}>
        <h2>Total Expense</h2>
          <p> LKR 0</p>
          <Button text="Add Expense" blue={true} onClick={showExpenseModal}/>
        </Card>
        <Card className="card" bordered={true}>
        <h2>Total Customer</h2>
          <p>0</p>
          <Button text="Add Customer" blue={true} onClick={showCustomerModal}/>
        </Card>
      </Row>
    </div>
  );
};

export default Cards
