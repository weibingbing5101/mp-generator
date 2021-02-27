'use strict';
const path = require('path');
const fs = require('fs');
const Handlebars = require("handlebars");




// 将小程序 state 数据key换成 html中用到的    
// 例 date1   {{date1}}
Handlebars.registerHelper("dateKey2HtmlKey", function(datekey) {
  return `{{${datekey}}}`;
});




// 生成文件步骤
let generatorMPFile = function() {
  let pageDataReq = require('../../mock/page.json');

  if (pageDataReq.code === '0000' && pageDataReq.data.length) {

    pageDataReq.data.forEach((dataItem) => {
      let distPathObj = {
        path: path.join(process.cwd(), '../mp-temp/pages/' + dataItem.name + '/'),
        html: dataItem.name + '.wxml',
        css: dataItem.name + '.wxss',
        js: dataItem.name + '.js',
        json: dataItem.name + '.json'
      };

      // 判断文件是否存在
      if (!fs.existsSync(distPathObj.path)) {
        console.log(`${distPathObj.path} '目录不存在，自动执行创建目录并生成文件'`);
        fs.mkdirSync(distPathObj.path)
      }


      // html 相关
      const htmltpl = path.join(__dirname, "./config/pageTemp/index.wxml");
      let htmlsource = fs.readFileSync(htmltpl).toString();
      let htmltemplate = Handlebars.compile(htmlsource.toString())

      fs.writeFileSync(distPathObj.path + distPathObj.html, htmltemplate(dataItem));

      // css相关
      const csstpl = path.join(__dirname, "./config/pageTemp/index.wxss");
      let csssource = fs.readFileSync(csstpl).toString();
      let csstemplate = Handlebars.compile(csssource.toString())

      fs.writeFileSync(distPathObj.path + distPathObj.css, csstemplate(dataItem));


      // js相关
      const jstpl = path.join(__dirname, "./config/pageTemp/index.js");
      let jssource = fs.readFileSync(jstpl).toString();
      let jstemplate = Handlebars.compile(jssource.toString())

      fs.writeFileSync(distPathObj.path + distPathObj.js, jstemplate(dataItem));

      // json相关
      let tempdataItem = JSON.parse(JSON.stringify(dataItem));
      tempdataItem.floors = [];
      let catchFloorName = {};
      dataItem.floors.map((florIten) => {
        if (!catchFloorName[florIten.costomswiper]) {
          catchFloorName[florIten.costomswiper] = 1;
          tempdataItem.floors.push(florIten);
        }
      });
      const jsontpl = path.join(__dirname, "./config/pageTemp/index.json");
      let jsonsource = fs.readFileSync(jsontpl).toString();
      let jsontemplate = Handlebars.compile(jsonsource.toString())

      fs.writeFileSync(distPathObj.path + distPathObj.json, jsontemplate(tempdataItem));
    })
  }
};



generatorMPFile();


























// 解决json key不加“” 的问题

// function readText(pathname) {
//     var bin = fs.readFileSync(pathname);
//     if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
//         bin = bin.slice(3);
//     }
//     return bin.toString('utf-8');
// }

// let pageMock = readText('./mock/page.json')

// console.log(pageMock);