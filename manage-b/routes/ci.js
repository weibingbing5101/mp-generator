var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;


// const genPath = path.join(process.cwd(), '../ci/src/generatorPage.wx.js');
const genPath = '../ci/src/generatorPage.wx.js';
router.post('/genmp', function(req, res, next) {
  exec('node ' + genPath, function(error, stdout, stderr) {
    // 获取命令执行的输出
    console.log(stdout);
    console.log(error);
    console.log(stderr);
    if (error || stderr) {
      res.send({
        msg: error || stderr,
        data: [],
        code: '9999'
      });
    } else {
      res.send({
        msg: '生成成功：' + stdout,
        data: [],
        code: '0000'
      });
    }
  });
});


const priviewPath = '../ci/src/preview.wx.js';
router.post('/previewmp', function(req, res, next) {
  exec('node ' + priviewPath, function(error, stdout, stderr) {
    // 获取命令执行的输出
    console.log(stdout);
    console.log(error);
    console.log(stderr);
    if (error || stderr) {
      res.send({
        msg: error || stderr,
        data: [],
        code: '9999'
      });
    } else {
      res.send({
        msg: '生成体验版成功：' + stdout,
        data: [],
        code: '0000'
      });
    }
  });
});


// router.post('/add', function(req, res, next) {
//   const confg = require(floorMockPath);

//   let pageList = confg.data || [];
//   let result = pageList.filter((item) => {
//     if (item.name === req.body.name) {
//       return true;
//     }
//   });

//   if (result && result.length) {
//     res.send({
//       msg: '已经有同名页面了',
//       data: [],
//       code: '9999'
//     });
//   } else {
//     let newId = pageList.length + 1 + '';
//     pageList.push({
//       id: newId,
//       ...req.body,
//       floors: []
//     });

//     fs.writeFileSync(floorMockPath, JSON.stringify(confg));
//     res.send({
//       msg: '添加成功',
//       data: [],
//       code: '0000'
//     });
//   }
//   result = [];
//   confg = {};
// });


// router.post('/edit', function(req, res, next) {
//   const confg = require(floorMockPath);

//   let pageList = confg.data || [];

//   let result = pageList.filter((item, index) => {
//     if (item.id === req.body.id) {
//       return true;
//     }
//   });


//   if (result && result.length) {
//     result[0] = Object.assign(result[0], {
//       ...req.body
//     });

//     fs.writeFileSync(floorMockPath, JSON.stringify(confg));
//     res.send({
//       msg: '添加成功',
//       data: [],
//       code: '0000'
//     });
//   } else {
//     res.send({
//       msg: '未找到对应页面',
//       data: [],
//       code: '9999'
//     });

//   }
//   result = [];
//   confg = {};
// });

// // /floors/getCfg
// router.post('/getCfg', function(req, res, next) {
//   const confg = require(pageMockPath);

//   let body = {
//     pageId: '' + req.body.pageId,
//     floorsId: '' + req.body.floorsId
//   }

//   let result = {}
//   confg.data.map((pageitem) => {
//     if (pageitem.id === body.pageId) {
//       pageitem.floors.map((floitem) => {
//         if (floitem.id === body.floorsId) {

//           result = {
//             "code": "0000",
//             "msg": "成功",
//             "data": floitem
//           };
//         }
//       })
//     }
//   })

//   res.send(result);
// });




































module.exports = router;