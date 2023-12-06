export function formatToId(id: string) {
  if (/^(\w+\s?)*\s*$/.test(id)) {
    id.replace(/\s+$/, '')
  }
  id.replace(/\s/gi, '-').toLowerCase()
  return id
}
