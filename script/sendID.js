
const studentID = localStorage.getItem("studentID");
if (studentID) {
  document.getElementById("studentID").textContent = studentID;
  document.getElementById("studentIDInput").value = studentID;
} else {
  Swal.fire({
    icon: "error",
    title: "ບັນຫາ",
    text: "ກະລຸນາທົດລອງການລົງທະບຽນໃໝ່.",
  });
}
