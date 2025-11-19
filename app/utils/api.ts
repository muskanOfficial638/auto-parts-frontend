/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

// API paths for LOCAL
export const authApiPath = "http://54.80.119.79:8001/v1";
export const adminApiPath = "http://54.80.119.79:8000/v1/admin";
export const vehicleApiPath = "http://54.80.119.79:8006/v1/vehicle";
export const partRequestPath = "http://54.80.119.79:8005/v1/supplier";

// API paths for Vercel
// export const authApiPath = "/api/auth";
// export const adminApiPath = "/api/admin";
// export const vehicleApiPath = "/api/vehicle";
// export const partRequestPath = "/api/parts";

// update user
export async function updateUser(role: string, token: string, userData: any) {
  console.log("role", role)
  return axios.patch(
    `${adminApiPath}/manage-users/${role}/${userData?.id}`,
    { ...userData },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("unable to update user", error);
      throw error;
    });
}

// delete user
export async function deleteUser(token: string, userId: string) {
  return axios.delete(
    `${adminApiPath}/manage-users/${userId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      // console.log("delete response",response)
      return response;
    })
    .catch((error) => {
      console.error("unable to delete user", error);
      throw error;
    });
}

//verify-email
export async function verifyEmail(token: string) {
  return axios.get(
    "/v1/auth/verify-email",
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      console.log("Verification success:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Verification failed:", error);
      throw error;
    });
}

// resend Verifiaction
export async function sendVerification(email: string) {
  return axios.post(
    `${authApiPath}/auth/resend-verification?email=${email}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      console.log("Verification success:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Verification failed:", error);
      throw error;
    });
}





