
"use strict";

const LOGIN_ADMIN = "Adamastor123";
const SENHA_ADMIN = "123456789";
const CHAVE_PEDIDOS = "acai_da_vila_pedidos_v1";
const CHAVE_CONTAS = "acai_da_vila_contas_v1";
const CHAVE_SESSAO = "acai_da_vila_cliente_atual_v1";
const CHAVE_INDICACOES = "acai_da_vila_indicacoes_v1";

const tamanhos = [
  {id:"300",nome:"Pequeno",volume:"300 ml",preco:12,limite:2},
  {id:"500",nome:"Médio",volume:"500 ml",preco:17,limite:4},
  {id:"700",nome:"Grande",volume:"700 ml",preco:22,limite:Infinity},
  {id:"1000",nome:"Família",volume:"1 litro",preco:32,limite:Infinity}
];

const tipos = [
  ["puro","Normal (puro)","🍇"],
  ["chocolate","Com chocolate","🍫"],
  ["branco","Com chocolate branco","🍫"],
  ["morango","Batido com morango","🍓"],
  ["mel","Com mel","🍯"],
  ["banana","Batido com banana","🍌"],
  ["cupuacu","Batido com cupuaçu","🥭"],
  ["maracuja","Batido com maracujá","🍋"],
  ["avela","Batido com avelã","🌰"],
  ["amendoim","Com pasta de amendoim","🥜"],
  ["whey","Açaí Whey","💪"]
].map(([id,nome,emoji])=>({id,nome,emoji}));

const dadosAdicionais = [
  ["Linhaça","Sementes e cereais",2,"🌾"],
  ["Chia","Sementes e cereais",2,"⚫"],
  ["Aveia","Sementes e cereais",2,"🌾"],
  ["Flocos de arroz","Sementes e cereais",2,"🍚"],
  ["Granulado","Doces e crocantes",2,"🍫"],
  ["Balas de goma","Doces e crocantes",2,"🍬"],
  ["Tubetes","Doces e crocantes",2,"🥖"],
  ["Marshmallow","Doces e crocantes",2,"☁️"],
  ["Calda de morango","Caldas",2,"🍓"],
  ["Calda de caramelo","Caldas",2,"🍯"],
  ["Calda de chocolate","Caldas",2,"🍫"],
  ["Morango","Frutas",2.5,"🍓"],
  ["Banana","Frutas",2.5,"🍌"],
  ["Kiwi","Frutas",2.5,"🥝"],
  ["Manga","Frutas",2.5,"🥭"],
  ["Mamão","Frutas",2.5,"🍈"],
  ["Uva","Frutas",2.5,"🍇"],
  ["Salada de frutas","Frutas",2.5,"🍍"],
  ["Uva-passa preta","Frutas",2.5,"🫐"],
  ["Granola","Sementes e cereais",2.5,"🥣"],
  ["Coco ralado","Sementes e cereais",2.5,"🥥"],
  ["Amendoim moído","Sementes e cereais",2.5,"🥜"],
  ["Farinha láctea","Doces e crocantes",2.5,"🥣"],
  ["Ovomaltine","Doces e crocantes",2.5,"🥄"],
  ["Sucrilhos","Doces e crocantes",2.5,"🥣"],
  ["Confete","Doces e crocantes",2.5,"🌈"],
  ["Chocobol","Doces e crocantes",2.5,"🍫"],
  ["Gotas de chocolate","Doces e crocantes",2.5,"🍫"],
  ["Bis branco e preto","Doces e crocantes",2.5,"🍫"],
  ["Ouro Branco","Doces e crocantes",2.5,"🍬"],
  ["Sonho de Valsa","Doces e crocantes",2.5,"🍬"],
  ["Negresco","Doces e crocantes",2.5,"🍪"],
  ["Leite condensado","Cremes e coberturas",2.5,"🥛"],
  ["Paçoca","Doces e crocantes",2.5,"🥜"],
  ["Leite em pó","Cremes e coberturas",2.5,"🥛"],
  ["Suspiro","Doces e crocantes",2.5,"☁️"],
  ["Chantilly","Cremes e coberturas",2.5,"🍦"],
  ["Mousse de chocolate","Cremes e coberturas",2.5,"🍫"],
  ["Mousse de maracujá","Cremes e coberturas",2.5,"🍋"],
  ["Mousse de leite Ninho","Cremes e coberturas",2.5,"🍦"],
  ["Doce de leite","Cremes e coberturas",2.5,"🍯"],
  ["Mel","Cremes e coberturas",2.5,"🍯"],
  ["Leite Ninho","Cremes e coberturas",3.5,"🥛"],
  ["Pasta de amendoim","Cremes e coberturas",3.5,"🥜"],
  ["Leite condensado zero lactose","Zero lactose",3.5,"🥛"],
  ["Leite em pó zero lactose","Zero lactose",3.5,"🥛"],
  ["Creme de cupuaçu","Cremes e coberturas",3.5,"🍨"],
  ["Brigadeiro","Cremes e coberturas",3.5,"🧁"],
  ["Beijinho","Cremes e coberturas",3.5,"🥥"],
  ["Laka","Doces e crocantes",3.5,"🍫"],
  ["Diamante Negro","Doces e crocantes",3.5,"🍫"],
  ["Nozes","Sementes e cereais",3.5,"🌰"],
  ["Whey protein baunilha","Especiais",5,"💪"],
  ["Whey protein coco","Especiais",5,"🥥"],
  ["Whey protein chocolate branco","Especiais",5,"💪"],
  ["Cereja em calda","Caldas",5,"🍒"],
  ["Creme de avelã","Especiais",5,"🍫"],
  ["Ganache de chocolate","Especiais",5,"🍫"],
  ["Kit Kat","Especiais",5,"🍫"],
  ["Kit Kat branco","Especiais",5,"🍫"],
  ["Castanha de caju","Sementes e cereais",5,"🥜"],
  ["Castanha-do-pará","Sementes e cereais",5,"🌰"]
].map(([nome,categoria,preco,emoji],i)=>({
  id:"adicional-"+i,nome,categoria,preco,emoji
}));

