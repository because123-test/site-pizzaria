let saldo = 100;

const canvas = document.getElementById("roleta");
const ctx = canvas.getContext("2d");

let angulo = 0;
let girando = false;

// multiplicadores (com repetição pra probabilidade)
const setores = [
  {mult:1, cor:"#444"},
  {mult:1, cor:"#555"},
  {mult:2, cor:"green"},
  {mult:1, cor:"#444"},
  {mult:5, cor:"blue"},
  {mult:1, cor:"#555"},
  {mult:2, cor:"green"},
  {mult:10, cor:"purple"},
  {mult:1, cor:"#444"},
  {mult:2, cor:"green"},
  {mult:20, cor:"gold"},
  {mult:1, cor:"#555"}
];

function atualizar() {
  document.getElementById("saldo").innerText = saldo;
}

function depositar() {
  let v = Number(document.getElementById("valor").value);
  if (v > 0) {
    saldo += v;
    atualizar();
  }
}

// desenhar roleta
function desenhar() {
  let ang = (Math.PI*2)/setores.length;

  for(let i=0;i<setores.length;i++){
    ctx.beginPath();
    ctx.moveTo(150,150);
    ctx.arc(150,150,150, ang*i+angulo, ang*(i+1)+angulo);
    ctx.fillStyle = setores[i].cor;
    ctx.fill();

    ctx.save();
    ctx.translate(150,150);
    ctx.rotate(ang*i + ang/2 + angulo);
    ctx.fillStyle = "white";
    ctx.fillText(setores[i].mult+"x", 90, 10);
    ctx.restore();
  }
}

// girar
function girar() {
  if (girando) return;

  if (saldo < 10) {
    alert("Sem saldo");
    return;
  }

  saldo -= 10;
  atualizar();

  girando = true;

  let vel = Math.random()*0.3+0.4;

  let loop = setInterval(()=>{
    angulo += vel;
    vel *= 0.97;

    ctx.clearRect(0,0,300,300);
    desenhar();

    if (vel < 0.002) {
      clearInterval(loop);
      girando = false;

      let angFinal = angulo % (Math.PI*2);
      let setorIndex = Math.floor((setores.length - (angFinal/(Math.PI*2))*setores.length)) % setores.length;

      let mult = setores[setorIndex].mult;
      let ganho = mult * 10;

      saldo += ganho;
      atualizar();

      document.getElementById("res").innerText =
        mult > 1 ? "🔥 Ganhou "+mult+"x (R$"+ganho+")" : "❌ 1x (sem lucro)";
    }

  },16);
}

desenhar();
atualizar();