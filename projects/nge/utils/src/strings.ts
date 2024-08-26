export function isNullOrEmpty(text: string) {
  return text == null || text.trim() === ''
}

export function anyNullOrEmpty(...args: string[]) {
  if (args == null) {
    return true
  }
  for (const e of args) {
    if (isNullOrEmpty(e)) {
      return true
    }
  }
  return false
}

export const urlPattern =
  '^(https?:\\/\\/)?' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?(\\/[@-a-z\\d%_.~+]*)*' + // port and path
  '(\\?[;@&a-z\\d%_.~+=-]*)?' + // query string
  '(\\#[@-a-z\\d_]*)?$'

export function isURL(str: string) {
  // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
  const pattern = new RegExp(urlPattern, 'i') // fragment locator
  return !!pattern.test(str)
}

export function hashCode(str: string) {
  let hash = 0
  if (str.length === 0) return hash
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash
}
