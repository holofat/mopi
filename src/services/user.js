import GoTrue from 'gotrue-js'

const auth = new GoTrue({
  APIUrl: 'https://mopi.netlify.app/.netlify/identity',
  audience: '',
  setCookie: true
})

export default auth