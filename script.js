let tipBtns = document.querySelectorAll(".btn-tip-amount");
let tipbtnCustom = document.getElementById("custom-tip");
let bill = document.getElementById("bill");
let btnReset = document.getElementById("btn-reset");
let numPeople = document.getElementById("numPeople");
let tip = document.querySelector(".tip-per-person");
let total = document.querySelector(".total-per-person");
let tipPercentage;

let tipBtnsArr = [...tipBtns, tipbtnCustom];

const focusButton = function (btn) {
  for (let i = 0; i < tipBtnsArr.length; i++) {
    if (tipBtnsArr[i].classList.contains("active-btn")) {
      tipBtnsArr[i].classList.replace("active-btn", "btn-tip-amount");
    }
    tipbtnCustom.classList.replace("input-2-focus", "empty");
    tipbtnCustom.value = null;
    btn.classList.replace("btn-tip-amount", "active-btn");
    if (btn.classList.contains("empty")) {
      btn.classList.replace("empty", "input-2-focus");
    }
    tipPercentage = Number(btn.value);
  }
};

bill.addEventListener("keyup", function () {
  calcTip();
  if (bill.value == 0) {
    tip.textContent = `$ 0.00`;
    total.textContent = `$ 0.00`;
  }
});

for (let i = 0; i < tipBtnsArr.length; i++) {
  tipBtnsArr[i].addEventListener("click", function () {
    focusButton(tipBtnsArr[i]);
    calcTip();
  });
}

tipbtnCustom.addEventListener("keyup", function () {
  if (tipbtnCustom.value <= 0) {
    tipbtnCustom.value = null;
    tip.textContent = `$ 0.00`;
  } else {
    tipPercentage = Number(tipbtnCustom.value) / 100;
  }
  calcTip();
});

numPeople.addEventListener("keyup", function () {
  calcTip();
  if (numPeople.value == 0) {
    tip.textContent = `$ 0.00`;
    total.textContent = `$ 0.00`;
  }
});

let calcTip = function () {
  if (tipPercentage != undefined && bill.value != 0 && numPeople.value != 0) {
    let tipPerPerson = (bill.value * tipPercentage) / numPeople.value;
    let totalPerPerson = bill.value / numPeople.value + tipPerPerson;

    function roundNumber(num) {
      return +(Math.round(num + "e+2") + "e-2");
    }

    tip.textContent = `$ ${roundNumber(tipPerPerson)}`;

    total.textContent = `$ ${roundNumber(totalPerPerson)}`;
  }
};

btnReset.addEventListener("click", function () {
  for (let i = 0; i < tipBtnsArr.length; i++) {
    if (tipBtnsArr[i].classList.contains("active-btn")) {
      tipBtnsArr[i].classList.replace("active-btn", "btn-tip-amount");
    } else if (tipBtnsArr[i].classList.contains("input-2-focus")) {
      tipBtnsArr[i].classList.replace("input-2-focus", "empty");
    }
  }

  tip.textContent = `$ 0.00`;
  total.textContent = `$ 0.00`;
  bill.value = null;
  numPeople.value = null;
  tipbtnCustom.value = null;
});