const statusPedidos = [
  "Recebido",
  "Em preparo",
  "Pronto para retirada",
  "Saiu para entrega",
  "Concluído",
  "Cancelado"
];

let tamanhoSelecionado = null;
let tipoSelecionado = "puro";
let adicionaisSelecionados = new Set();
let adminLogado = false;

const porId = id => document.getElementById(id);

function escapar(texto) {
  return String(texto ?? "").replace(/[&<>"']/g,c=>({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  })[c]);
}

function dinheiro(valor) {
  return Number(valor || 0).toLocaleString("pt-BR",{
    style:"currency",currency:"BRL"
  });
}

function lerPedidos() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_PEDIDOS) || "[]");
    return Array.isArray(dados) ? dados : [];
  } catch {
    return [];
  }
}

function salvarPedidos(pedidos) {
  try {
    localStorage.setItem(CHAVE_PEDIDOS,JSON.stringify(pedidos));
    return true;
  } catch {
    alert("Não foi possível salvar os pedidos neste navegador.");
    return false;
  }
}

function lerContas() {
  try {
    const contas = JSON.parse(localStorage.getItem(CHAVE_CONTAS) || "[]");
    return Array.isArray(contas) ? contas : [];
  } catch {
    return [];
  }
}

function salvarContas(contas) {
  localStorage.setItem(CHAVE_CONTAS,JSON.stringify(contas));
}

function lerIndicacoes() {
  try {
    const indicacoes = JSON.parse(localStorage.getItem(CHAVE_INDICACOES) || "[]");
    return Array.isArray(indicacoes) ? indicacoes : [];
  } catch {
    return [];
  }
}

function salvarIndicacoes(indicacoes) {
  localStorage.setItem(CHAVE_INDICACOES,JSON.stringify(indicacoes));
}

function clienteAtual() {
  const telefone = localStorage.getItem(CHAVE_SESSAO);
  return lerContas().find(c=>c.telefone===telefone) || null;
}

function atualizarContaSalva(contaAtualizada) {
  const contas = lerContas();
  const indice = contas.findIndex(c=>c.telefone===contaAtualizada.telefone);
  if(indice < 0) return;
  contas[indice] = contaAtualizada;
  salvarContas(contas);
}

function codigoAleatorio(prefixo) {
  let codigo;
  const contas = lerContas();
  do {
    codigo = prefixo + Math.random().toString(36).slice(2,8).toUpperCase();
  } while(contas.some(c=>c.codigoIndicacao===codigo));
  return codigo;
}

function tamanhoAtual() {
  return tamanhos.find(t=>t.id===tamanhoSelecionado) || null;
}

function tipoAtual() {
  return tipos.find(t=>t.id===tipoSelecionado) || tipos[0];
}

function adicionaisAtuais() {
  return dadosAdicionais.filter(a=>adicionaisSelecionados.has(a.id));
}

function limiteAtual() {
  const tamanho = tamanhoAtual();
  return tamanho ? tamanho.limite : 0;
}

function mostrarPagina(nome) {
  const paginas = ["pedido","rastreio","login","admin","conta","carrinho","indicacao"];

  paginas.forEach(p=>{
    const pagina = porId("pagina-"+p);
    if(pagina) pagina.classList.add("escondido");
  });

  if(nome==="admin" && !adminLogado) nome = "login";

  const destino = porId("pagina-"+nome);
  if(destino) destino.classList.remove("escondido");

  if(nome==="admin") renderizarAdmin();
  if(nome==="conta") renderizarConta();
  if(nome==="carrinho") renderizarMeusPedidos();
  if(nome==="indicacao") renderizarIndicacao();

  window.scrollTo({top:0,behavior:"smooth"});
}

