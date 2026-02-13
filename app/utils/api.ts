/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";


export const getAuth = () => {
  if (typeof window === "undefined") return null;
  return JSON.parse(localStorage.getItem("autoPartsUserData") || "null");
};


//API paths 
const BASE_API_URL = "https://api.autopartsxchange.co.za";
export const orderPath = `${BASE_API_URL}/8003/v1`;
export const profilePath = `${BASE_API_URL}/8004/profiles/`;
export const authApiPath = `${BASE_API_URL}/8001/v1`;
export const supplierPath = `${BASE_API_URL}/8005/v1/supplier`;
export const buyerPath = `${BASE_API_URL}/8002/v1/buyer`;
//export const vehicleApiPath = `${BASE_API_URL}/8006/v1/vehicle`;
export const imagePath = `${BASE_API_URL}/8000/image/`;  //image path for local 

// verify OTP
export function shippingSubmit(token: string,formdata: any) {
 {

    return axios.post(
    `${supplierPath}/shipping/`,
    { ...formdata },
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
      console.error("unable to verify OTP ", error);
      throw error;
    });
  }
}


// update order status
export function updateOrderStatus(token: string,orderid:string,formdata: any) {
 {

    return axios.put(
    `${orderPath}/order/orders/${orderid}`,
    { ...formdata },
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
      console.error("unable to verify OTP ", error);
      throw error;
    });
  }
}

// verify OTP
export function verifyOTP(token: string,formdata: any) {
 {

    return axios.post(
    `${buyerPath}/action/verify-otp`,
    { ...formdata },
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
      console.error("unable to verify OTP ", error);
      throw error;
    });
  }
}

// send OTP
export function sendOTP(token: string,formdata: any) {
 {

    return axios.post(
    `${buyerPath}/action/send-otp`,
    { ...formdata },
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
      console.error("unable to send OTP ", error);
      throw error;
    });
  }
}

export async function fetchOrdersByID(
  orderid: string,
  token: string
) {
  const res = await fetch(`${orderPath}/order/view-order-details?order_id=${orderid}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to load orders details");
  return res.json();
}

// Buyer all Orders
export async function fetchAllBuyerOrders(
  user_id: string,
  token: string
) {
  const res = await fetch(`${orderPath}/order/view-orders-list?buyer_id=${user_id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to load orders");
  return res.json();
}

// create new Order
export function CreateOrder(token: string,formdata: any) {
 {

    return axios.post(
    `${orderPath}/order/create-order`,
    { ...formdata },
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
      console.error("unable to add address ", error);
      throw error;
    });
  }
}

//  delete address 
export async function deleteAddress(token: string, addressID: string) {
  return axios
    .delete(`${profilePath}/buyer/address/${addressID}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("unable to delete address", error);
      throw error;
    });
}
// create New address
export function AddNewAddressAPI(user_id:any, formdata: any, token: string) {
 {

    return axios.post(
    `${profilePath}/buyer/address/${user_id}`,
    { ...formdata },
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
      console.error("unable to add address ", error);
      throw error;
    });
  }
}

// Get buyer address
export async function fetchBuyerAddress(
user_id  : string,
  token: string
) {
  const res = await fetch(`${profilePath}/buyer/address/${user_id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to load address data");
  return res.json();
}
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
export async function deletequote(token: string, quoteId: string) {
  return axios
    .delete(`${supplierPath}/delete_quote/${quoteId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("unable to delete Quote", error);
      throw error;
    });
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
export async function fetchAllSupplierPartRequests(token: string, page:number) {
  const res = await fetch(`${supplierPath}/all/part-request/?page=${page}&limit=10`, {
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

export async function viewProfile(user_id: string, token: string) {
  const res = await fetch(`${profilePath}/user?user_id=${user_id}`, {
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
export async function updateProfile(
  user_id: string,
  token: string,
  payload: any
) {
  const res = await fetch(`${profilePath}/profile/edit/${user_id}`, {
    method: "PATCH",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to update ");

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
  const res = await fetch(`${buyerPath}/vehicle/view/`, {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to vehicle makes");
  return res.json();
}
