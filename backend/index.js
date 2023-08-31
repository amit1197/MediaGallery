const express = require('express');
const cors = require('cors')
const app = express();
require('./db/config');
const User = require('./db/User');
const Photo = require('./db/Photo');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
// const zlib = require('zlib');


// const upload = multer({dest:'uploads/'})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() ;
      cb(null,file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });

// app.post('/upload', upload.single('file'), (req, res) => {
//   try {
//     const filePath = `uploads/${req.file.filename}`;
//     const fileData = require('fs').readFileSync(filePath);
//     const compressedData = pako.gzip(fileData); // Use .deflate() for Brotli compression

//     // Save the compressed data to a new file
//     const compressedFilePath = `uploads/compressed_${req.file.filename}`;
//     require('fs').writeFileSync(compressedFilePath, compressedData);

//     res.status(200).json({ message: 'File uploaded and compressed successfully.' });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'An error occurred during file upload and compression.' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

app.use(express.json());
app.use(cors({
    origin:'*'
}));

app.post('/register',async (req,resp)=>{
    let user= new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
})

app.post('/login', async (req,resp)=>{
    let user =  await User.findOne(req.body);
    if(req.body.password && req.body.email)
    {
        let user = await User.findOne(req.body).select("-password");
        if(user){
            resp.send(user)
        }
        else{
            resp.send({result:'No user found'})
        }
    }
    else{
        resp.send({result:'No user found'})
    }
})

// app.post('/addPhoto', upload.single("image"), async(req,resp)=>{
// const saveImage = new Photo({
//     title:req.body.title,
//     location:req.body.location,
//     img:{
//         data: fs.readFileSync(path.join('uploads', req.file.filename)),

//         contentType:"image/png"
//     },
// });
// saveImage.save()
// .then(savedPhoto => {
//     console.log('Photo saved:', savedPhoto);
//     resp.status(200).json(savedPhoto); // Respond with the saved photo
//   })
//   .catch(error => {
//     console.error('Error saving photo:', error);
//     resp.status(500).json({ error: 'Error saving photo' }); // Respond with an error status
//   });

//     // try {
//     //     const newPhoto = new Photo({
//     //       title: req.body.title,
//     //       location: req.body.location,
//     //       imageUrl: req.file.filename, 
//     //     });
    
//     //     newPhoto.save()
//     //       .then(savedPhoto => {
//     //         console.log('Photo saved:', savedPhoto);
//     //         resp.status(200).json(savedPhoto); // Respond with the saved photo
//     //       })
//     //       .catch(error => {
//     //         console.error('Error saving photo:', error);
//     //         resp.status(500).json({ error: 'Error saving photo' }); // Respond with an error status
//     //       });
//     //   } catch (error) {
//     //     console.error('Error processing request:', error);
//     //     resp.status(500).json({ error: 'Error processing request' }); // Respond with an error status
//     //   }
    
// });

app.post('/addPhoto', upload.single('image'), async (req, resp) => {
  try {
    const outputImagePath = path.join('uploads', 'output.jpg'); // Correct the output image path

    // Resize and process the uploaded image using sharp
    await sharp(req.file.path)
      .resize(800, 600) // Resize to 800x600
      .toFile(outputImagePath);

    const saveImage = new Photo({
      title: req.body.title,
      location: req.body.location,
      img: {
        data: fs.readFileSync(outputImagePath),
        contentType: 'image/jpeg', // Adjust the content type if necessary
      },
    });

    // Save the photo in the database
    const savedPhoto = await saveImage.save();

    console.log('Photo saved:', savedPhoto);
    resp.status(200).json(savedPhoto); // Respond with the saved photo
  } catch (error) {
    console.error('Error saving photo:', error);
    resp.status(500).json({ error: 'Error saving photo' }); // Respond with an error status
  }
});

app.get('/getPhotos',async (req,resp)=>{
    const allPhotos =await  Photo.find();
    resp.json(allPhotos);
})


app.delete("/deletePhoto/:id", async (req, res) => {
    const photoId = req.params.id;
  
    try {
      const deletedPhoto = await Photo.findByIdAndDelete(photoId);
      if (!deletedPhoto) {
        return res.status(404).json({ message: "Photo not found" });
      }
      res.json({ message: "Photo deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting photo" });
    }
  });

  app.patch("/updateFavorite/:id", async (req, res) => {
    const photoId = req.params.id;
  
    try {
      const updatedPhoto = await Photo.findByIdAndUpdate(
        photoId,
        { favourite: true },
        { new: true }
      );
  
      if (!updatedPhoto) {
        return res.status(404).json({ message: "Photo not found" });
      }
  
      res.json({ message: "Photo marked as favorite" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating favorite status" });
    }
  });
  
  app.get("/getFavoritePhotos", async (req, res) => {
    try {
      const favoritePhotos = await Photo.find({ favourite: true });
      res.json(favoritePhotos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching favorite photos" });
    }
  });

app.listen(5000);