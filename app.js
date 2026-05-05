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
  if (valor <= 0) return;

  saldo += valor;
  atualizar();
}

// nova raspadinha
function nova() {
  if (saldo < 10) {
    alert("Saldo insuficiente");
    return;
  }

  saldo -= 10;
  atualizar();

  // camada de raspagem
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#aaa";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // prêmio
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

  document.getElementById("res").innerText = "Raspe o cartão";
}

function desenhar(txt, cor) {
  ctx.fillStyle = cor;
  ctx.font = "28px Arial";
  ctx.fillText(txt, 70, 80);
}

// eventos
canvas.addEventListener("mousedown", () => raspando = true);
canvas.addEventListener("mouseup", finalizar);
canvas.addEventListener("mouseleave", () => raspando = false);

canvas.addEventListener("mousemove", raspar);

// mobile
canvas.addEventListener("touchstart", () => raspando = true);
canvas.addEventListener("touchend", finalizar);
canvas.addEventListener("touchmove", (e) => raspar(e.touches[0]));

function raspar(e) {
  if (!raspando) return;

  let rect = canvas.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, 15, 0, Math.PI * 2);
  ctx.fill();
}

function finalizar() {
  raspando = false;

  if (premio > 0) {
    saldo += premio;
    document.getElementById("res").innerText = "🔥 Ganhou R$" + premio;
  } else {
    document.getElementById("res").innerText = "❌ Tente novamente";
  }

  atualizar();
}

atualizar();