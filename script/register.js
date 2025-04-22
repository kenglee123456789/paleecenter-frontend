document.addEventListener("DOMContentLoaded", function () {
  fetch("https://palee-backend.onrender.com/api/subject")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("tableBody");
      data.forEach((subject) => {
        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        idCell.textContent = subject.subDetailID;
        const nameCell = document.createElement("td");
        nameCell.textContent = subject.subName + "-" + subject.level;
        const priceCell = document.createElement("td");
        priceCell.textContent = subject.cost;
        const buttonCell = document.createElement("td");
        buttonCell.innerHTML = `<a href="#" class="btn btn-info fas fa-add"></a>`;
        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(buttonCell);
        tableBody.appendChild(row);

        buttonCell
          .querySelector("a")
          .addEventListener("click", function (event) {
            event.preventDefault();

            const tableDetail = document.getElementById("tableDetail");
            const existingRows = tableDetail.querySelectorAll("tr");
            if (existingRows.length >= 5) {
              Swal.fire({
                icon: "warning",
                title: "ທ່ານເພີ່ມວິຊາຫຼາຍເກີນໄປ",
                text: "ທ່ານບໍ່ສາມາດຮຽນໄດ້ຫຼາຍກວ່າ 5 ວິຊາ",
              });
              return;
            }
            const duplicate = Array.from(existingRows).some(
              (row) =>
                row.querySelector("td").textContent === subject.subDetailID
            );
            if (duplicate) {
              Swal.fire({
                icon: "warning",
                title: "ທ່ານໄດ້ເພີ່ມວິຊານີ້ແລ້ວ",
                text: "ກະລຸນາເພີ່ມວິຊາອື່ນ",
              });
              return;
            }

            const newRow = document.createElement("tr");
            const newIdCell = document.createElement("td");
            newIdCell.textContent = subject.subDetailID;

            const newNameCell = document.createElement("td");
            newNameCell.textContent = subject.subName + "-" + subject.level;
            const newPriceCell = document.createElement("td");
            newPriceCell.textContent = subject.cost;
            const deleteButtonCell = document.createElement("td");
            deleteButtonCell.innerHTML = `<a href="#" class="btn btn-danger fas fa-times"></a>`;
            newRow.appendChild(newIdCell);
            newRow.appendChild(newNameCell);
            newRow.appendChild(newPriceCell);
            newRow.appendChild(deleteButtonCell);
            tableDetail.appendChild(newRow);
            updateTotal();
            deleteButtonCell
              .querySelector("a")
              .addEventListener("click", function (deleteEvent) {
                deleteEvent.preventDefault();
                tableDetail.removeChild(newRow);
                updateTotal();
              });
          });
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  document
    .getElementById("searchInput")
    .addEventListener("input", function (event) {
      const searchQuery = event.target.value.toLowerCase();
      const rows = document.querySelectorAll("#tableBody tr");

      rows.forEach((row) => {
        let rowText = "";
        row.querySelectorAll("td").forEach((cell) => {
          rowText += cell.textContent.toLowerCase();
        });
        if (rowText.includes(searchQuery)) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
});
function updateTotal() {
  const tableDetail = document.getElementById("tableDetail");
  const rows = tableDetail.querySelectorAll("tr");
  let total = 0;
  rows.forEach((row) => {
    const costCell = row.querySelectorAll("td")[2];
    if (costCell) {
      total += parseFloat(costCell.textContent);
    }
  });
  document.getElementById("total").value = total.toFixed(0);
}

document.getElementById("save").addEventListener("click", function (event) {
  event.preventDefault();

  const tableDetail = document.getElementById("tableDetail");
  const rows = tableDetail.querySelectorAll("tr");
  if (rows.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "ທ່ານຍັງບໍ່ທັນເພີ່ມວິຊາຮຽນ",
      text: "ກະລຸນາເພີ່ມວິຊາກ່ອນທີ່ຈະບັນທຶກ",
    });
    return;
  }
  let total = 0;
  let billContent = `<div style="text-align:center; font-size: 10px; font-weight: bold; ">
                        <h6>ລະຫັດໃບບິນ: ${
                          document.getElementById("regisID").value
                        }</h6>
                        <h6>ລະຫັດນັກຮຽນ: ${studentID}</h6>
                      </div>
                      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;" class="table">
                          <thead>
                              <tr style="background-color: #f2f2f2;">
                                  <th style="padding: 8px; border: 1px solid #ddd; text-align: center; font-size: 14px">ລະຫັດວິຊາ</th>
                                  <th style="padding: 8px; border: 1px solid #ddd; text-align: center; font-size: 14px">ວິຊາ ແລະ ລະດັບ</th>
                                  <th style="padding: 8px; border: 1px solid #ddd; text-align: center; font-size: 14px">ລາຄາ</th>
                              </tr>
                          </thead>
                          <tbody>`;
  rows.forEach((row, index) => {
    const idCell = row.querySelectorAll("td")[0];
    const nameCell = row.querySelectorAll("td")[1];
    const costCell = row.querySelectorAll("td")[2];
    if (nameCell && costCell) {
      billContent += `<tr style="border: 1px solid #ddd;">
            <td style="padding: 8px; text-align: left; font-size: 12px"><p>${idCell.textContent}</p></td>
                                <td style="padding: 8px; text-align: left; font-size: 12px"><p>${nameCell.textContent}</p></td>
                                <td style="padding: 8px; text-align: left; font-size: 12px"><p>${costCell.textContent}</p></td>
                            </tr>`;
      total += parseFloat(costCell.textContent);
    }
  });

  billContent += `</tbody></table>
                    <div style="text-align: right; font-size: 16px; margin-top: 10px;">
                        <h6>ລວມເງິນທັງໝົດ: ${total.toFixed(0)} ກີບ</h6>
                    </div>
                    <div style="text-align: center; margin-top: 20px; font-size: 16px;">
                        <h6 class="text-danger">ຢ່າລືມແຄັບຈໍໄວ້ເປັນຫຼັກຖານ</h6>
                    </div>
                    <div style="text-align: center; margin-top: 20px; font-size: 16px;">
                        <h6 class="text-danger">ໃຫ້ຖືເອົາບິນມາຈ່າຍຄ່າຮຽນທີ່ສູນ</h6>
                    </div>
                    `;

  Swal.fire({
    title: "ບິນລົງທະບຽນ",
    html: billContent,
    iconHtml: `<img src="../image/palee_logo.jpg" alt="" style="width: 70px; height: 70px;border-radius: 35%">`,
    showCancelButton: true,
    confirmButtonText: "ບັນທຶກ",
    cancelButtonText: "ຍົກເລີກ",
    customClass: {
      title: "swal-title-custom",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      insertRegistration();
      insertRegisdetail();
      insertPayment();
    } else {
      Swal.close();
    }
  });
});

function insertRegistration() {
  const registration = {
    regisID: document.querySelector('input[name="regisID"]').value,
    stdID: studentID,
    date: new Date().toISOString().split("T")[0], // Get the current date in 'YYYY-MM-DD' format
  };

  fetch("https://palee-backend.onrender.com/api/registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registration),
  });
}

function insertRegisdetail() {
  const tableDetail = document.getElementById("tableDetail");
  const rows = tableDetail.querySelectorAll("tr");

  rows.forEach((row) => {
    const subjectID = row.querySelector("td").textContent;
    const subjectCost = row.querySelectorAll("td")[2].textContent;

    const regisdetail = {
      regisID: document.querySelector('input[name="regisID"]').value,
      subject: subjectID,
      scholarship: "1",
      Cost: subjectCost,
    };

    fetch("https://palee-backend.onrender.com/api/regisdetail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(regisdetail),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data inserted successfully", data);
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
      });
  });
}

function insertPayment() {
  const payment = {
    regisID: document.querySelector('input[name="regisID"]').value,
    amount: document.getElementById("total").value,
    pay: 0,
    pend: document.getElementById("total").value,
    date: new Date().toISOString().split("T")[0],
  };
  fetch("https://palee-backend.onrender.com/api/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payment),
  });
  Swal.fire({
    icon: "success",
    title: "ລົງທະບຽນສຳເລັດແລ້ວ",
    text: "ເຮົາໄດ້ບັນທຶກຂໍ້ມູນຂອງທ່ານໄວ້ແລ້ວ",
    confirmButtonText: "ຢືນຢັນ",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "index.html";
    }
  });
}
