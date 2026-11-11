/* 小前宝 ProstaPal · 业务页（模拟演示）
 *
 * 页面内所有患者资料来自 demo-data.js，全部标注为模拟演示；
 * 页面内没有聊天窗、输入框或发送键。AI 入口只把预写提示词交给 DSH 原生会话。
 */
(function () {
  'use strict';

  var D = window.PROSTATE_DEMO;
  var EMBEDDED = window.parent !== window;
  var main = document.getElementById('main');
  var nav = document.getElementById('nav');
  var toastEl = document.getElementById('toast');
  var fontToggle = document.getElementById('font-toggle');
  var agentBtn = document.getElementById('agent-btn');

  var NAV = [
    { id: 'home', label: '今日看板', mark: '今' },
    { id: 'psa', label: 'PSA 趋势', mark: 'PSA' },
    { id: 'adt', label: 'ADT 用药与副作用', mark: 'ADT' },
    { id: 'rehab', label: '排尿与性功能康复', mark: '康' },
    { id: 'surveillance', label: '主动监测', mark: '监' },
    { id: 'followup', label: '复诊准备', mark: '诊' },
    { id: 'trials', label: '临床试验', mark: '试' },
    { id: 'principles', label: '这版能做什么', mark: '界' }
  ];

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function daysBetween(from, to) {
    var a = Date.parse(from + 'T00:00:00Z');
    var b = Date.parse(to + 'T00:00:00Z');
    if (!isFinite(a) || !isFinite(b)) return null;
    return Math.round((b - a) / 86400000);
  }

  function toast(message) {
    toastEl.textContent = message;
    toastEl.classList.add('show');
    window.clearTimeout(toast._timer);
    toast._timer = window.setTimeout(function () { toastEl.classList.remove('show'); }, 3600);
  }

  function table(head, rows) {
    return '<div class="table-wrap"><table><thead><tr>' +
      head.map(function (h) { return '<th scope="col">' + esc(h) + '</th>'; }).join('') +
      '</tr></thead><tbody>' +
      rows.map(function (row) {
        return '<tr>' + row.map(function (cell) { return '<td>' + esc(cell) + '</td>'; }).join('') + '</tr>';
      }).join('') +
      '</tbody></table></div>';
  }

  function card(title, desc, body, actions) {
    return '<section class="card">' +
      '<div class="card-head"><div><h2>' + esc(title) + '</h2>' +
      (desc ? '<p>' + esc(desc) + '</p>' : '') + '</div></div>' +
      body + (actions || '') + '</section>';
  }

  function pageHead(title, desc, viewId) {
    return '<div class="page-head"><div><span class="eyebrow">模拟演示 · ' + esc(D.profile.code) + '</span>' +
      '<h1>' + esc(title) + '</h1><p>' + esc(desc) + '</p></div>' +
      '<button type="button" class="chip-btn" data-view="' + esc(viewId) + '">回到看板</button></div>';
  }

  /* ---------------- 折线图（只画数值与日期） ---------------- */

  function psaChart(items) {
    var w = 720, h = 250, left = 46, right = 18, top = 26, bottom = 40;
    var max = 10;
    var innerW = w - left - right;
    var innerH = h - top - bottom;
    var step = items.length > 1 ? innerW / (items.length - 1) : 0;
    var points = items.map(function (item, index) {
      var x = left + step * index;
      var y = top + innerH - (Math.min(item.value, max) / max) * innerH;
      return { x: x, y: y, item: item };
    });
    var line = points.map(function (p, i) { return (i ? 'L' : 'M') + p.x.toFixed(1) + ' ' + p.y.toFixed(1); }).join(' ');
    var grid = [0, 2, 4, 6, 8, 10].map(function (v) {
      var y = top + innerH - (v / max) * innerH;
      return '<line class="grid" x1="' + left + '" x2="' + (w - right) + '" y1="' + y.toFixed(1) + '" y2="' + y.toFixed(1) + '"/>' +
        '<text class="axis" x="' + (left - 8) + '" y="' + (y + 4).toFixed(1) + '" text-anchor="end">' + v + '</text>';
    }).join('');
    var dots = points.map(function (p) {
      return '<circle class="dot" cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="3.6"/>' +
        '<text class="value" x="' + p.x.toFixed(1) + '" y="' + (p.y - 10).toFixed(1) + '" text-anchor="middle">' + esc(p.item.value) + '</text>' +
        '<text class="tick" x="' + p.x.toFixed(1) + '" y="' + (h - 16) + '" text-anchor="middle">' + esc(p.item.date.slice(5)) + '</text>';
    }).join('');
    return '<svg class="psa-chart" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="PSA 数值与日期的折线，共 ' + items.length + ' 次记录，单位 ng/mL">' +
      grid +
      '<line class="axis-line" x1="' + left + '" x2="' + (w - right) + '" y1="' + (top + innerH) + '" y2="' + (top + innerH) + '"/>' +
      '<path class="psa-line" d="' + line + '"/>' + dots +
      '<text class="unit" x="' + left + '" y="15">ng/mL</text></svg>';
  }

  function miniLine(items) {
    var w = 260, h = 58, pad = 4;
    var max = Math.max.apply(null, items.map(function (i) { return i.value; })) || 1;
    var step = items.length > 1 ? (w - pad * 2) / (items.length - 1) : 0;
    var d = items.map(function (item, index) {
      var x = pad + step * index;
      var y = pad + (h - pad * 2) - (item.value / max) * (h - pad * 2);
      return (index ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
    }).join(' ');
    return '<svg class="mini-line" viewBox="0 0 ' + w + ' ' + h + '" aria-hidden="true"><path d="' + d + '"/></svg>';
  }

  /* ---------------- 状态卡与看板 ---------------- */

  function statusCard() {
    var day = daysBetween(D.anchor.date, D.meta.asOf);
    var next = D.followup.next;
    var until = daysBetween(D.meta.asOf, next.date);
    return '<section class="card status-card" aria-label="D+N 状态卡">' +
      '<p class="status-eyebrow">D+' + day + ' 状态卡 · 距下次随访 ' + until + ' 天</p>' +
      '<p class="status-day"><b>第 ' + day + ' 天</b><span class="status-anchor">锚点：' + esc(D.anchor.date) + ' ' + esc(D.anchor.label) + '</span></p>' +
      '<p class="status-now"><span class="status-phase">当前路径：ADT 联合放疗后随访（记录原文）</span>' +
      '<span class="status-next">下次：' + esc(next.date) + ' ' + esc(next.dept) + '（' + esc(next.source) + '）</span></p>' +
      '<div class="status-actions">' +
      '<button type="button" class="primary" data-view="followup">看复诊准备 →</button>' +
      '<button type="button" data-view="adt">看 ADT 用药与副作用</button>' +
      '</div></section>';
  }

  function homeView() {
    var psa = D.psa.items;
    var latest = psa[psa.length - 1];
    var adt = D.adt;
    var lastEffect = adt.effects[adt.effects.length - 1];
    var urinary = D.rehab.urinary[D.rehab.urinary.length - 1];
    var training = D.rehab.training[D.rehab.training.length - 1];
    var surv = D.surveillance;
    var lastBiopsy = surv.timeline.filter(function (r) { return r.item === '重复穿刺'; }).slice(-1)[0];
    var q = D.followup.questions;
    var asked = q.filter(function (x) { return x.asked; }).length;
    var trialCounts = D.trials.items.reduce(function (acc, t) { acc[t.overall] = (acc[t.overall] || 0) + 1; return acc; }, {});

    return pageHead('今日看板', '已记录的日期、数值与来源；空着的位置就是还没有记录。', 'home') +
      statusCard() +
      '<section class="today" aria-label="今日与接下来">' +
      '<div class="today-item"><span class="today-mark">今</span><div><b>今天可记的一项</b><p>潮热次数与夜尿次数（自述记录，只记数值）</p></div>' +
      '<button type="button" data-view="rehab">去记录 →</button></div>' +
      '<div class="today-item"><span class="today-mark">近</span><div><b>' + esc(D.followup.labs[0].date) + ' PSA 抽血</b><p>' + esc(D.followup.labs[0].source) + '</p></div>' +
      '<button type="button" data-view="followup">看准备清单 →</button></div>' +
      '<div class="today-item"><span class="today-mark">下</span><div><b>' + esc(D.followup.next.date) + ' ' + esc(D.followup.next.dept) + '</b><p>距数据截止 ' + daysBetween(D.meta.asOf, D.followup.next.date) + ' 天 · ' + q.length + ' 条问题，已问 ' + asked + ' 条</p></div>' +
      '<button type="button" data-view="followup">看问题清单 →</button></div>' +
      '</section>' +
      '<div class="card-grid">' +
      '<section class="card biz-card"><div class="card-head"><div><h2>PSA 趋势</h2><p>共 ' + psa.length + ' 次记录 · 单位 ng/mL</p></div><span class="num-badge">最近 ' + esc(latest.value) + '</span></div>' +
      miniLine(psa) +
      '<p class="card-note">最近一次：' + esc(latest.date) + ' · ' + esc(latest.lab) + '</p>' +
      '<button type="button" class="link-btn" data-view="psa">打开 PSA 趋势 →</button></section>' +

      '<section class="card biz-card"><div class="card-head"><div><h2>ADT 用药与副作用</h2><p>下一针 ' + esc(adt.nextDose.date) + ' · ' + esc(adt.nextDose.item) + '</p></div><span class="num-badge">' + adt.doses.length + ' 次</span></div>' +
      '<p class="card-note">最近一条身体记录：' + esc(lastEffect.date) + ' · ' + esc(lastEffect.item) + ' ' + esc(lastEffect.value) + '</p>' +
      '<p class="card-note">副作用记录 ' + adt.effects.length + ' 条 · 体重与骨密度 ' + adt.body.length + ' 条</p>' +
      '<button type="button" class="link-btn" data-view="adt">打开用药与副作用 →</button></section>' +

      '<section class="card biz-card"><div class="card-head"><div><h2>排尿与性功能康复</h2><p>只存原始作答，不给总分</p></div><span class="num-badge">' + D.rehab.urinary.length + ' 次</span></div>' +
      '<p class="card-note">最近一次：' + esc(urinary.date) + ' · 夜尿 ' + esc(urinary.nocturia) + ' · 漏尿 ' + esc(urinary.pad) + '</p>' +
      '<p class="card-note">盆底肌训练：' + esc(training.value) + '</p>' +
      '<button type="button" class="link-btn" data-view="rehab">打开康复记录 →</button></section>' +

      '<section class="card biz-card"><div class="card-head"><div><h2>主动监测</h2><p>历史路径 · ' + esc(surv.ended) + ' 转入放疗联合 ADT</p></div><span class="num-badge">' + surv.timeline.length + ' 条</span></div>' +
      '<p class="card-note">最近一次重复穿刺：' + esc(lastBiopsy ? lastBiopsy.date : '未记录') + '</p>' +
      '<p class="card-note">' + esc(lastBiopsy ? lastBiopsy.detail : '') + '</p>' +
      '<button type="button" class="link-btn" data-view="surveillance">打开主动监测记录 →</button></section>' +

      '<section class="card biz-card"><div class="card-head"><div><h2>复诊准备</h2><p>' + esc(D.followup.next.date) + ' · ' + esc(D.followup.next.dept) + '</p></div><span class="num-badge">' + q.length + ' 问</span></div>' +
      '<p class="card-note">已问 ' + asked + ' 条 · 未问 ' + (q.length - asked) + ' 条</p>' +
      '<p class="card-note">需要带的材料 ' + D.followup.bring.length + ' 项</p>' +
      '<button type="button" class="link-btn" data-view="followup">打开复诊准备 →</button></section>' +

      '<section class="card biz-card"><div class="card-head"><div><h2>临床试验</h2><p>演示条目 ' + D.trials.items.length + ' 条 · 逐字段比对</p></div><span class="num-badge">' + D.trials.items.length + '</span></div>' +
      '<p class="card-note">符合 ' + (trialCounts['符合'] || 0) + ' 条 · 无法判定 ' + (trialCounts['无法判定'] || 0) + ' 条 · 不符合 ' + (trialCounts['不符合'] || 0) + ' 条</p>' +
      '<button type="button" class="link-btn" data-view="trials">打开临床试验 →</button></section>' +
      '</div>' +

      card('病理与分期（报告原文）', D.pathology.note,
        table(['日期', '字段', '报告原文', '来源'], D.pathology.items.map(function (r) {
          return [r.date, r.field, r.text, r.source];
        })), '<p class="foot-note">分级、分期与分组字段照抄；三者的关系由医生判断，本台不做换算。</p>') +
      '<section class="notice"><b>本页不判断病情。</b>只把已记录的日期、数值、单位与来源摆出来，并标出还没有记录的位置。</section>';
  }

  function psaView() {
    var items = D.psa.items;
    var first = items[0], last = items[items.length - 1];
    return pageHead('PSA 趋势', D.psa.note, 'psa') +
      card('数值与日期', '单位 ' + D.psa.unit + ' · 检测方法：' + D.psa.method, psaChart(items) +
        '<p class="foot-note">记录范围：' + esc(first.date) + ' 至 ' + esc(last.date) + ' · 共 ' + items.length + ' 次。图只连数值点，不画参考线、不做比较。</p>') +
      card('全部记录', '按日期正序；来源为报告抬头的机构名', table(['日期', 'PSA', '单位', '检测机构'], items.map(function (r) {
        return [r.date, String(r.value), D.psa.unit, r.lab];
      }))) +
      '<section class="notice"><b>PSA 是监测与提示指标，不是诊断结论</b>（README 原文）。本页只存数值、日期、单位与检测方法，不写数值变化的含义。</section>';
  }

  function adtView() {
    var adt = D.adt;
    return pageHead('ADT 用药与副作用', adt.note, 'adt') +
      card('当前方案（记录原文）', '开始日同时是状态卡的锚点',
        table(['日期', '记录原文', '来源'], adt.plan.map(function (r) { return [r.date, r.item, r.source]; })) +
        '<p class="foot-note">下一针：' + esc(adt.nextDose.date) + ' · ' + esc(adt.nextDose.item) + '（' + esc(adt.nextDose.source) + '）</p>') +
      card('用药日期', '按记录逐条列出，不推算周期', table(['日期', '用药记录'], adt.doses.map(function (r) { return [r.date, r.item]; }))) +
      card('副作用与身体记录', '只记日期、项目、数值与单位；自评保留原始作答', table(['日期', '项目', '数值', '来源'], adt.effects.concat(adt.body).sort(function (a, b) {
        return a.date < b.date ? 1 : -1;
      }).map(function (r) { return [r.date, r.item, r.value, r.source]; }))) +
      '<section class="notice">本页没有“该不该继续用药”的判断，也没有评分总分。记录带去哪一次门诊、给谁看，由你决定。</section>';
  }

  function rehabView() {
    var r = D.rehab;
    return pageHead('排尿与性功能康复', r.note, 'rehab') +
      card('排尿记录', '夜尿、尿急、漏尿分别记数值与单位', table(['日期', '夜尿', '尿急', '漏尿', '来源'], r.urinary.map(function (x) {
        return [x.date, x.nocturia, x.urgency, x.pad, x.source];
      }))) +
      card('性功能（原始作答）', '只存每次作答，不计算总分、不与他人比较', table(['日期', '勃起硬度', '晨勃', '性欲'], r.sexual.map(function (x) {
        return [x.date, x.hardness, x.morning, x.desire];
      }))) +
      card('盆底肌训练', '训练记录照抄，不评价动作是否到位', table(['日期', '项目', '记录'], r.training.map(function (x) {
        return [x.date, x.item, x.value];
      }))) +
      '<section class="notice">这些记录会被带去复诊；本页不判断恢复程度，也不与其他人比较。</section>';
  }

  function surveillanceView() {
    var s = D.surveillance;
    return pageHead('主动监测', s.note, 'surveillance') +
      card('历史时间线', '进入、复查、影像、穿刺与路径变更，按日期排列', table(['日期', '事项', '记录', '来源'], s.timeline.map(function (x) {
        return [x.date, x.item, x.detail, x.source];
      }))) +
      '<section class="notice"><b>当前状态：</b>本档案自 ' + esc(s.ended) + ' 起不再处于主动监测路径。本页只保留历史记录，不写“应不应该继续监测”。</section>';
  }

  function followupView() {
    var f = D.followup;
    var asked = f.questions.filter(function (q) { return q.asked; }).length;
    return pageHead('复诊准备', '把要问的问题与要带的材料放在同一页，去门诊时按顺序过一遍。', 'followup') +
      card('下一次门诊', '预约单原文照抄',
        '<div class="visit"><div><span class="eyebrow">日期</span><b>' + esc(f.next.date) + '</b></div>' +
        '<div><span class="eyebrow">科室</span><b>' + esc(f.next.dept) + '</b></div>' +
        '<div><span class="eyebrow">来源</span><b>' + esc(f.next.source) + '</b></div></div>' +
        '<p class="foot-note">抽血：' + esc(f.labs[0].date) + ' · ' + esc(f.labs[0].item) + '（' + esc(f.labs[0].source) + '）</p>') +
      card('问题清单', '共 ' + f.questions.length + ' 条 · 已问 ' + asked + ' 条 · 未问 ' + (f.questions.length - asked) + ' 条',
        '<ol class="question-list">' + f.questions.map(function (q) {
          return '<li><span class="q-text">' + esc(q.text) + '</span><span class="q-state">' +
            (q.asked ? '已问 · ' + esc(q.askedAt || '') : '未问') + '</span></li>';
        }).join('') + '</ol>') +
      card('需要带的材料', '按准备清单逐项核对', '<ul class="plain-list">' + f.bring.map(function (x) {
        return '<li>' + esc(x) + '</li>';
      }).join('') + '</ul>') +
      '<section class="notice">这份清单只整理你自己的记录与问题，不替你回答，也不代替医生。</section>';
  }

  function trialsView() {
    var t = D.trials;
    return pageHead('临床试验', t.note, 'trials') +
      t.items.map(function (item) {
        return '<section class="card trial-card">' +
          '<div class="card-head"><div><h2>' + esc(item.title) + '</h2><p>登记号 ' + esc(item.id) + ' · ' + esc(item.place) + '</p></div>' +
          '<span class="verdict">' + esc(item.overall) + '</span></div>' +
          table(['条件字段', '档案记录', '逐项求值', '依据'], item.criteria.map(function (c) {
            return [c.field, c.record, c.verdict, c.basis];
          })) +
          '<p class="foot-note">整体求值：' + esc(item.overall) + '（任一条件不符合即为不符合；有缺失字段即为无法判定）。</p>' +
          '</section>';
      }).join('') +
      '<section class="notice"><b>来源与边界：</b>以上条目为演示数据（demo-data.js），不是真实临床试验登记信息。字段逐项与档案记录比对，缺失记为「无法判定」；本页不给匹配度百分比、不做排序，也不构成入组判断。是否参加，需由你和治疗团队向研究机构核实。</section>';
  }

  function principlesView() {
    return pageHead('这版能做什么', '当前是随包发出的模拟演示页，用来确认结构与信息边界。', 'principles') +
      card('已具备', '六条业务线都有可打开的页面与模拟数据',
        '<ul class="plain-list">' +
        '<li>今日看板：D+N 状态卡（由锚点日派生）、今日/接下来、六张业务卡。</li>' +
        '<li>PSA 趋势：数值、日期、单位、检测方法与全部记录。</li>' +
        '<li>ADT 用药与副作用：方案、用药日期、副作用、体重与骨密度记录。</li>' +
        '<li>排尿与性功能康复：夜尿/尿急/漏尿、原始作答、盆底肌训练记录。</li>' +
        '<li>主动监测：进入、复查、影像、穿刺与路径变更的时间线。</li>' +
        '<li>复诊准备：下一次门诊、问题清单、需要带的材料。</li>' +
        '<li>临床试验：演示条目逐字段比对，三档求值（符合/不符合/无法判定）。</li>' +
        '</ul>') +
      card('明确不做', '页面不自建 AI，也不判断病情',
        '<ul class="plain-list">' +
        '<li>不判断病情，不给诊断、检查或用药处置意见，不给评分总分。</li>' +
        '<li>不改写报告原文；分级、分期与分组字段照抄，并标出来源。</li>' +
        '<li>页面内没有聊天窗、输入框或发送键。顶栏「和 AI 讨论」只把本页提示词交给 DSH 原生会话。</li>' +
        '<li>不读写真实文件、不连接医院系统；刷新即重置。</li>' +
        '</ul>') +
      '<section class="notice">数据边界见 README「疾病概要」与 docs/BRIEF.md。正式业务数据与 API 尚未接入，本页只用于结构与文案验收。</section>';
  }

  var VIEWS = {
    home: { title: '今日看板', render: homeView },
    psa: { title: 'PSA 趋势', render: psaView },
    adt: { title: 'ADT 用药与副作用', render: adtView },
    rehab: { title: '排尿与性功能康复', render: rehabView },
    surveillance: { title: '主动监测', render: surveillanceView },
    followup: { title: '复诊准备', render: followupView },
    trials: { title: '临床试验', render: trialsView },
    principles: { title: '这版能做什么', render: principlesView }
  };

  /* ---------------- 导航与渲染 ---------------- */

  function currentView() {
    var id = (location.hash || '').replace(/^#/, '');
    return VIEWS[id] ? id : 'home';
  }

  function renderNav(active) {
    nav.innerHTML = NAV.map(function (item) {
      var current = item.id === active;
      return '<a class="nav-item' + (current ? ' is-current' : '') + '" href="#' + item.id + '"' +
        (current ? ' aria-current="page"' : '') + ' data-nav="' + item.id + '">' +
        '<span class="nav-mark" aria-hidden="true">' + esc(item.mark) + '</span>' +
        '<span>' + esc(item.label) + '</span></a>';
    }).join('');
  }

  function render() {
    var id = currentView();
    var view = VIEWS[id];
    renderNav(id);
    document.getElementById('breadcrumb').textContent = view.title;
    main.innerHTML = view.render();
    document.title = view.title + ' · 小前宝 ProstaPal v0.1.4';
    main.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }

  /* ---------------- AI：只交给宿主原生会话 ---------------- */

  function promptFor(id) {
    var head = '请帮我把「小前宝 ProstaPal」本页（' + VIEWS[id].title + '）的记录按日期整理成一张表，并列出记录里缺失的字段；不要给诊断、检查或用药处置意见。';
    var meta = '档案（模拟演示）：' + D.profile.name + '，' + D.profile.age + ' 岁；锚点 ' + D.anchor.date + '（' + D.anchor.label + '）。';
    var body = '';
    if (id === 'psa') {
      body = 'PSA 记录：' + D.psa.items.map(function (r) { return r.date + ' ' + r.value + ' ' + D.psa.unit + '（' + r.lab + '）'; }).join('；') + '。';
    } else if (id === 'adt') {
      body = 'ADT 方案：' + D.adt.plan.map(function (r) { return r.date + ' ' + r.item; }).join('；') +
        '。副作用记录：' + D.adt.effects.map(function (r) { return r.date + ' ' + r.item + ' ' + r.value; }).join('；') + '。';
    } else if (id === 'rehab') {
      body = '排尿记录：' + D.rehab.urinary.map(function (r) { return r.date + ' 夜尿' + r.nocturia + '、尿急' + r.urgency + '、漏尿' + r.pad; }).join('；') +
        '。性功能原始作答：' + D.rehab.sexual.map(function (r) { return r.date + ' 硬度' + r.hardness + '、晨勃' + r.morning + '、性欲' + r.desire; }).join('；') + '。';
    } else if (id === 'surveillance') {
      body = '主动监测时间线：' + D.surveillance.timeline.map(function (r) { return r.date + ' ' + r.item + '（' + r.detail + '）'; }).join('；') + '。';
    } else if (id === 'followup') {
      body = '下一次门诊：' + D.followup.next.date + ' ' + D.followup.next.dept + '。问题清单：' + D.followup.questions.map(function (q) { return q.text; }).join('；') + '。需要带的材料：' + D.followup.bring.join('；') + '。';
    } else if (id === 'trials') {
      body = '临床试验演示条目：' + D.trials.items.map(function (t) { return t.id + ' ' + t.title + '（整体求值 ' + t.overall + '）'; }).join('；') + '。';
    } else {
      body = '病理原文：' + D.pathology.items.map(function (r) { return r.date + ' ' + r.field + '：' + r.text + '（' + r.source + '）'; }).join('；') + '。';
    }
    return (head + '\n' + meta + '\n' + body).slice(0, 8000);
  }

  function askAgent() {
    if (!EMBEDDED) {
      toast('独立打开时没有会话面板：在 DSH Desktop 里打开本工作台即可使用 AI 对话');
      return;
    }
    var prompt = promptFor(currentView());
    try {
      window.parent.postMessage({ type: 'prostate:agent-draft', prompt: prompt, send: false }, location.origin);
      toast('已把本页内容填入 AI 会话草稿；核对后由你自己发送');
    } catch (_) {
      toast('没能请出会话面板');
    }
  }

  /* ---------------- 事件 ---------------- */

  document.addEventListener('click', function (event) {
    var viewBtn = event.target.closest('[data-view]');
    if (viewBtn) {
      event.preventDefault();
      var id = viewBtn.getAttribute('data-view');
      if (location.hash === '#' + id) render();
      else location.hash = id;
    }
  });

  window.addEventListener('hashchange', render);
  agentBtn.addEventListener('click', askAgent);

  var FONT_KEY = 'prostapal.font';
  function setFont(large) {
    document.documentElement.setAttribute('data-font', large ? 'large' : 'standard');
    fontToggle.setAttribute('aria-pressed', large ? 'true' : 'false');
    fontToggle.textContent = large ? '标准字' : '大字 Aa';
    try { localStorage.setItem(FONT_KEY, large ? 'large' : 'standard'); } catch (_) { /* 隐私模式忽略 */ }
  }
  fontToggle.addEventListener('click', function () {
    setFont(document.documentElement.getAttribute('data-font') !== 'large');
  });

  try { setFont(localStorage.getItem(FONT_KEY) === 'large'); } catch (_) { setFont(false); }
  render();
})();
