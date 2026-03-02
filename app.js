/* ===============================
   余白の一鉢｜診断ロジック（GitHub完結）
   仕様確定：
   - 4タイプ（本格名＋括弧で旧名）
   - 12問（5択：当てはまる→当てはまらない）
   - 主タイプ×副タイプ
   - 植物は「主タイプ候補2 + 副タイプ候補1」を自動選出（被り回避）
   - 全植物、水やりは必ず「春夏 / 冬」表記
   - 各植物カード：置き場所 / 水やり / NG / 花言葉 / なぜ合うか
   =============================== */

/* ---- タイプ定義（確定） ---- */
const TYPES = [
  { id: "depletion", name: "余力枯渇タイプ（消耗）", summary: "回復が追いつかず、日々を“維持”で使い切りがち。まずは世話が少ない成功体験から。" },
  { id: "overheat",  name: "思考過熱タイプ（思考オーバーヒート）", summary: "考えが止まらず、頭が休まらない。視界が整う・リズムが作れる植物が効く。" },
  { id: "overstim",  name: "刺激過多タイプ（刺激疲れ）", summary: "情報・予定・スマホで神経が疲れやすい。低刺激で“静けさ”を増やすのが近道。" },
  { id: "selfsup",   name: "自己抑制タイプ（自己後回し）", summary: "自分を後回しにしがち。『自分のためにやっていい』を増やす相棒が必要。" },
];

/* ---- 12問（確定：重み方式＝本格） ---- */
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

/* ---- 選択肢（順番確定：当てはまる→当てはまらない） ---- */
const SCALE = [
  { badge:"A", label:"とても当てはまる", score:5 },
  { badge:"B", label:"やや当てはまる",   score:4 },
  { badge:"C", label:"どちらともいえない", score:3 },
  { badge:"D", label:"あまり当てはまらない", score:2 },
  { badge:"E", label:"まったく当てはまらない", score:1 },
];

/* ===============================
   植物データ（24種／全て春夏・冬表記）
   注意：水やりは「目安」。環境差があるので“乾き具合優先”前提。
   =============================== */
