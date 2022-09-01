// recurção multua
const fs = require('fs').promises
const path = require('path')

async function readdir(rootDir) {
  rootDir = rootDir || path.resolve(__dirname)
  const files = await fs.readdir(path.resolve(rootDir))

  walk(files, rootDir) // rootDir -> pegando o caminho completo
}

async function walk(files, rootDir) {
  for(let file of files) {
    const fileFullPath = path.resolve(rootDir, file)
    const stats = await fs.stat(fileFullPath)
    // isDirectory() retorna se é um arquivo ou não

    if(/\.git/g.test(fileFullPath)) {
      continue
    }
    
    if(/node_modules/g.test(fileFullPath)) continue

    if(stats.isDirectory()) {
      readdir(fileFullPath)
      continue
    }

    const isCssAndHTML = /\.html$/g.test(fileFullPath) 
    
    if(!isCssAndHTML) continue
    
    
    console.log(fileFullPath, stats.isDirectory()) 
  }
}

readdir('/home/LucasMiller98/myProjects/udemy/')