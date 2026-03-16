console.log("APP_VERSION: imgdbg001");
document.documentElement.setAttribute("data-app-version", "imgdbg001");

/* -----------------------
   Helpers
----------------------- */
const $ = (q) => document.querySelector(q);

function esc(s){
  return String(s)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#39;");
}

// GitHub Pages（/repo/配下）でも確実に assets/ を指せる
const BASE_URL = new URL("./", window.location.href);
function imgUrl(file){
  return new URL(`assets/plants/${file}`, BASE_URL).toString();
}

function plant(name, hanakotoba, place, water, ng, why, imgFile){
  return { name, hanakotoba, place, water, ng, why, imgFile };
}

/* -----------------------
   Types
----------------------- */
const TYPES = [
  { id:"depletion", name:"余力枯渇タイプ（消耗）", summary:"回復が追いつかず、日々を“維持”で使い切りがち。まずは世話が少ない成功体験から。" },
  { id:"overheat",  name:"思考過熱タイプ（思考オーバーヒート）", summary:"考えが止まらず、頭が休まらない。視界が整う・リズムが作れる植物が効く。" },
  { id:"overstim",  name:"刺激過多タイプ（刺激疲れ）", summary:"情報・予定・スマホで神経が疲れやすい。低刺激で“静けさ”を増やすのが近道。" },
  { id:"selfsup",   name:"自己抑制タイプ（自己後回し）", summary:"自分を後回しにしがち。『自分のためにやっていい』を増やす相棒が必要。" },
];

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

const SCALE = [
  { badge:"A", label:"とても当てはまる", score:5 },
  { badge:"B", label:"やや当てはまる",   score:4 },
  { badge:"C", label:"どちらともいえない", score:3 },
  { badge:"D", label:"あまり当てはまらない", score:2 },
  { badge:"E", label:"まったく当てはまらない", score:1 },
];

