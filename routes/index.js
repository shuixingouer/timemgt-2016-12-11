var express = require('express');
var router = express.Router();

//公共引用
var fs = require('fs'),
    path = require('path');


function readName(){
  console.log('读取文件名称');
  fs.readdir('./data/detail/', function (err, files) {
    if(err) {
      console.error(err);
      return;
    } else {
      fileEach(files);
      ////console.log(str);
    }
  });
}

function fileEach(files){
  var str=[];
  files.forEach(function (file) {
    var filePath = path.normalize('./data/detail/' + file);
    str+=","+JSON.stringify(readFile(file));
    return str;
  });
  var allArr=[];
  //str+=","+str;
  allArr=eval("["+str.substr(1)+"]");
  for(var i=0;i<allArr.length;i++){
    var id=allArr[i].id;
    console.log(id);
  }





  console.log(allArr);
  return allArr;
}
function readFile(file){
  //console.log('读取文件内容');
  var json_data;
  json_data = JSON.parse(fs.readFileSync('./data/detail/'+ file, {flag: 'r+', encoding: 'utf8'}).toString());
  return {
    "id": json_data.data.id,
    "images": json_data.data.images,
    "title": json_data.data.title,
    "desc": json_data.data.desc,
    "time": json_data.data.time,
    "type": json_data.data.type
   };
}


/* GET index page. */
router.get('/', function(req, res, next) {// 到达此路径则渲染index文件，并传出title值供 index.html使用
  res.render('index', { title: 'Index' });
  readName();
});
module.exports = router;