const PLANTS = {
  // --- 王道A ---
  sanse: plant(
    "サンスベリア（ローレンティ）",
    "永久 / 不滅",
    "明るい室内〜半日陰（直射NG）",
    { summer:"2〜3週間に1回（完全に乾いてから）", winter:"4〜6週間に1回（完全に乾いてから）" },
    "水のやりすぎ / 低温",
    "“放置でも整う”王道。余力が少ない時に失敗しにくい。",
    ["depletion","overstim"]
  ),
  zz: plant(
    "ザミオクルカス（ZZプランツ）",
    "輝く未来",
    "明るい室内〜半日陰",
    { summer:"2〜3週間に1回（完全に乾いてから）", winter:"4〜6週間に1回（完全に乾いてから）" },
    "水やり過多（根腐れ）",
    "世話を減らしても“ちゃんと育つ”。自分を守る余白が作れる。",
    ["depletion","selfsup"]
  ),
  pothos: plant(
    "ポトス",
    "永遠の富 / 長い幸せ",
    "明るい室内（レース越し推奨）",
    { summer:"7〜10日に1回（表面が乾いたら）", winter:"10〜14日に1回（乾き気味）" },
    "直射日光 / 受け皿の水溜め",
    "悩んでも育つ安心枠。『続けられた』が回復の芯になる。",
    ["depletion","overheat","selfsup"]
  ),
  pachira: plant(
    "パキラ",
    "快活 / 勝利",
    "明るい室内（直射NG）",
    { summer:"7〜10日に1回（乾いたら）", winter:"10〜14日に1回（控えめ）" },
    "水やり過多 / 寒さ",
    "ルール通りに整えると強い。頭を休める“規則正しさ”が作れる。",
    ["overheat","selfsup"]
  ),
  dracaena: plant(
    "ドラセナ（幸福の木系）",
    "幸福",
    "明るい室内〜半日陰",
    { summer:"10日に1回（乾いてから）", winter:"2〜3週間に1回（控えめ）" },
    "寒さ / 過湿",
    "部屋の“柱”になる安定感。刺激過多で散った意識を戻す。",
    ["overstim","depletion"]
  ),
  gajumaru: plant(
    "ガジュマル",
    "健康",
    "明るい室内（窓辺/直射は避ける）",
    { summer:"7〜10日に1回（乾いたら）", winter:"2〜3週間に1回（控えめ）" },
    "冷え / 乾燥しすぎ",
    "幹の存在感で“今ここ”に戻す。自己抑制の人に『自分の場所』を作る。",
    ["selfsup","overheat"]
  ),

  // --- 王道＋ちょいオシャB ---
  monstera: plant(
    "モンステラ",
    "うれしい便り",
    "明るい室内（直射NG）",
    { summer:"7〜10日に1回（表面が乾いたら）", winter:"10〜14日に1回（控えめ）" },
    "冷え / 乾燥しすぎ / 直射",
    "大きい葉の余白で落ち着く。刺激の多い日々の“視界の休憩所”。",
    ["overstim","overheat"]
  ),
  schefflera: plant(
    "シェフレラ（カポック）",
    "実直",
    "明るい室内",
    { summer:"7〜10日に1回（乾いたら）", winter:"10〜14日に1回（控えめ）" },
    "寒さ / 過湿",
    "丈夫で折れにくい。『ほどほどでいい』を思い出させる。",
    ["selfsup","depletion"]
  ),
  umbellata: plant(
    "フィカス・ウンベラータ",
    "すこやか",
    "明るい室内（直射NG）",
    { summer:"7〜10日に1回（乾いたら）", winter:"10〜14日に1回（控えめ）" },
    "乾燥・冷え / 急な移動",
    "葉がゆったりしていて呼吸が戻る。“考えすぎ”の熱を下げる。",
    ["overheat","selfsup"]
  ),
  everfresh: plant(
    "エバーフレッシュ",
    "歓喜",
    "明るい室内（直射NG）",
    { summer:"5〜7日に1回（やや湿り気）", winter:"10〜14日に1回（控えめ）" },
    "乾燥しすぎ / 冷え",
    "葉が閉じる動きで“1日の区切り”が作れる。思考の切り替えが得意になる。",
    ["overheat"]
  ),
  aglaonema: plant(
    "アグラオネマ",
    "青春",
    "明るい日陰〜半日陰",
    { summer:"7〜10日に1回（乾いたら）", winter:"10〜14日に1回（控えめ）" },
    "低温 / 過湿",
    "落ち着いた葉の表情で安心する。自己抑制の人に“静かな味方”。",
    ["selfsup","overstim"]
  ),
  philodendron: plant(
    "フィロデンドロン（ブラジル等）",
    "華やかな明るさ",
    "明るい室内（直射NG）",
    { summer:"7〜10日に1回（乾いたら）", winter:"10〜14日に1回（控えめ）" },
    "冷え / 水の溜めっぱなし",
    "育つスピードが心地いい。“小さな前進”が自己肯定感になる。",
    ["selfsup","depletion"]
  ),
  dieffenbachia: plant(
    "ディフェンバキア",
    "悠然",
    "明るい室内（直射NG）",
    { summer:"5〜10日に1回（乾いたら）", winter:"10〜14日に1回（控えめ）" },
    "冷え / 乾燥しすぎ",
    "存在感があって部屋が整う。刺激で散った意識を戻す。",
    ["overstim"]
  ),
  elastica: plant(
    "フィカス・エラスティカ（ゴムの木）",
    "永遠の幸せ",
    "明るい室内（直射NG）",
    { summer:"7〜10日に1回（乾いたら）", winter:"10〜14日に1回（控えめ）" },
    "低温 / 水やり過多",
    "“強い幹”が支えになる。自己抑制の人の“芯”を作る。",
    ["selfsup","depletion"]
  ),

  // --- 低刺激・入手容易 ---
  ivy: plant(
    "アイビー（ヘデラ）",
    "友情",
    "明るい室内〜半日陰",
    { summer:"5〜10日に1回（乾いたら）", winter:"10〜14日に1回（控えめ）" },
    "水切れ放置 / 直射",
    "ちょい世話で満足感。刺激過多の“手持ち無沙汰”を優しく埋める。",
    ["overstim"]
  ),
  spider: plant(
    "オリヅルラン",
    "祝賀",
    "明るい室内（直射NG）",
    { summer:"7〜10日に1回（乾いたら）", winter:"10〜14日に1回（控えめ）" },
    "冷え / 過湿",
    "丈夫で増える＝小さな成功体験が積み上がる。",
    ["depletion","selfsup"]
  ),
  spath: plant(
    "スパティフィラム",
    "清らかな心",
    "明るい日陰（強光NG）",
    { summer:"5〜7日に1回（乾く前に軽く）", winter:"10〜14日に1回（控えめ）" },
    "乾燥しすぎ / 直射",
    "しおれ→水で戻る反応が分かりやすい。“整った反応”が安心になる。",
    ["overstim","overheat"]
  ),
  syngonium: plant(
    "シンゴニウム",
    "喜び",
    "明るい室内（直射NG）",
    { summer:"7〜10日に1回（乾いたら）", winter:"10〜14日に1回（控えめ）" },
    "寒さ / 過湿",
    "成長が見える。考えすぎの頭を“観察”に切り替えられる。",
    ["overheat","selfsup"]
  ),

  // --- 乾燥寄り（静けさ）---
  echeveria: plant(
    "多肉植物（エケベリア系）",
    "優美",
    "明るい場所（強光は慣らす）",
    { summer:"2〜3週間に1回（乾いてから）", winter:"4〜6週間に1回（控えめ）" },
    "水やり過多 / 日照不足",
    "世話が少なく静けさ向き。刺激過多の“神経の休憩”に合う。",
    ["overstim","depletion"]
  ),
  cactus: plant(
    "サボテン（小型）",
    "枯れない愛",
    "明るい場所（強光は慣らす）",
    { summer:"3〜4週間に1回（乾いてから）", winter:"6〜8週間に1回（ほぼ不要）" },
    "水やり過多 / 急な強光",
    "余白の象徴。『やらなくても崩れない』が安心になる。",
    ["overstim","depletion"]
  ),

  // --- 自己抑制の“優しい成功体験”枠 ---
  peperomia: plant(
    "ペペロミア",
    "可憐",
    "明るい室内（直射NG）",
    { summer:"7〜10日に1回（乾いたら）", winter:"10〜14日に1回（控えめ）" },
    "冷え / 過湿",
    "小さくて優しい存在。“自分のための小さな習慣”を作れる。",
    ["selfsup"]
  ),
  pilea: plant(
    "ピレア（パンケーキプランツ）",
    "救済",
    "明るい室内（直射NG）",
    { summer:"7〜10日に1回（乾いたら）", winter:"10〜14日に1回（控えめ）" },
    "寒さ / 過湿",
    "丸い葉がやさしい。罪悪感を下げて“自分OK”に寄せる。",
    ["selfsup","overheat"]
  ),
  hoya: plant(
    "ホヤ（カルノーサ等）",
    "人生の幸福",
    "明るい室内（直射NG）",
    { summer:"2〜3週間に1回（乾いてから）", winter:"4〜6週間に1回（控えめ）" },
    "過湿 / 寒さ",
    "乾かし気味でOK。自己抑制の人が“頑張りすぎず続く”。",
    ["selfsup","depletion"]
  ),
  calathea: plant(
    "カラテア",
    "飛躍",
    "明るい日陰（直射NG）",
    { summer:"5〜7日に1回（乾かしすぎない）", winter:"10日に1回（控えめ）" },
    "乾燥しすぎ / 冷風",
    "“丁寧に扱う時間”が自分への許可になる（※有料深掘り枠にも最適）。",
    ["selfsup","overheat"]
  ),
};

