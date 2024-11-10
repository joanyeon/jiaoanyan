const fs = require("fs");
const path = require("path");

function renameImages(folderPath) {
  // 读取文件夹内容
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return console.error("Error reading directory:", err);
    }
    // 只处理文件，并按名称排序
    const sortedFiles = files
      .filter((file) => fs.statSync(path.join(folderPath, file)).isFile())
      .sort();

    sortedFiles.forEach((file, index) => {
      // 获取文件的旧路径
      const oldPath = path.join(folderPath, file);
      // 定义新的文件名，例如 "1.jpg", "2.jpg"
      // 获取文件类型
      const extname = path.extname(file);
      let newPath;
      if ([".jpg", ".jpeg", ".png", ".JPG", ".HEIC"].includes(extname)) {
        newPath = path.join(folderPath, `${index + 1}.jpg`);
      } else {
        newPath = path.join(folderPath, `${index + 1}${extname}`);
      }

      // 重命名文件
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error("Error renaming file:", err);
        } else {
          console.log(`成功地将 ${file} 重命名为 ${newPath}`);
        }
      });
    });
  });
}

// 使用时，将 'your_folder_path' 替换为你要处理的文件夹路径
const folderPath = "../img/Daily";
renameImages(folderPath);
