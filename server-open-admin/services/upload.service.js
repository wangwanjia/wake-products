const path = require("path");
const crypto = require("crypto");
const fs = require("fs").promises;
const { AppError, ErrorTypes } = require("../middlewares/errorHandler");

// 确保上传目录存在
const UPLOAD_DIR = path.join(__dirname, "..", "uploads");

// 支持的文件类型
const allowedMimeTypes = {
  // 图片类型
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
  // 视频类型
  "video/mp4": ".mp4",
  //   'video/quicktime': '.mov',
  //   'video/webm': '.webm',
  //   'video/x-msvideo': '.avi',
  // 文档类型
  "application/pdf": ".pdf",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    ".docx",
  "application/vnd.ms-excel": ".xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx",
  "application/vnd.ms-powerpoint": ".ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    ".pptx",
  // 文本类型
  //   'text/plain': '.txt',
  //   'text/csv': '.csv',
  // 压缩文件
  //   'application/zip': '.zip',
  //   'application/x-rar-compressed': '.rar'
};

// 文件大小限制
const MAX_IMAGE_SIZE = 20 * 1024 * 1024; // 图片大小限制 (20MB)
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 视频大小限制 (100MB)
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 其他文件大小限制 (50MB)

// 生成唯一文件名
function generateUniqueFilename(mimeType) {
  const extension = allowedMimeTypes[mimeType] || "";
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(8).toString("hex");
  return `${timestamp}-${randomString}${extension}`;
}

// 内部上传文件函数
async function _uploadFile(file, ctx) {
  // 检查文件是否存在
  if (!file || !file.filepath) {
    throw new AppError(ErrorTypes.BAD_REQUEST, "未上传任何文件");
  }

  // 检查文件类型
  const mimeType = file.mimetype || file.type;

  // 检查文件类型是否允许
  if (!allowedMimeTypes[mimeType]) {
    // 删除已上传的文件
    try {
      await fs.unlink(file.filepath);
      console.log(`已删除不支持类型的文件: ${file.filepath}`);
    } catch (unlinkError) {
      console.error(`删除不支持类型文件失败: ${unlinkError.message}`);
    }
    throw new AppError(ErrorTypes.BAD_REQUEST, `不支持的文件类型: ${mimeType}`);
  }

  // 检查文件类型是否与当前接口匹配
  if (
    ctx.state.allowedFileTypes &&
    !ctx.state.allowedFileTypes.includes(mimeType)
  ) {
    // 删除已上传的文件
    try {
      await fs.unlink(file.filepath);
      console.log(`已删除不符合接口要求的文件: ${file.filepath}`);
    } catch (unlinkError) {
      console.error(`删除不符合接口要求文件失败: ${unlinkError.message}`);
    }
    const allowedTypeName = ctx.state.allowedTypeName || "该接口";
    throw new AppError(
      ErrorTypes.BAD_REQUEST,
      `文件类型不匹配。${allowedTypeName}接口仅允许上传以下类型的文件: ${ctx.state.allowedFileTypes.join(
        ", "
      )}`
    );
  }

  // 根据文件类型检查大小限制
  let sizeLimit;
  let subDir;

  if (mimeType.startsWith("image/")) {
    sizeLimit = MAX_IMAGE_SIZE;
    subDir = "img";
  } else if (mimeType.startsWith("video/")) {
    sizeLimit = MAX_VIDEO_SIZE;
    subDir = "video";
  } else {
    sizeLimit = MAX_FILE_SIZE;
    subDir = "file";
  }

  if (file.size > sizeLimit) {
    // 删除已上传的文件
    try {
      await fs.unlink(file.filepath);
      console.log(`已删除超出大小限制的文件: ${file.filepath}`);
    } catch (unlinkError) {
      console.error(`删除超出大小限制文件失败: ${unlinkError.message}`);
    }
    const limitInMB = sizeLimit / (1024 * 1024);
    throw new AppError(
      ErrorTypes.BAD_REQUEST,
      `文件大小超过限制 (${limitInMB}MB)`
    );
  }

  try {
    // 确保子目录存在
      const subDirPath = path.join(UPLOAD_DIR, subDir);
      try {
        await fs.mkdir(subDirPath, { recursive: true });
      } catch (mkdirError) {
        throw new AppError(
          ErrorTypes.INTERNAL_SERVER_ERROR,
          `创建目录失败: ${mkdirError.message}`
        );
      }

    // 生成唯一文件名
      const fileName = generateUniqueFilename(mimeType);
      const destinationPath = path.join(subDirPath, fileName);

      // 处理所有文件类型（包括图片）
      try {
        // 尝试移动文件
        await fs.rename(file.filepath, destinationPath);
      } catch (renameError) {
        // 如果移动失败（可能是跨设备移动），则复制后删除
        console.warn("移动文件失败，尝试复制后删除:", renameError);
        await fs.copyFile(file.filepath, destinationPath);
        // 删除原始文件
        try {
          await fs.unlink(file.filepath);
          console.log(`原始文件已删除: ${file.filepath}`);
        } catch (unlinkError) {
          console.error(`删除原始文件失败: ${unlinkError.message}`);
        }
      }

    // 构建文件URL - 将Windows反斜杠替换为URL正斜杠
    const relativePath = path
      .relative(UPLOAD_DIR, destinationPath)
      .replace(/\\/g, "/");
    const fileUrl = `${ctx.protocol}://${ctx.host}/uploads/${relativePath}`;

    return {
      message: "上传成功",
      fileName,
      fileUrl,
      //   filePath: destinationPath
    };
  } catch (error) {
    // 删除文件
    try {
      await fs.unlink(file.filepath);
      console.log(`已删除上传失败的文件: ${file.filepath}`);
    } catch (unlinkError) {
      console.error(`删除上传失败文件失败: ${unlinkError.message}`);
    }
    throw error;
  }
}

