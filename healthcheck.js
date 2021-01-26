import http from 'http'

var options = {
  host: 'localhost',
  path: '/v1/services/ping',
  method: 'GET',
  port: process.env.PORT || 3000,
  timeout: 2000,
}

var request = http.request(options, (res) => {
  //log.debug(`STATUS: ${res.statusCode}`);
  if (res.statusCode == 200) {
    process.exit(0)
  } else {
    process.exit(1)
  }
})

request.on('error', function (err) {
  console.log('ERROR')
  console.log(err.message)
  process.exit(1)
})

request.end()
