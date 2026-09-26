/**
 * ============================================================
 * ExpressAssistant-tool · Cloudflare Worker 入口
 * ------------------------------------------------------------
 * 对外提供 4 个只读 JSON 接口（均为 GET、无需鉴权、带 CORS）：
 *
 *   GET /api/update?v=<当前versionCode>
 *       检查更新。比较客户端传入的 versionCode 与环境变量中的
 *       最新版本，返回 hasUpdate 及新版本信息（版本号/更新日志/
 *       APK 下载地址/是否强制更新）。
 *
 *   GET /api/agreement
 *       用户服务协议全文（Markdown 文本，App 端直接展示）。
 *
 *   GET /api/privacy
 *       隐私政策全文（Markdown 文本）。
 *
 *   GET /api/licenses
 *       开源许可清单（数组：库名/作者/许可证/项目地址）。
 *
 *   GET / 或 /api/health
 *       健康检查，返回服务名与服务器时间。
 *
 * 统一响应结构：
 *   成功 { "code": 0, "msg": "ok", "data": {...} }
 *   失败 { "code": <HTTP状态码>, "msg": "<错误说明>" }
 *
 * 内容维护：协议文本/许可清单/默认更新信息都在 ./content.js，
 *           修改后 git push 即自动重新部署。
 * ============================================================
 */

import { DEFAULT_UPDATE, AGREEMENT, PRIVACY, LICENSES } from './content.js'

/** 所有响应共用的 HTTP 头：JSON 编码 + 跨域放行 + 短缓存 */
const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
  // App 的 WebView / HttpURLConnection 都需要 CORS 放行；本服务无敏感数据，放开即可
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, OPTIONS',
  'access-control-allow-headers': 'content-type',
  // 边缘缓存 60 秒：降低回源次数，发版后最长 1 分钟内全球生效
  'cache-control': 'public, max-age=60',
}

/** 构造统一格式的 JSON 响应 */
function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: JSON_HEADERS,
  })
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // 浏览器跨域预检请求：直接放行
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: JSON_HEADERS })
    }

    // 本服务只提供只读接口，其余方法一律拒绝
    if (request.method !== 'GET') {
      return json({ code: 405, msg: 'Method Not Allowed：仅支持 GET' }, 405)
    }

    switch (url.pathname) {
      // ---- 健康检查 / 服务说明 ----
      case '/':
      case '/api/health':
        return json({
          code: 0,
          msg: 'ok',
          data: {
            service: 'expressassistant-api',
            endpoints: ['/api/update', '/api/agreement', '/api/privacy', '/api/licenses'],
            time: new Date().toISOString(),
          },
        })

      // ---- 接口1：检查更新 ----
      // ?v= 客户端当前 versionCode（可选，不传视为 0，必然有更新）
      case '/api/update': {
        const current = parseInt(url.searchParams.get('v') || '0', 10) || 0

        // 环境变量优先（控制台可热更新），缺省时回退到 content.js 中的默认值
        const latest = {
          versionName: env.APP_VERSION_NAME || DEFAULT_UPDATE.versionName,
          versionCode: parseInt(env.APP_VERSION_CODE || String(DEFAULT_UPDATE.versionCode), 10),
          apkUrl: env.APK_URL || DEFAULT_UPDATE.apkUrl,
          forceUpdate: String(env.FORCE_UPDATE || 'false') === 'true',
          changelog: DEFAULT_UPDATE.changelog,
          publishedAt: DEFAULT_UPDATE.publishedAt,
        }

        return json({
          code: 0,
          msg: 'ok',
          data: {
            hasUpdate: latest.versionCode > current,
            currentVersionCode: current,
            latest,
          },
        })
      }

      // ---- 接口2：用户服务协议 ----
      case '/api/agreement':
        return json({ code: 0, msg: 'ok', data: AGREEMENT })

      // ---- 接口3：隐私政策 ----
      case '/api/privacy':
        return json({ code: 0, msg: 'ok', data: PRIVACY })

      // ---- 接口4：开源许可清单 ----
      case '/api/licenses':
        return json({ code: 0, msg: 'ok', data: LICENSES })

      // ---- 未知路径 ----
      default:
        return json({ code: 404, msg: 'Not Found：接口不存在，可用 /api/health 查看清单' }, 404)
    }
  },
}
