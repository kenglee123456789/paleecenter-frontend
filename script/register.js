document.addEventListener("DOMContentLoaded", function () {
    fetch("https://palee-backend.onrender.com/api/subject")
      .then((response) => response.json())
      .then((data) => {
        const tableBody = document.getElementById("tableBody");
        data.forEach((subject) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${subject.subDetailID}</td>
            <td>${subject.subName}-${subject.level}</td>
            <td>${subject.cost.toLocaleString()}</td>
            <td><a href="#" class="btn btn-success fas fa-add"></a></td>
          `;
          tableBody.appendChild(row);
  
          row.querySelector("a").addEventListener("click", function (event) {
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
              (row) => row.querySelector("td").textContent === subject.subDetailID
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
            newRow.innerHTML = `
              <td>${subject.subDetailID}</td>
              <td>${subject.subName}-${subject.level}</td>
              <td>${subject.cost}</td>
              <td><a href="#" class="btn btn-danger fas fa-times"></a></td>
            `;
  
            tableDetail.appendChild(newRow);
            updateTotal();
  
            newRow.querySelector("a").addEventListener("click", function (e) {
              e.preventDefault();
              tableDetail.removeChild(newRow);
              updateTotal();
            });
          });
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  
    document.getElementById("searchInput").addEventListener("input", function (event) {
      const searchQuery = event.target.value.toLowerCase();
      const rows = document.querySelectorAll("#tableBody tr");
  
      rows.forEach((row) => {
        let rowText = "";
        row.querySelectorAll("td").forEach((cell) => {
          rowText += cell.textContent.toLowerCase();
        });
        row.style.display = rowText.includes(searchQuery) ? "" : "none";
      });
    });
  });
  
  function updateTotal() {
    const rows = document.querySelectorAll("#tableDetail tr");
    let total = 0;
    rows.forEach((row) => {
      const costCell = row.querySelectorAll("td")[2];
      if (costCell) total += parseFloat(costCell.textContent);
    });
    const stayValue = parseInt(document.getElementById("stayID").value) || 0;
    total += stayValue;
    document.getElementById("total").value = total.toFixed(0);
  }
  
  document.getElementById("save").addEventListener("click", async function (event) {
    event.preventDefault();
  
    const rows = document.querySelectorAll("#tableDetail tr");
    if (rows.length === 0) {
      return Swal.fire({
        icon: "warning",
        title: "ທ່ານຍັງບໍ່ທັນເພີ່ມວິຊາຮຽນ",
        text: "ກະລຸນາເພີ່ມວິຊາກ່ອນທີ່ຈະບັນທຶກ",
      });
    }
  
    let total = 0;
    const stayValue = parseInt(document.getElementById("stayID").value) || 0;
  
    let billContent = `<div style="text-align:center; font-size: 14px; font-weight: bold;">
      <img src="./image/palee_logo.jpg" alt="" style="width: 100px; height: 100px;border-radius: 50%" class="border border-5 border-dark mb-3">
      <h4 class="fw-bold mb-3">ໃບບິນລົງທະບຽນ</h4>
      <h6 class="fw-bold text-primary">ລະຫັດໃບບິນ: ${document.getElementById("regisID").value}</h6>
      <h6 class="fw-bold text-success">ລະຫັດນັກຮຽນ: ${studentID}</h6>
      </div>
      <table class="table shadow-lg" style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px">
        <thead>
          <tr class="bg-primary text-white">
            <th>ລະຫັດວິຊາ</th>
            <th>ວິຊາ ແລະ ລະດັບ</th>
            <th>ລາຄາ</th>
          </tr>
        </thead><tbody>`;
  
    rows.forEach((row) => {
      const idCell = row.querySelector("td");
      const nameCell = row.querySelectorAll("td")[1];
      const costCell = row.querySelectorAll("td")[2];
  
      const cost = parseFloat(costCell.textContent);
      total += cost;
  
      const formattedCost = cost.toLocaleString();
      billContent += `
        <tr class="fw-bold">
          <td>${idCell.textContent}</td>
          <td>${nameCell.textContent}</td>
          <td>${formattedCost}</td>
        </tr>`;
    });
  
    total += stayValue;
    billContent += `</tbody></table>`;
  
    if (stayValue > 0) {
      billContent += `<div style="text-align: right;"><h6 class="fw-bold">ຄ່ານອນຫໍພັກໃນແມ່ນ: ${stayValue.toLocaleString()} ກີບ</h6></div>`;
    }
  
    billContent += `
      <div style="text-align: right;"><h6 class="fw-bold">ລວມເງິນທັງໝົດ: ${total.toLocaleString()} ກີບ</h6></div>
      <div style="text-align: center;"><h6 class="text-danger fw-bold">ຢ່າລືມແຄັບຈໍໄວ້ເປັນຫຼັກຖານ</h6></div>
      <div style="text-align: center;"><h6 class="text-danger fw-bold">ໃຫ້ຖືບິນມາຈ່າຍຄ່າຮຽນທີ່ສູນ</h6></div>
      <div style="text-align: center;"><h5 class="text-success fw-bold">ຕິດຕໍ່: 02054337787</h5></div>
      <div style="text-align: center;"><h5 class="text-success fw-bold">ຫຼື: 02055061124</h5></div>
      <div style="text-align: center;"><h6 class="text-primary fw-bold">ສະຖານທີ່: ບ້ານ ໜອງວຽງຄຳ(ໃກ້ຫໍພັກຊີເກມ ມຊ), ເມືອງ ໄຊທານີ, ແຂວງ ນະຄອນຫຼວງວຽງຈັນ</h6></div>`;
  
    const result = await Swal.fire({
      html: billContent,
      showCancelButton: true,
      confirmButtonText: "ບັນທຶກ",
      cancelButtonText: "ຍົກເລີກ",
      customClass: { title: "swal-title-custom" },
    });
  
    if (result.isConfirmed) {
      Swal.fire({
        title: "ກຳລັງສົ່ງຂໍ້ມູນ...",
        text: "ກະລຸນາລໍຖ້າ",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => Swal.showLoading(),
      });
  
      try {
        await insertRegistration();
        await insertRegisdetail();
        await insertPayment();
  
        Swal.close();
  
        Swal.fire({
          icon: "success",
          title: "ລົງທະບຽນສຳເລັດແລ້ວ",
          text: "ເຮົາໄດ້ບັນທຶກຂໍ້ມູນຂອງທ່ານໄວ້ແລ້ວ",
        }).then(() => (window.location.href = "index.html"));
  
        const tempContainer = document.createElement("div");
        tempContainer.style.width = "368px";
        tempContainer.style.height = "642px";
        tempContainer.style.padding = "10px";
        tempContainer.style.backgroundColor = "white";
        tempContainer.innerHTML = billContent;
        document.body.appendChild(tempContainer);
  
        html2canvas(tempContainer, {
          width: 368,
          height: 642,
          scale: 2,
        }).then((canvas) => {
          const link = document.createElement("a");
          link.download = `bill_${document.getElementById("regisID").value}.png`;
          link.href = canvas.toDataURL("image/png");
          link.click();
  
          document.body.removeChild(tempContainer);
        });
      } catch (err) {
        console.error("Registration failed", err);
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "ຂໍອະໄພ",
          text: "ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ ກະລຸນາລອງໃໝ່",
        });
        window.location.reload();
      }
    }
  });
  
  async function insertRegistration() {
    const registration = {
      regisID: document.querySelector('input[name="regisID"]').value,
      stdID: studentID,
      date: new Date().toISOString().split("T")[0],
    };
  
    const res = await fetch("https://palee-backend.onrender.com/api/registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registration),
    });
  
    if (!res.ok) throw new Error("Registration failed");
  }
  
  async function insertRegisdetail() {
    const rows = document.querySelectorAll("#tableDetail tr");
  
    for (const row of rows) {
      const regisdetail = {
        regisID: document.querySelector('input[name="regisID"]').value,
        subject: row.querySelector("td").textContent,
        scholarship: "1",
        Cost: row.querySelectorAll("td")[2].textContent,
      };
  
      const res = await fetch("https://palee-backend.onrender.com/api/regisdetail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regisdetail),
      });
  
      if (!res.ok) throw new Error("RegisDetail failed");
    }
  }
  
  async function insertPayment() {
    const payment = {
      regisID: document.querySelector('input[name="regisID"]').value,
      amount: document.getElementById("total").value,
      pay: 0,
      pend: document.getElementById("total").value,
      date: new Date().toISOString().split("T")[0],
    };
  
    const res = await fetch("https://palee-backend.onrender.com/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payment),
    });
  
    if (!res.ok) throw new Error("Payment failed");
  }
  
