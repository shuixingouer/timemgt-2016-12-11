var express = require('express');
var router = express.Router();

//公共引用
var fs = require('fs'),
    path = require('path');
//使用fs.readdir读取目录，重点其回调函数中files对象
//fs.readdir(path, callback);
/**
 * path, 要读取目录的完整路径及目录名；
 * [callback(err, files)], 读完目录回调函数；err错误对象，files数组，存放读取到的目录中的所有文件名
 */

fs.readdir('./data/detail/', function (err, files) {
  if(err) {
    console.error(err);
    return;
  } else {
    files.forEach(function (file) {
      var filePath = path.normalize('./data/detail/' + file);
      fs.stat(filePath, function (err, stat) {
        if(stat.isFile()) {
          //console.log(filePath + ' is: ' + 'file');


          function load(file, cb) {
            fs.readFile(file, function(err, data) {
              if (err)
                throw err;
              cb(JSON.parse(data.toString()));
            });
          }
          (function() {
            load(filePath, function(obj) {
              console.log("%s\n", obj.data.type);
              var id=obj.data.id;
              var images=obj.data.images;
              var title=obj.data.title;
              var desc=obj.data.desc;
              var type=obj.data.type;
              var time=obj.data.time;
              w_data =
                      {
                        "id":id,
                        "images":images,
                        "title":title,
                        "desc":desc,
                        "time":time,
                        "type":type
                      };
              w_data = JSON.stringify(w_data);
              //fs.unlink('./data/channel/'+ type +'.json', function(){
              //  console.log('success');
              //  console.log('值是'+type);
              //});
              fs.writeFile('./data/channel/'+ type +'.json',w_data, {flag: 'a'}, function (err) {
                if(err) {
                  console.error(err);
                } else {
                  console.log('写入成功');
                }
              });
            });
          })();
        }
        if(stat.isDirectory()) {
          console.log(filePath + ' is: ' + 'dir');
        }
      });
    });



    //var ws = fs.createWriteStream('./data/channel/'+ type +'.json');
    //  ws.end(w_data, function () {
    //    console.log('文件全部写入完成')
    //  });
    //


    //for (var i = 0; i < files.length; i++) {
    //  //使用闭包无法保证读取文件的顺序与数组中保存的致
    //  (function () {
    //    var filePath = path.normalize('./data/detail/' + files[i]);
    //    fs.stat(filePath, function (err, stat) {
    //      if(stat.isFile()) {
    //        //console.log(filePath + ' is: ' + 'file');
    //      }
    //      if(stat.isDirectory()) {
    //        console.log(filePath + ' is: ' + 'dir');
    //      }
    //    });
    //  })();
    //}
  }
});


/* GET index page. */
router.get('/', function(req, res, next) {// 到达此路径则渲染index文件，并传出title值供 index.html使用
  res.render('index', { title: 'Index' });
});
module.exports = router;
