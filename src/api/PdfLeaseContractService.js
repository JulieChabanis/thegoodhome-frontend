import axios from "axios";

// const PDF_GENERATOR_API_URL = "http://localhost:8080/api/pdf";

const generatePdf = async (pdfContractId) => {
  try{
    const response = await axios.get(`${process.env.REACT_APP_PDF_GENERATOR_URL_API}/${pdfContractId}`, {
      auth: {
        username: process.env.REACT_APP_KEY_USER_AUTH,
        password: process.env.REACT_APP_KEY_PASSWORD_AUTH,
      },
    }, {
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
  generatePdf,
}
