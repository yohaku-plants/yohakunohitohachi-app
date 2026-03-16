/* ====== 余白の一鉢 | app_fix.js v5 ======
   - index.html の <script src="./app_fix.js?v=5" defer> で読み込む
   - 画像パス: ./assets/plants/plants1.jpeg ~ plants20.jpeg
   ====================================== */

/* ------
   画像URL（シンプルな相対パス）
   ------ */
function imgUrl(fileName) {
  return "./assets/plants/" + fileName;
}

/* ------
   タイプ定義
   ------ */
var TYPES = [
  { id: "depletion", icon: "🍂", name: "余力枯渇タイプ（消耗）",             summary: "回復が追いつかず、日々を「維持」で使い切りがち。まずは世話が少ない成功体験から始めよう。" },
  { id: "overheat",  icon: "🌀", name: "思考過熱タイプ（思考オーバーヒート）", summary: "考えが止まらず、頭が休まらない。視界が整う・リズムが作れる植物が効く。" },
  { id: "overstim",  icon: "⚡", name: "刺激過多タイプ（刺激疲れ）",          summary: "情報・予定・スマホで神経が疲れやすい。低刺激で「静けさ」を増やすのが近道。" },
  { id: "selfsup",   icon: "🌾", name: "自己抑制タイプ（自己後回し）",        summary: "自分を後回しにしがち。「自分のためにやっていい」を増やす相棒が必要。" }
];

/* ------
   12問
   ------ */
var QUESTIONS = [
  { text: "朝起きたとき、すでに疲れを感じている。",               w: { depletion: 2, overheat: 1 } },
  { text: "休みの日でも、どこか気が抜けない。",                   w: { depletion: 1, overheat: 2 } },
  { text: "「まだ頑張れる」と自分に言い聞かせてしまう。",         w: { depletion: 2, selfsup: 1 } },
  { text: "考えごとが止まらず、眠りにくい。",                     w: { overheat: 2 } },
  { text: "物事を決めるとき、最適解を探しすぎてしまう。",         w: { overheat: 2 } },
  { text: "失敗しないために、先回りして考えすぎてしまう。",       w: { overheat: 2, selfsup: 1 } },
  { text: "気づくとスマホを何度も開いている。",                   w: { overstim: 2 } },
  { text: "何もしていない時間に、落ち着かない。",                 w: { overstim: 2, overheat: 1 } },
  { text: "静かな時間より、刺激のある時間を選びがちだ。",         w: { overstim: 2 } },
  { text: "自分よりも人の予定を優先することが多い。",             w: { selfsup: 2 } },
  { text: "頼まれると断るのが苦手だ。",                           w: { selfsup: 2 } },
  { text: "自分のために時間やお金を使うことに罪悪感がある。",     w: { selfsup: 2, depletion: 1 } }
];

/* ------
   選択肢
   ------ */
var SCALE = [
  { b: "A", l: "🌿 とても当てはまる",       s: 5 },
  { b: "B", l: "🍃 やや当てはまる",         s: 4 },
  { b: "C", l: "🌱 どちらともいえない",     s: 3 },
  { b: "D", l: "🪨 あまり当てはまらない",   s: 2 },
  { b: "E", l: "✦ まったく当てはまらない",  s: 1 }
];

/* ------
   植物データ（20種）
   ------ */
