export default defineNitroPlugin((nitroApp) => {
  if (!useRuntimeConfig().securityPlugin.enabled) { return }
  nitroApp.hooks.hook('render:response', (response, { event }) => {
    let cacheControl = 'max-age=600'

    if (response.headers && response.headers['content-type'] === 'text/html;charset=utf-8') {
      cacheControl = 'no-store'
    }

    const header = {
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'same-origin',
      'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
      'Cache-Control': cacheControl,
      'Content-Security-Policy': getCspString()
    }
    response.headers = { ...(response.headers ?? {}), ...header }
  })
})

const cspImgSrc:string[] = [
  'data:'
]

const cspFontSrc :string[] = [
  'data:',
  'https://fonts.gstatic.com/',
  'http://fonts.gstatic.com/'
]

const cspFrameSrc:string[] = [
  '\'unsafe-inline\'',
  '\'unsafe-eval\''
]

const cspScriptSrc:string[] = [
  '\'unsafe-inline\'',
  '\'unsafe-eval\''
]

const cspStyleSrc:string[] = [
  'https://fonts.googleapis.com',
  '\'unsafe-inline\'',
  '\'unsafe-eval\''
]

const cspConnectSrc:string[] = [
  '\'unsafe-inline\'',
  '\'unsafe-eval\''
]

const cspFrameAncestors:string[] = []

const combineCsp = (origin:string[], add:string[]) => {
  const newCspArray:string[] = [
    ...origin
  ]

  for (const url of add) {
    try {
      newCspArray.push(new URL(url).origin)
    } catch (e) {
    }
  }
  return newCspArray
}

const getCspString = () => {
  let result = ''
  result += 'default-src \'self\';'

  const config = useRuntimeConfig()

  const font = combineCsp(cspFontSrc, config.securityPlugin.contentSecurityPolicy.font)
  result += `font-src 'self' ${font.join(' ')};`

  const frame = combineCsp(cspFrameSrc, config.securityPlugin.contentSecurityPolicy.frame)
  result += `frame-src 'self' ${frame.join(' ')};`

  const frameAncestors = combineCsp(cspFrameAncestors, config.securityPlugin.contentSecurityPolicy.frameAncestors)
  result += `frame-ancestors 'self' ${frameAncestors.join(' ')};`

  const media = combineCsp([], config.securityPlugin.contentSecurityPolicy.media)
  result += `media-src 'self' ${media.join(' ')};`

  const object = combineCsp([], config.securityPlugin.contentSecurityPolicy.object)
  result += `object-src 'self' ${object.join(' ')};`

  const manifest = combineCsp([], config.securityPlugin.contentSecurityPolicy.manifest)
  result += `manifest-src 'self' ${manifest.join(' ')};`

  const worker = combineCsp([], config.securityPlugin.contentSecurityPolicy.worker)
  result += `worker-src 'self' ${worker.join(' ')};`

  const script = combineCsp(cspScriptSrc, config.securityPlugin.contentSecurityPolicy.script)
  result += `script-src 'self' ${script.join(' ')};`

  const style = combineCsp(cspStyleSrc, config.securityPlugin.contentSecurityPolicy.style)
  result += `style-src 'self' ${style.join(' ')};`

  const img = combineCsp(cspImgSrc, config.securityPlugin.contentSecurityPolicy.img)
  result += `img-src 'self' ${img.join(' ')};`

  const connect = combineCsp(cspConnectSrc, config.securityPlugin.contentSecurityPolicy.connect)
  result += `connect-src 'self' ${connect.join(' ')};`
  return result
}
