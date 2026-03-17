/* ====== 余白の一鉢 | app_fix.js v9 ====== */

var SITE_URL = "https://yohaku-plants.github.io/yohakunohitohachi-app/";

function imgUrl(fileName) {
  return "./" + fileName;
}

var TYPES = [
  { id: "depletion", icon: "🍂", name: "余力枯渇タイプ（消耗）",
    summary: "毎日がんばりすぎて、気づいたら空っぽになっていませんか。回復する前に次のことが来てしまう、そんな状態かもしれません。まずは「お世話が少なくてもちゃんと育つ」植物と一緒に、小さな成功体験を積み重ねていきましょう。" },
  { id: "overheat", icon: "🌀", name: "思考過熱タイプ（思考オーバーヒート）",
    summary: "頭の中でいろんなことがぐるぐると回って、なかなか止まらないタイプです。考えること自体は悪くないけれど、休憩も大切。目に入るだけで気持ちが落ち着く植物が、そっとブレーキをかけてくれるかもしれません。" },
  { id: "overstim", icon: "⚡", name: "刺激過多タイプ（刺激疲れ）",
    summary: "情報やスマホ、予定の多さで、神経がじわじわ疲れているかもしれません。「何もしない時間」を少しずつ取り戻すために、静かにそこにいてくれる植物を部屋に迎えてみましょう。" },
  { id: "selfsup", icon: "🌾", name: "自己抑制タイプ（自己後回し）",
    summary: "誰かのことを優先するのが自然になっていて、自分のことは後回しになりがちではないですか。「自分のために何かをする」ことへの練習として、植物のお世話はぴったりです。" }
];

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

var SCALE = [
  { b: "A", l: "とても当てはまる",       s: 5 },
  { b: "B", l: "やや当てはまる",         s: 4 },
  { b: "C", l: "どちらともいえない",     s: 3 },
  { b: "D", l: "あまり当てはまらない",   s: 2 },
  { b: "E", l: "まったく当てはまらない", s: 1 }
];

