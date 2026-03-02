// ===============================
// 余白の一鉢｜診断ロジック（GitHub完結）
// ===============================

// ---- タイプ（本格寄り名称：共感されやすい）----
const TYPES = [
  { id: "depletion", name: "余力枯渇タイプ", summary: "頑張り続けて、回復の入口を見失いがち。まずは“休める仕組み”が必要。" },
  { id: "overheat",  name: "思考過熱タイプ", summary: "考えが止まらず、頭の温度が上がり続ける。静けさを作れる環境が鍵。" },
  { id: "overstim",  name: "刺激過多タイプ", summary: "刺激を浴びすぎて、落ち着く場所が消えがち。情報量を下げる工夫が必要。" },
  { id: "selfsup",   name: "自己抑制タイプ", summary: "自分の優先度が低くなりがち。自分のための“許可”を増やすのが近道。" },
];

// ---- 12問：どのタイプに効く質問か（重み）----
// ※ ここは後でいくらでも微調整できる。今は動く“確定版”で作る。
const QUESTIONS = [
  { text:"朝起きたとき、すでに疲れを感じている。", weights:{ depletion:2, overheat:1 } },
  { text:"休みの日でも、どこか気が抜けない。",       weights:{ depletion:1, overheat:2 } },
  { text:"「まだ頑張れる」と自分に言い聞かせてしまう。", weights:{ depletion:2, selfsup:1 } },
  { text:"考えごとが止まらず、眠りにくい。",           weights:{ overheat:2 } },
  { text:"物事を決めるとき、最適解を探しすぎてしまう。", weights:{ overheat:2 } },
  { text:"失敗しないために、先回りして考えすぎてしまう。", weights:{ overheat:2, selfsup:1 } },
  { text:"気づくとスマホを何度も開いている。",           weights:{ overstim:2 } },
  { text:"何もしていない時間に、落ち着かない。",         weights:{ overstim:2, overheat:1 } },
  { text:"静かな時間より、刺激のある時間を選びがちだ。",   weights:{ overstim:2 } },
  { text:"自分よりも人の予定を優先することが多い。",       weights:{ selfsup:2 } },
  { text:"頼まれると断るのが苦手だ。",                     weights:{ selfsup:2 } },
  { text:"自分のために時間やお金を使うことに罪悪感がある。", weights:{ selfsup:2, depletion:1 } },
];

// ---- 選択肢（順番は“当てはまる→当てはまらない”）----
const SCALE = [
  { badge:"A", label:"とても当てはまる", score:5 },
  { badge:"B", label:"やや当てはまる",   score:4 },
  { badge:"C", label:"どちらともいえない", score:3 },
  { badge:"D", label:"あまり当てはまらない", score:2 },
  { badge:"E", label:"まったく当てはまらない", score:1 },
];

