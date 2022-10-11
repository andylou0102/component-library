const {
  rm, mkdir,
} = require('fs/promises')
const { join } = require('path')
const { execSync } = require('child_process')
const tar = require('tar')
const {
  name, repository: { url: remoteUrl }, version,
} = require('../package.json')

const rmRf = (p) => rm(p, {
  force: true,
  recursive: true,
}).catch(() => {
  console.log(p)
})

async function publish () {
  // 不是主分支跳出
  if (!execSync('git branch').toString().split('\n').includes('* master')) {
    console.error('You must be on the master branch')
    process.exit(1)
  }

  const dir = join(__dirname, './.pack')
  const tarName = `${name.replace('@', '').replace('/', '-')}-${version}.tgz`
  const tarPath = join(dir, tarName)

  await rmRf(dir)
  await mkdir(dir)
  // 打包建構出來的檔案並解壓縮
  execSync([
    'pnpm run build',
    `pnpm pack --pack-destination ${dir}`,
  ].join(' && '))
  await tar.extract({
    file: tarPath,
    cwd: dir,
  })
  // 打tag
  execSync([
    `cd ${join(dir, 'package')}`,
    'git init',
    'git add .',
    `git commit -m "Publish v${version}"`,
    `git tag "v${version}"`,
    `git push ${remoteUrl} --tag`,
  ].join(' && '))
  await rmRf(dir)
}

publish()
