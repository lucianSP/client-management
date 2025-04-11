const clientForm = document.getElementById("clientForm");
const clientTableBody = document.querySelector("#clientTable tbody");
const exportBtn = document.getElementById("exportBtn");

let clients = [];

clientForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const client = {
    id: clients.length + 1,
    name: document.getElementById("clientName").value.trim(),
    fiscalCode: document.getElementById("fiscalCode").value.trim(),
    registrationNo: document.getElementById("registrationNo").value.trim(),
    address: document.getElementById("address").value.trim(),
    city: document.getElementById("city").value.trim(),
    county: document.getElementById("county").value.trim(),
    country: document.getElementById("country").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
  };

  clients.push(client);
  renderTable();
  clientForm.reset();
});

function renderTable() {
  clientTableBody.innerHTML = "";
  clients.forEach((client, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${client.name}</td>
      <td>${client.fiscalCode}</td>
      <td>${client.registrationNo}</td>
      <td>${client.address}</td>
      <td>${client.city}</td>
      <td>${client.county}</td>
      <td>${client.country}</td>
      <td>${client.email}</td>
      <td>${client.phone}</td>
    `;
    clientTableBody.appendChild(row);
  });
}

exportBtn.addEventListener("click", function () {
  if (clients.length === 0) {
    alert("Nu există clienți de exportat.");
    return;
  }

  const headers = [
    "Client_ID",
    "Client_Name",
    "Fiscal_Code",
    "Registration_No",
    "Address",
    "City",
    "County",
    "Country",
    "Email",
    "Phone"
  ];

  const csvContent = [
    headers.join(","),
    ...clients.map(client =>
      [
        client.id,
        `"${client.name}"`,
        client.fiscalCode,
        client.registrationNo,
        `"${client.address}"`,
        client.city,
        client.county,
        client.country,
        client.email,
        client.phone
      ].join(",")
    )
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Clients.csv";
  a.click();
  URL.revokeObjectURL(url);
});
