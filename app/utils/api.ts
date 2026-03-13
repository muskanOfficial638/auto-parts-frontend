/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";




 
//API paths 
const BASE_API_URL = "https://api.autopartsxchange.co.za";
export const imagePath = `${BASE_API_URL}/8000/image/`;  //image path for local 


export const orderPath = `/api/order/`;
export const profilePath = `/api/profiles/`;
export const supplierPath = `/api/supplier`;
export const buyerPath = `/api/buyer`;

//export const vehicleApiPath = `${BASE_API_URL}/8006/v1/vehicle`;



export const authApiPath = `${BASE_API_URL}/8001/v1`;
export const buyerAPI = `${BASE_API_URL}/8002/v1/buyer`;
export const orderAPI = `${BASE_API_URL}/8003/v1`;
export const profileAPI = `${BASE_API_URL}/8004/profiles`;
export const supplierAPI = `${BASE_API_URL}/8005/v1/supplier`;


// Quote Reject
export function QuoteReject(formdata: any) {
 {

    return axios.put(
    `${buyerPath}/quote/action`,
    { ...formdata },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("unable to process ", error);
      throw error;
    });
  }
}

// update notification api
export async function updateNotification(
  id: string,
) {
  const res = await fetch(`${profilePath}notifications/${id}`, {
    method: "PATCH",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
 
    },
    body: `{"status": "read"}`,
  });

  if (!res.ok) throw new Error("Failed to update ");

  return res.json();
}

// get Notification
export async function getNotification(user_id: string) {
  const res = await fetch(`${profilePath}notifications/${user_id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    
    },
  }); // local
  if (!res.ok) throw new Error("Failed to load part request data");
  return res.json();
}


// verify OTP
export function shippingSubmit(formdata: any) {
 {

    return axios.post(
    `${supplierPath}/shipping`,
    { ...formdata },
    {
      headers: {
        "Content-Type": "application/json",
 
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
export function updateOrderStatus(orderid:string,formdata: any) {
 {

    return axios.put(
    `${orderPath}/order/orders/${orderid}`,
    { ...formdata },
    {
      headers: {
        "Content-Type": "application/json",

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
export function verifyOTP(formdata: any) {
 {

    return axios.post(
    `${buyerPath}/action/verify-otp`,
    { ...formdata },
    {
      headers: {
        "Content-Type": "application/json",

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
export function sendOTP(formdata: any) {
 {

    return axios.post(
    `${buyerPath}/action/send-otp`,
    { ...formdata },
    {
      headers: {
        "Content-Type": "application/json"
       
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
  orderid: string

) {
  const res = await fetch(`${orderPath}/order/view-order-details?order_id=${orderid}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",

    },
  });
  if (!res.ok) throw new Error("Failed to load orders details");
  return res.json();
}

// Buyer all Orders
export async function fetchAllBuyerOrders(
  user_id: string,

) {
  const res = await fetch(`${orderPath}/order/view-orders-list?buyer_id=${user_id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    
    },
  });
  if (!res.ok) throw new Error("Failed to load orders");
  return res.json();
}

// create new Order
export function CreateOrder(formdata: any) {
 {

    return axios.post(
    `${orderPath}/order/create-order`,
    { ...formdata },
    {
      headers: {
        "Content-Type": "application/json",
   
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
export async function deleteAddress( addressID: string) {
  return axios
    .delete(`${profilePath}/buyer/address/${addressID}`, {
      headers: {
        "Content-Type": "application/json"
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
export function AddNewAddressAPI(user_id:any, formdata: any) {
 {

    return axios.post(
    `${profilePath}/buyer/address/${user_id}`,
    { ...formdata },
    {
      headers: {
        "Content-Type": "application/json",
      
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
user_id  : string
  
) {
  const res = await fetch(`${profilePath}/buyer/address/${user_id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
   
    },
  });
  if (!res.ok) throw new Error("Failed to load address data");
  return res.json();
}
// Buyer All part requests
export async function fetchAllBuyerPartRequests(
  user_id: string

) {
  const res = await fetch(`${buyerPath}/all/part-request/${user_id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",

    },
  });
  if (!res.ok) throw new Error("Failed to load part requests");
  return res.json();
}

// Get Part request by id
export async function fetchPartRequestsById(
  part_request_id: string

) {
  const res = await fetch(`${buyerPath}/part-request/${part_request_id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
 
    },
  });
  if (!res.ok) throw new Error("Failed to load part request data");
  return res.json();
}

export async function getQuoteByRequest(
  part_request_id: string
) {
  const res = await fetch(
    `${buyerPath}/quote/by-request/${part_request_id}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) throw new Error("Failed to load Quotes");
  return res.json();
}

// Delete buyer part request
export async function deletequote( quoteId: string) {
  return axios
    .delete(`${supplierPath}/delete_quote/${quoteId}`, {
      headers: {
        "Content-Type": "application/json",
   
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
export async function deletePartRequest( requestId: string) {
  return axios
    .delete(`${buyerPath}/part-request/${requestId}`, {
      headers: {
        "Content-Type": "application/json",
       
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
  status: string

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

// SUPPLIERs
// Supplier All part requests
export async function fetchAllSupplierPartRequests(page:number,userId:string) {
  const res = await fetch(`${supplierPath}/all/part-request/${userId}?page=${page}&limit=10`, {
    
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",

    },
  });
  if (!res.ok) throw new Error("Failed to load all part requests");
  return res.json();
}

export async function getQuoteBySupplier(
  userId: string,
  status: string,
  page: number,
  limit: number

) {
  const res = await fetch(
    `${supplierPath}/quote/view?user_id=${userId}&status=${status}&page=${page}&limit=${limit}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
  
      },
    }
  );
  if (!res.ok) throw new Error("Failed to load Quotes");
  return res.json();
}

export async function viewProfile(user_id: string) {
  const res = await fetch(`${profilePath}/user?user_id=${user_id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    
    },
  }); // local
  if (!res.ok) throw new Error("Failed to load part request data");
  return res.json();
}

// edit supplier
export async function updateProfile(
  user_id: string,

  payload: any
) {
  const res = await fetch(`${profilePath}/profile/edit/${user_id}`, {
    method: "PATCH",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
 
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to update ");

  return res.json();
}

//kyc detail
export async function uploadKycDoc(
  path: string,
  payload: any,
  method: string
) {
  const res = await fetch(`${supplierPath}/kyc/${path}`, {
    cache: "no-store",
    method: method,
    headers: {
     
    },
    body: payload,
  });
  if (!res.ok) throw new Error("Failed to load upload doc");
  return res.json();
}

export async function fetchKycDocs(user_id: string) {
  const res = await fetch(`${supplierPath}/kyc/view?user_id=${user_id}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",

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

// // resend Verification
// export async function sendVerification(email: string) {
//   return axios
//     .post(`${authApiPath}/auth/resend-verification?email=${email}`, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//     .then((response) => {
//       console.log("Verification success:", response.data);
//       return response.data;
//     })
//     .catch((error) => {
//       console.error("Verification failed:", error);
//       throw error;
//     });
// }

// VEHICLE
// Get Vehicle make
export async function viewVehicleMake() {
  const res = await fetch(`${buyerPath}/vehicle/view`, {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to vehicle makes");
  return res.json();
}
