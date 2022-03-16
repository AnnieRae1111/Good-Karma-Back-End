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
// const Upload = upload.fields([{category:'category', title:'title', date_posted:'date posted', images:8}])
router.post('/', async (req, res, next)=> {
    try{
        const newItem = await Item.create(req.body)
        res.status(201).json(newItem)
        const file = req.file
        console.log(file)
    }catch (err){
        next(err)
    }
})

//sending images back 
router.get('/:key', (req, res)=> {
    const key = req.params.key
    const readStream = getFileStream(key)
    readStream.pipe(res)
})

// router.post('/', upload.single('newImage'), async(req, res, next)=> {
//     try{
//         const file = req.file
//         console.log(file)
//         const result = await uploadFile(file)
//         console.log(result)
//         res.send('success')
//         res.send({imagePath: `/${result.Key}`})
//         const newItem = await Item.create(req.body)
//         res.status(201).json(newItem,'newitem')
//         console.log(newItem)
//     }catch(err){
//         next(err)
//     }

// })

//Update an item 
router.put('/:id', async (req, res, next)=> {
    try{
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