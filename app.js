let saldo = 100;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

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

function nova() {
  if (saldo < 10) {
    alert("Sem saldo!");
    return;
  }

  saldo -= 10;
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

  if (premio > 0) {
    saldo += premio;
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

atualizar();