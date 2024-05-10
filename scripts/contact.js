var members = [
  {
    name: "	Sathwik Reddy",
    email: "	Sathwik1@gmail.com",
    phone: "8826058099",
  },
  {
    name: "Subhankar Banik",
    email: "	Subhankar@gmail.com",
    phone: "1234567890",
  },
  {
    name: "Nikita Mane",
    email: "manenikita@gmail.com",
    phone: "8380806370",
  },
  {
    name: "Venigalla Mohan",
    email: "mohan@gmail.com",
    phone: "8765432109",
  },
  {
    name: "Akash Rajpoot",
    email: "akash@gmail.com",
    phone: "2345678901",
  },
];

var buttons = document.querySelectorAll(".BtN1");

var contactName = document.getElementById("contactName");
var contactEmail = document.getElementById("contactEmail");
var contactPhone = document.getElementById("contactPhone");

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    var index = parseInt(button.getAttribute("data-index"));

    contactName.textContent = "Name: " + members[index].name;
    contactEmail.textContent = "Email: " + members[index].email;
    contactPhone.textContent = "Call / Whatsapp: " + members[index].phone;

    document.getElementById("contactInfo").style.display = "block";
  });
});

let formEl = document.getElementById("fromN");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  alert(
    "Your message has been successfully submitted. We appreciate your interest in our website."
  );
});
// add event to show less data

var btnN = document.getElementById("btnN");
var ulN = document.querySelector(".ulN2");
var aNList = ulN.querySelectorAll("a.aN2");
btnN.addEventListener("click", function () {
  for (var i = 12; i < aNList.length; i++) {
    aNList[i].classList.toggle("hide");
  }
  btnN.textContent =
    btnN.textContent === "Show less-" ? "Show more+" : "Show less-";
});
