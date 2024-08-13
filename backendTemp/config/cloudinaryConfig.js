// import {v2 as cloudinary} from 'cloudinary';
const cloudinary = require('cloudinary').v2
const fs = require('fs')
// import fs from 'fs'
// Configure Cloudinary with your credentials
cloudinary.config({
 cloud_name: 'dtzqtpq3o', 
api_key: '825862861419986',
 api_secret: 'E4CZPksuU3gWVQnIMEhu0gRHLIs'
});
const uploadOnCloudinary = async (localFilePath) => {
  try {
      if (!localFilePath) return null 
          
      const response = await cloudinary.uploader.upload(localFilePath,{resource_type:'auto'})
      console.log("file is uploaded on cloudinary " , response.url);
      fs.unlinkSync(localFilePath);
      return response
  } catch (error) {
      fs.unlinkSync(localFilePath);
      return null
  }
}

// export default {uploadOnCloudinary}
module.exports=uploadOnCloudinary