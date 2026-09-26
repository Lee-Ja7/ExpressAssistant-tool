/**
 * ============================================================
 * 接口内容文件：协议文本 / 许可清单 / 默认更新信息
 * ------------------------------------------------------------
 * 维护说明：
 *  - 修改本文件后 git push 到 main 分支即自动重新部署；
 *  - 法律文本为模板，正式发布前请按实际情况审校；
 *  - 开源许可清单请对照 App 工程 app/build.gradle.kts 的
 *    dependencies 列表核对增删。
 * ============================================================
 */

/** 接口1 的默认更新信息（wrangler.toml / 控制台环境变量缺省时使用） */
export const DEFAULT_UPDATE = {
  versionName: '1.0.22.b',
  versionCode: 43,
  apkUrl:
    'https://github.com/Lee-Ja7/ExpressAssistant-tool/releases/latest/download/app-release.apk',
  changelog: [
    '集成清风小工具（V7，79 个在线/本地工具）',
    '底部导航精简为：首页 / 清风 / 设置',
    '修复指南针与水平仪退出后传感器未注销的问题',
    '修复麦克风权限缺失导致噪音测量无法启动的问题',
  ],
  publishedAt: '2026-09-27',
}

/** 接口2：用户服务协议（Markdown，App 端按纯文本展示） */
export const AGREEMENT = {
  title: '用户服务协议',
  updatedAt: '2026-09-27',
  format: 'markdown',
  content: `# 用户服务协议

欢迎使用「快递助手」（以下简称“本应用”）。使用本应用即表示您已阅读并同意本协议。

## 一、服务说明
1. 本应用为个人开发的免费工具类应用，提供取件码 OCR 识别、快递跳转、海拔测量、地图、音乐搜索、清风小工具箱等功能。
2. 部分功能依赖第三方公开服务（如高德地图、网易云音乐公开接口、清风工具箱内嵌的公开接口），其可用性由第三方决定。

## 二、使用规范
1. 请勿利用本应用从事任何违法违规活动。
2. 请勿对本应用进行反向工程、批量抓取或干扰服务正常运行。

## 三、免责声明
1. 本应用按“现状”提供，不对信息的准确性、服务的连续性作担保。
2. 因第三方服务变更、网络故障等导致的损失，开发者不承担责任。

## 四、协议变更
本协议可能随版本更新而修订，更新后将在本页面公示，继续使用视为接受。

## 五、联系
如有问题，请通过应用内「设置 → 关于与版本」中提供的方式反馈。`,
}

/** 接口3：隐私政策 */
export const PRIVACY = {
  title: '隐私政策',
  updatedAt: '2026-09-27',
  format: 'markdown',
  content: `# 隐私政策

生效日期：2026-09-27

## 一、我们收集的信息
本应用**不收集、不上传**任何个人身份信息。所有数据（收藏、历史记录、设置项）均保存在您的设备本地。

## 二、权限使用说明
| 权限 | 用途 | 是否必需 |
| --- | --- | --- |
| 摄像头 | OCR 取件码识别、清风工具箱拍照类工具 | 可选，使用时申请 |
| 麦克风 | 清风工具箱噪音测量等音频工具 | 可选，使用时申请 |
| 位置 | 地图定位、海拔测量 | 可选，使用时申请 |
| 通知 | 系统级提醒 | 可选 |
| 网络 | 音乐搜索、地图、工具箱在线功能 | 必需 |

## 三、第三方 SDK
- 高德地图 SDK：用于定位与地图展示，其隐私政策见高德官网。
- 网易云音乐公开接口：仅用于歌曲搜索与播放，不附带用户信息。

## 四、数据安全
本应用无服务器账号体系；卸载应用即删除全部本地数据。

## 五、政策更新
本政策更新时会通过本页面公示。`,
}

/** 接口4：开源许可清单 */
export const LICENSES = {
  updatedAt: '2026-09-27',
  list: [
    {
      name: 'Kotlin Standard Library',
      author: 'JetBrains',
      license: 'Apache-2.0',
      url: 'https://github.com/JetBrains/kotlin',
    },
    {
      name: 'Android Jetpack（Compose / Material3 / Activity / Lifecycle 等）',
      author: 'Google',
      license: 'Apache-2.0',
      url: 'https://developer.android.com/jetpack',
    },
    {
      name: 'Material Components / Material Icons',
      author: 'Google',
      license: 'Apache-2.0',
      url: 'https://github.com/material-components',
    },
    {
      name: '高德地图 Android SDK（定位 / 地图 / 检索）',
      author: '高德软件',
      license: '商业许可（高德开放平台）',
      url: 'https://lbs.amap.com',
    },
    {
      name: 'OkHttp',
      author: 'Square, Inc.',
      license: 'Apache-2.0',
      url: 'https://square.github.io/okhttp/',
    },
    {
      name: '清风小工具箱（单文件网页工具集）',
      author: '清风Studio',
      license: '随应用内嵌分发',
      url: '',
    },
  ],
}