/* ---- タイプ別の候補プール（A＋Bで固定） ---- */
const TYPE_POOLS = {
  depletion: ["sanse","zz","pothos","spider","cactus","echeveria","dracaena","schefflera"],
  overheat:  ["pachira","umbellata","everfresh","syngonium","spath","gajumaru","pilea","monstera"],
  overstim:  ["cactus","echeveria","dracaena","spath","ivy","monstera","aglaonema","sanse"],
  selfsup:   ["zz","pothos","gajumaru","peperomia","pilea","hoya","umbellata","elastica","calathea","philodendron"],
};

/* ===============================
   DOM 接続（index.htmlのIDに合わせる）
   =============================== */
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

/* ===============================
   状態
   =============================== */
let answers = Array(QUESTIONS.length).fill(null);

/* ===============================
   初期化
   =============================== */
btnAbout.addEventListener("click", ()=>{ aboutBox.hidden = !aboutBox.hidden; });

btnStart.addEventListener("click", ()=>scrollToId("diagnosis"));
btnStart2.addEventListener("click", ()=>scrollToId("diagnosis"));
btnToForm.addEventListener("click", ()=>scrollToId("diagnosis"));

btnBack.addEventListener("click", ()=>scrollToId("diagnosis"));
btnTop.addEventListener("click", ()=>scrollToId("top"));

btnReset.addEventListener("click", ()=>{
  answers = Array(QUESTIONS.length).fill(null);
  render();
  resultSection.hidden = true;
  scrollToId("diagnosis");
});

btnResult.addEventListener("click", ()=>{
  if (!isAllAnswered()){
    // 未回答がある時は先頭未回答へ
    scrollToFirstUnanswered();
    return;
  }
  const result = diagnose();
  renderResult(result);
});

