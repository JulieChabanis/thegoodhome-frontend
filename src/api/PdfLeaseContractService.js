import axios from "axios";

const PDF_GENERATOR_API_URL = "http://localhost:8080/api/pdf";

const openPdf = async () => {
  try {
    const response = await axios.get(PDF_GENERATOR_API_URL, {
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
  openPdf,
}
