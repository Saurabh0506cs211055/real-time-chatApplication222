import axios from "axios";
import newRequest from "./utils/newRequest.js"
import { json } from "react-router-dom";
export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await newRequest.post("/auth/login", userCredential);
     localStorage.setItem("currentLoginuser",JSON.stringify(res));
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

