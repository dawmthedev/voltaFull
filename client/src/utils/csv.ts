export interface CSVRow {
  [key: string]: string
}

function parseLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  result.push(current)
  return result
}

export function parseCSV(content: string): CSVRow[] {
  const lines = content.split(/\r?\n/).filter(l => l.trim() !== '')
  if (lines.length === 0) return []
  const headers = parseLine(lines[0])
  const rows: CSVRow[] = []
  for (let i = 1; i < lines.length; i++) {
    const values = parseLine(lines[i])
    const obj: CSVRow = {}
    headers.forEach((h, idx) => {
      obj[h.trim()] = values[idx]?.trim() || ''
    })
    rows.push(obj)
  }
  return rows
}