function renderizarTamanhos() {
  porId("lista-tamanhos").innerHTML = tamanhos.map(t=>{
    const selecionado = t.id===tamanhoSelecionado;
    const limite = Number.isFinite(t.limite)
      ? `Máximo ${t.limite} adicionais`
      : "Sem limite configurado";

    return `<button type="button" class="opcao ${selecionado?"selecionado":""}" data-tamanho="${t.id}" aria-pressed="${selecionado}">
      <span class="emoji">🥤</span>
      <strong>${t.nome}</strong>
      <small>${t.volume}</small>
      <strong>${dinheiro(t.preco)}</strong>
      <small>${limite}</small>
    </button>`;
  }).join("");

  porId("lista-tamanhos").querySelectorAll("[data-tamanho]").forEach(botao=>{
    botao.addEventListener("click",()=>selecionarTamanho(botao.dataset.tamanho));
  });
}

function selecionarTamanho(id) {
  tamanhoSelecionado = id;

  const limite = limiteAtual();

  while(adicionaisSelecionados.size > limite) {
    adicionaisSelecionados.delete(Array.from(adicionaisSelecionados).pop());
  }

  renderizarTamanhos();
  renderizarAdicionais();
  atualizarResumo();
}

function renderizarTipos() {
  porId("lista-tipos").innerHTML = tipos.map(t=>{
    const selecionado = t.id===tipoSelecionado;

    return `<button type="button" class="opcao ${selecionado?"selecionado":""}" data-tipo="${t.id}" aria-pressed="${selecionado}">
      <span class="emoji">${t.emoji}</span>
      <strong>${escapar(t.nome)}</strong>
    </button>`;
  }).join("");

  porId("lista-tipos").querySelectorAll("[data-tipo]").forEach(botao=>{
    botao.addEventListener("click",()=>{
      tipoSelecionado = botao.dataset.tipo;
      renderizarTipos();
      atualizarResumo();
    });
  });
}

function renderizarAdicionais() {
  const categorias = [...new Set(dadosAdicionais.map(a=>a.categoria))];

  porId("lista-adicionais").innerHTML = categorias.map(categoria=>{
    const itens = dadosAdicionais.filter(a=>a.categoria===categoria);

    return `<div class="grupo">
      <h3>${escapar(categoria)}</h3>
      <div class="grid">${itens.map(a=>{
        const marcado = adicionaisSelecionados.has(a.id);
        const limite = limiteAtual();
        const limiteAtingido = Number.isFinite(limite) && adicionaisSelecionados.size>=limite;
        const desativado = !tamanhoSelecionado || (!marcado && limiteAtingido);

        return `<button type="button" class="opcao ${marcado?"selecionado":""}" data-adicional="${a.id}" aria-pressed="${marcado}" ${desativado?"disabled":""}>
          <span class="emoji">${a.emoji}</span>
          <strong>${escapar(a.nome)}</strong>
          <small>+ ${dinheiro(a.preco)}</small>
        </button>`;
      }).join("")}</div>
    </div>`;
  }).join("");

  porId("lista-adicionais").querySelectorAll("[data-adicional]").forEach(botao=>{
    botao.addEventListener("click",()=>alternarAdicional(botao.dataset.adicional));
  });

  const tamanho = tamanhoAtual();

  if(!tamanho) {
    porId("aviso-limite").textContent = "Escolha o tamanho do copo antes de selecionar adicionais.";
  } else if(Number.isFinite(tamanho.limite)) {
    porId("aviso-limite").textContent = `Copo de ${tamanho.volume}: ${adicionaisSelecionados.size} de ${tamanho.limite} adicionais selecionados.`;
  } else {
    porId("aviso-limite").textContent = `Copo de ${tamanho.volume}: ${adicionaisSelecionados.size} adicionais selecionados.`;
  }
}

function alternarAdicional(id) {
  const adicional = dadosAdicionais.find(a=>a.id===id);
  if(!adicional) return;

  if(adicionaisSelecionados.has(id)) {
    adicionaisSelecionados.delete(id);
    renderizarAdicionais();
    atualizarResumo();
    return;
  }

  if(!tamanhoSelecionado) {
    alert("Escolha o tamanho do copo primeiro.");
    return;
  }

  const limite = limiteAtual();

  if(Number.isFinite(limite) && adicionaisSelecionados.size>=limite) {
    alert(`O copo de ${tamanhoAtual().volume} permite no máximo ${limite} adicionais. Desmarque um para escolher outro.`);
    return;
  }

  adicionaisSelecionados.add(id);
  renderizarAdicionais();
  atualizarResumo();
}

