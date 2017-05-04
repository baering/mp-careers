require('babel-register')

const method = process.env.METHOD

if (!method) {
  throw new Error('Need to specify environmental value METHOD (either fetch or process)')
}

if (method === 'fetch') {
  require('./fetch')
} else {
  require('./process')
}
