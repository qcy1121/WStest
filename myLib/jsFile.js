
var fs = require('fs');

var myFile = {
    mkdirSync:function (url, mode, callback) {
        var arr = url.split("/");
        mode = mode || 0755;
        callback = callback || function () {
        };
        if (arr[0] === ".") {//处理 ./aaa
            arr.shift();
        }
        if (arr[0] == "..") {//处理 ../aaa/a
            arr.splice(0, 2, arr[0] + "/" + arr[1])
        }
        function inner(cur) {
            if (!fs.existsSync(cur)) {//不存在就创建一个
                fs.mkdirSync(cur, mode)
            }
            if (arr.length) {
                inner(cur + "/" + arr.shift());
            } else {
                callback();
            }
        }

        arr.length && inner(arr.shift());
    },

    /*只取得指定目下的所有文件*/
    getAllFiles:function (root) {
        var result = [], files = fs.readdirSync(root)
        files.forEach(function (file) {
            var pathName = root + "/" + file
                , stat = fs.lstatSync(pathName)
            if (stat === undefined) return

            // 不是文件夹就是文件
            if (!stat.isDirectory()) {
                result.push(pathName)
                // 递归自身
            } else {
                result = result.concat(getAllFiles(pathName))
            }
        });
        return result
    },
   /* 监听文件的改动  就是使用watchFile及其同步版本。
        sys = require("util");
    fs.watchFile("aaa.js", function(curr, prev) {
        sys.puts("\n\ttest_file.txt has been edited");
        sys.puts("\tThe current mtime is: " + curr.mtime);
        sys.puts("\tThe previous mtime was: " + prev.mtime + "\n");
    });
*/

/*取得给定目录下的所有目录与文件*/
    getAllFoldersAndFiles:function (dir) {
        function iterator(url, folders, files) {
            var stat = fs.statSync(url);
            if (stat.isDirectory()) {
                folders.unshift(url);//收集目录
                inner(url, folders, files);
            } else if (stat.isFile()) {
                files.unshift(url);//收集文件
            }
        }

        function inner(path, folders, files) {
            var arr = fs.readdirSync(path);
            for (var i = 0, el; el = arr[i++];) {
                iterator(path + "/" + el, folders, files);
            }
        }

        function getAll(dir) {
            var folders = [], files = [];
            try {
                iterator(dir, folders, files);
            } catch (e) {
                console.log(e);
            } finally {
                return {
                    folders:folders,
                    files:files
                }
            }
        }
        return getAll(dir);

    },


    /*删除目录以及子目录*/
    rmdirSync:function () {

        return function (dir, callback) {
            callback = callback || function () {
            };
            var dirs = [];

            try {
                dirs = getAllFoldersAndFiles(dir);
                for (var i = 0, el; el = dirs[i++];) {
                    fs.rmdirSync(el);//一次性删除所有收集到的目录
                }
                callback()
            } catch (e) {//如果文件或目录本来就不存在，fs.statSync会报错，不过我们还是当成没有异常发生
                e.code === "ENOENT" ? callback() : callback(e);
            }
        }
    }

}
exports.jsFile = myFile;