function calcularTotal() {
  return (tamanhoAtual()?.preco || 0) + adicionaisAtuais().reduce((s,a)=>s+a.preco,0);
}

function calcularTaxaEntrega() {
  const bairro = porId("bairro")?.value || "";
  return bairro==="Centro" ? 5 : 10;
}

function atualizarValoresEntrega(subtotal) {
  const taxa = calcularTaxaEntrega();
  const cupom = (porId("cupom-pedido")?.value || "").trim().toUpperCase();
  const cliente = clienteAtual();
  let desconto = 0;

  if(cupom==="PRIMEIRA50" && cliente && !cliente.usouPrimeiraCompra) {
    desconto = subtotal*0.5;
  } else if(cupom==="ACAI GRATIS" && cliente && (cliente.cuponsGratis || 0)>0) {
    desconto = Math.min(subtotal,22);
  }

  const total = Math.max(0,subtotal-desconto)+taxa;

  if(porId("subtotal-produtos")) porId("subtotal-produtos").textContent = dinheiro(subtotal);
  if(porId("valor-desconto")) porId("valor-desconto").textContent = dinheiro(desconto);
  if(porId("taxaEntrega")) porId("taxaEntrega").textContent = dinheiro(taxa);
  if(porId("preco-total")) porId("preco-total").textContent = dinheiro(total);
  if(porId("totalFinal")) porId("totalFinal").textContent = "Total do pedido: "+dinheiro(total);

  return {taxa,desconto,cupom,total};
}

function atualizarResumo() {
  const tamanho = tamanhoAtual();
  const adicionais = adicionaisAtuais();
  const subtotal = calcularTotal();

  porId("resumo-tamanho").textContent = tamanho
    ? `${tamanho.nome} (${tamanho.volume})`
    : "Não escolhido";

  porId("resumo-tipo").textContent = tipoAtual().nome;
  porId("resumo-quantidade").textContent = String(adicionais.length);
  porId("resumo-adicionais").textContent = adicionais.length
    ? adicionais.map(a=>`${a.nome} (${dinheiro(a.preco)})`).join(" · ")
    : "Nenhum adicional selecionado.";

  atualizarValoresEntrega(subtotal);
}

function gerarCodigoPedido() {
  return "ACA"+Math.random().toString(36).slice(2,8).toUpperCase();
}

function validarDadosEntrega() {
  const nome = porId("nome").value.trim();
  const telefone = porId("telefone").value.trim();
  const bairro = porId("bairro").value;

  if(!nome || !telefone || !bairro) {
    alert("Preencha nome, telefone e selecione o bairro.");
    return false;
  }

  if(!/^\d{10,11}$/.test(telefone)) {
    alert("O telefone deve conter somente números, com DDD, e ter 10 ou 11 dígitos.");
    porId("telefone").focus();
    return false;
  }

  return true;
}