var PLANTS = {
  sanse:      { name:"サンスベリア",       icon:"🌵", hana:"永久・不滅",   place:"明るい室内〜半日陰",         ws:"2〜3週間に1回（乾いてから）",    ww:"4〜6週間に1回（乾いてから）",  ng:"水のやりすぎ・低温",   why:"放っておいてもすくすく育つ、頼もしい植物です。余力が少ないときこそそっと寄り添ってくれます。",               img:"plants1.jpeg"  },
  zz:         { name:"ZZプランツ",         icon:"🌿", hana:"輝く未来",     place:"明るい室内〜半日陰",         ws:"2〜3週間に1回（乾いてから）",    ww:"4〜6週間に1回（乾いてから）",  ng:"水やり過多（根腐れ）", why:"水やりを忘れても元気でいてくれる、優しい植物です。無理なく続けられます。",                                   img:"plants2.jpeg"  },
  pothos:     { name:"ポトス",             icon:"🍃", hana:"永遠の富",     place:"明るい室内（レース越し）",   ws:"7〜10日に1回（表面が乾いたら）", ww:"10〜14日に1回（乾き気味）",    ng:"直射日光・受け皿の水", why:"どんな環境でもたくましく育ちます。悩んでいる日も、眺めるだけで続けられた気持ちが芽生えてきます。",             img:"plants3.jpeg"  },
  pachira:    { name:"パキラ",             icon:"🌴", hana:"快活・勝利",   place:"明るい室内（直射NG）",       ws:"7〜10日に1回（乾いたら）",       ww:"10〜14日に1回（控えめ）",      ng:"水やり過多・寒さ",     why:"水やりのタイミングが分かりやすく、ルーティンにしやすい植物です。",                                             img:"plants4.jpeg"  },
  dracaena:   { name:"ドラセナ",           icon:"🌾", hana:"幸福",         place:"明るい室内〜半日陰",         ws:"10日に1回（乾いてから）",        ww:"2〜3週間に1回（控えめ）",      ng:"寒さ・過湿",           why:"部屋にどんと構えてくれる、頼もしい存在感の植物です。",                                                         img:"plants5.jpeg"  },
  gajumaru:   { name:"ガジュマル",         icon:"🌳", hana:"健康",         place:"明るい室内（直射は避ける）", ws:"7〜10日に1回（乾いたら）",       ww:"2〜3週間に1回（控えめ）",      ng:"冷え・乾燥しすぎ",     why:"ぽてっとした幹がチャーミングで、見るだけで気持ちがほぐれます。",                                               img:"plants6.jpeg"  },
  monstera:   { name:"モンステラ",         icon:"🌿", hana:"うれしい便り", place:"明るい室内（直射NG）",       ws:"7〜10日に1回（表面が乾いたら）", ww:"10〜14日に1回（控えめ）",      ng:"冷え・直射",           why:"大きくて個性的な葉っぱが、視界に余白をつくってくれます。",                                                     img:"plants7.jpeg"  },
  schefflera: { name:"シェフレラ",         icon:"🍀", hana:"実直",         place:"明るい室内",                 ws:"7〜10日に1回（乾いたら）",       ww:"10〜14日に1回（控えめ）",      ng:"寒さ・過湿",           why:"丈夫で手がかからず、完璧にしなくていい、を思い出させてくれる植物です。",                                       img:"plants8.jpeg"  },
  umbellata:  { name:"ウンベラータ",       icon:"🌱", hana:"すこやか",     place:"明るい室内（直射NG）",       ws:"7〜10日に1回（乾いたら）",       ww:"10〜14日に1回（控えめ）",      ng:"冷え・急な移動",       why:"ハート形の大きな葉が、見ているだけで深呼吸させてくれます。",                                                   img:"plants9.jpeg"  },
  everfresh:  { name:"エバーフレッシュ",   icon:"✨", hana:"歓喜",         place:"明るい室内（直射NG）",       ws:"5〜7日に1回（やや湿り気）",      ww:"10〜14日に1回（控えめ）",      ng:"乾燥しすぎ・冷え",     why:"夜になると葉を閉じる動きが、1日の終わりのサインになってくれます。",                                             img:"plants10.jpeg" },
  ivy:        { name:"アイビー",           icon:"🌿", hana:"友情",         place:"明るい室内〜半日陰",         ws:"5〜10日に1回（乾いたら）",       ww:"10〜14日に1回（控えめ）",      ng:"水切れ放置・直射",     why:"つるを伸ばしながら育つ姿が可愛く、ちょっとしたお世話が満足感につながります。",                                 img:"plants11.jpeg" },
  spider:     { name:"オリヅルラン",       icon:"🌾", hana:"祝賀",         place:"明るい室内（直射NG）",       ws:"7〜10日に1回（乾いたら）",       ww:"10〜14日に1回（控えめ）",      ng:"冷え・過湿",           why:"丈夫でどんどん増えていく植物です。子株が育つたびに小さな達成感が積み上がります。",                             img:"plants12.jpeg" },
  spath:      { name:"スパティフィラム",   icon:"🌸", hana:"清らかな心",   place:"明るい日陰（強光NG）",       ws:"5〜7日に1回（乾く前に軽く）",    ww:"10〜14日に1回（控えめ）",      ng:"乾燥しすぎ・直射",     why:"水が足りないとしおれて、水をあげると復活する、分かりやすい植物です。",                                         img:"plants13.jpeg" },
  syngonium:  { name:"シンゴニウム",       icon:"🍃", hana:"喜び",         place:"明るい室内（直射NG）",       ws:"7〜10日に1回（乾いたら）",       ww:"10〜14日に1回（控えめ）",      ng:"寒さ・過湿",           why:"新しい葉がどんどん出てきて、観察するのが楽しい植物です。",                                                     img:"plants14.jpeg" },
  echeveria:  { name:"エケベリア（多肉）", icon:"🌵", hana:"優美",         place:"明るい場所（強光は慣らす）", ws:"2〜3週間に1回（乾いてから）",    ww:"4〜6週間に1回（控えめ）",      ng:"水やり過多・日照不足", why:"水やりの頻度がとても少なく、「何もしなくていい」という安心感を与えてくれます。",                               img:"plants15.jpeg" },
  cactus:     { name:"サボテン（小型）",   icon:"🌵", hana:"枯れない愛",   place:"明るい場所（強光は慣らす）", ws:"3〜4週間に1回（乾いてから）",    ww:"6〜8週間に1回（ほぼ不要）",    ng:"水やり過多・急な強光", why:"水やりがほぼ不要なのに、しっかり生きている姿が頼もしいです。余白の象徴のような存在です。",                     img:"plants16.jpeg" },
  peperomia:  { name:"ペペロミア",         icon:"🍀", hana:"可憐",         place:"明るい室内（直射NG）",       ws:"7〜10日に1回（乾いたら）",       ww:"10〜14日に1回（控えめ）",      ng:"冷え・過湿",           why:"小さくてかわいい植物です。自分のためだけにお世話する時間が、自分を大切にする練習になります。",                   img:"plants17.jpeg" },
  pilea:      { name:"ピレア",             icon:"🌱", hana:"救済",         place:"明るい室内（直射NG）",       ws:"7〜10日に1回（乾いたら）",       ww:"10〜14日に1回（控えめ）",      ng:"寒さ・過湿",           why:"丸くてやわらかい葉っぱが、見ているだけでほっとします。自分OKという気持ちをそっと後押ししてくれます。",           img:"plants18.jpeg" },
  hoya:       { name:"ホヤ",               icon:"🌸", hana:"人生の幸福",   place:"明るい室内（直射NG）",       ws:"2〜3週間に1回（乾いてから）",    ww:"4〜6週間に1回（控えめ）",      ng:"過湿・寒さ",           why:"乾かし気味でOKという、ゆるいお世話で育つ植物です。頑張りすぎず続く感覚を教えてくれます。",                       img:"plants19.jpeg" },
  calathea:   { name:"カラテア",           icon:"🌿", hana:"飛躍",         place:"明るい日陰（直射NG）",       ws:"5〜7日に1回（乾かしすぎない）",  ww:"10日に1回（控えめ）",          ng:"乾燥しすぎ・冷風",     why:"少し気をつかって育てる植物です。丁寧に扱う時間が、自分自身を大切にすることへの許可になっていきます。",           img:"plants20.jpeg" }
};

