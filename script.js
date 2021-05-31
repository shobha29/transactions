const url =
  "https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2";

const groupTransactionByDate = (data) => {
  const transactions = data.reduce((transactions, id) => {
    const date = id.startDate.split("T")[0];
    if (!transactions[date]) {
      transactions[date] = [];
    }
    transactions[date].push(id);
    return transactions;
  }, {});

  showData(Object.values(transactions));
};

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

const showData = (transactions) => {
  document.querySelector(".header").style.display = "flex";

  let content = ``;

  transactions?.map((item) => {
    const timestamp = new Date(item[0].startDate).getTime();
    const newDate = new Date(timestamp);
    const dateString =
      newDate.getDate() +
      " " +
      newDate.toDateString().slice(4, 7) +
      " " +
      newDate.getFullYear();

    content += `<div class="date">
    <div class="horizontal-line left-line"></div>
    <p>${dateString}</p>
    <div class="horizontal-line right-line"></div>
    </div>`;

    item?.map((data) => {
      const newHour = newDate.getHours();
      const minute = newDate.getMinutes() == "0" ? "00" : newDate.getMinutes();
      const hour =
        newHour == "0" ? "12" : newHour > "12" ? newHour % "12" : newHour;
      const zone = newHour > 12 ? "PM" : "AM";

      const timeString = `${hour}:${minute} ${zone}`;

      const align = data?.direction === 1 ? "not-empty" : "empty";

      const topImage =
        data?.status === 1
          ? "./asserts/exclamation-mark.png"
          : "./asserts/check-mark.png";

      const topText =
        data?.status === 1
          ? data?.direction === 1
            ? "You requested"
            : "Request received"
          : data?.direction === 1
          ? "You paid"
          : "You received";

      const bottomLeft =
        data?.status === 1
          ? data?.direction === 1
            ? `<div class="btn">
                <p>Cancel</p>
               </div>`
            : `<div class="btn-container">
                <div class="btn">
                  <p>Pay</p>
                </div>
                <div class="btn">
                  <p>Decline</p>
                </div>
              </div>`
          : `<div class="transaction-id">
                <p>Transaction ID</p>
                <p>A1234156256787382783899</p>
             </div>`;

      content += `<div class='new'><div class=${align}></div><div class="card-container">
      <div class="card">
        <div class="top">
          <p class="top-left">₹ ${data?.amount}</p>

            <div class="top-right">
              <img src=${topImage} alt="exclamationMark" />
              <p>${topText}</p>
            </div>
        </div>

        <div class="bottom">
          ${bottomLeft}
          <a href='./transactionDetail.html?${data.amount}|${data.direction}|${data.type}|${data.status}|${data.startDate}|${data.endDate}|${data.description}|${data.customer.vPayId}|${data.customer.vPay}|${data.partner.vPayId}|${data.partner.vPay}'>
          <img
            src='./asserts/forward-arrow.png'
            alt="forward-arrow"
          />
          </a>
        </div>
      </div>
      <div class="transaction-date-time">
        <p>${dateString}, ${timeString}</p>
      </div>
    </div></div>`;
    });
  });

  document.querySelector("#card-data").innerHTML = content;
};

fetch(url)
  .then((res) => {
    return res.json();
  })
  .then((result) => {
    const data = result.transactions;
    groupTransactionByDate(data);
    hideLoader();
  });
