import mongoose from "mongoose"


const Album = mongoose.Schema({
	albumname: String,
	artist: {type: mongoose.Schema.Types.ObjectId, ref:'Artist'}
},{
	versionKey: false
})


export default mongoose.model('Album', Album,'Albums')