// ---- 植物データ（育てやすい王道／季節水やりはあれば表示、無ければ通年表示）----
const PLANTS = {
  sanse: {
    name:"サンスベリア（ローレンティ）",
    hanakotoba:"永久 / 不滅",
    place:"明るい室内（直射は避ける）",
    water:{ summer:"2〜3週に1回", winter:"月1回" },
    ng:"水やり過多 / 寒すぎ",
    why:"“放っておいても整う”代表。回復の入口を作る相棒。"
  },
  zz: {
    name:"ZZプランツ（ザミオクルカス）",
    hanakotoba:"輝く未来",
    place:"明るい室内〜半日陰",
    water:{ common:"月1〜2回（乾いてから）" },
    ng:"水やり過多",
    why:"頑張りすぎのブレーキ役。やる気を削らずに余白を作れる。"
  },
  pothos: {
    name:"ポトス",
    hanakotoba:"永遠の富 / 長い幸せ",
    place:"明るい室内（レース越し推奨）",
    water:{ summer:"週1", winter:"10〜14日に1回" },
    ng:"直射日光 / 受け皿に水",
    why:"“悩んでも育つ”安心枠。考えすぎの緊張をほどく。"
  },
  ficus: {
    name:"フィカス・ウンベラータ",
    hanakotoba:"すこやか",
    place:"明るい室内（直射NG）",
    water:{ summer:"週1", winter:"10〜14日に1回" },
    ng:"寒さ / 急な環境変化",
    why:"呼吸を整えるシンボル。自分を大事にするスイッチになる。"
  },
  dracaena: {
    name:"ドラセナ（幸福の木）",
    hanakotoba:"幸福",
    place:"明るい室内〜半日陰",
    water:{ common:"土が乾いてから（冬は控えめ）" },
    ng:"冷え / 過湿",
    why:"“安定”をくれる柱。刺激過多で散る意識を戻す。"
  },
  monstera: {
    name:"モンステラ",
    hanakotoba:"うれしい便り",
    place:"明るい室内（直射NG）",
    water:{ summer:"週1", winter:"10〜14日に1回" },
    ng:"乾燥しすぎ / 冷風",
    why:"余白のある存在感。焦りを落ち着かせる“部屋のアンカー”。"
  }
};

// ---- 主×副のおすすめ3種（必要なら後でいくらでも差し替え）----
const COMBO_PLANTS = {
  "depletion|overheat": ["sanse","pothos","zz"],
  "depletion|overstim": ["sanse","dracaena","zz"],
  "depletion|selfsup":  ["zz","ficus","sanse"],
  "overheat|depletion": ["pothos","sanse","monstera"],
  "overheat|overstim":  ["pothos","monstera","dracaena"],
  "overheat|selfsup":   ["pothos","ficus","zz"],
  "overstim|depletion": ["dracaena","sanse","zz"],
  "overstim|overheat":  ["monstera","pothos","dracaena"],
  "overstim|selfsup":   ["dracaena","ficus","zz"],
  "selfsup|depletion":  ["ficus","zz","sanse"],
  "selfsup|overheat":   ["ficus","pothos","zz"],
  "selfsup|overstim":   ["ficus","dracaena","zz"],
};

// =============== DOM ===============
const $ = (q)=>document.querySelector(q);

const quizEl = $("#quiz");
const answeredCountEl = $("#answeredCount");
const progressFillEl = $("#progressFill");

const aboutBox = $("#aboutBox");
const btnAbout = $("#btnAbout");
const btnStart = $("#btnStart");
const btnStart2 = $("#btnStart2");
const btnToForm = $("#btnToForm");
const btnReset = $("#btnReset");
const btnResult = $("#btnResult");

const resultSection = $("#result");
const mainTypeEl = $("#mainType");
const subTypeEl = $("#subType");
const typeSummaryEl = $("#typeSummary");
const plantGridEl = $("#plantGrid");
const btnBack = $("#btnBack");
const btnTop = $("#btnTop");

// =============== Render Questions ===============
let answers = Array(QUESTIONS.length).fill(null);

