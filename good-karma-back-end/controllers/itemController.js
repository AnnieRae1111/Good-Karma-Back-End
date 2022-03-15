const express = require('express')
const router = express.Router()
const Item = require('../models/Item')

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile, getFileStream } = require('../s3')

// const { requireToken } = require('../middleware/auth')

//get all items 
router.get('/', async (req, res, next)=> {
    try{
        const item = await Item.find({})
        console.log(res.json(item))
    }catch(err){
        next(err)
    }
})

//get item by id 
router.get('/:id', async (req, res, next)=>{
    try{
        const oneItem = await Item.findById(req.params.id)
        res.json(oneItem)

    }catch(err){
        next(err)
    }
})


// create a new item// post an item 

// router.post('/', async (req, res, next)=> {
//     try{
//         const newItem = await Item.create(req.body)
//         res.status(201).json(newItem)
//     }catch (err){
//         next(err)
//     }
// })

//sending images back from s3
router.get('/:key', (req, res)=> {
    const key = req.params.key
    const readStream = getFileStream(key)
    readStream.pipe(res)
    //send image data to client
})

// post images and FILE UPLOAD
router.post('/', upload.single('file'), async(req, res, next)=> {
    try{
        const newItem = await Item.create(req.body)
        res.status(201).json(newItem)
        const file =req.file
        console.log(file)
        const result = await uploadFile(file)
        console.log(result)
        res.send({imagePath: `/${result.Key}`})
        
    }catch(err){
        next(err)
    }

})

//Update an item 
router.put('/:id', async (req, res, next)=> {
    try{
        console.log(req.params.id)
        console.log(req.body)
        const itemToUpdate = await Item.findByIdAndUpdate(
            req.params.id, 
            req.body,
            {
                new: true,
            }
        )
        if (itemToUpdate){
            res.json(itemToUpdate) //send back updated item 
        }else {
            res.sendStatus(404) // send back a 404 error 
        }
    }catch (err){
        next(err)
    }
})


//delete an item 
router.delete('/:id', async (req, res, next)=> {
    try{
        const itemToDelete = await Item.findByIdAndDelete(req.params.id)
        console.log(itemToDelete)
        
        if(itemToDelete){
            res.sendStatus(204)//send 204 message/ No Content
        }else {
            res.sendStatus(404)
        }
    }catch(err){
        next(err)
    }
})


module.exports = router