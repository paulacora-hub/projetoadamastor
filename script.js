"use strict";

const LOGIN_ADMIN = "Adamastor123";
const SENHA_ADMIN = "123456789";
const CHAVE_PEDIDOS = "acai_da_vila_pedidos_v1";

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
  return String(texto ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  })[c]);
}

function dinheiro(valor) {
  return Number(valor).toLocaleString("pt-BR",{
    style:"currency",currency:"BRL"
  });
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
  ["pedido","rastreio","login","admin"].forEach(p=>{
    porId("pagina-"+p).classList.add("escondido");
  });

  if(nome==="admin" && !adminLogado) nome="login";

  porId("pagina-"+nome).classList.remove("escondido");

  if(nome==="admin") renderizarAdmin();

  window.scrollTo({top:0,behavior:"smooth"});
}

function renderizarTamanhos() {
  porId("lista-tamanhos").innerHTML = tamanhos.map(t=>{
    const selecionado=t.id===tamanhoSelecionado;

    const limite=Number.isFinite(t.limite)
      ? `Máximo ${t.limite} adicionais`
      : "Sem limite configurado";

    return `<button type="button" class="opcao ${selecionado?"selecionado":""}"
      data-tamanho="${t.id}" aria-pressed="${selecionado}">
      <span class="emoji">🥤</span>
      <strong>${t.nome}</strong>
      <small>${t.volume}</small>
      <strong>${dinheiro(t.preco)}</strong>
      <small>${limite}</small>
    </button>`;
  }).join("");

  porId("lista-tamanhos").querySelectorAll("[data-tamanho]").forEach(b=>{
    b.addEventListener("click",()=>selecionarTamanho(b.dataset.tamanho));
  });
}

function selecionarTamanho(id) {
  tamanhoSelecionado=id;

  const limite=limiteAtual();

  while(adicionaisSelecionados.size>limite) {
    adicionaisSelecionados.delete(
      Array.from(adicionaisSelecionados).pop()
    );
  }

  renderizarTamanhos();
  renderizarAdicionais();
  atualizarResumo();
}

function renderizarTipos() {
  porId("lista-tipos").innerHTML=tipos.map(t=>{
    const selecionado=t.id===tipoSelecionado;

    return `<button type="button" class="opcao ${selecionado?"selecionado":""}"
      data-tipo="${t.id}" aria-pressed="${selecionado}">
      <span class="emoji">${t.emoji}</span>
      <strong>${t.nome}</strong>
    </button>`;
  }).join("");

  porId("lista-tipos").querySelectorAll("[data-tipo]").forEach(b=>{
    b.addEventListener("click",()=>{
      tipoSelecionado=b.dataset.tipo;
      renderizarTipos();
      atualizarResumo();
    });
  });
}

function renderizarAdicionais() {
  const categorias=[...new Set(dadosAdicionais.map(a=>a.categoria))];

  porId("lista-adicionais").innerHTML=categorias.map(categoria=>{
    const itens=dadosAdicionais.filter(a=>a.categoria===categoria);

    return `<div class="grupo">
      <h3>${escapar(categoria)}</h3>
      <div class="grid">${itens.map(a=>{
        const marcado=adicionaisSelecionados.has(a.id);
        const limite=limiteAtual();

        const limiteAtingido=Number.isFinite(limite) &&
          adicionaisSelecionados.size>=limite;

        const desativado=!tamanhoSelecionado ||
          (!marcado && limiteAtingido);

        return `<button type="button"
          class="opcao ${marcado?"selecionado":""}"
          data-adicional="${a.id}"
          aria-pressed="${marcado}" ${desativado?"disabled":""}>
          <span class="emoji">${a.emoji}</span>
          <strong>${escapar(a.nome)}</strong>
          <small>+ ${dinheiro(a.preco)}</small>
        </button>`;
      }).join("")}</div>
    </div>`;
  }).join("");

  porId("lista-adicionais")
    .querySelectorAll("[data-adicional]")
    .forEach(b=>{
      b.addEventListener("click",()=>{
        alternarAdicional(b.dataset.adicional);
      });
    });

  const tamanho=tamanhoAtual();

  if(!tamanho) {
    porId("aviso-limite").textContent=
      "Escolha o tamanho do copo antes de selecionar adicionais.";
  } else if(Number.isFinite(tamanho.limite)) {
    porId("aviso-limite").textContent=
      `Copo de ${tamanho.volume}: ${adicionaisSelecionados.size} de ${tamanho.limite} adicionais selecionados.`;
  } else {
    porId("aviso-limite").textContent=
      `Copo de ${tamanho.volume}: ${adicionaisSelecionados.size} adicionais selecionados. Nenhum limite foi configurado.`;
  }
}

