const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) =>{
    const {prompt, size } = req.body;

    //Image Sizes
    const sizes = {
        small: '256x256',
        medium: '512x512',
        default: '1024x1024'
    }
    const imageSize = sizes[size] || sizes.default;

    try{
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: imageSize,
            
        });
        const imageUrl = response.data.data[0].url;

        res.status(200).json({
            success: true,
            data: imageUrl
        })
    }catch(e){
        if (e.response) {
            console.log(e.response.status);
            console.log(e.response.data);
        } else {
            console.log(e.message);
        }
        res.status(500).json({
            success: false,
            error: ' The image could not be generated'
        })
    } 
}

module.exports = {generateImage}