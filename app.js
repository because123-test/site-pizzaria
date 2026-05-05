// LOGIN
function login() {
  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;

  if (!user || !pass) return alert("Preencha tudo");

  localStorage.setItem("user", user);
  if (!localStorage.getItem("saldo")) {
    localStorage.setItem("saldo", 100);
  }

  entrar();
}

function entrar() {
  document.getElementById("login").style.display = "none";
  document.getElementById("app").style.display = "block";
  atualizar();
}

if (localStorage.getItem("user")) entrar();

// SALDO
function atualizar() {
  document.getElementById("saldo").innerText = localStorage.getItem("saldo");
}

// DEPÓSITO
function depositar() {
  let valor = Number(document.getElementById("valorDep").value);
  let saldo = Number(localStorage.getItem("saldo"));

  saldo += valor;
  localStorage.setItem("saldo", saldo);
  atualizar();
}

// RASPADINHA
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let raspando = false;
let premio = 0;

function nova() {
  let saldo = Number(localStorage.getItem("saldo"));

  if (saldo < 10) return alert("Sem saldo");

  saldo -= 10;
  localStorage.setItem("saldo", saldo);
  atualizar();

  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let r = Math.random();

  if (r > 0.8) {
    premio = 100;
    ctx.fillStyle = "gold";
    ctx.font = "30px Arial";
    ctx.fillText("💎 R$100", 80, 80);
  } else if (r > 0.5) {
    premio = 30;
    ctx.fillStyle = "green";
    ctx.fillText("🍀 R$30", 90, 80);
  } else {
    premio = 0;
    ctx.fillStyle = "red";
    ctx.fillText("❌ Nada", 100, 80);
  }

  document.getElementById("res").innerText = "Raspe!";
}

canvas.addEventListener("mousedown", () => raspando = true);
canvas.addEventListener("mouseup", () => {
  raspando = false;

  let saldo = Number(localStorage.getItem("saldo"));

  if (premio > 0) {
    saldo += premio;
    localStorage.setItem("saldo", saldo);
    document.getElementById("res").innerText = "🔥 Ganhou R$" + premio;
  } else {
    document.getElementById("res").innerText = "❌ Perdeu";
  }

  atualizar();
});

canvas.addEventListener("mousemove", (e) => {
  if (!raspando) return;

  let rect = canvas.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  ctx.clearRect(x - 10, y - 10, 20, 20);
});