var PLANTS = {
  sanse:      { name:"サンスベリア",       icon:"🌵", hana:"永久・不滅",    place:"明るい室内〜半日陰", ws:"2〜3週間に1回（乾いてから）",  ww:"4〜6週間に1回（乾いてから）",  ng:"水のやりすぎ・低温",  why:"放置でも整う王道。失敗しにくくて安心。",               img:"plants1.jpeg"  },
  zz:         { name:"ZZプランツ",         icon:"🌿", hana:"輝く未来",      place:"明るい室内〜半日陰", ws:"2〜3週間に1回（乾いてから）",  ww:"4〜6週間に1回（乾いてから）",  ng:"水やり過多（根腐れ）",why:"世話を減らしても育つ。自分を守る余白を作れる。",       img:"plants2.jpeg"  },
  pothos:     { name:"ポトス",             icon:"🍃", hana:"永遠の富",      place:"明るい室内（レース越し）", ws:"7〜10日に1回（表面が乾いたら）", ww:"10〜14日に1回（乾き気味）", ng:"直射日光・受け皿の水",why:"悩んでも育つ安心枠。続けられたが回復の芯になる。",     img:"plants3.jpeg"  },
  pachira:    { name:"パキラ",             icon:"🌴", hana:"快活・勝利",    place:"明るい室内（直射NG）", ws:"7〜10日に1回（乾いたら）",   ww:"10〜14日に1回（控えめ）",    ng:"水やり過多・寒さ",    why:"ルールがある方が安心するタイプに刺さる。",             img:"plants4.jpeg"  },
  dracaena:   { name:"ドラセナ",           icon:"🌾", hana:"幸福",          place:"明るい室内〜半日陰", ws:"10日に1回（乾いてから）",      ww:"2〜3週間に1回（控えめ）",    ng:"寒さ・過湿",          why:"部屋の柱になる安定感。刺激で散った意識を戻す。",       img:"plants5.jpeg"  },
  gajumaru:   { name:"ガジュマル",         icon:"🌳", hana:"健康",          place:"明るい室内（直射は避ける）", ws:"7〜10日に1回（乾いたら）", ww:"2〜3週間に1回（控えめ）",   ng:"冷え・乾燥しすぎ",    why:"今ここに戻すアンカー。自分の場所を作れる。",           img:"plants6.jpeg"  },
  monstera:   { name:"モンステラ",         icon:"🌿", hana:"うれしい便り",  place:"明るい室内（直射NG）", ws:"7〜10日に1回（表面が乾いたら）", ww:"10〜14日に1回（控えめ）", ng:"冷え・直射",           why:"大きい葉の余白で落ち着く。視界の休憩所。",             img:"plants7.jpeg"  },
  schefflera: { name:"シェフレラ",         icon:"🍀", hana:"実直",          place:"明るい室内",         ws:"7〜10日に1回（乾いたら）",   ww:"10〜14日に1回（控えめ）",    ng:"寒さ・過湿",          why:"丈夫で折れにくい。ほどほどでいいを思い出せる。",       img:"plants8.jpeg"  },
  umbellata:  { name:"ウンベラータ",       icon:"🌱", hana:"すこやか",      place:"明るい室内（直射NG）", ws:"7〜10日に1回（乾いたら）",   ww:"10〜14日に1回（控えめ）",    ng:"冷え・急な移動",      why:"呼吸が戻る。思考の熱を下げる。",                       img:"plants9.jpeg"  },
  everfresh:  { name:"エバーフレッシュ",   icon:"✨", hana:"歓喜",          place:"明るい室内（直射NG）", ws:"5〜7日に1回（やや湿り気）",  ww:"10〜14日に1回（控えめ）",    ng:"乾燥しすぎ・冷え",    why:"葉が閉じる動きで1日の区切りが作れる。",               img:"plants10.jpeg" },
  ivy:        { name:"アイビー",           icon:"🌿", hana:"友情",          place:"明るい室内〜半日陰", ws:"5〜10日に1回（乾いたら）",   ww:"10〜14日に1回（控えめ）",    ng:"水切れ放置・直射",    why:"ちょい世話で満足感。手持ち無沙汰を優しく埋める。",     img:"plants11.jpeg" },
  spider:     { name:"オリヅルラン",       icon:"🌾", hana:"祝賀",          place:"明るい室内（直射NG）", ws:"7〜10日に1回（乾いたら）",   ww:"10〜14日に1回（控えめ）",    ng:"冷え・過湿",          why:"丈夫で増える＝小さな成功体験が積み上がる。",           img:"plants12.jpeg" },
  spath:      { name:"スパティフィラム",   icon:"🌸", hana:"清らかな心",    place:"明るい日陰（強光NG）", ws:"5〜7日に1回（乾く前に軽く）", ww:"10〜14日に1回（控えめ）",   ng:"乾燥しすぎ・直射",    why:"しおれ→水で戻る。反応が分かりやすく安心。",           img:"plants13.jpeg" },
  syngonium:  { name:"シンゴニウム",       icon:"🍃", hana:"喜び",          place:"明るい室内（直射NG）", ws:"7〜10日に1回（乾いたら）",   ww:"10〜14日に1回（控えめ）",    ng:"寒さ・過湿",          why:"観察の対象になって、考えすぎが軽くなる。",             img:"plants14.jpeg" },
  echeveria:  { name:"エケベリア（多肉）", icon:"🌵", hana:"優美",          place:"明るい場所（強光は慣らす）", ws:"2〜3週間に1回（乾いてから）", ww:"4〜6週間に1回（控えめ）", ng:"水やり過多・日照不足", why:"世話が少なく静けさ向き。神経の休憩に合う。",           img:"plants15.jpeg" },
  cactus:     { name:"サボテン（小型）",   icon:"🌵", hana:"枯れない愛",    place:"明るい場所（強光は慣らす）", ws:"3〜4週間に1回（乾いてから）", ww:"6〜8週間に1回（ほぼ不要）", ng:"水やり過多・急な強光", why:"余白の象徴。やらなくても崩れない安心。",               img:"plants16.jpeg" },
  peperomia:  { name:"ペペロミア",         icon:"🍀", hana:"可憐",          place:"明るい室内（直射NG）", ws:"7〜10日に1回（乾いたら）",   ww:"10〜14日に1回（控えめ）",    ng:"冷え・過湿",          why:"小さく優しい存在。自分のための小習慣が作れる。",       img:"plants17.jpeg" },
  pilea:      { name:"ピレア",             icon:"🌱", hana:"救済",          place:"明るい室内（直射NG）", ws:"7〜10日に1回（乾いたら）",   ww:"10〜14日に1回（控えめ）",    ng:"寒さ・過湿",          why:"丸い葉がやさしい。罪悪感を下げて自分OKに寄せる。",     img:"plants18.jpeg" },
  hoya:       { name:"ホヤ",               icon:"🌸", hana:"人生の幸福",    place:"明るい室内（直射NG）", ws:"2〜3週間に1回（乾いてから）", ww:"4〜6週間に1回（控えめ）",   ng:"過湿・寒さ",           why:"乾かし気味でOK。頑張りすぎず続く。",                   img:"plants19.jpeg" },
  calathea:   { name:"カラテア",           icon:"🌿", hana:"飛躍",          place:"明るい日陰（直射NG）", ws:"5〜7日に1回（乾かしすぎない）", ww:"10日に1回（控えめ）",     ng:"乾燥しすぎ・冷風",    why:"丁寧に扱う時間が自分への許可になる。",                 img:"plants20.jpeg" }
};

