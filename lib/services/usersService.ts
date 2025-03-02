import api from "../api";
import { components } from "../types";

export const getUser = async (id: string): Promise<components["schemas"]["Member"]> => {
  try {
    const response = await api.get("/users/{id}", { id });
    if (!response.data) {
      throw new Error(`User with id ${id} not found`);
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserOrganizations = async (): Promise<components["schemas"]["Organization"][]> => {
  console.log("getUserOrganizations in usersService");
  try {
    const response = await api.get("/users/organizations");
    console.log("response in usersService");  
    console.log(response, "response");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
