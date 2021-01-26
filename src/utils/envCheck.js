const envCheck = () => {
  // Ensure required ENV vars are set
  let requiredEnv = ['HOSTS', 'PORT', 'CORS']
  let unsetEnv = requiredEnv.filter(
    (env) => !(typeof process.env[env] !== 'undefined')
  )

  if (unsetEnv.length > 0) {
    throw new Error(
      'Required ENV variables are not set: [' + unsetEnv.join(', ') + ']'
    )
  }
}

export { envCheck }