/* ------
   タイプ別プール
   ------ */
var POOLS = {
  depletion: ["sanse","zz","pothos","spider","cactus","echeveria","dracaena","schefflera"],
  overheat:  ["pachira","umbellata","everfresh","syngonium","spath","gajumaru","pilea","monstera"],
  overstim:  ["cactus","echeveria","dracaena","spath","ivy","monstera","sanse","syngonium"],
  selfsup:   ["zz","pothos","gajumaru","peperomia","pilea","hoya","umbellata","calathea","schefflera"]
};

/* ------
   状態
   ------ */
var answers = new Array(QUESTIONS.length).fill(null);

/* ------
   DOM取得
   ------ */
var quizEl         = document.getElementById("quiz");
var progFillEl     = document.getElementById("progressFill");
var progCountEl    = document.getElementById("answeredCount");
var btnReset       = document.getElementById("btnReset");
var btnResult      = document.getElementById("btnResult");
var resultSection  = document.getElementById("result");
var mainTypeEl     = document.getElementById("mainType");
var subTypeEl      = document.getElementById("subType");
var typeSummaryEl  = document.getElementById("typeSummary");
var plantGridEl    = document.getElementById("plantGrid");
var aboutBox       = document.getElementById("aboutBox");

/* ------
   スクロール補助
   ------ */
