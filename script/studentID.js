function getNextStudentID() {
    fetch("http://localhost:3000/api/students")
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("studentID").value = data.nextStudentID;
        })
        .catch((error) => {
            console.error("Error fetching student ID:", error);
            document.getElementById("studentID").value = "Error fetching student ID";
        });
}

function getGenderOptions() {
    fetch("http://localhost:3000/api/gender")
        .then((response) => response.json())
        .then((data) => {
            const genderSelect = document.getElementById("gender");
            genderSelect.innerHTML = "";

            const defaultOption = document.createElement("option");
            defaultOption.text = "ກະລຸນາເລືອກ";
            genderSelect.add(defaultOption);

            data.forEach((gender) => {
                const option = document.createElement("option");
                option.value = gender.sexID;
                option.text = gender.sex;
                genderSelect.add(option);
            });
        })
        .catch((error) => {
            console.error("Error fetching gender options:", error);
            const genderSelect = document.getElementById("gender");
            genderSelect.innerHTML = "<option>ກະລຸນາເລືອກ</option>"; // Set a default option in case of error
        });
}

function getdistrictOptions() {
    fetch("http://localhost:3000/api/district")
        .then((response) => response.json())
        .then((data) => {
            const districtSelect = document.getElementById("district");
            districtSelect.innerHTML = "";

            const defaultOption = document.createElement("option");
            defaultOption.text = "ກະລຸນາເລືອກ";
            districtSelect.add(defaultOption);

            data.forEach((district) => {
                const option = document.createElement("option");
                option.value = district.districtID;
                option.text = district.districtName + "--" + district.provinceName;
                districtSelect.add(option);
            });
        })
        .catch((error) => {
            console.error("Error fetching district options:", error);
            const districtSelect = document.getElementById("district");
            districtSelect.innerHTML = "<option>ກະລຸນາເລືອກ</option>"; // Set a default option in case of error
        });
}

function getstayOptions() {
    fetch("http://localhost:3000/api/stay")
        .then((response) => response.json())
        .then((data) => {
            const staySelect = document.getElementById("stay");
            staySelect.innerHTML = "";

            const defaultOption = document.createElement("option");
            defaultOption.text = "ກະລຸນາເລືອກ";
            staySelect.add(defaultOption);

            data.forEach((stay) => {
                const option = document.createElement("option");
                option.value = stay.stay_id;
                option.text = stay.stay;
                staySelect.add(option);
            });
        })
        .catch((error) => {
            console.error("Error fetching stay options:", error);
            const staySelect = document.getElementById("stay");
            staySelect.innerHTML = "<option>ກະລຸນາເລືອກ</option>"; // Set a default option in case of error
        });
}
window.onload = function() {
    getNextStudentID();
    getGenderOptions();
    getdistrictOptions();
    getstayOptions();
};