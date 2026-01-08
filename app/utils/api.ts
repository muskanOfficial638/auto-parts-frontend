/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

// API paths for LOCAL
export const authApiPath = "http://54.80.119.79:8001/v1";
export const supplierPath = "http://54.80.119.79:8005/v1/supplier";
export const buyerPath = "http://54.80.119.79:8002/v1/buyer";
export const vehicleApiPath = "http://54.80.119.79:8006/v1/vehicle";
export const imagePath = "http://54.80.119.79:8000/image/";  //image path for local 
//  export const imagePath = "/api/image-proxy/" // image path for vercel

// // API paths for Vercel
// export const authApiPath = "/api/auth";
// export const supplierPath = "/api/supplier";
// export const buyerPath = "/api/buyer";
// export const vehicleApiPath = "/api/vehicle";

// BUYER
// Buyer All part requests
export async function fetchAllBuyerPartRequests(
  user_id: string,
  token: string
) {
  const res = await fetch(`${buyerPath}/all/part-request/${user_id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to load part requests");
  return res.json();
}

// Get Part request by id
export async function fetchPartRequestsById(
  part_request_id: string,
  token: string
) {
  const res = await fetch(`${buyerPath}/part-request/${part_request_id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to load part request data");
  return res.json();
}

export async function getQuoteByRequest(
  part_request_id: string,
  token: string
) {
  const res = await fetch(
    `${buyerPath}/quote/by-request/?request_id=${part_request_id}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) throw new Error("Failed to load Quotes");
  return res.json();
}

// Delete buyer part request
export async function deletePartRequest(token: string, requestId: string) {
  return axios
    .delete(`${buyerPath}/part-request/${requestId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("unable to delete part request", error);
      throw error;
    });
}

// Update quote by action
export async function updateQuoteByAction(
  quoteId: string,
  requestId: string,
  status: string,
  token: string
) {
  return axios
    .put(
      `${buyerPath}/quote/action`,
      {
        quote_id: quoteId,
        request_id: requestId,
        status: status,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("unable to update quote action", error);
      throw error;
    });
}

// SUPPLIER
// Supplier All part requests
export async function fetchAllSupplierPartRequests(token: string) {
  const res = await fetch(`${supplierPath}/all/part-request`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to load all part requests");
  return res.json();
}

export async function getQuoteBySupplier(
  userId: string,
  status: string,
  page: number,
  limit: number,
  token: string
) {
  const res = await fetch(
    `${supplierPath}/quote/view?user_id=${userId}&status=${status}&page=${page}&limit=${limit}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) throw new Error("Failed to load Quotes");
  return res.json();
}

export async function viewSupplierProfile(user_id: string, token: string) {
  const res = await fetch(`${supplierPath}/profile/${user_id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }); // local
  if (!res.ok) throw new Error("Failed to load part request data");
  return res.json();
}

// edit supplier
export async function updateSupplierProfile(
  user_id: string,
  token: string,
  payload: any
) {
  const res = await fetch(`${supplierPath}/profile/edit/${user_id}`, {
    method: "PATCH",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to update supplier");

  return res.json();
}

//kyc detail
export async function uploadKycDoc(
  token: string,
  path: string,
  payload: any,
  method: string
) {
  const res = await fetch(`${supplierPath}/kyc/${path}`, {
    cache: "no-store",
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: payload,
  });
  if (!res.ok) throw new Error("Failed to load upload doc");
  return res.json();
}

export async function fetchKycDocs(user_id: string, token: string) {
  const res = await fetch(`${supplierPath}/kyc/view?user_id=${user_id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }); //local
  if (!res.ok) throw new Error("Failed to load kyc doc");
  return res.json();
}

// Search part requests
// export async function searchSupplierPartRequests(
//   token: string,
//   title?: string,
//   urgency?: string,
//   description?: string,
//   make?: string,
//   model?: string
// ) {
//   const res = await fetch(
//     `${supplierPath}/search/part-request/?title=${title ||''}&urgency=${urgency || ''}&description=${description || ''}&vehicle_make=${make || ''}&vehicle_model=${model || ''}`,
//     {
//       cache: "no-store",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   if (!res.ok) throw new Error("Part Request not found");
//   return res.json();
// }

//verify-email
export async function verifyEmail(token: string) {
  return axios
    .get("/v1/auth/verify-email", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Verification success:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Verification failed:", error);
      throw error;
    });
}

// resend Verification
export async function sendVerification(email: string) {
  return axios
    .post(`${authApiPath}/auth/resend-verification?email=${email}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("Verification success:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Verification failed:", error);
      throw error;
    });
}

// VEHICLE
// Get Vehicle make
export async function viewVehicleMake() {
  const res = await fetch(`${vehicleApiPath}/view/`, {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to vehicle makes");
  return res.json();
}