var POOLS = {
  depletion: ["sanse","zz","pothos","spider","cactus","echeveria","dracaena","schefflera"],
  overheat:  ["pachira","umbellata","everfresh","syngonium","spath","gajumaru","pilea","monstera"],
  overstim:  ["cactus","echeveria","dracaena","spath","ivy","monstera","sanse","syngonium"],
  selfsup:   ["zz","pothos","gajumaru","peperomia","pilea","hoya","umbellata","calathea","schefflera"]
};

var answers = new Array(QUESTIONS.length).fill(null);

var quizEl        = document.getElementById("quiz");
var progFillEl    = document.getElementById("progressFill");
var progCountEl   = document.getElementById("answeredCount");
var btnReset      = document.getElementById("btnReset");
var btnResult     = document.getElementById("btnResult");
var resultSection = document.getElementById("result");
var mainTypeEl    = document.getElementById("mainType");
var subTypeEl     = document.getElementById("subType");
var typeSummaryEl = document.getElementById("typeSummary");
var plantGridEl   = document.getElementById("plantGrid");
var aboutBox      = document.getElementById("aboutBox");

function scrollToId(id) {
  var el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.getElementById("btnAbout").addEventListener("click", function () {
  aboutBox.hidden = !aboutBox.hidden;
});
document.getElementById("btnStart").addEventListener("click", function () { scrollToId("diagnosis"); });
document.getElementById("btnTop").addEventListener("click",   function () { scrollToId("top"); });
document.getElementById("btnTop2").addEventListener("click",  function () { scrollToId("top"); });
document.getElementById("btnBack").addEventListener("click",  function () { scrollToId("diagnosis"); });

btnReset.addEventListener("click", function () {
  answers = new Array(QUESTIONS.length).fill(null);
  resultSection.hidden = true;
  renderQuiz();
  scrollToId("diagnosis");
});

btnResult.addEventListener("click", function () {
  for (var i = 0; i < answers.length; i++) {
    if (answers[i] === null) {
      var el = document.querySelector(".q[data-q='" + i + "']");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
  }
  renderResult(diagnose());
});

function renderQuiz() {
  quizEl.innerHTML = "";
  for (var i = 0; i < QUESTIONS.length; i++) {
    (function (idx) {
      var wrap = document.createElement("div");
      wrap.className = "q";
      wrap.setAttribute("data-q", idx);

      var numEl = document.createElement("div");
      numEl.className = "q-num";
      numEl.textContent = "質問 " + (idx + 1) + " / " + QUESTIONS.length;

      var titleEl = document.createElement("div");
      titleEl.className = "q-title";
      titleEl.textContent = QUESTIONS[idx].text;

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
            var all = wrap.querySelectorAll(".option");
            for (var k = 0; k < all.length; k++) {
              all[k].className = "option" + (SCALE[k].s === sc.s ? " selected" : "");
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
  for (var i = 0; i < answers.length; i++) { if (answers[i] !== null) n++; }
  progCountEl.textContent = n;
  progFillEl.style.width = Math.round(n / QUESTIONS.length * 100) + "%";
  btnResult.disabled = (n !== QUESTIONS.length);
}

function diagnose() {
  var scores = {};
  for (var t = 0; t < TYPES.length; t++) scores[TYPES[t].id] = 0;
  var seed = 0;
  for (var i = 0; i < answers.length; i++) {
    var v = answers[i] !== null ? answers[i] : 3;
    seed = seed * 31 + v * (i + 1);
    var keys = Object.keys(QUESTIONS[i].w);
    for (var k = 0; k < keys.length; k++) scores[keys[k]] += v * QUESTIONS[i].w[keys[k]];
  }
  var ranked = [];
  for (var t2 = 0; t2 < TYPES.length; t2++) {
    ranked.push({ id: TYPES[t2].id, icon: TYPES[t2].icon, name: TYPES[t2].name, summary: TYPES[t2].summary, score: scores[TYPES[t2].id] });
  }
  ranked.sort(function (a, b) { return b.score - a.score; });
  return { main: ranked[0], sub: ranked[1], plants: pickPlants(ranked[0].id, ranked[1].id, seed) };
}

function pickPlants(mainId, subId, seed) {
  var mp = (POOLS[mainId] || []).slice();
  var sp = (POOLS[subId]  || []).slice();
  shuffle(mp, seed); shuffle(sp, seed + 999);
  var out = [];
  for (var i = 0; i < mp.length; i++) { if (out.length >= 2) break; if (out.indexOf(mp[i]) === -1) out.push(mp[i]); }
  for (var j = 0; j < sp.length; j++) { if (out.length >= 3) break; if (out.indexOf(sp[j]) === -1) out.push(sp[j]); }
  for (var k = 0; k < mp.length; k++) { if (out.length >= 3) break; if (out.indexOf(mp[k]) === -1) out.push(mp[k]); }
  var result = [];
  for (var r = 0; r < out.length && r < 3; r++) { if (PLANTS[out[r]]) result.push(PLANTS[out[r]]); }
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

function renderResult(res) {
  mainTypeEl.textContent    = res.main.icon + " " + res.main.name;
  subTypeEl.textContent     = res.sub.icon  + " " + res.sub.name;
  typeSummaryEl.textContent = res.main.summary;

  plantGridEl.innerHTML = "";

  for (var i = 0; i < res.plants.length; i++) {
    var p = res.plants[i];
    var card = document.createElement("div");
    card.className = "plant";

    var h3 = document.createElement("h3");
    h3.textContent = p.icon + " 植物" + (i + 1) + "：" + p.name;
    var tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = "🌸 花言葉：" + p.hana;
    h3.appendChild(tag);
    card.appendChild(h3);

    var imgWrap = document.createElement("div");
    imgWrap.className = "plant-img-wrap";
    var img = document.createElement("img");
    img.className = "plant-img";
    img.alt = p.name;
    img.loading = "lazy";
    img.src = imgUrl(p.img);
    imgWrap.appendChild(img);
    card.appendChild(imgWrap);

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

  /* ====== 結果カード（Instagram保存用） ====== */
  var cardWrap = document.createElement("div");
  cardWrap.className = "result-card-wrap";
  cardWrap.innerHTML =
    '<div id="resultCard">' +
      '<div class="rc-site">🌿 余白の一鉢｜観葉植物診断</div>' +
      '<div class="rc-deco">🌿</div>' +
      '<div class="rc-type">' + res.main.icon + ' ' + res.main.name + '</div>' +
      '<div class="rc-sub">副タイプ：' + res.sub.name + '</div>' +
      '<div class="rc-plants">' + res.plants.map(function(p){ return p.icon + ' ' + p.name; }).join('　') + '</div>' +
      '<div class="rc-url">yohaku-plants.github.io/yohakunohitohachi-app</div>' +
    '</div>';

  /* ====== シェアボックス ====== */
  var xText = "私は【" + res.main.name + "】でした🌿\n"
    + "おすすめ植物：" + res.plants.map(function(p){ return p.name; }).join("・") + "\n"
    + "あなたのタイプは？👇\n" + SITE_URL;

  var lineText = "🌿 余白の一鉢 診断結果\n"
    + "私のタイプ：" + res.main.name + "\n"
    + "おすすめ植物：" + res.plants.map(function(p){ return p.name; }).join("・") + "\n"
    + "あなたも診断してみて👇\n" + SITE_URL;

  var shareBox = document.createElement("div");
  shareBox.className = "share-box";
  shareBox.innerHTML = '<div class="share-title">🌿 診断結果をシェアする</div>'
    + '<div class="share-btns" id="shareBtns"></div>'
    + '<div class="share-note">Instagramは画像を保存後、ストーリーに貼り付けてください🌱</div>';

  resultSection.appendChild(cardWrap);
  resultSection.appendChild(shareBox);
  resultSection.hidden = false;
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });

  var shareBtns = document.getElementById("shareBtns");

  /* Xボタン */
  var btnX = document.createElement("button");
  btnX.className = "share-btn share-btn-x";
  btnX.textContent = "𝕏  Xでシェアする";
  btnX.addEventListener("click", function () {
    window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(xText), "_blank");
  });

  /* Instagramボタン */
  var btnInsta = document.createElement("button");
  btnInsta.className = "share-btn share-btn-insta";
  btnInsta.textContent = "📸  Instagram用に画像を保存";
  btnInsta.addEventListener("click", function () {
    var cardEl = document.getElementById("resultCard");
    if (!cardEl) return;
    if (typeof html2canvas === "undefined") {
      alert("しばらく待ってから再度お試しください。");
      return;
    }
    btnInsta.textContent = "⏳ 画像を生成中...";
    btnInsta.disabled = true;
    html2canvas(cardEl, { scale: 2, useCORS: true }).then(function (canvas) {
      var link = document.createElement("a");
      link.download = "yohaku-plants-result.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      btnInsta.textContent = "✅ 保存できました！ストーリーに貼ってね";
      btnInsta.disabled = false;
      setTimeout(function () { btnInsta.textContent = "📸  Instagram用に画像を保存"; }, 4000);
    }).catch(function () {
      btnInsta.textContent = "📸  Instagram用に画像を保存";
      btnInsta.disabled = false;
    });
  });

  /* LINEボタン */
  var btnLine = document.createElement("button");
  btnLine.className = "share-btn share-btn-line";
  btnLine.textContent = "💬  LINEでシェアする";
  btnLine.addEventListener("click", function () {
    window.open("https://social-plugins.line.me/lineit/share?url=" + encodeURIComponent(SITE_URL) + "&text=" + encodeURIComponent(lineText), "_blank");
  });

  /* Facebookボタン */
  var btnFb = document.createElement("button");
  btnFb.className = "share-btn share-btn-fb";
  btnFb.textContent = "📘  Facebookでシェアする";
  btnFb.addEventListener("click", function () {
    window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(SITE_URL), "_blank");
  });

  shareBtns.appendChild(btnX);
  shareBtns.appendChild(btnInsta);
  shareBtns.appendChild(btnLine);
  shareBtns.appendChild(btnFb);
}

renderQuiz();
