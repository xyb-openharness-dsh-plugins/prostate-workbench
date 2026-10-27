/* 小前宝 ProstaPal · 演示数据（2026-10-27）
 *
 * 本文件全部为**虚构演示资料**，不对应任何真实患者。
 * 写法边界：只写日期、数值、单位、报告原文与来源；
 * 不写判读词，不写处置意见，不给评分总分，不与他人比较。
 * 业务线依据：package.json description、README「## 疾病概要」、docs/BRIEF.md。
 */
(function () {
  'use strict';

  window.PROSTATE_DEMO = {
    meta: {
      simulated: true,
      label: '模拟演示',
      asOf: '2026-10-20',
      note: '本页全部为虚构演示资料，刷新即重置；日期、数值、单位与来源均为示例。'
    },

    profile: {
      code: '演示档案 A',
      name: '陈先生',
      sex: '男',
      age: 68,
      meta: '68 岁 · 2024-11 穿刺确诊 · 2026-03 起 ADT 联合放疗'
    },

    /* D+N 的锚点：当前治疗线序的开始日，照抄用药记录。 */
    anchor: {
      date: '2026-03-11',
      label: 'ADT 首次用药（用药记录原文）'
    },

    pathology: {
      note: '分级、分期与分组字段均照抄报告原文；本台不换算、不合并、不自己分组。',
      items: [
        { date: '2024-11-08', field: '穿刺病理', text: '腺泡腺癌，Gleason 3+4=7，ISUP 分级分组 2 组（报告原文）', source: '市医院病理科 2024-11-08' },
        { date: '2024-11-20', field: '临床分期', text: 'cT2aN0M0（报告原文）', source: '市医院泌尿外科门诊记录 2024-11-20' },
        { date: '2024-11-20', field: '风险分组', text: '中危（报告原文）', source: '市医院泌尿外科门诊记录 2024-11-20' },
        { date: '2026-02-26', field: '重复穿刺病理', text: '腺泡腺癌，Gleason 4+3=7，ISUP 分级分组 3 组（报告原文）', source: '市医院病理科 2026-02-26' },
        { date: '2026-03-04', field: '风险分组', text: '高危（报告原文）', source: '多学科门诊记录 2026-03-04' }
      ]
    },

    psa: {
      note: '只记数值、日期、单位与报告里写的检测方法；不判断升降含义。',
      unit: 'ng/mL',
      method: '电化学发光法（报告原文）',
      items: [
        { date: '2024-10-28', value: 9.8, lab: '市医院检验科' },
        { date: '2025-02-10', value: 8.4, lab: '市医院检验科' },
        { date: '2025-06-18', value: 7.6, lab: '市医院检验科' },
        { date: '2025-10-14', value: 8.9, lab: '市医院检验科' },
        { date: '2026-02-18', value: 9.6, lab: '市医院检验科' },
        { date: '2026-03-09', value: 9.1, lab: '市医院检验科' },
        { date: '2026-06-10', value: 0.42, lab: '市医院检验科' },
        { date: '2026-09-15', value: 0.08, lab: '市医院检验科' }
      ]
    },

    adt: {
      note: '方案与日期照抄用药、放疗记录；副作用只记日期、项目、数值与单位。',
      plan: [
        { date: '2026-03-11', item: '戈舍瑞林 3.6 mg 皮下注射，每 28 天（用药记录原文）', source: '市医院泌尿外科 2026-03-11' },
        { date: '2026-04-13', item: '外照射放疗开始，2026-05-22 结束，共 23 次（放疗记录原文）', source: '市医院放疗科 2026-05-22' }
      ],
      doses: [
        { date: '2026-03-11', item: '戈舍瑞林 3.6 mg 皮下注射' },
        { date: '2026-04-08', item: '戈舍瑞林 3.6 mg 皮下注射' },
        { date: '2026-05-06', item: '戈舍瑞林 3.6 mg 皮下注射' },
        { date: '2026-06-03', item: '戈舍瑞林 3.6 mg 皮下注射' },
        { date: '2026-07-01', item: '戈舍瑞林 3.6 mg 皮下注射' },
        { date: '2026-07-29', item: '戈舍瑞林 3.6 mg 皮下注射' },
        { date: '2026-08-26', item: '戈舍瑞林 3.6 mg 皮下注射' },
        { date: '2026-09-23', item: '戈舍瑞林 3.6 mg 皮下注射' }
      ],
      nextDose: { date: '2026-10-21', item: '戈舍瑞林 3.6 mg 皮下注射', source: '用药计划单 2026-09-23' },
      effects: [
        { date: '2026-06-10', item: '潮热', value: '4 次/日', source: '自述记录' },
        { date: '2026-06-10', item: '夜汗', value: '1 次/周', source: '自述记录' },
        { date: '2026-07-08', item: '潮热', value: '5 次/日', source: '自述记录' },
        { date: '2026-09-15', item: '潮热', value: '3 次/日', source: '自述记录' },
        { date: '2026-09-15', item: '夜汗', value: '2 次/周', source: '自述记录' },
        { date: '2026-09-15', item: '乏力', value: '3/10（原始作答）', source: '自评记录' }
      ],
      body: [
        { date: '2026-03-11', item: '体重', value: '74.2 kg', source: '门诊测量' },
        { date: '2026-09-15', item: '体重', value: '71.8 kg', source: '门诊测量' },
        { date: '2026-08-14', item: '骨密度 DXA · 腰椎 T 值', value: '-1.8', source: '市医院核医学科 2026-08-14' }
      ]
    },

    rehab: {
      note: '只存每次的原始作答，不计算总分、不画评分、不与他人比较。',
      urinary: [
        { date: '2026-06-10', nocturia: '2 次/晚', urgency: '1 次/日', pad: '0 片/日', source: '自述记录' },
        { date: '2026-07-08', nocturia: '2 次/晚', urgency: '1 次/日', pad: '1 片/日', source: '自述记录' },
        { date: '2026-09-15', nocturia: '1 次/晚', urgency: '0 次/日', pad: '0 片/日', source: '自述记录' }
      ],
      sexual: [
        { date: '2026-06-10', hardness: '3/5（原始作答）', morning: '2 次/周', desire: '2/5（原始作答）' },
        { date: '2026-09-15', hardness: '3/5（原始作答）', morning: '3 次/周', desire: '2/5（原始作答）' }
      ],
      training: [
        { date: '2026-06-10', item: '盆底肌训练', value: '每日 3 组 × 10 次（训练记录）' },
        { date: '2026-07-08', item: '盆底肌训练', value: '每日 3 组 × 10 次（训练记录）' },
        { date: '2026-09-15', item: '盆底肌训练', value: '每日 3 组 × 12 次（训练记录）' }
      ]
    },

    surveillance: {
      note: '本档案 2026-03-04 起转入放疗联合 ADT；以下为主动监测期间的历史记录。',
      ended: '2026-03-04',
      timeline: [
        { date: '2024-11-20', item: '进入主动监测', detail: '门诊记录原文：选择主动监测，按计划复查 PSA 与影像', source: '市医院泌尿外科 2024-11-20' },
        { date: '2025-02-10', item: 'PSA 复查', detail: '8.4 ng/mL', source: '市医院检验科 2025-02-10' },
        { date: '2025-06-18', item: 'PSA 复查', detail: '7.6 ng/mL', source: '市医院检验科 2025-06-18' },
        { date: '2025-08-21', item: '前列腺 MRI', detail: 'PI-RADS 3（报告原文）', source: '市医院影像科 2025-08-21' },
        { date: '2025-08-28', item: '重复穿刺', detail: '12 针，Gleason 3+4=7，ISUP 2 组（报告原文）', source: '市医院病理科 2025-08-28' },
        { date: '2026-02-18', item: 'PSA 复查', detail: '9.6 ng/mL', source: '市医院检验科 2026-02-18' },
        { date: '2026-02-26', item: '重复穿刺', detail: '12 针，Gleason 4+3=7，ISUP 3 组（报告原文）', source: '市医院病理科 2026-02-26' },
        { date: '2026-03-04', item: '路径变更记录', detail: '多学科门诊记录原文：转入放疗联合 ADT', source: '多学科门诊 2026-03-04' }
      ]
    },

    followup: {
      next: {
        date: '2026-11-05',
        dept: '泌尿外科随访门诊',
        source: '预约单 2026-09-23'
      },
      labs: [
        { date: '2026-10-28', item: 'PSA 抽血', source: '检验申请单 2026-09-23' }
      ],
      questions: [
        { text: '2026-02 重复穿刺从 3+4 变为 4+3，两份报告的分组差异怎么读？', asked: false },
        { text: 'ADT 已用 8 个周期，下一次 PSA 与睾酮复查安排在什么时候？', asked: false },
        { text: 'DXA 腰椎 T 值 -1.8，骨健康方面下一次复查项目是什么？', asked: false },
        { text: '放疗结束后排尿记录里的夜尿次数，下次需要带哪些记录？', asked: true, askedAt: '2026-09-15' }
      ],
      bring: [
        '2026-10-28 PSA 化验单（原件）',
        '2026-03-11 起用药记录与 2026-10-21 用药计划单',
        '2026-08-14 DXA 报告',
        '本页问题清单（4 条）'
      ]
    },

    trials: {
      note: '条目为虚构演示，不是真实临床试验登记信息。字段逐项与档案记录比对；缺失记为「无法判定」。',
      items: [
        {
          id: 'DEMO-PROS-01',
          title: '局限期前列腺癌主动监测随访研究（演示条目）',
          place: '本市（演示）',
          criteria: [
            { field: '年龄 ≥ 50 岁', record: '68 岁', verdict: '符合', basis: '档案年龄' },
            { field: '临床分期 cT1–cT2a', record: 'cT2a（报告原文）', verdict: '符合', basis: '病理/分期记录' },
            { field: '当前未接受 ADT 或放疗', record: '2026-03-11 起 ADT，2026-04 至 05 放疗', verdict: '不符合', basis: '用药与放疗记录' }
          ],
          overall: '不符合'
        },
        {
          id: 'DEMO-PROS-02',
          title: 'ADT 治疗期间身体活动与症状记录研究（演示条目）',
          place: '线上随访问卷（演示）',
          criteria: [
            { field: '正在接受 ADT', record: '2026-03-11 起戈舍瑞林', verdict: '符合', basis: '用药记录' },
            { field: '年龄 ≥ 18 岁', record: '68 岁', verdict: '符合', basis: '档案年龄' },
            { field: '能完成 12 周随访问卷', record: '未记录', verdict: '无法判定', basis: '档案无相关记录' }
          ],
          overall: '无法判定'
        },
        {
          id: 'DEMO-PROS-03',
          title: 'HRR 基因检测相关研究（演示条目）',
          place: '省会城市（演示）',
          criteria: [
            { field: 'HRR 基因检测结果可用', record: '未记录（本档案未做该检测）', verdict: '无法判定', basis: '档案无检测记录' }
          ],
          overall: '无法判定'
        }
      ]
    }
  };
})();