const PLANTS = {
  sanse: plant("サンスベリア（ローレンティ）","永久 / 不滅","明るい室内〜半日陰（直射NG）",
    { summer:"2〜3週間に1回（完全に乾いてから）", winter:"4〜6週間に1回（完全に乾いてから）" },
    "水のやりすぎ / 低温","放置でも整う王道。", "plants1.jpeg"),
  zz: plant("ザミオクルカス（ZZプランツ）","輝く未来","明るい室内〜半日陰",
    { summer:"2〜3週間に1回（完全に乾いてから）", winter:"4〜6週間に1回（完全に乾いてから）" },
    "水やり過多","世話を減らしても育つ。", "plants2.jpeg"),
  pothos: plant("ポトス","永遠の富 / 長い幸せ","明るい室内（レース越し推奨）",
    { summer:"7〜10日に1回（表面が乾いたら）", winter:"10〜14日に1回（乾き気味）" },
    "直射日光 / 水溜め","悩んでも育つ安心枠。", "plants3.jpeg"),
  pachira: plant("パキラ","快活 / 勝利","明るい室内（直射NG）",
    { summer:"7〜10日に1回（乾いたら）", winter:"10〜14日に1回（控えめ）" },
    "水やり過多 / 寒さ","ルールがある方が安心。", "plants4.jpeg"),
  dracaena: plant("ドラセナ（幸福の木系）","幸福","明るい室内〜半日陰",
    { summer:"10日に1回（乾いてから）", winter:"2〜3週間に1回（控えめ）" },
    "寒さ / 過湿","部屋の柱になる安定感。", "plants5.jpeg"),
  gajumaru: plant("ガジュマル","健康","明るい室内（窓辺/直射は避ける）",
    { summer:"7〜10日に1回（乾いたら）", winter:"2〜3週間に1回（控えめ）" },
    "冷え / 乾燥しすぎ","“今ここ”に戻す。", "plants6.jpeg"),
  monstera: plant("モンステラ","うれしい便り","明るい室内（直射NG）",
    { summer:"7〜10日に1回（表面が乾いたら）", winter:"10〜14日に1回（控えめ）" },
    "冷え / 直射","視界の休憩所。", "plants7.jpeg"),
  schefflera: plant("シェフレラ（カポック）","実直","明るい室内",
    { summer:"7〜10日に1回（乾いたら）", winter:"10〜14日に1回（控えめ）" },
    "寒さ / 過湿","丈夫で折れにくい。", "plants8.jpeg"),
  umbellata: plant("フィカス・ウンベラータ","すこやか","明るい室内（直射NG）",
    { summer:"7〜10日に1回（乾いたら）", winter:"10〜14日に1回（控えめ）" },
    "冷え / 急な移動","呼吸が戻る。", "plants9.jpeg"),
  everfresh: plant("エバーフレッシュ","歓喜","明るい室内（直射NG）",
    { summer:"5〜7日に1回（やや湿り気）", winter:"10〜14日に1回（控えめ）" },
    "乾燥しすぎ / 冷え","1日の区切りが作れる。", "plants10.jpeg"),
  ivy: plant("アイビー（ヘデラ）","友情","明るい室内〜半日陰",
    { summer:"5〜10日に1回（乾いたら）", winter:"10〜14日に1回（控えめ）" },
    "水切れ放置 / 直射","ちょい世話で満足感。", "plants11.jpeg"),
  spider: plant("オリヅルラン","祝賀","明るい室内（直射NG）",
    { summer:"7〜10日に1回（乾いたら）", winter:"10〜14日に1回（控えめ）" },
    "冷え / 過湿","増える＝成功体験。", "plants12.jpeg"),
  spath: plant("スパティフィラム","清らかな心","明るい日陰（強光NG）",
    { summer:"5〜7日に1回（乾く前に軽く）", winter:"10〜14日に1回（控えめ）" },
    "乾燥しすぎ / 直射","反応が分かりやすい。", "plants13.jpeg"),
  syngonium: plant("シンゴニウム","喜び","明るい室内（直射NG）",
    { summer:"7〜10日に1回（乾いたら）", winter:"10〜14日に1回（控えめ）" },
    "寒さ / 過湿","観察で思考が軽くなる。", "plants14.jpeg"),
  echeveria: plant("多肉植物（エケベリア系）","優美","明るい場所（強光は慣らす）",
    { summer:"2〜3週間に1回（乾いてから）", winter:"4〜6週間に1回（控えめ）" },
    "水やり過多 / 日照不足","世話が少なく静けさ向き。", "plants15.jpeg"),
  cactus: plant("サボテン（小型）","枯れない愛","明るい場所（強光は慣らす）",
    { summer:"3〜4週間に1回（乾いてから）", winter:"6〜8週間に1回（ほぼ不要）" },
    "水やり過多 / 急な強光","余白の象徴。", "plants16.jpeg"),
  peperomia: plant("ペペロミア","可憐","明るい室内（直射NG）",
    { summer:"7〜10日に1回（乾いたら）", winter:"10〜14日に1回（控えめ）" },
    "冷え / 過湿","小さく優しい。", "plants17.jpeg"),
  pilea: plant("ピレア（パンケーキプランツ）","救済","明るい室内（直射NG）",
    { summer:"7〜10日に1回（乾いたら）", winter:"10〜14日に1回（控えめ）" },
    "寒さ / 過湿","罪悪感を下げる。", "plants18.jpeg"),
  hoya: plant("ホヤ（カルノーサ等）","人生の幸福","明るい室内（直射NG）",
    { summer:"2〜3週間に1回（乾いてから）", winter:"4〜6週間に1回（控えめ）" },
    "過湿 / 寒さ","乾かし気味でOK。", "plants19.jpeg"),
  calathea: plant("カラテア","飛躍","明るい日陰（直射NG）",
    { summer:"5〜7日に1回（乾かしすぎない）", winter:"10日に1回（控えめ）" },
    "乾燥しすぎ / 冷風","丁寧に扱う時間が自分への許可。", "plants20.jpeg"),
};

