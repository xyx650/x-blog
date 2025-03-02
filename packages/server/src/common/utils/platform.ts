export function getPlatform(userAgent: string) {
  userAgent = userAgent.toLowerCase()

  if (/windows|win32|win64|wow32|wow64/g.test(userAgent)) {
    return 'windows' // windows系统
  } else if (/macintosh|macintel/g.test(userAgent)) {
    return 'macos' // macos系统
  } else if (/x11/g.test(userAgent)) {
    return 'linux' // linux系统
  } else if (/android|adr/g.test(userAgent)) {
    return 'android' // android系统
  } else if (/ios|iphone|ipad|ipod|iwatch/g.test(userAgent)) {
    return 'ios' // ios系统
  }
  return '未获取'
}
