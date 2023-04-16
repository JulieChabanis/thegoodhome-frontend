import axios from "axios";

// const PDF_RENT_RECEIPT_API_URL = "http://localhost:8080/api/rent-receipt";

const generateRentReceiptPdf = async (pdfPaymentBalanceId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_PDF_RENT_RECEIPT_URL_API}/${pdfPaymentBalanceId}`, {
      responseType: 'blob', 
    }); 
    const blob = new Blob([response.data], {
      type: 'application/pdf'
    }); 
    const url = URL.createObjectURL(blob);

    window.open(url); 
  } catch (error) {
    console.log(error); 
  }
}

export {
  generateRentReceiptPdf,
}