function alternarAdicional(id) {
  const adicional=dadosAdicionais.find(a=>a.id===id);

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

  const limite=limiteAtual();

  if(Number.isFinite(limite) &&
     adicionaisSelecionados.size>=limite) {
    alert(
      `O copo de ${tamanhoAtual().volume} permite no máximo ${limite} adicionais. Desmarque um para escolher outro.`
    );
    return;
  }

  adicionaisSelecionados.add(id);

  renderizarAdicionais();
  atualizarResumo();
}

function calcularTotal() {
  const base=tamanhoAtual()?.preco || 0;

  return base+adicionaisAtuais().reduce((s,a)=>s+a.preco,0);
}

function atualizarResumo() {
  const tamanho=tamanhoAtual();
  const adicionais=adicionaisAtuais();
  const subtotal=calcularTotal();

  porId("resumo-tamanho").textContent=tamanho
    ? `${tamanho.nome} (${tamanho.volume})`
    : "Não escolhido";

  porId("resumo-tipo").textContent=tipoAtual().nome;

  porId("resumo-quantidade").textContent=String(adicionais.length);

  porId("resumo-adicionais").textContent=adicionais.length
    ? adicionais.map(a=>`${a.nome} (${dinheiro(a.preco)})`).join(" · ")
    : "Nenhum adicional selecionado.";

  porId("preco-total").textContent=dinheiro(subtotal);

  const campoSubtotal=porId("subtotal-produtos");

  if(campoSubtotal) {
    campoSubtotal.textContent=dinheiro(subtotal);
  }

  atualizarValoresEntrega(subtotal);
}

