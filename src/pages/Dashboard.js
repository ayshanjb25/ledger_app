import { Modal } from "antd";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import Cards from "../components/Cards";
import Header from "../components/Header";
import AddExpenseModal from "../components/Modals/addExpense";
import AddIncomeModal from "../components/Modals/addIncome";
import { auth, db } from "../firebase";
import moment from "moment";
import AddCustomerModal from "../components/Modals/addCustomer";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [isCustomerModalVisible, setIsCustomerModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [currentBalance, setCurrentBalance] = useState(0);
  // const [income, setIncome] = useState(0);

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };
  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };
  const showCustomerModal = () => {
    console.log("showCustomerModal called");
    setIsCustomerModalVisible(true);
  };
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };
  const handleCustomerCancel = () => {
    setIsCustomerModalVisible(false);
  };
  const addTransaction = async (transaction) => {
    //Add the doc
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID:", docRef.id);

      toast.success("Transaction Added!");
    } catch (e) {
      console.error("Error adding document:", e);

      toast.error("Couldn't add transaction");
    }
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      category: values.category,
      name: values.name,
      customerId: values.customerId,
    };
    // Check if customerId is not undefined
    if (!newTransaction.customerId) {
      toast.error("Customer ID is required!");
      return;
    }
    // setTransactions([...transactions,newTransaction]);
    // setIsExpenseModalVisible(false);
    // setIsIncomeModalVisible(false);
    addTransaction(newTransaction);
    // calculateBalance();
  };

  // const calculateBalance=()=>{
  //   let incomeTotal = 0;
  //   let expenseTotal= 0;

  //   transactions.forEach((transaction)=>{
  //     if(transaction.type === "income"){
  //       incomeTotal += transaction.amount;
  //     }else{
  //       expenseTotal += transaction.amount;
  //     }
  //   })
  // }

  const addCustomer = async (customer) => {
    //Add the doc
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/customers`),
        customer
      );
      console.log("Document written with ID:", docRef.id);

      toast.success("Customer Added!");
    } catch (e) {
      console.error("Error adding document:", e);

      toast.error("Couldn't add customer");
    }
  };


  const onCustomerFinish = (values) => {
    const newCustomer = {
      // type: type,
      name: values.name,
      business: values.business,
    };
    // setCustomers([...Customers,newCustomer]);
    // setIsExpenseModalVisible(false);
    // setIsIncomeModalVisible(false);
    addCustomer(newCustomer);
    // calculateBalance();
  };
  return (
    <div>
      <Header />
      <Cards
        showIncomeModal={showIncomeModal}
        showExpenseModal={showExpenseModal}
        showCustomerModal={showCustomerModal}
      />

      <AddIncomeModal
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={onFinish}
      />
      <AddExpenseModal
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseCancel={handleExpenseCancel}
        onFinish={onFinish}
      />
      <AddCustomerModal
        isCustomerModalVisible={isCustomerModalVisible}
        handleCustomerCancel={handleCustomerCancel}
        onFinish={onCustomerFinish}
      />
    </div>
  );
};

export default Dashboard;