render();

/* ===============================
   UI生成
   =============================== */
function render(){
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

/* ===============================
   診断ロジック
   =============================== */
function diagnose(){
  // タイプスコア計算（重み×回答点）
  const scores = Object.fromEntries(TYPES.map(t=>[t.id, 0]));
  let total = 0;

  answers.forEach((ans, i)=>{
    const v = ans ?? 3;
    total += v;
    const w = QUESTIONS[i].weights;
    for (const [typeId, weight] of Object.entries(w)){
      scores[typeId] += v * weight;
    }
  });

  // 順位
  const ranked = [...TYPES]
    .map(t => ({ ...t, score: scores[t.id] }))
    .sort((a,b)=> b.score - a.score);

  const main = ranked[0];
  const sub  = ranked[1];

  // 主×副で植物3つ（被り回避）
  const plants = pickPlants(main.id, sub.id, total);

  return { scores, main, sub, plants };
}

/* 主タイプから2つ、副タイプから1つを選ぶ（被り回避）。seedで軽く揺らす */
function pickPlants(mainId, subId, seed){
  const mainPool = TYPE_POOLS[mainId] || [];
  const subPool  = TYPE_POOLS[subId]  || [];

  const pickA = pickFromPool(mainPool, 2, seed);
  const pickB = pickFromPool(subPool,  2, seed + 7); // 予備2つ

  const out = [];
  for (const id of pickA){
    if (out.length >= 2) break;
    if (!out.includes(id)) out.push(id);
  }

  for (const id of pickB){
    if (out.length >= 3) break;
    if (!out.includes(id)) out.push(id);
  }

  // 最後の保険：足りない場合は主プールから補充
  if (out.length < 3){
    for (const id of mainPool){
      if (out.length >= 3) break;
      if (!out.includes(id)) out.push(id);
    }
  }

  // plant objectへ
  return out.slice(0,3).map(id => PLANTS[id]).filter(Boolean);
}

/* poolからseedを起点にn個拾う（決定的に揺れる） */
function pickFromPool(pool, n, seed){
  if (!pool.length) return [];
  const start = seed % pool.length;
  const out = [];
  for (let i=0; i<pool.length && out.length<n; i++){
    out.push(pool[(start + i) % pool.length]);
  }
  return out;
}

/* ===============================
   結果表示
   =============================== */
function renderResult(result){
  mainTypeEl.textContent = result.main.name;
  subTypeEl.textContent  = result.sub.name;

  typeSummaryEl.textContent =
    `主タイプ：${result.main.name} / 副タイプ：${result.sub.name}。${result.main.summary}`;

  plantGridEl.innerHTML = "";

  result.plants.forEach((p, idx)=>{
    const card = document.createElement("div");
    card.className = "plant";

    card.innerHTML = `
      <h3>植物${idx+1}：${escapeHtml(p.name)} <span class="tag">花言葉：${escapeHtml(p.hanakotoba)}</span></h3>

      <div class="kv">
        <div class="k">置き場所</div><div class="v">${escapeHtml(p.place)}</div>
        <div class="k">水やり</div><div class="v">${escapeHtml(waterText(p.water))}</div>
        <div class="k">NG（注意）</div><div class="v">${escapeHtml(p.ng)}</div>
      </div>

      <div class="why">
        <div class="k">なぜ合うか</div>
        <div class="v">${escapeHtml(p.why)}</div>
      </div>
    `;
    plantGridEl.appendChild(card);
  });

  resultSection.hidden = false;
  resultSection.scrollIntoView({behavior:"smooth", block:"start"});
}

/* 全植物“必ず”春夏/冬表示（仕様固定） */
function waterText(w){
  return `春夏：${w.summer} / 冬：${w.winter}`;
}

/* ===============================
   便利関数
   =============================== */
function isAllAnswered(){
  return answers.every(v => v !== null);
}

function scrollToFirstUnanswered(){
  for (let i=0; i<answers.length; i++){
    if (answers[i] === null){
      const block = document.querySelector(`.q[data-q="${i}"]`);
      if (block) block.scrollIntoView({behavior:"smooth", block:"center"});
      break;
    }
  }
}

function scrollToId(id){
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({behavior:"smooth", block:"start"});
}

function escapeHtml(s){
  return String(s)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#39;");
}

function plant(name, hanakotoba, place, water, ng, why, affinity){
  // affinity は将来拡張用（タイプごとの強い相性）
  return { name, hanakotoba, place, water, ng, why, affinity };
}
