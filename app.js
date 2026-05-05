let saldo = 100;

const canvas = document.getElementById("roleta");
const ctx = canvas.getContext("2d");

let angulo = 0;
let girando = false;

// prêmios
const premios = [
  { texto: "R$0", valor: 0, cor: "#444" },
  { texto: "R$10", valor: 10, cor: "green" },
  { texto: "R$50", valor: 50, cor: "blue" },
  { texto: "R$0", valor: 0, cor: "#444" },
  { texto: "R$100", valor: 100, cor: "gold" },
  { texto: "R$0", valor: 0, cor: "#444" }
];

// desenhar roleta
function desenhar() {
  let ang = (Math.PI * 2) / premios.length;

  for (let i = 0; i < premios.length; i++) {
    ctx.beginPath();
    ctx.moveTo(150,150);
    ctx.arc(150,150,150, ang*i + angulo, ang*(i+1)+angulo);
    ctx.fillStyle = premios[i].cor;
    ctx.fill();

    ctx.save();
    ctx.translate(150,150);
    ctx.rotate(ang*i + ang/2 + angulo);
    ctx.fillStyle = "white";
    ctx.fillText(premios[i].texto, 80, 10);
    ctx.restore();
  }
}

// atualizar saldo
function atualizar() {
  document.getElementById("saldo").innerText = saldo;
}

// depositar
function depositar() {
  let valor = Number(document.getElementById("valor").value);
  if (valor > 0) {
    saldo += valor;
    atualizar();
  }
}

// girar roleta
function girar() {
  if (girando) return;

  if (saldo < 10) {
    alert("Sem saldo");
    return;
  }

  saldo -= 10;
  atualizar();

  girando = true;

  let velocidade = Math.random() * 0.3 + 0.3;

  let intervalo = setInterval(() => {
    angulo += velocidade;
    velocidade *= 0.97;

    ctx.clearRect(0,0,300,300);
    desenhar();

    if (velocidade < 0.002) {
      clearInterval(intervalo);
      girando = false;

      let angFinal = (angulo % (Math.PI*2));
      let setor = Math.floor((premios.length - (angFinal / (Math.PI*2)) * premios.length)) % premios.length;

      let premio = premios[setor];

      saldo += premio.valor;
      atualizar();

      document.getElementById("resultado").innerText =
        premio.valor > 0
        ? "🔥 Ganhou " + premio.texto
        : "❌ Não ganhou";
    }

  }, 16);
}

desenhar();
atualizar();