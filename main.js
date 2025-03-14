// Login & Signup Validation and Redirection

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const signupButton = document.getElementById("entMainBtn");
  const signinLink = document.getElementById("signinLink");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      handleLogin();
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();
      handleSignup();
    });
  }

  if (signupButton) {
    signupButton.addEventListener("click", function (event) {
      event.preventDefault();
      handleSignup();
    });
  }

  if (signinLink) {
    signinLink.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "sing_in.html";
    });
  }
});

function handleLogin() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (email && password) {
    window.location.href = "admin_main.html";
  } else {
    showError("loginError", "Please fill in both email and password fields.");
  }
}

function handleSignup() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email && password) {
    window.location.href = "admin_main.html";
  } else {
    showError("signupError", "Please fill in both email and password fields.");
  }
}

function showError(id, message) {
  const errorElement = document.getElementById(id);
  if (errorElement) {
    errorElement.innerText = message;
    errorElement.classList.remove("hidden");
  }
}

// Student Management
const students = [];
const studentTable = document.getElementById("studentTable");
const studentModal = document.getElementById("studentModal");
const addStudentBtn = document.getElementById("addStudentBtn");
const closeModal = document.getElementById("closeModal");
const saveStudent = document.getElementById("saveStudent");

if (addStudentBtn) {
  addStudentBtn.addEventListener("click", () => studentModal.classList.remove("hidden"));
}
if (closeModal) {
  closeModal.addEventListener("click", () => studentModal.classList.add("hidden"));
}
if (saveStudent) {
  saveStudent.addEventListener("click", () => {
    const name = document.getElementById("studentName").value;
    const email = document.getElementById("studentEmail").value;
    const phone = document.getElementById("studentPhone").value;
    
    if (name && email && phone) {
      students.push({ name, email, phone });
      renderStudents();
      studentModal.classList.add("hidden");
    } else {
      showError("studentError", "Please fill in all fields.");
    }
  });
}

function renderStudents() {
  if (studentTable) {
    studentTable.innerHTML = "";
    students.forEach((student, index) => {
      studentTable.innerHTML += `
        <tr class="border-b">
          <td class="p-3">${student.name}</td>
          <td class="p-3">${student.email}</td>
          <td class="p-3">${student.phone}</td>
          <td class="p-3">
            <button onclick="deleteStudent(${index})" class="text-red-500">🗑</button>
          </td>
        </tr>
      `;
    });
  }
}

function deleteStudent(index) {
  students.splice(index, 1);
  renderStudents();
}

// Logout
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.getElementById("entMainBtn");
  const signinBtn = document.querySelector("#signinForm button");
  
  // SIGN UP - Foydalanuvchini localStorage-ga saqlash
  if (signupBtn) {
    signupBtn.addEventListener("click", (e) => {
      e.preventDefault(); // Sahifa yangilanishining oldini olamiz

      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;

      if (!email || !password) {
        alert("Iltimos, barcha maydonlarni to'ldiring!");
        return;
      }

      let user = { email, password };
      localStorage.setItem("adminUser", JSON.stringify(user)); // Foydalanuvchini saqlaymiz
      alert("Ro‘yxatdan muvaffaqiyatli o‘tdingiz. Endi kiring!");
      window.location.href = "sing_in.html"; // Login sahifasiga yo'naltiramiz
    });
  }

  // SIGN IN - LocalStorage-dagi foydalanuvchini tekshirish
  if (signinBtn) {
    signinBtn.addEventListener("click", (e) => {
      e.preventDefault(); // Sahifa yangilanishining oldini olamiz

      let login = document.getElementById("login").value;
      let password = document.getElementById("password").value;

      let savedUser = JSON.parse(localStorage.getItem("adminUser")); // LocalStorage-dan userni olish

      if (!savedUser) {
        alert("Iltimos, avval ro‘yxatdan o‘ting!");
        return;
      }

      if (login === savedUser.email && password === savedUser.password) {
        alert("Tizimga muvaffaqiyatli kirdingiz!");
        localStorage.setItem("isLoggedIn", "true"); // Auth flag qo'shish
        window.location.href = "admin_main.html"; // Admin sahifasiga o'tkazish
      } else {
        alert("Login yoki parol noto‘g‘ri!");
      }
    });
  }

  // ADMIN PAGE - Auth tekshirish (Agar login qilinmagan bo‘lsa, Sign In sahifasiga qaytarish)
  if (window.location.pathname.includes("./pages/admin_main.html")) {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      alert("Iltimos, avval tizimga kiring!");
      window.location.href = "sing_in.html";
    }
  }
});




// Login & Signup Validation and Redirection

document.addEventListener("DOMContentLoaded", function () {
  const signupButton = document.getElementById("entMainBtn");
  const signinLink = document.getElementById("signinLink");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  if (signupButton) {
    signupButton.addEventListener("click", function (event) {
      event.preventDefault(); // Formning asl yuborilishini to'xtatish
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (email && password) {
        window.location.href = "admin_main.html"; // Foydalanuvchini admin_main.html sahifasiga yo'naltirish
      } else {
        alert("Please fill in both email and password fields.");
      }
    });
  }

  if (signinLink) {
    signinLink.addEventListener("click", function (event) {
      event.preventDefault(); // Havolaning asl harakatini to'xtatish
      window.location.href = "sign_in.html"; // Foydalanuvchini sign_in.html sahifasiga yo'naltirish
    });
  }
});












// Global variables
const adminUsername = "admin";
const adminPassword = "admin123";

// Utility function to get local storage data
const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

