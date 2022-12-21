const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) =>{
    try{
        const response = await openai.createImage({
            prompt: 'Polar bear on ice skates',
            n: 1,
            size: '512x512',
            
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