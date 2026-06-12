import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { NextRequest } from "next/server";
import { imagePath, orderAPI } from "@/app/utils/api";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = request.cookies.get("MMMAT")?.value;
  const paramsData = await params;

  if (!paramsData.id) {
    return new Response("Missing appointment ID", { status: 400 });
  }

  const res = await fetch(`${orderAPI}/view-invoice/${paramsData.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const resData = await res.json();


  //  if(!resData.success){
  //     return new Response("Failed to fetch invoice data", { status: 500 });
  //   }


//   const resData = {
//   orderId: "OR-1061",
//   orderDate: "2026-05-26",
//   status: "Completed",

//   supplierName: "Muskan Supplier",
//   supplierEmail: "email@email.com",

//   customerName: "Gurjeet Singh",
//   address: "Ward No 20 Anupgarh, Rajasthan - 335701",

//   productAmount: 40,
//   shippingFee: 0,
//   tax: 0,
//   totalAmount: 40,

//   items: [
//     {
//       name: "Horn",
//       description: "Automotive spare part",
//       image: "https://example.com/horn.jpg",
//       orderDate: "2026-05-26",
//       delivery: "7 Days",
//       price: 40
//     }
//   ]
// };
  const html = `
  <html>
<head>
<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:'Segoe UI',Arial,sans-serif;
}

.invoice{
    max-width:1000px;
    margin:auto;
    background:#fff;
    overflow:hidden;
    border:1px solid #e5e7eb;
}

/* HEADER */

