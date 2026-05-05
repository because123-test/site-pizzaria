let saldo = 1000;

function atualizarSaldo() {
  document.getElementById("saldo").innerText = saldo;
}

function mostrar(id) {
  document.querySelectorAll(".tela").forEach(t => t.style.display = "none");
  document.getElementById(id).style.display = "block";
}

mostrar("home");

// 🎡 Roleta
function jogarRoleta() {
  let valor = Number(document.getElementById("valorRoleta").value);
  let cor = document.getElementById("cor").value;

  if (valor > saldo) return alert("Saldo insuficiente");

  saldo -= valor;

  let resultado = Math.random() > 0.5 ? "vermelho" : "preto";

  if (resultado === cor) {
    saldo += valor * 2;
    resRoleta.innerText = "🔥 Ganhou!";
  } else {
    resRoleta.innerText = "❌ Perdeu!";
  }

  atualizarSaldo();
}

// 🃏 Blackjack
let jogador = 0;
let dealer = 0;
let jogando = false;

function carta() {
  return Math.floor(Math.random() * 11) + 1;
}

function iniciarBlackjack() {
  jogador = carta() + carta();
  dealer = carta();
  jogando = true;
  bjStatus.innerText = "Você: " + jogador;
}

function comprar() {
  if (!jogando) return;

  jogador += carta();

  if (jogador > 21) {
    saldo -= 50;
    bjStatus.innerText = "Estourou!";
    jogando = false;
  } else {
    bjStatus.innerText = "Você: " + jogador;
  }

  atualizarSaldo();
}

function parar() {
  if (!jogando) return;

  while (dealer < 17) dealer += carta();

  if (dealer > 21 || jogador > dealer) {
    saldo += 50;
    bjStatus.innerText = "🔥 Ganhou!";
  } else {
    saldo -= 50;
    bjStatus.innerText = "❌ Perdeu!";
  }

  jogando = false;
  atualizarSaldo();
}

// 🎰 Slot
function girarSlot() {
  if (saldo < 20) return alert("Sem saldo");

  saldo -= 20;

  let a = Math.floor(Math.random() * 3);
  let b = Math.floor(Math.random() * 3);
  let c = Math.floor(Math.random() * 3);

  if (a === b && b === c) {
    saldo += 100;
    slotRes.innerText = "🔥 JACKPOT!";
  } else {
    slotRes.innerText = "❌ Tente novamente";
  }

  atualizarSaldo();
}

atualizarSaldo();