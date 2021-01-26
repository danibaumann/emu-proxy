// import npm from 'npm'
import prompts from 'prompts'

const questions = [
  {
    type: 'text',
    name: 'version',
    message: `Version number for this build?`,
    validate: (version) => version.match(/^(\d+\.)?(\d+\.)?(\*|\d+)$/),
  },
  {
    type: 'text',
    name: 'imageName',
    message: 'Name of docker image?',
    initial: 'basol.ch/emu-proxy',
  },
  {
    type: 'select',
    name: 'releaseType',
    message: 'Type of the release',
    choices: [
      { title: 'Local', value: 0 },
      { title: 'Stage', value: 1 },
      { title: 'Production', value: 2 },
    ],
  },
]

npm.load(async () => {
  const res = await prompts(questions)
  console.log(res)
  process.env.VERSION = res.version
  process.env.IMAGE = res.imageName

  if (res.releaseType === 0) {
    process.env.TAG = `nightly`
  } else if (res.releaseType === 1) {
    process.env.TAG = `nightly`
    process.env.RENAMED = `${res.version}-pre-release`
    console.log('Pre release successfully uploaded')
    return
  } else if (res.releaseType === 2) {
    process.env.TAG = `${res.version}-pre-release`
    process.env.RENAMED = `${res.version}`
    console.log('Release sucessfully tagged and ready to be used')
    return
  }
})