const TYPE_POOLS = {
  depletion: ["sanse","zz","pothos","spider","cactus","echeveria","dracaena","schefflera"],
  overheat:  ["pachira","umbellata","everfresh","syngonium","spath","gajumaru","pilea","monstera"],
  overstim:  ["cactus","echeveria","dracaena","spath","ivy","monstera","sanse","syngonium"],
  selfsup:   ["zz","pothos","gajumaru","peperomia","pilea","hoya","umbellata","calathea","schefflera"],
};

/* -----------------------
   DOM
----------------------- */
const quizEl = $("#quiz");
const answeredCountEl = $("#answeredCount");
const progressFillEl = $("#progressFill");
const aboutBox = $("#aboutBox");

$("#btnAbout")?.addEventListener("click", ()=>{ if (aboutBox) aboutBox.hidden = !aboutBox.hidden; });

const goDiagnosis = ()=>$("#diagnosis")?.scrollIntoView({behavior:"smooth", block:"start"});
$("#btnStart")?.addEventListener("click", goDiagnosis);
$("#btnBack")?.addEventListener("click", goDiagnosis);
$("#btnTop")?.addEventListener("click", ()=>$("#top")?.scrollIntoView({behavior:"smooth"}));
$("#btnTop2")?.addEventListener("click", ()=>$("#top")?.scrollIntoView({behavior:"smooth"}));

const btnReset = $("#btnReset");
const btnResult = $("#btnResult");

const resultSection = $("#result");
const mainTypeEl = $("#mainType");
const subTypeEl = $("#subType");
const typeSummaryEl = $("#typeSummary");
const plantGridEl = $("#plantGrid");

/* -----------------------
   State & Start
----------------------- */
let answers = Array(QUESTIONS.length).fill(null);
render();

btnReset?.addEventListener("click", ()=>{
  answers = Array(QUESTIONS.length).fill(null);
  render();
  if (resultSection) resultSection.hidden = true;
  goDiagnosis();
});

btnResult?.addEventListener("click", ()=>{
  if (!answers.every(v=>v!==null)){
    scrollToFirstUnanswered();
    return;
  }
  const res = diagnose();
  renderResult(res);
});

/* -----------------------
   Render quiz
----------------------- */
function render(){
  if (!quizEl) return;
  quizEl.innerHTML = "";

  QUESTIONS.forEach((q, idx)=>{
    const wrap = document.createElement("div");
    wrap.className = "q";
    wrap.dataset.q = String(idx);

    const title = document.createElement("div");
    title.className = "q-title";
    title.textContent = `${idx+1}) ${q.text}`;
    wrap.appendChild(title);

    const opts = document.createElement("div");
    opts.className = "options";

    SCALE.forEach(opt=>{
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
  if (answeredCountEl) answeredCountEl.textContent = String(answered);
  if (progressFillEl) progressFillEl.style.width = `${Math.round(answered/QUESTIONS.length*100)}%`;
  if (btnResult) btnResult.disabled = answered !== QUESTIONS.length;
}

function scrollToFirstUnanswered(){
  for (let i=0; i<answers.length; i++){
    if (answers[i] === null){
      document.querySelector(`.q[data-q="${i}"]`)?.scrollIntoView({behavior:"smooth", block:"center"});
      break;
    }
  }
}

/* -----------------------
   Diagnose
----------------------- */
function diagnose(){
  const scores = Object.fromEntries(TYPES.map(t=>[t.id, 0]));
  let seed = 0;

  answers.forEach((ans, i)=>{
    const v = ans ?? 3;
    seed = seed * 31 + v * (i+1);
    const w = QUESTIONS[i].weights;
    for (const [typeId, weight] of Object.entries(w)){
      scores[typeId] += v * weight;
    }
  });

  const ranked = [...TYPES].map(t=>({ ...t, score: scores[t.id]})).sort((a,b)=>b.score-a.score);
  const main = ranked[0];
  const sub = ranked[1];
  const plants = pickPlants(main.id, sub.id, seed);
  return { main, sub, plants };
}

function pickPlants(mainId, subId, seed){
  const mainPool = (TYPE_POOLS[mainId] || []).slice();
  const subPool = (TYPE_POOLS[subId] || []).sli
