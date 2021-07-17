import axios from "axios";

const verifyToken = async () => {
  let info = window.localStorage.getItem("E_com");
  if (info) {
    try {
      info = JSON.parse(info);
      // const output = await axios.post("http://localhost:2000/users/verifyy", { token: info});
      const output = "error";

      if (output === "success") {
        return true;
      } else {
        return false
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  //   return jack;
};
export default verifyToken;
