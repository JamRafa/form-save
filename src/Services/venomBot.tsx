import axios from "axios";

const venomBot = axios.create({
  //baseURL: "http://localhost:5000"
  //baseURL:"https://wppbotapi-6ion.onrender.com"
  baseURL: "https://api.ultramsg.com/instance54901/"
});

export default venomBot