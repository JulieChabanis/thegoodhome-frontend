import axios from "axios";

// const PAYMENT_BALANCE_REST_API_URL = "http://localhost:8080/api/solde_paiements"; 

const getAllPaymentBalances = () => {
  return axios.get(process.env.REACT_APP_PAYMENT_BALANCE_DATA_URL_API, {
    headers: {
      common: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      auth :  {
        username: process.env.REACT_APP_KEY_USER_AUTH,
        password: process.env.REACT_APP_KEY_PASSWORD_AUTH,
      }
    }
  })
}

const getPaymentBalanceById = (paymentBalanceId) => {
  return axios.get(`${process.env.REACT_APP_PAYMENT_BALANCE_DATA_URL_API}/${paymentBalanceId}`, {
    headers: {
      common: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      auth :  {
        username: process.env.REACT_APP_KEY_USER_AUTH,
        password: process.env.REACT_APP_KEY_PASSWORD_AUTH,
      }
    }
  });
}

const createPaymentBalance = (paymentBalance) => {
  return axios.post(process.env.REACT_APP_PAYMENT_BALANCE_DATA_URL_API, paymentBalance, {
    headers: {
      common: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      auth :  {
        username: process.env.REACT_APP_KEY_USER_AUTH,
        password: process.env.REACT_APP_KEY_PASSWORD_AUTH,
      }
    }
  });
}

const deletePaymentBalancetById = (id) => {
  return axios.delete(`${process.env.REACT_APP_PAYMENT_BALANCE_DATA_URL_API}/${id}`, {
    headers: {
      common: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      auth :  {
        username: process.env.REACT_APP_KEY_USER_AUTH,
        password: process.env.REACT_APP_KEY_PASSWORD_AUTH,
      }
    }
  });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllPaymentBalances,
  getPaymentBalanceById,
  createPaymentBalance, 
  deletePaymentBalancetById,
}