// 上传图片
async function uploadImage(file, ctx) {
  // 检查文件是否存在
  if (!file) {
    throw new AppError(ErrorTypes.BAD_REQUEST, "未上传任何文件");
  }
// 判断是否上传了多张图片
if (Array.isArray(file)) {
    // 删除已上传的所有文件
    for (const f of file) {
      try {
        await fs.unlink(f.filepath);
        console.log(`已删除超出数量限制的文件: ${f.filepath}`);
      } catch (unlinkError) {
        console.error(`删除超出数量限制文件失败: ${unlinkError.message}`);
      }
    }
    throw new AppError(ErrorTypes.BAD_REQUEST, "最多只能上传一张图片");
  }


  // 检查文件类型
  const mimeType = file.mimetype || file.type;
  if (!mimeType.startsWith("image/")) {
    // 删除已上传的文件
    try {
      await fs.unlink(file.filepath);
      console.log(`已删除非图片类型的文件: ${file.filepath}`);
    } catch (unlinkError) {
      console.error(`删除非图片类型文件失败: ${unlinkError.message}`);
    }
    throw new AppError(ErrorTypes.BAD_REQUEST, "只允许上传图片文件");
  }

  return _uploadFile(file, ctx);
}

// 上传多个图片
async function uploadMultipleImages(files, ctx) {
  // 上传图片不能大于三张

  if (!files || files.length === 0) {
    throw new AppError(ErrorTypes.BAD_REQUEST, "未上传任何文件");
  }
  if (files.length > 3) {
    // 删除已上传的所有文件
    for (const file of files) {
      try {
        await fs.unlink(file.filepath);
        console.log(`已删除超出数量限制的文件: ${file.filepath}`);
      } catch (unlinkError) {
        console.error(`删除超出数量限制文件失败: ${unlinkError.message}`);
      }
    }
    throw new AppError(ErrorTypes.BAD_REQUEST, "最多只能上传三张图片");
  }

  // 检查文件类型
  for (const file of files) {
    const mimeType = file.mimetype || file.type;
    if (!mimeType.startsWith("image/")) {
      // 删除已上传的所有文件
      for (const f of files) {
        try {
          await fs.unlink(f.filepath);
          console.log(`已删除非图片类型的文件: ${f.filepath}`);
        } catch (unlinkError) {
          console.error(`删除非图片类型文件失败: ${unlinkError.message}`);
        }
      }
      throw new AppError(ErrorTypes.BAD_REQUEST, "只允许上传图片文件");
    }
  }

  const results = [];
  let allSuccess = true;

  for (const file of files) {
    try {
      const result = await _uploadFile(file, ctx);
      results.push({
        success: true,
        ...result,
      });
    } catch (error) {
      allSuccess = false;
      results.push({
        success: false,
        fileName: file.originalname || "未知文件名",
        error: error.message,
      });
    }
  }

  return {
    message: allSuccess ? "全部文件上传成功" : "部分文件上传失败",
    files: results,
  };
}