function lerPedidos() {
  try {
    const dados=JSON.parse(
      localStorage.getItem(CHAVE_PEDIDOS)||"[]"
    );

    return Array.isArray(dados)?dados:[];
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

function gerarCodigo() {
  return "ACA"+Math.random().toString(36).slice(2,8).toUpperCase();
}

function confirmarPedido() {
  porId("confirmacao").innerHTML="";

  if(!tamanhoAtual()) {
    alert("Escolha o tamanho do copo.");
    return;
  }

  if(!validarDadosEntrega()) return;

  const nome=porId("nome").value.trim();
  const telefone=porId("telefone").value.trim();
  const bairro=porId("bairro").value.trim();

  const tamanho=tamanhoAtual();
  const adicionais=adicionaisAtuais();

  if(Number.isFinite(tamanho.limite) &&
     adicionais.length>tamanho.limite) {
    alert(
      `O copo de ${tamanho.volume} permite no máximo ${tamanho.limite} adicionais.`
    );
    return;
  }

  const subtotal=calcularTotal();
  const taxaEntrega=calcularTaxaEntrega();
  const total=subtotal+taxaEntrega;

  const pedido={
    codigo:gerarCodigo(),
    nome,
    telefone,
    bairro,
    tamanho:{
      nome:tamanho.nome,
      volume:tamanho.volume,
      preco:tamanho.preco
    },
    tipo:tipoAtual().nome,
    adicionais:adicionais.map(a=>({
      nome:a.nome,
      preco:a.preco
    })),
    observacoes:porId("observacoes").value.trim(),
    subtotal,
    taxaEntrega,
    total,
    status:"Recebido",
    data:new Date().toISOString()
  };

  const pedidos=lerPedidos();

  pedidos.unshift(pedido);

  if(!salvarPedidos(pedidos)) return;

  porId("codigo-rastreio").value=pedido.codigo;

  porId("confirmacao").innerHTML=`
    <div class="mensagem">
      <strong>Pedido registrado com sucesso!</strong><br>
      Código: <strong>${escapar(pedido.codigo)}</strong><br>
      Subtotal dos produtos: <strong>${dinheiro(pedido.subtotal)}</strong><br>
      Taxa de entrega: <strong>${dinheiro(pedido.taxaEntrega)}</strong><br>
      Total do pedido: <strong>${dinheiro(pedido.total)}</strong><br>
      Guarde o código para consultar o status.
      <button type="button" class="botao largura-total" id="acompanhar-novo">
        Rastrear meu pedido
      </button>
    </div>`;

  porId("acompanhar-novo").addEventListener("click",()=>{
    mostrarPagina("rastreio");
    consultarPedido(pedido.codigo);
  });

  adicionaisSelecionados.clear();
  porId("observacoes").value="";

  renderizarAdicionais();
  atualizarResumo();
}

function consultarPedido(codigoInformado) {
  const codigo=String(codigoInformado||"").trim().toUpperCase();

  const pedido=lerPedidos().find(
    p=>String(p.codigo).toUpperCase()===codigo
  );

  const area=porId("resultado-rastreio");

  if(!codigo) {
    area.innerHTML=
      '<p class="mensagem erro">Digite o código do pedido.</p>';
    return;
  }

  if(!pedido) {
    area.innerHTML=
      '<p class="mensagem erro">Pedido não encontrado neste navegador. Verifique o código.</p>';
    return;
  }

  const etapas=statusPedidos.filter(s=>s!=="Cancelado");
  const indice=etapas.indexOf(pedido.status);

  let progresso="";

  if(pedido.status==="Cancelado") {
    progresso='<li class="concluido">Pedido cancelado.</li>';
  } else {
    progresso=etapas.map((s,i)=>
      `<li class="${i<=indice?"concluido":""}">${i<=indice?"✓":"○"} ${s}</li>`
    ).join("");
  }

  area.innerHTML=`
    <article class="cartao-pedido">
      <p class="eyebrow">PEDIDO ${escapar(pedido.codigo)}</p>
      <h3>Olá, ${escapar(pedido.nome)}!</h3>

      <p><strong>Tamanho:</strong>
        ${escapar(pedido.tamanho.nome)}
        (${escapar(pedido.tamanho.volume)})
      </p>

      <p><strong>Tipo:</strong> ${escapar(pedido.tipo)}</p>

      <p><strong>Adicionais:</strong> ${pedido.adicionais.length
        ?pedido.adicionais.map(a=>escapar(a.nome)).join(", ")
        :"Nenhum"}
      </p>

      ${pedido.telefone
        ?`<p><strong>Telefone:</strong> ${escapar(pedido.telefone)}</p>`
        :""
      }

      ${pedido.bairro
        ?`<p><strong>Bairro:</strong> ${escapar(pedido.bairro)}</p>`
        :""
      }

      ${pedido.observacoes
        ?`<p><strong>Observações:</strong> ${escapar(pedido.observacoes)}</p>`
        :""
      }

      ${pedido.subtotal!==undefined
        ?`<p><strong>Subtotal dos produtos:</strong> ${dinheiro(pedido.subtotal)}</p>`
        :""
      }

      ${pedido.taxaEntrega!==undefined
        ?`<p><strong>Taxa de entrega:</strong> ${dinheiro(pedido.taxaEntrega)}</p>`
        :""
      }

      <p><strong>Total:</strong> ${dinheiro(pedido.total)}</p>
      <p><strong>Status:</strong> ${escapar(pedido.status)}</p>

      <ul class="progresso">${progresso}</ul>

      <small>
        Pedido registrado em
        ${new Date(pedido.data).toLocaleString("pt-BR")}
      </small>
    </article>`;
}

function renderizarAdmin() {
  if(!adminLogado) {
    mostrarPagina("login");
    return;
  }

  const pedidos=lerPedidos();

  porId("stat-total").textContent=pedidos.length;

  porId("stat-andamento").textContent=pedidos.filter(p=>
    !["Concluído","Cancelado"].includes(p.status)
  ).length;

  porId("stat-concluidos").textContent=pedidos.filter(p=>
    p.status==="Concluído"
  ).length;

  if(!pedidos.length) {
    porId("lista-pedidos-admin").innerHTML=
      '<p class="mensagem">Nenhum pedido registrado neste navegador.</p>';
    return;
  }

  porId("lista-pedidos-admin").innerHTML=pedidos.map(p=>`
    <article class="cartao-pedido">
      <p class="eyebrow">${escapar(p.codigo)}</p>

      <h3>${escapar(p.nome)} · ${dinheiro(p.total)}</h3>

      <p><strong>Tamanho:</strong>
        ${escapar(p.tamanho.nome)}
        (${escapar(p.tamanho.volume)})
      </p>

      <p><strong>Tipo:</strong> ${escapar(p.tipo)}</p>

      <p><strong>Adicionais:</strong> ${p.adicionais.length
        ?p.adicionais.map(a=>escapar(a.nome)).join(", ")
        :"Nenhum"}
      </p>

      ${p.telefone
        ?`<p><strong>Telefone:</strong> ${escapar(p.telefone)}</p>`
        :""
      }

      ${p.bairro
        ?`<p><strong>Bairro:</strong> ${escapar(p.bairro)}</p>`
        :""
      }

      ${p.subtotal!==undefined
        ?`<p><strong>Subtotal dos produtos:</strong> ${dinheiro(p.subtotal)}</p>`
        :""
      }

      ${p.taxaEntrega!==undefined
        ?`<p><strong>Taxa de entrega:</strong> ${dinheiro(p.taxaEntrega)}</p>`
        :""
      }

      ${p.observacoes
        ?`<p><strong>Observações:</strong> ${escapar(p.observacoes)}</p>`
        :""
      }

      <p><strong>Data:</strong>
        ${new Date(p.data).toLocaleString("pt-BR")}
      </p>

      <label for="status-${escapar(p.codigo)}">Status do pedido</label>

      <select id="status-${escapar(p.codigo)}"
        data-status="${escapar(p.codigo)}">
        ${statusPedidos.map(s=>
          `<option ${p.status===s?"selected":""}>${s}</option>`
        ).join("")}
      </select>
    </article>
  `).join("");

  porId("lista-pedidos-admin")
    .querySelectorAll("[data-status]")
    .forEach(select=>{
      select.addEventListener("change",()=>{
        const todos=lerPedidos();

        const pedido=todos.find(
          p=>p.codigo===select.dataset.status
        );

        if(!pedido) return;

        pedido.status=select.value;

        if(salvarPedidos(todos)) {
          renderizarAdmin();
        }
      });
    });
}

porId("form-rastreio").addEventListener("submit",evento=>{
  evento.preventDefault();
  consultarPedido(porId("codigo-rastreio").value);
});

porId("form-login").addEventListener("submit",evento=>{
  evento.preventDefault();

  const login=porId("login-admin").value;
  const senha=porId("senha-admin").value;
  const mensagem=porId("mensagem-login");

  if(login===LOGIN_ADMIN && senha===SENHA_ADMIN) {
    adminLogado=true;
    mensagem.textContent="";
    porId("senha-admin").value="";
    mostrarPagina("admin");
  } else {
    mensagem.className="mensagem erro";
    mensagem.textContent="Login ou senha incorretos.";
  }
});

function sairAdmin() {
  adminLogado=false;
  porId("login-admin").value="";
  porId("senha-admin").value="";
  mostrarPagina("pedido");
}

function calcularTaxaEntrega() {
  const campoBairro=porId("bairro");

  if(!campoBairro) return 10;

  const bairro=campoBairro.value
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  return bairro==="centro" ? 5 : 10;
}

function validarDadosEntrega() {
  const campoNome=porId("nome");
  const campoTelefone=porId("telefone");
  const campoBairro=porId("bairro");

  if(!campoNome || !campoTelefone || !campoBairro) {
    alert("Não foi possível encontrar os campos de entrega no HTML.");
    return false;
  }

  const nome=campoNome.value.trim();
  const telefone=campoTelefone.value.trim();
  const bairro=campoBairro.value.trim();

  if(!nome || !telefone || !bairro) {
    alert("Preencha nome, telefone com DDD e bairro.");

    if(!nome) campoNome.focus();
    else if(!telefone) campoTelefone.focus();
    else campoBairro.focus();

    return false;
  }

  const numero=telefone.replace(/\D/g, "");

  if(!/^[1-9]{2}[2-9]\d{7,8}$/.test(numero)) {
    alert("Digite um telefone válido com DDD. Ex.: (41) 99999-9999");
    campoTelefone.focus();
    return false;
  }

  return true;
}

function calcularTotalPedido(subtotal) {
  return Number(subtotal)+calcularTaxaEntrega();
}

function formatarReais(valor) {
  return Number(valor).toLocaleString("pt-BR",{
    style:"currency",
    currency:"BRL"
  });
}

function atualizarValoresEntrega(subtotal) {
  const campoTaxa=porId("taxaEntrega");
  const campoTotal=porId("totalFinal");

  const taxa=calcularTaxaEntrega();
  const valorSubtotal=Number(subtotal)||0;
  const total=valorSubtotal+taxa;

  if(campoTaxa) {
    campoTaxa.textContent="Taxa de entrega: "+formatarReais(taxa);
  }

  if(campoTotal) {
    campoTotal.textContent="Total do pedido: "+formatarReais(total);
  }

  return total;
}


renderizarTamanhos();
renderizarTipos();
renderizarAdicionais();
atualizarResumo();

if(porId("bairro")) {
  porId("bairro").addEventListener("input",()=>{
    atualizarResumo();
  });

  porId("bairro").addEventListener("change",()=>{
    atualizarResumo();
  });
}