function confirmarPedido() {
  porId("confirmacao").innerHTML = "";

  if(!tamanhoAtual()) {
    alert("Escolha o tamanho do copo.");
    return;
  }

  if(!validarDadosEntrega()) return;

  const nome = porId("nome").value.trim();
  const telefone = porId("telefone").value.trim();
  const bairro = porId("bairro").value;
  const tamanho = tamanhoAtual();
  const adicionais = adicionaisAtuais();
  const subtotal = calcularTotal();
  const cliente = clienteAtual();
  const valores = atualizarValoresEntrega(subtotal);

  if(valores.cupom && !cliente) {
    alert("Entre na sua conta para usar cupons.");
    return;
  }

  if(valores.cupom==="PRIMEIRA50" && (!cliente || cliente.usouPrimeiraCompra)) {
    alert("O cupom de primeira compra já foi utilizado ou não está disponível.");
    return;
  }

  if(valores.cupom==="ACAI GRATIS" && (!cliente || !(cliente.cuponsGratis>0))) {
    alert("Você não tem cupom de açaí grátis disponível.");
    return;
  }

  if(valores.cupom && valores.desconto===0) {
    alert("Esse cupom não é válido para sua conta.");
    return;
  }

  const pedido = {
    codigo:gerarCodigoPedido(),
    nome,
    telefone,
    bairro,
    tamanho:{nome:tamanho.nome,volume:tamanho.volume,preco:tamanho.preco},
    tipo:tipoAtual().nome,
    adicionais:adicionais.map(a=>({nome:a.nome,preco:a.preco})),
    observacoes:porId("observacoes").value.trim(),
    subtotal,
    taxaEntrega:valores.taxa,
    desconto:valores.desconto,
    cupom:valores.cupom,
    total:valores.total,
    status:"Recebido",
    data:new Date().toISOString()
  };

  const pedidos = lerPedidos();
  pedidos.unshift(pedido);

  if(!salvarPedidos(pedidos)) return;

  if(cliente && valores.cupom==="PRIMEIRA50") {
    cliente.usouPrimeiraCompra = true;
    atualizarContaSalva(cliente);
  }

  if(cliente && valores.cupom==="ACAI GRATIS") {
    cliente.cuponsGratis = Math.max(0,(cliente.cuponsGratis || 0)-1);
    atualizarContaSalva(cliente);
  }

  porId("codigo-rastreio").value = pedido.codigo;
  porId("confirmacao").innerHTML = `<div class="mensagem">
    <strong>Pedido registrado com sucesso!</strong><br>
    Código: <strong>${escapar(pedido.codigo)}</strong><br>
    Subtotal: <strong>${dinheiro(pedido.subtotal)}</strong><br>
    Desconto: <strong>${dinheiro(pedido.desconto)}</strong><br>
    Entrega: <strong>${dinheiro(pedido.taxaEntrega)}</strong><br>
    Total: <strong>${dinheiro(pedido.total)}</strong><br>
    Guarde o código para consultar o status.
    <button type="button" class="botao largura-total" id="acompanhar-novo">Rastrear meu pedido</button>
  </div>`;

  porId("acompanhar-novo").addEventListener("click",()=>{
    mostrarPagina("rastreio");
    consultarPedido(pedido.codigo);
  });

  adicionaisSelecionados.clear();
  porId("observacoes").value = "";
  porId("cupom-pedido").value = "";
  renderizarAdicionais();
  atualizarResumo();
  renderizarMeusPedidos();
}

function consultarPedido(codigoInformado) {
  const codigo = String(codigoInformado || "").trim().toUpperCase();
  const pedido = lerPedidos().find(p=>String(p.codigo).toUpperCase()===codigo);
  const area = porId("resultado-rastreio");

  if(!codigo) {
    area.innerHTML = '<p class="mensagem erro">Digite o código do pedido.</p>';
    return;
  }

  if(!pedido) {
    area.innerHTML = '<p class="mensagem erro">Pedido não encontrado neste navegador. Verifique o código.</p>';
    return;
  }

  const etapas = statusPedidos.filter(s=>s!=="Cancelado");
  const indice = etapas.indexOf(pedido.status);
  let progresso = "";

  if(pedido.status==="Cancelado") {
    progresso = '<li class="concluido">Pedido cancelado.</li>';
  } else {
    progresso = etapas.map((s,i)=>
      `<li class="${i<=indice?"concluido":""}">${i<=indice?"✓":"○"} ${escapar(s)}</li>`
    ).join("");
  }

  area.innerHTML = `<article class="cartao-pedido">
    <p class="eyebrow">PEDIDO ${escapar(pedido.codigo)}</p>
    <h3>Olá, ${escapar(pedido.nome)}!</h3>
    <p><strong>Tamanho:</strong> ${escapar(pedido.tamanho.nome)} (${escapar(pedido.tamanho.volume)})</p>
    <p><strong>Tipo:</strong> ${escapar(pedido.tipo)}</p>
    <p><strong>Adicionais:</strong> ${pedido.adicionais.length ? pedido.adicionais.map(a=>escapar(a.nome)).join(", ") : "Nenhum"}</p>
    <p><strong>Telefone:</strong> ${escapar(pedido.telefone)}</p>
    <p><strong>Bairro:</strong> ${escapar(pedido.bairro)}</p>
    ${pedido.observacoes?`<p><strong>Observações:</strong> ${escapar(pedido.observacoes)}</p>`:""}
    <p><strong>Subtotal dos produtos:</strong> ${dinheiro(pedido.subtotal)}</p>
    <p><strong>Desconto:</strong> ${dinheiro(pedido.desconto || 0)}</p>
    <p><strong>Taxa de entrega:</strong> ${dinheiro(pedido.taxaEntrega)}</p>
    <p><strong>Total:</strong> ${dinheiro(pedido.total)}</p>
    <p><strong>Status:</strong> ${escapar(pedido.status)}</p>
    <ul class="progresso">${progresso}</ul>
    <small>Pedido registrado em ${new Date(pedido.data).toLocaleString("pt-BR")}</small>
  </article>`;
}

