function getNextRegisID() {
    fetch("https://palee-backend.onrender.com/api/bill")
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("regisID").value = data.nextBillID;
        })
        .catch((error) => {
            console.error("Error fetching regis ID:", error);
            document.getElementById("regisID").value = "Error fetching regis ID";
        });
}
window.onload = function() {
    getNextRegisID();
}
