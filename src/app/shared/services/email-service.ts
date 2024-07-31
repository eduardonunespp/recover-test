import axios from "axios";
import { IEmail, IRecover } from "@/app/shared/domain-types/models";

export const sendEmail = async (data: IEmail) => {
  try {
    const response = await axios.post('http://localhost:5170/v1/users/PasswordResetRequest', data);
    return response;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.errors || "Ocorreu um erro.");
    } else {
      throw new Error("Erro desconhecido.");
    }
  }
};

export const sendPasswordRecover = async (data: IRecover) => {
  try {
    const response = await axios.post('http://localhost:5170/v1/users/PasswordRecover', data);
    return response;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.errors || "Ocorreu um erro.");
    } else {
      throw new Error("Erro desconhecido.");
    }
  }
};

