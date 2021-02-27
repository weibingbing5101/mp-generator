var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');


// const pageMockPath = '../../mock/page.json';
const pageMockPath = path.join(process.cwd(), '../mock/page.json');
const floorMockPath = path.join(process.cwd(), '../mock/floor.json');


router.post('/list', function(req, res, next) {
  let pageConfig = require(pageMockPath);


  res.send(pageConfig);
  pageConfig = {};


  // let floorConfig = require(floorMockPath);
  // pageConfig.data.map((pageItem) => {
  //   pageItem.floorIds.map((floorId) => {

  //     floorConfig.data.map((floorItem) => {
  //       if (floorId === floorItem.id) {
  //         pageItem.floors.push()
  //       }
  //     })

  //   })
  // })

});


router.post('/add', function(req, res, next) {
  let pageConfig = require(pageMockPath);


  let pageList = pageConfig.data || [];
  let result = pageList.filter((item) => {
    if (item.name === req.body.name) {
      return true;
    }
  });

  if (result && result.length) {
    res.send({
      msg: '已经有同名页面了',
      data: [],
      code: '9999'
    });
  } else {
    // 新生成 page id
    let pageId = pageList.length + 1 + '';

    // 新生成 floors id
    req.body.floors.map((florItem, flindex) => {
      florItem.id = ('' + (flindex += 1));
      florItem.pageId = pageId;
    })

    pageList.push({
      id: pageId,
      ...req.body,
      floors: []
    });

    fs.writeFileSync(pageMockPath, JSON.stringify(pageConfig));
    res.send({
      msg: '添加成功',
      data: [],
      code: '0000'
    });
  }
  result = [];
  pageConfig = {};
});


router.post('/edit', function(req, res, next) {
  const pageConfig = require(pageMockPath);

  let pageList = pageConfig.data || [];

  let result = pageList.filter((item, index) => {
    if (item.id === req.body.id) {
      return true;
    }
  });


  if (result && result.length) {
    // 此处重新索引  所有floors的id  后期改正  软删除 编辑  添加新生成id
    req.body.floors.map((florItem, flindex) => {
      florItem.id = ('' + (flindex += 1));
      florItem.pageId = req.body.id;
    })

    result[0] = Object.assign(result[0], {
      ...req.body
    });

    fs.writeFileSync(pageMockPath, JSON.stringify(pageConfig));
    res.send({
      msg: '添加成功',
      data: [],
      code: '0000'
    });
  } else {
    res.send({
      msg: '未找到对应页面',
      data: [],
      code: '9999'
    });

  }
  result = [];
  pageConfig = {};
});













router.post('/detail', function(req, res, next) {
  let pageConfig = require(pageMockPath);

  console.log(req.body);

  let resData = pageConfig.data.filter((item) => {
    if (req.body.id === item.id) {
      return item
    }
  })

  if (resData && resData.length) {
    res.send({
      msg: '成功',
      data: resData[0],
      code: '0000'
    });
  } else {
    res.send({
      msg: '未找到对应页面',
      data: [],
      code: '9999'
    });
  }

  pageConfig = {};



});


































module.exports = router;