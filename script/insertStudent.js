document .querySelector("#addStudentForm") .addEventListener("submit", function(event) { event.preventDefault();

    if (!validateForm(event)) return;
    
        const formData = {
            studentID: document.querySelector('input[name="studentID"]').value,
            studentName: document.querySelector('input[name="studentName"]').value,
            studentLastname: document.querySelector('input[name="studentLastname"]')
                .value,
            gender: document.querySelector('select[name="gender"]').value,
            tel: document.querySelector('input[name="tel"]').value,
            phone: document.querySelector('input[name="phone"]').value,
            school: document.querySelector('input[name="school"]').value,
            district: document.querySelector('select[name="district"]').value,
            stayID: document.querySelector('select[name="stayID"]').value,
        };
    
        fetch("https://palee-backend.onrender.com/api/add-student", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Student added successfully!") {
                    localStorage.setItem("studentID", formData.studentID);
                    let x = 0;
                    if (formData.stayID === "2") {
                        x = 200000;
                    }
                    localStorage.setItem("stayValue", x.toString());
                    window.location.href = "register.html";
                }
                 else if (data.message === "Male dorm full") {
                    Swal.fire({
                        icon: "warning",
                        title: "ຕ້ອງຂໍອະໄພດ້ວຍ",
                        text: "ຫໍພັກໃນຂອງພວກເຮົາ(ຫໍພັກຊາຍເຕັມແລ້ວ)",
                    });
                }
                else if (data.message === "FeMale dorm full") {
                    Swal.fire({
                        icon: "warning",
                        title: "ຕ້ອງຂໍອະໄພດ້ວຍ",
                        text: "ຫໍພັກໃນຂອງພວກເຮົາ(ຫໍພັກຍິງເຕັມແລ້ວ)",
                    });
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "ບັນຫາການລົງທະບຽນຊໍ້າກັນ",
                        text: "ລອງໃໝ່ອີກຄັ້ງ",
                    });
                    window.location.reload();
                }
            })
            
            .catch((err) => {
                console.error("Error adding student:", err);
                Swal.fire({
                    icon: "error",
                    title: "ບັນຫາ",
                    text: "ມີບັນຫາທາງເຊີເວີ",
                });
            });
    });
    
    
