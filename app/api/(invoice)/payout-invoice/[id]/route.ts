import {  orderAPI } from "@/app/utils/api";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest,  { params }: { params: Promise<{ id: string }> },
) {
  
  
const token = request.cookies.get("MMMAT")?.value;
 const paramsData = await params;

  if (!paramsData.id) {
    return new Response("Missing appointment ID", { status: 400 });
  }

  const res = await fetch(`${orderAPI}/payout-invoice/${paramsData.id}` ,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();


 if(!data.success){
    return new Response("Failed to fetch invoice data", { status: 500 });
  }
 

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

body{
    color:#333;
   
    background:#f5f7fa;
}

.invoice{
    max-width:1000px;
    margin:auto;
    background:#fff;
    border:1px solid #e5e7eb;
}

/* HEADER */

.header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:30px 40px;
    background:linear-gradient(135deg,#0d2d50,#041a33);
    color:#fff;
}

.brand h1{
    font-size:34px;
    letter-spacing:1px;
}

.brand h1 span{
    color:#36b9ff;
}

.brand-row{
    display:flex;
    align-items:center;
    justify-content: center;
    gap:8px;
    margin-top:4px;
}

.line{
    width:40px;
    height:1px;
    background:#fff;
}

.invoice-title{
    text-align:right;
}

.invoice-title h2{
    font-size:34px;
    letter-spacing:2px;
}

.invoice-title p{
    margin-top:5px;
}

/* INFO */

.info-grid{
    padding:30px 40px;
}

.card{
    background:#f8fbff;
    border:1px solid #e5edf5;
    padding:20px;
}

.card h3{
    color:#0d4c85;
    margin-bottom:12px;
}

/* TABLE */

.section-title{
    color:#0d4c85;
    padding:0 40px;
    margin-bottom:15px;
}

table{
    width:calc(100% - 80px);
    margin:0 40px;
    border-collapse:collapse;
}

.first-tr{
    background:#2daaf3;
}

.payout-table th{
    color:#fff;
    padding:14px;
    text-align:left;
}

.payout-table td{
    border:1px solid #e5edf5;
    padding:12px;
}

/* SUMMARY */

.summary{
    width:380px;
    margin-left:auto;
    margin-right:40px;
    margin-top:25px;
    border:1px solid #e5edf5;
}

.summary-header{
    background:#0d4c85;
    color:#fff;
    padding:14px;
    font-weight:600;
}

.summary-body{
    padding:18px;
}

.summary-row{
    display:flex;
    justify-content:space-between;
    margin-bottom:12px;
}

.total{
    border-top:2px dashed #ddd;
    padding-top:12px;
    margin-top:12px;
    font-size:20px;
    font-weight:700;
    color:#0d4c85;
}

/* PAYMENT */

.payment-box{
    margin:25px 40px;
}

/* FOOTER */

.footer{
    margin:30px 40px;
    border-top:1px solid #ddd;
    padding-top:15px;
    font-size:12px;
    color:#666;
}

</style>
</head>

<body>

<div class="invoice">

    <div class="header">

        <div class="brand">

            <h1><span>AUTO</span>PARTS</h1>

            <div class="brand-row">
                <div class="line"></div>
                <span>XChange</span>
                <div class="line"></div>
            </div>

        </div>

        <div class="invoice-title">

            <h2>PAYOUT INVOICE</h2>

            <p><b>Payout ID:</b> #${data.uniqueId}</p>
            <p><b>Date:</b> ${data.payoutDate}</p>

        </div>

    </div>

    <div class="info-grid">

        <div class="card">

            <h3>Information</h3>

            <p><b>Name:</b> ${data.supplierName}</p>
   
            <p><b>Email:</b> ${data.email}</p>

        </div>

    </div>

    <h3 class="section-title">
        Orders Included In Payout
    </h3>

    <table class="payout-table">

        <thead>

            <tr class="first-tr">
                <th>Order ID</th>
                <th>Product Name</th>
                <th>Order Date</th>
                <th>Amount</th>
            </tr>

        </thead>

        <tbody>

            ${data?.orders?.map((item: { order_id: string; title: string; orderDate: string; amount: string })=>`
                <tr>
                    <td>#${item.order_id}</td>
                    <td>${item.title}</td>
                    <td>${item.orderDate}</td>
                    <td>R ${item.amount}</td>
                </tr>
            `).join('')}

        </tbody>

    </table>

    <div class="summary">

        <div class="summary-header">
            Payout Summary
        </div>

        <div class="summary-body">

            <div class="summary-row">
                <span>Total Order Amount</span>
                <span>R ${data.grossAmount}</span>
            </div>

            <div class="summary-row">
                <span>Platform Fee</span>
                <span>- R ${data.platformFee}</span>
            </div>

            <div class="summary-row total">
                <span>Final Payout</span>
                <span>R ${data.netPayout}</span>
            </div>

        </div>

    </div>

    <div class="card payment-box">

        <h3>Payment Details</h3>

        <p><b>Transaction ID:</b> ${data.transactionId}</p>
        <p><b>Paid On:</b> ${data.payoutDate}</p>

    </div>

    <div class="footer">

        This payout invoice confirms that funds have been
        transferred to the supplier for completed orders
        processed through AutoParts XChange Marketplace.

    </div>

</div>

</body>
</html>
  `;



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
      "Content-Disposition": `attachment; filename="invoice ${data.invoiceId??''}.pdf"`,
    },
  });
}