function render(){
  quizEl.innerHTML = "";

  QUESTIONS.forEach((q, idx)=>{
    const wrap = document.createElement("div");
    wrap.className = "q";

    const title = document.createElement("div");
    title.className = "q-title";
    title.textContent = `${idx+1}) ${q.text}`;
    wrap.appendChild(title);

    const opts = document.createElement("div");
    opts.className = "options";

    SCALE.forEach((opt)=>{
      const label = document.createElement("label");
      label.className = "option";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${idx}`;
      input.value = String(opt.score);
      input.checked = answers[idx] === opt.score;

      input.addEventListener("change", ()=>{
        answers[idx] = opt.score;
        updateProgress();
      });

      const badge = document.createElement("div");
      badge.className = "badge";
      badge.textContent = opt.badge;

      const text = document.createElement("div");
      text.textContent = opt.label;

      label.appendChild(input);
      label.appendChild(badge);
      label.appendChild(text);

      opts.appendChild(label);
    });

    wrap.appendChild(opts);
    quizEl.appendChild(wrap);
  });

  updateProgress();
}

function updateProgress(){
  const answered = answers.filter(v=>v!==null).length;
  answeredCountEl.textContent = String(answered);
  const pct = Math.round((answered / QUESTIONS.length) * 100);
  progressFillEl.style.width = `${pct}%`;

  btnResult.disabled = answered !== QUESTIONS.length;
}

// =============== Score & Result ===============
function calcTypes(){
  const scoreMap = Object.fromEntries(TYPES.map(t=>[t.id, 0]));

  answers.forEach((ans, i)=>{
    const q = QUESTIONS[i];
    const value = ans ?? 3; // safety
    for(const [typeId, w] of Object.entries(q.weights)){
      scoreMap[typeId] += (value * w);
    }
  });

  const sorted = [...TYPES].sort((a,b)=>scoreMap[b.id]-scoreMap[a.id]);
  const main = sorted[0];
  const sub = sorted[1];

  return { scoreMap, main, sub };
}

function pickPlants(mainId, subId){
  const key = `${mainId}|${subId}`;
  const list = COMBO_PLANTS[key] || ["sanse","pothos","zz"];
  return list.map(k=>PLANTS[k]).filter(Boolean).slice(0,3);
}

function waterText(w){
  if(!w) return "土が乾いてからたっぷり（冬は控えめ）";
  if(w.summer || w.winter){
    const a = w.summer ? `春夏：${w.summer}` : "";
    const b = w.winter ? `冬：${w.winter}` : "";
    return [a,b].filter(Boolean).join(" / ");
  }
  if(w.common) return w.common;
  return "土が乾いてからたっぷり（冬は控えめ）";
}

function showResult(){
  const { main, sub } = calcTypes();

  mainTypeEl.textContent = main.name;
  subTypeEl.textContent = sub.name;

  typeSummaryEl.textContent = `主タイプ：${main.name} / 副タイプ：${sub.name}。${main.summary}`;

  const plants = pickPlants(main.id, sub.id);
  plantGridEl.innerHTML = "";

  plants.forEach((p, idx)=>{
    const card = document.createElement("div");
    card.className = "plant";

    card.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap;">
        <h3>植物${idx+1}：${p.name} <span class="tag">花言葉：${p.hanakotoba}</span></h3>
      </div>

      <div class="kv">
        <div class="k">置き場所</div><div class="v">${p.place}</div>
        <div class="k">水やり</div><div class="v">${waterText(p.water)}</div>
        <div class="k">NG（注意）</div><div class="v">${p.ng}</div>
      </div>

      <div class="why">
        <div class="k">なぜ合うか</div>
        <div class="v">${p.why}</div>
      </div>
    `;
    plantGridEl.appendChild(card);
  });

  resultSection.hidden = false;
  resultSection.scrollIntoView({behavior:"smooth", block:"start"});
}

// =============== Events ===============
btnAbout.addEventListener("click", ()=>{
  aboutBox.hidden = !aboutBox.hidden;
});

function goToForm(){
  document.querySelector("#diagnosis").scrollIntoView({behavior:"smooth", block:"start"});
}

btnStart.addEventListener("click", goToForm);
btnStart2.addEventListener("click", goToForm);
btnToForm.addEventListener("click", goToForm);

btnReset.addEventListener("click", ()=>{
  answers = Array(QUESTIONS.length).fill(null);
  render();
  resultSection.hidden = true;
});

btnResult.addEventListener("click", showResult);

btnBack.addEventListener("click", ()=>{
  document.querySelector("#diagnosis").scrollIntoView({behavior:"smooth", block:"start"});
});

btnTop.addEventListener("click", ()=>{
  document.querySelector("#top").scrollIntoView({behavior:"smooth", block:"start"});
});

// init
render();