.header{
    background:linear-gradient(135deg,#0d2d50,#041a33);
    color:#fff;
    padding:35px 40px;
    display:flex;
    justify-content:space-between;
    align-items:center;
}

.brand h1{
    font-size:34px;
    letter-spacing:1px;
}

.brand h1 span{
    color:#36b9ff;
}

.brand>div{
    gap:8px;
    display:flex;
    justify-content:center;
    align-items:center;
}

.line1{
    background:#fff;
    width:45px;
    height:1px;
}

.brand p{
    opacity:.85;
    font-size:14px;
}

.invoice-meta{
    text-align:right;
}

.invoice-meta h2{
    font-size:42px;
    letter-spacing:3px;
}

.invoice-meta .number{
    margin-top:10px;
    font-size:15px;
    line-height:24px;
}

/* STATUS BAR */

.status-bar{
    background:#f8fbff;
    border-bottom:1px solid #e5edf5;
    padding:18px 40px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-top:40px;
}


.info-grid{
    padding:35px 40px;
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:20px;
}

.card{
    border:1px solid #e5edf5;
    padding:22px;
}

.card h3{
    color:#0d4c85;
    margin-bottom:15px;
    font-size:18px;
}

.card p{
    margin-bottom:8px;
    line-height:24px;
}

/* TABLE */

.section{
    padding:0 40px 30px;
}

.section-title{
    color:#0d4c85;
    font-size:20px;
    margin-bottom:15px;
}

.product-table{
    width:100%;
    border-collapse:collapse;
}

.product-table thead{
    background:#2daaf3;
    color:white;
}

.product-table th{
    padding:14px;
    text-align:left;
}

.product-table td{
    padding:16px;
    border-bottom:1px solid #edf2f7;
}

.product{
    display:flex;
    align-items:center;
    gap:15px;
}

.product img{
    width:80px;
    height:80px;
    object-fit:cover;
    border:1px solid #ddd;
}

.product-name{
    font-size:17px;
    font-weight:600;
}

.product-desc{
    color:#718096;
    font-size:13px;
    margin-top:4px;
}

/* SUMMARY */

.summary-wrapper{
    display:flex;
    justify-content:flex-end;
    padding:0 40px 40px;
}

.summary{
    width:350px;
    border:1px solid #e5edf5;
}

.summary-header{
    background:#0d4c85;
    color:white;
    padding:15px;
    font-weight:600;
}

.summary-body{
    padding:20px;
}

.row{
    display:flex;
    justify-content:space-between;
    margin-bottom:12px;
}

.total{
    border-top:2px dashed #ddd;
    padding-top:15px;
    margin-top:15px;
    font-size:20px;
    font-weight:700;
    color:#0d4c85;
}

/* FOOTER */

.footer{
    border-top:1px solid #e5edf5;
    padding:25px;
    text-align:center;
}

.thankyou{
    font-size:22px;
    font-weight:600;
    color:#0d4c85;
}

.note{
    margin-top:10px;
    color:#666;
    font-size:13px;
}

</style>
</head>

<body>

<div class="invoice">

    <div class="header">

        <div class="brand">
            <h1><span>AUTO</span>PARTS</h1>

            <div>
                <div class="line1"></div>
                <p>XChange</p>
                <div class="line1"></div>
            </div>
        </div>

        <div class="invoice-meta">
            <h2>INVOICE</h2>

            <div class="number">
                Invoice : ${resData.orderId || ''}<br>
                Date: ${resData.orderDate || ''}
              
            </div>
        </div>

    </div>

    <div class="status-bar">

        <div>
            <strong>Order ID:</strong>
            ${resData.orderId || ''}
        </div>

        <div>
            <strong>Transaction ID:</strong>
            ${resData.payment.transactionId || ''}
        </div>



    </div>

    <div class="info-grid">

        <div class="card">

            <h3>Billing Information</h3>

            <p>
                <strong>Name:</strong>
                ${resData.buyerName || ''}
            </p>

            <p>
                <strong>Email:</strong>
                ${resData.buyerEmail || ''}
            </p>

        </div>

        <div class="card">

            <h3>Delivery Address</h3>

            <p>
                <strong>${resData.address.name || ''}</strong>
            </p>

            <p>
                ${resData.address.address || ''}<br>
                ${resData.address.city || ''}, ${resData.address.province || ''} ${resData.address.country || ''} ${resData.address.postal_code || ''}
            </p>

        </div>

    </div>

    <div class="section">

        <h3 class="section-title">Order Items</h3>

        <table class="product-table">

            <thead>
                <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Order Date</th>
           
                    <th>Price</th>
                </tr>
            </thead>

            <tbody>
  <tr>

                    <td>
                        <div class="product">
                            <img src="${imagePath +resData.items[0]?.attachment || ''}" />                                                                   
                        </div>
                    </td>
                     <td>
                        <div class="product">
                                <div class="product-name">
                                    ${resData.items[0]?.title || ''}
                                </div>
                        </div>
                    </td>

                    <td>${resData.orderDate || ''}</td>

              

                    <td>
                        <strong>R ${resData.payment.amount || 0}</strong>
                    </td>

                </tr>
          

            </tbody>

        </table>

    </div>

    <div class="summary-wrapper">

        <div class="summary">

            <div class="summary-header">
                Payment Summary
            </div>

            <div class="summary-body">

                <div class="row">
                    <span>Product Amount</span>
                    <span>R ${resData.payment.amount || 0}</span>
                </div>

                <div class="row total">
                    <span>Total Paid</span>
                    <span>R ${resData.payment.amount || 0}</span>
                </div>

            </div>

        </div>

    </div>

    <div class="footer">

        <div class="thankyou">
            Thank You For Your Order
        </div>

        <div class="note">
            This invoice serves as proof of purchase for your AutoParts XChange order.
        </div>

    </div>

</div>

</body>
</html>
`;

console.log("NODE_ENV:", process.env.NODE_ENV);

try {
  const path = await chromium.executablePath();
  console.log("Chromium Path:", path);
} catch (err) {
  console.error("Chromium Error:", err);
}
  const executablePath = await chromium.executablePath();
  const isVercel = !!process.env.VERCEL;

  

  const browser = await puppeteer.launch({
    executablePath: isVercel
      ? executablePath
      : `C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe`,
    args: isVercel ? chromium.args : [],
    headless: true,
  });
  const page = await browser.newPage();
  await page.setContent(html);
  await page.waitForNetworkIdle();
  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    },
  });

  const pdfBuffer = Buffer.from(pdf);
  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="invoice ${resData.invoiceId ?? ""}.pdf"`,
    },
  });
}
