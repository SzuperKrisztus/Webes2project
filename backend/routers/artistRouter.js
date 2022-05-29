import Album from "../models/AlbumModel.js"
import { body, validationResult } from 'express-validator';
import express from "express"
import Artist from "../models/ArtistModel.js"

const artistRouter = express.Router()

artistRouter.get("/", async (req,res)=>{
	const artists = await Artist.find()
	res.send(artists)
})


artistRouter.get("/getArtistById",body('artistId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})


	Artist.findById(req.body.artistId).then(
		artist => {
			if(artist!=null){
				res.json(artist)
			}
		

		}
		).catch(error => {
	
			res.status(500).json({error: "This artist is not found!"})
		})

})

artistRouter.post("/createArtist",body('name').notEmpty(),body('birthdate').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})
	


	Artist.count({name:req.body.name},function(error,count){
		if(count!=0){
			res.status(500).json("This artist is already exists!")
			return
		}else{
			Artist.create({
				name: req.body.name,
				albumId: req.body.albumId,
                birthdate: Date.parse(req.body.birthdate)
			}).then(artist => res.json(artist)).catch(error => res.status(500).json(error))
		}

	})

})

artistRouter.delete("/deleteArtist",body('artistId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})

	Artist.deleteOne({_id:req.body.artistId}).then(()=>{res.status(200).send()}).catch(error => res.status(500).json(error))

})

artistRouter.patch("/updateArtist",body('artistId').notEmpty(),async(req,res)=>{

	const errors = validationResult(req)

	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()})



	Artist.findByIdAndUpdate(req.body.artistId, req.body, {new: true}).then((artist) => {
		if (!artist) {
			return res.status(404).send();
		}
		res.send(artist);
	}).catch((error) => {
		res.status(500).send(error);
	})	

})

export default artistRouter