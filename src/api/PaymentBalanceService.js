import axios from "axios";

// const PAYMENT_BALANCE_REST_API_URL = "http://localhost:8080/api/solde_paiements"; 

const getAllPaymentBalances = () => {
  return axios.get(process.env.REACT_APP_PAYMENT_BALANCE_DATA_URL_API)
}

const getPaymentBalanceById = (paymentBalanceId) => {
  return axios.get(`${process.env.REACT_APP_PAYMENT_BALANCE_DATA_URL_API}/${paymentBalanceId}`);
}

const createPaymentBalance = (paymentBalance) => {
  return axios.post(process.env.REACT_APP_PAYMENT_BALANCE_DATA_URL_API, paymentBalance);
}

const deletePaymentBalancetById = (id) => {
  return axios.delete(`${process.env.REACT_APP_PAYMENT_BALANCE_DATA_URL_API}/${id}`);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllPaymentBalances,
  getPaymentBalanceById,
  createPaymentBalance, 
  deletePaymentBalancetById,
}