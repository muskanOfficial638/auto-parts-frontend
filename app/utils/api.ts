import axios from "axios";

// API paths for LOCAL
// export const authApiPath = "http://54.80.119.79:8001/v1";
// export const supplierPath = "http://54.80.119.79:8005/v1/supplier";
// export const buyerPath = "http://54.80.119.79:8002/v1/buyer";

// API paths for Vercel
export const authApiPath = "/api/auth";
export const supplierPath = "/api/supplier";
export const buyerPath = "/api/buyer";

// BUYER
// Buyer All part requests
export async function fetchAllBuyerPartRequests(user_id: string, token: string) {
  const res = await fetch(`${buyerPath}/all/part-request/${user_id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to load part requests");
  return res.json();
}

// Get Part request by id
export async function fetchPartRequestsById(part_request_id: string, token: string) {
  const res = await fetch(`${buyerPath}/part-request/${part_request_id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to load part request data");
  return res.json();
}

export async function getQuoteByRequest(part_request_id: string, token: string) {
  const res = await fetch(`${buyerPath}/quote/by-request/?request_id=${part_request_id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to load Quotes");
  return res.json();
}

// Update quote by action
export async function updateQuoteByAction(quoteId: string, requestId: string, status:string, token: string) {
  return axios.put(
    `${buyerPath}/quote/action`,
    {
     quote_id: quoteId,
     request_id: requestId,
     status: status
    },
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
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to load all part requests");
  return res.json();
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





