import axios from "axios";

const PAYMENT_BALANCE_REST_API_URL = "http://localhost:8080/api/solde_paiements"; 

const getAllPaymentBalances = () => {
  return axios.get(PAYMENT_BALANCE_REST_API_URL)
}

const getPaymentBalanceById = (paymentBalanceId) => {
  return axios.get(`${PAYMENT_BALANCE_REST_API_URL}/${paymentBalanceId}`);
}

const createPaymentBalance = (paymentBalance) => {
  return axios.post(PAYMENT_BALANCE_REST_API_URL, paymentBalance);
}

const deletePaymentBalancetById = (id) => {
  return axios.delete(`${PAYMENT_BALANCE_REST_API_URL}/${id}`);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllPaymentBalances,
  getPaymentBalanceById,
  createPaymentBalance, 
  deletePaymentBalancetById,
}