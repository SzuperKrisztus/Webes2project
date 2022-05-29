import Album from "../models/AlbumModel.js"
import express from "express"
import { body, validationResult } from 'express-validator';
import Artist from "../models/ArtistModel.js"



const albumRouter = express.Router()

albumRouter.get("/", async (req,res)=>{
	const albums = await Album.find().populate('artist')
	res.send(albums)
})

albumRouter.get("/getAlbumById",body('albumId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})


	Album.findById(req.body.albumId).populate('artist').then(album => res.json(album)).catch(error => res.status(400).json({error: "Album not found!"}))



})

albumRouter.post("/createAlbum",body('name').notEmpty(),body('artistId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})
	


	Album.count({"albumname":req.body.name},function(error,count){
		console.log(req.body.name)
		if(count!=0){
			res.status(500).json("This album is already exists!")
			return
		}else{
			Album.create({
				albumname: req.body.name,
				artist: req.body.artistId
			}).then(album => res.json(album)).catch(error => res.status(500).json(error))
		}

	})

	})

	


albumRouter.delete("/deleteAlbum",body('albumId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})

	Album.deleteOne({_id:req.body.albumId}).then(()=>{res.status(200).send()}).catch(error => res.status(500).json(error))

})

albumRouter.patch("/updateAlbum",body('albumId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})



	Album.findByIdAndUpdate(req.body.albumId, req.body, {new: true}).then((album) => {
		if (!album) {
			return res.status(404).send();
		}
		res.send(album);
	}).catch((error) => {
		res.status(500).send(error);
	})	

})

	


export default albumRouter