import mongoose from "mongoose"


const Artist = mongoose.Schema({
	name: String,
	birthdate: Date
},{
	versionKey: false
})

export default mongoose.model('Artist', Artist,'Artists')