// Utility function to set local storage data
const setLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// Signup function
const signup = (event) => {
    event.preventDefault();
    let username = document.getElementById("signup-username").value;
    let password = document.getElementById("signup-password").value;
    let users = getLocalStorage("users");
    
    if (users.some(user => user.username === username)) {
        return alert("Username already exists!");
    }
    
    users.push({ username, password });
    setLocalStorage("users", users);
    alert("Signup successful! You can now log in.");
    document.getElementById("signup-form").reset();
};

// Login function
const login = (event) => {
    event.preventDefault();
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;
    let users = getLocalStorage("users");
    
    if (username === adminUsername && password === adminPassword) {
        alert("Admin login successful!");
        window.location.href = "admin-dashboard.html";
        return;
    }
    
    let user = users.find(user => user.username === username && user.password === password);
    if (user) {
        alert("Login successful!");
        window.location.href = "user-dashboard.html";
    } else {
        alert("Invalid credentials!");
    }
};

// Event Listeners
document.getElementById("signup-btn")?.addEventListener("click", signup);
document.getElementById("login-btn")?.addEventListener("click", login);


document.addEventListener("DOMContentLoaded", function () {
// Sign Up Page
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    document.getElementById("entMainBtn").addEventListener("click", function () {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        
        if (email && password) {
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password);
            alert("Successfully signed up! Now you can sign in.");
            window.location.href = "./pages/sign_in.html";
        } else {
            alert("Please fill in all fields.");
        }
    });
}

// Sign In Page
const signinForm = document.getElementById("signinForm");
if (signinForm) {
    signinForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const login = document.getElementById("login").value;
        const password = document.getElementById("password").value;
        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userPassword");
        
        if (login === storedEmail && password === storedPassword) {
            alert("Successfully signed in!");
            window.location.href = "../pages/admin_main.html";
        } else {
            alert("Invalid login or password.");
        }
    });
}

// Admin Main Page
const addStudentBtn = document.getElementById("addStudentBtn");
const studentModal = document.getElementById("studentModal");
const closeModal = document.getElementById("closeModal");
const saveStudent = document.getElementById("saveStudent");
const studentTable = document.getElementById("studentTable");

if (addStudentBtn) {
    addStudentBtn.addEventListener("click", function () {
        studentModal.classList.remove("hidden");
    });
}

if (closeModal) {
    closeModal.addEventListener("click", function () {
        studentModal.classList.add("hidden");
    });
}

if (saveStudent) {
    saveStudent.addEventListener("click", function () {
        const name = document.getElementById("studentName").value;
        const email = document.getElementById("studentEmail").value;
        const phone = document.getElementById("studentPhone").value;
        
        if (name && email && phone) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class='p-3'>${name}</td>
                <td class='p-3'>${email}</td>
                <td class='p-3'>${phone}</td>
                <td class='p-3'><button class='bg-red-500 text-white px-2 py-1 rounded delete-btn'>Delete</button></td>
            `;
            studentTable.appendChild(row);
            
            row.querySelector(".delete-btn").addEventListener("click", function () {
                row.remove();
            });
            
            studentModal.classList.add("hidden");
        } else {
            alert("Please fill in all fields.");
        }
    });
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



document.addEventListener("DOMContentLoaded", function () {
const studentTable = document.getElementById("studentTable");
const addStudentBtn = document.getElementById("addStudentBtn");
const studentModal = document.getElementById("studentModal");
const closeModal = document.getElementById("closeModal");
const saveStudent = document.getElementById("saveStudent");

const studentName = document.getElementById("studentName");
const studentEmail = document.getElementById("studentEmail");
const studentPhone = document.getElementById("studentPhone");

let students = [];
let editIndex = null;

// Modal ochish (yangi student qo'shish)
addStudentBtn.addEventListener("click", function () {
    studentName.value = "";
    studentEmail.value = "";
    studentPhone.value = "";
    editIndex = null;
    studentModal.classList.remove("hidden");
});

// Modalni yopish
closeModal.addEventListener("click", function () {
    studentModal.classList.add("hidden");
});

// Student qo'shish yoki tahrirlash
saveStudent.addEventListener("click", function () {
    const name = studentName.value.trim();
    const email = studentEmail.value.trim();
    const phone = studentPhone.value.trim();

    if (name && email && phone) {
        if (editIndex !== null) {
            students[editIndex] = { name, email, phone };
            editIndex = null;
        } else {
            students.push({ name, email, phone });
        }
        renderStudents();
        studentModal.classList.add("hidden");
    }
});

// Jadvalni yangilash
function renderStudents() {
    studentTable.innerHTML = "";
    students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.className = "border-b";

        row.innerHTML = `
            <td class="p-3">${student.name}</td>
            <td class="p-3">${student.email}</td>
            <td class="p-3">${student.phone}</td>
            <td class="p-3">
                <button class="edit-btn px-2 py-1 bg-blue-500 text-white rounded-md" data-index="${index}">Edit</button>
                <button class="delete-btn px-2 py-1 bg-red-500 text-white rounded-md" data-index="${index}">Delete</button>
            </td>
        `;

        studentTable.appendChild(row);
    });

    // Edit tugmasi
    document.querySelectorAll(".edit-btn").forEach((button) => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            editIndex = index;
            studentName.value = students[index].name;
            studentEmail.value = students[index].email;
            studentPhone.value = students[index].phone;
            studentModal.classList.remove("hidden");
        });
    });

    // Delete tugmasi
    document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            students.splice(index, 1);
            renderStudents();
        });
    });
}
});
