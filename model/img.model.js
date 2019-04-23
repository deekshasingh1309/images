var mongoose = require('mongoose');

//Schema for Image
const ImageSchema = mongoose.Schema({
	url: {
		type: String,
		required: true
	},
	fileName : {
		type: String,
		require: true
	},
	imageType: {
		type: Number,
	}
	
});

module.exports = mongoose.model('images', ImageSchema);