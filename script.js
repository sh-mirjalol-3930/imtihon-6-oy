// Login & Signup Validation and Redirection

document.addEventListener("DOMContentLoaded", function () {
  const signupButton = document.getElementById("entMainBtn");
  const signinLink = document.getElementById("signinLink");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  if (signupButton) {
    signupButton.addEventListener("click", function (event) {
      event.preventDefault();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (email && password) {
        window.location.href = "admin_main.html";
      }
    });
  }

  if (signinLink) {
    signinLink.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "sign_in.html";
    });
  }

  // Student Management
  const students = [];
  const studentTable = document.getElementById("studentTable");
  const studentModal = document.getElementById("studentModal");
  const addStudentBtn = document.getElementById("addStudentBtn");
  const closeModal = document.getElementById("closeModal");
  const saveStudent = document.getElementById("saveStudent");

  if (addStudentBtn) {
    addStudentBtn.addEventListener("click", () => {
      document.getElementById("studentName").value = "";
      document.getElementById("studentEmail").value = "";
      document.getElementById("studentPhone").value = "";
      studentModal.classList.remove("hidden");
    });
  }

  if (closeModal) {
    closeModal.addEventListener("click", () => studentModal.classList.add("hidden"));
  }

  if (saveStudent) {
    saveStudent.addEventListener("click", () => {
      const name = document.getElementById("studentName").value.trim();
      const email = document.getElementById("studentEmail").value.trim();
      const phone = document.getElementById("studentPhone").value.trim();

      if (name && email && phone) {
        students.push({ name, email, phone });
        renderStudents();
        studentModal.classList.add("hidden");
      }
    });
  }

  document.getElementById("logoutBtn").addEventListener("click", function () {
    alert("Logging out...");

     window.location.href = "../index.html";
});


  function renderStudents() {
    studentTable.innerHTML = students.map((student, index) => `
      <tr class="border-b">
        <td class="p-3">${student.name}</td>
        <td class="p-3">${student.email}</td>
        <td class="p-3">${student.phone}</td>
        <td class="p-3">
          <button class="edit-btn px-2 py-1 bg-gray-300 text-white rounded-md" data-index="${index}">🖊️</button>
          <button class="delete-btn px-2 py-1 bg-gray-200 text-white rounded-md" data-index="${index}">🗑️</button>
        </td>
      </tr>
    `).join("");

    document.querySelectorAll(".edit-btn").forEach(button => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        document.getElementById("studentName").value = students[index].name;
        document.getElementById("studentEmail").value = students[index].email;
        document.getElementById("studentPhone").value = students[index].phone;
        studentModal.classList.remove("hidden");
      });
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        students.splice(index, 1);
        renderStudents();
      });
    });
  }

  // Logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  // SIGN UP - Foydalanuvchini localStorage-ga saqlash
  if (signupButton) {
    signupButton.addEventListener("click", (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (email && password) {
        localStorage.setItem("adminUser", JSON.stringify({ email, password }));
        window.location.href = "sign_in.html";
      }
    });
  }

  // SIGN IN - LocalStorage-dagi foydalanuvchini tekshirish
  const signinForm = document.getElementById("signinForm");
  if (signinForm) {
    signinForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const login = document.getElementById("login").value.trim();
      const password = document.getElementById("password").value.trim();
      const savedUser = JSON.parse(localStorage.getItem("adminUser"));

      if (savedUser && login === savedUser.email && password === savedUser.password) {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "admin_main.html";
      }
    });
  }

  // ADMIN PAGE - Auth tekshirish
  if (window.location.pathname.includes("admin_main.html")) {
    if (!localStorage.getItem("isLoggedIn")) {
      window.location.href = "sign_in.html";
    }
  }
});



  // Search functionality
  document.getElementById("searchInput").addEventListener("input", function () {
    let filter = this.value.toLowerCase();
    let rows = document.querySelectorAll("#studentTable tr");

    rows.forEach(row => {
        let name = row.cells[0]?.textContent.toLowerCase() || "";
        let email = row.cells[1]?.textContent.toLowerCase() || "";
        let phone = row.cells[2]?.textContent.toLowerCase() || "";

        if (name.includes(filter) || email.includes(filter) || phone.includes(filter)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});