function renderizarAdmin() {
  if(!adminLogado) {
    mostrarPagina("login");
    return;
  }

  const pedidos = lerPedidos();

  porId("stat-total").textContent = pedidos.length;
  porId("stat-andamento").textContent = pedidos.filter(p=>!["Concluído","Cancelado"].includes(p.status)).length;
  porId("stat-concluidos").textContent = pedidos.filter(p=>p.status==="Concluído").length;

  if(!pedidos.length) {
    porId("lista-pedidos-admin").innerHTML = '<p class="mensagem">Nenhum pedido registrado neste navegador.</p>';
    return;
  }

  porId("lista-pedidos-admin").innerHTML = pedidos.map(p=>`
    <article class="cartao-pedido">
      <p class="eyebrow">${escapar(p.codigo)}</p>
      <h3>${escapar(p.nome)} · ${dinheiro(p.total)}</h3>
      <p><strong>Tamanho:</strong> ${escapar(p.tamanho.nome)} (${escapar(p.tamanho.volume)})</p>
      <p><strong>Tipo:</strong> ${escapar(p.tipo)}</p>
      <p><strong>Adicionais:</strong> ${p.adicionais.length ? p.adicionais.map(a=>escapar(a.nome)).join(", ") : "Nenhum"}</p>
      <p><strong>Telefone:</strong> ${escapar(p.telefone)}</p>
      <p><strong>Bairro:</strong> ${escapar(p.bairro)}</p>
      <p><strong>Subtotal:</strong> ${dinheiro(p.subtotal)}</p>
      <p><strong>Desconto:</strong> ${dinheiro(p.desconto || 0)}</p>
      <p><strong>Taxa de entrega:</strong> ${dinheiro(p.taxaEntrega)}</p>
      ${p.observacoes?`<p><strong>Observações:</strong> ${escapar(p.observacoes)}</p>`:""}
      <p><strong>Data:</strong> ${new Date(p.data).toLocaleString("pt-BR")}</p>
      <label for="status-${escapar(p.codigo)}">Status do pedido</label>
      <select id="status-${escapar(p.codigo)}" data-status="${escapar(p.codigo)}">
        ${statusPedidos.map(s=>`<option ${p.status===s?"selected":""}>${escapar(s)}</option>`).join("")}
      </select>
    </article>
  `).join("");

  porId("lista-pedidos-admin").querySelectorAll("[data-status]").forEach(select=>{
    select.addEventListener("change",()=>{
      const todos = lerPedidos();
      const pedido = todos.find(p=>p.codigo===select.dataset.status);
      if(!pedido) return;
      pedido.status = select.value;
      if(salvarPedidos(todos)) {
        renderizarAdmin();
        renderizarMeusPedidos();
      }
    });
  });
}

function sairAdmin() {
  adminLogado = false;
  porId("login-admin").value = "";
  porId("senha-admin").value = "";
  mostrarPagina("pedido");
}

function atualizarBotaoConta() {
  const botao = porId("botao-conta");
  if(!botao) return;
  botao.textContent = clienteAtual() ? "Minha conta" : "Criar conta";
}

function renderizarConta() {
  const cliente = clienteAtual();
  const formulario = porId("form-conta");
  const areaLogin = porId("area-login-cliente");
  const detalhes = porId("detalhes-conta");
  const botaoCadastro = porId("btn-criar-conta");

  atualizarBotaoConta();

  if(cliente) {
    formulario.classList.add("escondido");
    areaLogin.classList.add("escondido");
    if(botaoCadastro) botaoCadastro.classList.add("escondido");

    detalhes.innerHTML = `<div class="mensagem">
      <h2>Olá, ${escapar(cliente.nome)}!</h2>
      <p>Telefone: ${escapar(cliente.telefone)}</p>
      <p>Seu código de indicação:</p>
      <div class="codigo-grande">${escapar(cliente.codigoIndicacao)}</div>
      <button class="botao" type="button" onclick="copiarCodigoIndicacao()">Copiar código</button>
      <p>Indicações válidas: <strong>${cliente.indicacoesValidas || 0}</strong></p>
      <div class="cupom">
        <strong>Cupom de primeira compra</strong>
        <div class="codigo-grande">PRIMEIRA50</div>
        <p>${cliente.usouPrimeiraCompra ? "Seu cupom já foi utilizado." : "50% de desconto nos produtos da primeira compra."}</p>
      </div>
      <p>Cupons de açaí grátis disponíveis: <strong>${cliente.cuponsGratis || 0}</strong></p>
      <button class="botao botao-secundario" type="button" onclick="sairCliente()">Sair da conta</button>
    </div>`;
  } else {
    formulario.classList.remove("escondido");
    areaLogin.classList.remove("escondido");
    if(botaoCadastro) botaoCadastro.classList.remove("escondido");
    detalhes.innerHTML = "";
  }
}

