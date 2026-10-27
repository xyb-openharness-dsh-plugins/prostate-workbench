#!/usr/bin/env node
/**
 * 36 号 · 装机客户端（lib/client.js）结构断言
 *
 * 装机 UI 走 package.json 的 dsh.client（lib/client.js，模块加载器客户端），
 * 无法用公开原型探针直接加载，所以在源码层断言四段浮窗与状态卡结构存在：
 *   C1 顶栏「疾病概要」按钮 + data-primer-open + 说明四段的 aria-label
 *   C2 四段顺序 definition → evidence → landscape → trend（客户端与预览数据同源）
 *   C3 返回 / 关闭 / Esc 三个收起入口，且 open 压 history、close 走 history.back()
 *   C4 焦点回到触发按钮、滚动位置恢复
 *   C5 只渲染 https 链接；缺链接渲染红色 .dp-miss
 *   C6 状态卡四件（eyebrow / 大字天数 / 现状行 / 出口按钮排）
 *   C7 无锚点显示「待初始化」并给出三步引导
 *   C8 客户端数据不依赖 window.DISEASE_PRIMER（模块加载器不保证相对 require）
 */
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const read = (path) => readFileSync(resolve(ROOT, path), 'utf8')

const client = read('lib/client.js')
const preview = read('examples/disease-primer/primer-data.js')
const pkg = JSON.parse(read('package.json'))

const fails = []
const oks = []
const check = (id, name, ok, detail = '') => {
  ;(ok ? oks : fails).push(`${id} ${name}${detail ? ' — ' + detail : ''}`)
}

const idsOf = (source) => [...source.matchAll(/\bid\s*:\s*'(definition|evidence|landscape|trend)'/g)].map((m) => m[1])
const want = ['definition', 'evidence', 'landscape', 'trend']
const clientIds = idsOf(client)
const previewIds = idsOf(preview)
check('C2', '四段顺序固定', clientIds.join(',') === want.join(','), `client=${clientIds.join(' › ') || '无'}`)
check('C2b', '预览数据四段与客户端同序', previewIds.join(',') === clientIds.join(','), `preview=${previewIds.join(' › ') || '无'}`)

check('C1', '顶栏「疾病概要」按钮', /data-primer-open/.test(client) && /'疾病概要'/.test(client))
check('C1b', 'aria-label 说明四段', /疾病概要：定义、医学资料与指南情况、治疗全景、发展趋势/.test(client))
check('C3', '返回与关闭是独立入口', /'data-dp':\s*'back'/.test(client) && /'data-dp':\s*'close'/.test(client))
check('C3b', 'Esc 收起且只退一层', /Escape/.test(client) && /preventDefault\(\)/.test(client))
check('C3c', '打开压 history、关闭走 history.back()', /history\.pushState/.test(client) && /history\.back\(\)/.test(client))
check('C4', '关闭后焦点回触发按钮', /trigger\.focus/.test(client) && /preventScroll/.test(client))
check('C4b', '关闭后恢复滚动位置', /scrollTo\(0,\s*scrollRef\.current\)/.test(client))
check('C5', '只接受 https 链接', /\^https:\\\/\\\//.test(client) && !/http:\/\//.test(client))
check('C5b', '缺链接渲染红色标记', /dp-miss/.test(client) && /缺链接，违反 36 号 §2\.5/.test(client))
check('C5c', 'nolink 行有说明', /source\.nolink/.test(client) && /source\.note/.test(client))

check('C6', '状态卡四件齐全',
  /data-wb-status-card/.test(client) && /data-status-eyebrow/.test(client)
  && /data-status-days/.test(client) && /data-status-line/.test(client) && /data-status-primary/.test(client),
  'eyebrow / days / line / primary')
check('C6b', '副按钮打开疾病概要', /疾病概要：前列腺癌是什么？/.test(client))
check('C7', '无锚点走「待初始化」+ 三步引导', /待初始化/.test(client) && /data-status-steps/.test(client) && /三步初始化/.test(client))

check('C8', '数据内联，不依赖 window.DISEASE_PRIMER', !/window\.DISEASE_PRIMER/.test(client) && /const PRIMER\s*=/.test(client))
check('C9', '装机入口在 files 白名单内', Array.isArray(pkg.files) && pkg.files.includes('lib') && pkg.exports?.['./client'] === './lib/client.js')

const urlsOf = (source) => [...new Set([...source.matchAll(/https:\/\/[^\s'"<>]+/g)].map((m) => m[0].replace(/[),.;]+$/, '')))].sort()
const clientUrls = urlsOf(client).filter((u) => !u.includes('github.com/xyb-openharness-dsh-plugins/'))
const previewUrls = urlsOf(preview)
check('C10', '客户端与预览数据 URL 同源', clientUrls.join('\n') === previewUrls.join('\n'),
  clientUrls.length === previewUrls.length ? `${clientUrls.length} 条` : `client=${clientUrls.length} preview=${previewUrls.length}`)
check('C10b', 'URL 均为 https 且非域名首页', clientUrls.length > 0 && clientUrls.every((u) => {
  try { const parsed = new URL(u); return parsed.protocol === 'https:' && (parsed.pathname !== '/' || parsed.search) } catch { return false }
}), clientUrls.length + ' 条')

/* 11 号 · AI 面板分隔线：1px 细线夹在业务区与会话之间，热区 11px，拖动有遮罩 */
const separatorAt = client.indexOf("role: 'separator'")
const asideAt = client.indexOf("h('aside'")
check('C11', '分隔线在 aside 之前', separatorAt > 0 && asideAt > 0 && separatorAt < asideAt,
  `separator=${separatorAt} aside=${asideAt}`)
check('C12', '分隔线 1px 不占位、按百分比定位', /width: 1, marginRight: -0\.5/.test(client) && /right: `\$\{percent\}%`/.test(client))
check('C13', '热区 11px + 指针捕获 + 拖动遮罩', /left: -5, width: 11/.test(client) && /setPointerCapture/.test(client) && /dragShieldStyle/.test(client))

for (const line of oks) console.log('PASS  ' + line)
for (const line of fails) console.log('FAIL  ' + line)
console.log(`\n${fails.length ? '✗' : '✓'} 客户端结构断言：${oks.length + fails.length} 项，${oks.length} 通过，${fails.length} 失败`)
process.exit(fails.length ? 1 : 0)