// 上传视频文件
async function uploadVideo(file, ctx) {
  // 检查文件是否存在
  if (!file) {
    throw new AppError(ErrorTypes.BAD_REQUEST, "未上传任何文件");
  }
  // 判断是否上传了多张视频
if (Array.isArray(file)) {
    // 删除已上传的所有文件
    for (const f of file) {
      try {
        await fs.unlink(f.filepath);
        console.log(`已删除超出数量限制的文件: ${f.filepath}`);
      } catch (unlinkError) {
        console.error(`删除超出数量限制文件失败: ${unlinkError.message}`);
      }
    }
    throw new AppError(ErrorTypes.BAD_REQUEST, "最多只能上传一张视频");
  }

  // 检查文件类型
  const mimeType = file.mimetype || file.type;
  if (!mimeType.startsWith("video/")) {
    // 删除已上传的文件
    try {
      await fs.unlink(file.filepath);
      console.log(`已删除非视频类型的文件: ${file.filepath}`);
    } catch (unlinkError) {
      console.error(`删除非视频类型文件失败: ${unlinkError.message}`);
    }
    throw new AppError(ErrorTypes.BAD_REQUEST, "只允许上传视频文件");
  }

  return _uploadFile(file, ctx);
}

// 上传普通文件
async function uploadGeneralFile(file, ctx) {
  // 检查文件是否存在
  if (!file) {
    throw new AppError(ErrorTypes.BAD_REQUEST, "未上传任何文件");
  }

  // 判断是否上传了多张文件
if (Array.isArray(file)) {
    // 删除已上传的所有文件
    for (const f of file) {
      try {
        await fs.unlink(f.filepath);
        console.log(`已删除超出数量限制的文件: ${f.filepath}`);
      } catch (unlinkError) {
        console.error(`删除超出数量限制文件失败: ${unlinkError.message}`);
      }
    }
    throw new AppError(ErrorTypes.BAD_REQUEST, "最多只能上传一个文件");
  }

  // 检查文件类型
  const mimeType = file.mimetype || file.type;
  if (mimeType.startsWith("image/") || mimeType.startsWith("video/")) {
    // 删除已上传的文件
    try {
      await fs.unlink(file.filepath);
      console.log(`已删除非图片或视频类型的文件: ${file.filepath}`);
    } catch (unlinkError) {
      console.error(`删除非图片或视频类型文件失败: ${unlinkError.message}`);
    }
    throw new AppError(
      ErrorTypes.BAD_REQUEST,
      "请使用专门的图片或视频上传接口"
    );
  }

  return _uploadFile(file, ctx);
}

exports.uploadFile = _uploadFile;
exports.uploadImage = uploadImage;
exports.uploadMultipleImages = uploadMultipleImages;
exports.uploadVideo = uploadVideo;
exports.uploadGeneralFile = uploadGeneralFile;