function registrarIndicacao(codigo,telefoneIndicado) {
  const contas = lerContas();
  const dono = contas.find(c=>c.codigoIndicacao===codigo);

  if(!dono || dono.telefone===telefoneIndicado) return false;

  const indicacoes = lerIndicacoes();
  const jaRegistrada = indicacoes.some(i=>i.codigo===codigo && i.telefoneIndicado===telefoneIndicado);

  if(jaRegistrada) return false;

  indicacoes.push({
    codigo,
    telefoneIndicado,
    data:new Date().toISOString()
  });

  salvarIndicacoes(indicacoes);

  dono.indicacoesValidas = (dono.indicacoesValidas || 0)+1;

  if(dono.indicacoesValidas % 5===0) {
    dono.cuponsGratis = (dono.cuponsGratis || 0)+1;
  }

  salvarContas(contas);
  return true;
}

function criarConta(evento) {
  evento.preventDefault();

  const nome = porId("conta-nome").value.trim();
  const telefone = porId("conta-telefone").value.trim();
  const senha = porId("conta-senha").value;
  const codigoAmigo = porId("codigo-amigo").value.trim().toUpperCase();
  const mensagem = porId("mensagem-conta");

  mensagem.className = "mensagem";

  if(!nome || !/^\d{10,11}$/.test(telefone) || !senha) {
    mensagem.className = "mensagem erro";
    mensagem.textContent = "Preencha seu nome, telefone com DDD e senha. Use 10 ou 11 números no telefone.";
    return;
  }

  const contas = lerContas();

  if(contas.some(c=>c.telefone===telefone)) {
    mensagem.className = "mensagem erro";
    mensagem.textContent = "Já existe uma conta com esse telefone. Entre na sua conta abaixo.";
    return;
  }

  if(codigoAmigo && !contas.some(c=>c.codigoIndicacao===codigoAmigo)) {
    mensagem.className = "mensagem erro";
    mensagem.textContent = "O código de indicação informado não foi encontrado.";
    return;
  }

  const conta = {
    nome,
    telefone,
    senha,
    codigoIndicacao:codigoAleatorio("VILA"),
    indicacoesValidas:0,
    cuponsGratis:0,
    indicou:"",
    usouPrimeiraCompra:false,
    criadaEm:new Date().toISOString()
  };

  contas.push(conta);
  salvarContas(contas);
  localStorage.setItem(CHAVE_SESSAO,telefone);

  if(codigoAmigo) {
    conta.indicou = codigoAmigo;
    atualizarContaSalva(conta);
    registrarIndicacao(codigoAmigo,telefone);
  }

  porId("nome").value = nome;
  porId("telefone").value = telefone;

  mensagem.className = "mensagem";
  mensagem.innerHTML = 'Conta criada! Você ganhou o cupom <strong>PRIMEIRA50</strong>, com 50% de desconto na primeira compra.';

  renderizarConta();
  atualizarResumo();
}

function entrarNaConta(evento) {
  evento.preventDefault();

  const telefone = porId("login-cliente-telefone").value.trim();
  const senha = porId("login-cliente-senha").value;
  const conta = lerContas().find(c=>c.telefone===telefone && c.senha===senha);
  const mensagem = porId("mensagem-conta");

  if(!conta) {
    mensagem.className = "mensagem erro";
    mensagem.textContent = "Telefone ou senha incorretos.";
    return;
  }

  localStorage.setItem(CHAVE_SESSAO,telefone);
  porId("nome").value = conta.nome;
  porId("telefone").value = conta.telefone;

  mensagem.className = "mensagem";
  mensagem.textContent = "Você entrou na sua conta.";

  renderizarConta();
  atualizarResumo();
}

function sairCliente() {
  localStorage.removeItem(CHAVE_SESSAO);
  renderizarConta();
  atualizarBotaoConta();
  atualizarResumo();
}

function copiarCodigoIndicacao() {
  const cliente = clienteAtual();
  if(!cliente) return;

  if(navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(cliente.codigoIndicacao)
      .then(()=>alert("Código copiado!"))
      .catch(()=>alert("Seu código é: "+cliente.codigoIndicacao));
  } else {
    alert("Seu código é: "+cliente.codigoIndicacao);
  }
}

