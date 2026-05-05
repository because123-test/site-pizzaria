let saldo = 100;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let raspando = false;
let premio = 0;

function atualizar() {
  document.getElementById("saldo").innerText = saldo;
}

function depositar() {
  let valor = Number(document.getElementById("valor").value);
  if (valor > 0) {
    saldo += valor;
    atualizar();
  }
}

function nova() {
  if (saldo < 10) {
    alert("Saldo insuficiente");
    return;
  }

  saldo -= 10;
  atualizar();

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let r = Math.random();

  if (r > 0.85) {
    premio = 200;
    desenhar("💎 R$200", "gold");
  } else if (r > 0.6) {
    premio = 50;
    desenhar("🍀 R$50", "lime");
  } else {
    premio = 0;
    desenhar("❌ Nada", "red");
  }

  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#999";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  document.getElementById("res").innerText = "Raspe para revelar";
}

function desenhar(txt, cor) {
  ctx.fillStyle = cor;
  ctx.font = "28px Arial";
  ctx.fillText(txt, 70, 80);
}

function raspar(x, y) {
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, 18, 0, Math.PI * 2);
  ctx.fill();
}

canvas.addEventListener("mousedown", () => raspando = true);
canvas.addEventListener("mouseup", finalizar);
canvas.addEventListener("mousemove", (e) => {
  if (!raspando) return;
  let rect = canvas.getBoundingClientRect();
  raspar(e.clientX - rect.left, e.clientY - rect.top);
});

canvas.addEventListener("touchstart", () => raspando = true);
canvas.addEventListener("touchend", finalizar);
canvas.addEventListener("touchmove", (e) => {
  let rect = canvas.getBoundingClientRect();
  let t = e.touches[0];
  raspar(t.clientX - rect.left, t.clientY - rect.top);
});

function finalizar() {
  raspando = false;

  if (premio > 0) {
    saldo += premio;
    document.getElementById("res").innerText = "🔥 Você ganhou R$" + premio;
  } else {
    document.getElementById("res").innerText = "❌ Tente novamente";
  }

  atualizar();
}

atualizar();