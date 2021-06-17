const path = require('path');
const ejs = require('ejs');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const Metalsmith = require('metalsmith');


function toLine(name) {
  return name.replace(/([A-Z])/g,"-$1").toLowerCase().slice(1);
}

function templatePlugin( files, metalsmith, done) {
  const meta = metalsmith.metadata();
  // 替换变量
  Object.keys(files).forEach((fileName) => {
    const s = files[fileName].contents.toString();
    files[fileName].contents = ejs.render(s, meta);
  });

  setImmediate(done);
}


function generateTemplate(matadata, targetDir) {
  return new Promise((resolve, reject) => {
    Metalsmith(__dirname)
      .metadata(matadata)
      .clean(false)
      .source('../template')
      .destination(targetDir)
      .use(templatePlugin)
      .build((err) => {
        err ? reject(err) : resolve();
      });
  });
}


(async() => {
  const answer = await inquirer.prompt([
    {
      name: 'componentName',
      message: '输入组件名:',
    },
    {
      name: 'componentZhName',
      message: '输入中文名:',
    }
  ]);

  const dirName = toLine(answer.componentName);
  const targetDir = path.resolve(__dirname, `../components/${dirName}`);

  if (fse.existsSync(targetDir)) {
    console.error(`${pkgName}目录已存在！`);
    process.exit(1);
  }

  generateTemplate(answer, targetDir).then(res => {
    console.log("创建成功！")
  }).catch(err => {
    console.log(`创建失败: ${err}`)
  })
})()