function scrollToId(id) {
  var el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ------
   ボタンイベント
   ------ */
document.getElementById("btnAbout").addEventListener("click", function () {
  aboutBox.hidden = !aboutBox.hidden;
});

document.getElementById("btnStart").addEventListener("click", function () {
  scrollToId("diagnosis");
});

document.getElementById("btnTop").addEventListener("click", function () {
  scrollToId("top");
});

document.getElementById("btnTop2").addEventListener("click", function () {
  scrollToId("top");
});

document.getElementById("btnBack").addEventListener("click", function () {
  scrollToId("diagnosis");
});

btnReset.addEventListener("click", function () {
  answers = new Array(QUESTIONS.length).fill(null);
  resultSection.hidden = true;
  renderQuiz();
  scrollToId("diagnosis");
});

btnResult.addEventListener("click", function () {
  var firstNull = -1;
  for (var i = 0; i < answers.length; i++) {
    if (answers[i] === null) { firstNull = i; break; }
  }
  if (firstNull !== -1) {
    var el = document.querySelector(".q[data-q='" + firstNull + "']");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  renderResult(diagnose());
});

/* ------
   クイズ描画
   ------ */
function renderQuiz() {
  quizEl.innerHTML = "";

  for (var i = 0; i < QUESTIONS.length; i++) {
    (function (idx) {
      var q = QUESTIONS[idx];

      var wrap = document.createElement("div");
      wrap.className = "q";
      wrap.setAttribute("data-q", idx);

      var numEl = document.createElement("div");
      numEl.className = "q-num";
      numEl.textContent = "質問 " + (idx + 1) + " / " + QUESTIONS.length;

      var titleEl = document.createElement("div");
      titleEl.className = "q-title";
      titleEl.textContent = q.text;

      var optsEl = document.createElement("div");
      optsEl.className = "options";

      for (var j = 0; j < SCALE.length; j++) {
        (function (sc) {
          var label = document.createElement("label");
          label.className = "option" + (answers[idx] === sc.s ? " selected" : "");

          var input = document.createElement("input");
          input.type = "radio";
          input.name = "q" + idx;
          input.value = sc.s;

          var badge = document.createElement("div");
          badge.className = "badge";
          badge.textContent = sc.b;

          var text = document.createElement("span");
          text.textContent = sc.l;

          label.appendChild(input);
          label.appendChild(badge);
          label.appendChild(text);

          label.addEventListener("click", function () {
            answers[idx] = sc.s;
            updateProgress();
            /* 同じ質問の全ラベルを更新 */
            var allLabels = wrap.querySelectorAll(".option");
            for (var k = 0; k < allLabels.length; k++) {
              allLabels[k].className = "option" + (SCALE[k].s === sc.s ? " selected" : "");
            }
          });

          optsEl.appendChild(label);
        })(SCALE[j]);
      }

      wrap.appendChild(numEl);
      wrap.appendChild(titleEl);
      wrap.appendChild(optsEl);
      quizEl.appendChild(wrap);
    })(i);
  }

  updateProgress();
}

function updateProgress() {
  var n = 0;
  for (var i = 0; i < answers.length; i++) {
    if (answers[i] !== null) n++;
  }
  progCountEl.textContent = n;
  progFillEl.style.width = Math.round(n / QUESTIONS.length * 100) + "%";
  btnResult.disabled = (n !== QUESTIONS.length);
}

/* ------
   診断
   ------ */
function diagnose() {
  var scores = {};
  for (var t = 0; t < TYPES.length; t++) scores[TYPES[t].id] = 0;

  var seed = 0;
  for (var i = 0; i < answers.length; i++) {
    var v = (answers[i] !== null) ? answers[i] : 3;
    seed = seed * 31 + v * (i + 1);
    var w = QUESTIONS[i].w;
    var keys = Object.keys(w);
    for (var k = 0; k < keys.length; k++) {
      scores[keys[k]] += v * w[keys[k]];
    }
  }

  var ranked = [];
  for (var t2 = 0; t2 < TYPES.length; t2++) {
    ranked.push({ id: TYPES[t2].id, icon: TYPES[t2].icon, name: TYPES[t2].name, summary: TYPES[t2].summary, score: scores[TYPES[t2].id] });
  }
  ranked.sort(function (a, b) { return b.score - a.score; });

  var main = ranked[0];
  var sub  = ranked[1];

  return { main: main, sub: sub, plants: pickPlants(main.id, sub.id, seed) };
}

function pickPlants(mainId, subId, seed) {
  var mp = (POOLS[mainId] || []).slice();
  var sp = (POOLS[subId]  || []).slice();
  shuffle(mp, seed);
  shuffle(sp, seed + 999);

  var out = [];
  for (var i = 0; i < mp.length; i++) { if (out.length >= 2) break; if (out.indexOf(mp[i]) === -1) out.push(mp[i]); }
  for (var j = 0; j < sp.length; j++) { if (out.length >= 3) break; if (out.indexOf(sp[j]) === -1) out.push(sp[j]); }
  for (var k = 0; k < mp.length; k++) { if (out.length >= 3) break; if (out.indexOf(mp[k]) === -1) out.push(mp[k]); }

  var result = [];
  for (var r = 0; r < Math.min(out.length, 3); r++) {
    var p = PLANTS[out[r]];
    if (p) result.push(p);
  }
  return result;
}

function shuffle(arr, seed) {
  var x = (seed | 0) || 123456789;
  for (var i = arr.length - 1; i > 0; i--) {
    x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
    var j = Math.abs(x) % (i + 1);
    var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }
}

/* ------
   結果描画
   ------ */
function renderResult(res) {
  mainTypeEl.textContent    = res.main.icon + " " + res.main.name;
  subTypeEl.textContent     = res.sub.icon  + " " + res.sub.name;
  typeSummaryEl.textContent = "🌱 " + res.main.summary;

  plantGridEl.innerHTML = "";

  for (var i = 0; i < res.plants.length; i++) {
    var p = res.plants[i];

    var card = document.createElement("div");
    card.className = "plant";

    /* タイトル */
    var h3 = document.createElement("h3");
    h3.textContent = p.icon + " 植物" + (i + 1) + "：" + p.name;
    var tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = "🌸 花言葉：" + p.hana;
    h3.appendChild(tag);
    card.appendChild(h3);

    /* 画像 */
    var imgWrap = document.createElement("div");
    imgWrap.className = "plant-img-wrap";
    var img = document.createElement("img");
    img.className = "plant-img";
    img.src = imgUrl(p.img);
    img.alt = p.name;
    img.loading = "lazy";
    imgWrap.appendChild(img);
    card.appendChild(imgWrap);

    /* テキスト情報 */
    var info = document.createElement("div");
    info.className = "plant-info";

    var kv = document.createElement("div");
    kv.className = "kv";
    kv.innerHTML =
      "<div class='k'>📍 場所</div><div class='v'>" + p.place + "</div>" +
      "<div class='k'>💧 春夏</div><div class='v'>" + p.ws + "</div>" +
      "<div class='k'>❄️ 冬</div><div class='v'>" + p.ww + "</div>" +
      "<div class='k'>⚠️ 注意</div><div class='v'>" + p.ng + "</div>";

    var why = document.createElement("div");
    why.className = "why";
    why.textContent = "🍃 " + p.why;

    info.appendChild(kv);
    info.appendChild(why);
    card.appendChild(info);

    plantGridEl.appendChild(card);
  }

  resultSection.hidden = false;
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ------
   起動
   ------ */
renderQuiz();