function aplicarCodigoIndicacao() {
  const cliente = clienteAtual();
  const codigo = porId("codigo-outra-pessoa").value.trim().toUpperCase();
  const mensagem = porId("mensagem-indicacao");

  if(!cliente) {
    mensagem.className = "mensagem erro";
    mensagem.textContent = "Crie uma conta ou entre na sua conta antes de usar um código.";
    return;
  }

  if(cliente.indicou) {
    mensagem.className = "mensagem erro";
    mensagem.textContent = "Você já usou um código de indicação nesta conta.";
    return;
  }

  if(!codigo) {
    mensagem.className = "mensagem erro";
    mensagem.textContent = "Digite um código de indicação.";
    return;
  }

  const dono = lerContas().find(c=>c.codigoIndicacao===codigo);

  if(!dono) {
    mensagem.className = "mensagem erro";
    mensagem.textContent = "Código não encontrado.";
    return;
  }

  if(dono.telefone===cliente.telefone) {
    mensagem.className = "mensagem erro";
    mensagem.textContent = "Você não pode usar seu próprio código.";
    return;
  }

  cliente.indicou = codigo;
  atualizarContaSalva(cliente);

  if(registrarIndicacao(codigo,cliente.telefone)) {
    mensagem.className = "mensagem";
    mensagem.textContent = "Código registrado com sucesso!";
  } else {
    mensagem.className = "mensagem erro";
    mensagem.textContent = "Esse código já foi registrado.";
  }

  renderizarIndicacao();
  renderizarConta();
}

function renderizarIndicacao() {
  const cliente = clienteAtual();
  const area = porId("painel-indicacao");

  if(!cliente) {
    area.innerHTML = '<p class="mensagem">Crie uma conta ou entre para receber seu código de indicação.</p>';
    return;
  }

  const quantidade = cliente.indicacoesValidas || 0;
  const faltam = 5-(quantidade%5);

  area.innerHTML = `<div class="cupom">
    <p>Seu código de indicação</p>
    <div class="codigo-grande">${escapar(cliente.codigoIndicacao)}</div>
    <button type="button" class="botao" onclick="copiarCodigoIndicacao()">Copiar código</button>
    <p>Indicações válidas: <strong>${quantidade}</strong></p>
    <p>${faltam} indicação(ões) até o próximo açaí grátis.</p>
    <p>Cupons de açaí grátis disponíveis: <strong>${cliente.cuponsGratis || 0}</strong></p>
  </div>`;
}

function renderizarMeusPedidos() {
  const cliente = clienteAtual();
  const area = porId("lista-meus-pedidos");

  if(!cliente) {
    area.innerHTML = '<p class="mensagem">Entre ou crie uma conta para ver seus pedidos.</p>';
    return;
  }

  const pedidos = lerPedidos().filter(p=>p.telefone===cliente.telefone);

  if(!pedidos.length) {
    area.innerHTML = '<p class="mensagem">Você ainda não fez pedidos com esta conta.</p>';
    return;
  }

  area.innerHTML = pedidos.map(p=>`
    <article class="cartao-pedido">
      <p class="eyebrow">PEDIDO ${escapar(p.codigo)}</p>
      <h3>${escapar(p.tamanho.nome)} · ${dinheiro(p.total)}</h3>
      <p><strong>Tipo:</strong> ${escapar(p.tipo)}</p>
      <p><strong>Adicionais:</strong> ${p.adicionais.length ? p.adicionais.map(a=>escapar(a.nome)).join(", ") : "Nenhum"}</p>
      <p><strong>Status:</strong> ${escapar(p.status)}</p>
      <p><strong>Bairro:</strong> ${escapar(p.bairro)}</p>
      <p><strong>Data:</strong> ${new Date(p.data).toLocaleString("pt-BR")}</p>
      <button type="button" class="botao" onclick="mostrarPagina('rastreio');porId('codigo-rastreio').value='${escapar(p.codigo)}';consultarPedido('${escapar(p.codigo)}')">Rastrear pedido</button>
    </article>
  `).join("");
}

function configurarTelefone(id) {
  const campo = porId(id);
  if(!campo) return;

  campo.addEventListener("input",()=>{
    campo.value = campo.value.replace(/\D/g,"").slice(0,11);
  });
}

porId("form-rastreio").addEventListener("submit",evento=>{
  evento.preventDefault();
  consultarPedido(porId("codigo-rastreio").value);
});

porId("form-login").addEventListener("submit",evento=>{
  evento.preventDefault();

  const login = porId("login-admin").value;
  const senha = porId("senha-admin").value;
  const mensagem = porId("mensagem-login");

  if(login===LOGIN_ADMIN && senha===SENHA_ADMIN) {
    adminLogado = true;
    mensagem.textContent = "";
    porId("senha-admin").value = "";
    mostrarPagina("admin");
  } else {
    mensagem.className = "mensagem erro";
    mensagem.textContent = "Login ou senha incorretos.";
  }
});

porId("form-conta").addEventListener("submit",criarConta);
porId("form-login-cliente").addEventListener("submit",entrarNaConta);
porId("cupom-pedido").addEventListener("input",atualizarResumo);
porId("bairro").addEventListener("change",atualizarResumo);

["telefone","conta-telefone","login-cliente-telefone"].forEach(configurarTelefone);

renderizarTamanhos();
renderizarTipos();
renderizarAdicionais();
atualizarBotaoConta();
renderizarConta();
atualizarResumo();
