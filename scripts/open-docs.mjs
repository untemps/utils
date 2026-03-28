import { exec } from 'node:child_process'

const cmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open'
exec(`${cmd} docs/index.html`)
