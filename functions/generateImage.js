const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { prompt, size } = JSON.parse(event.body);
    // Image Sizes
    const sizes = {
        '256x256': '256x256',
        '512x512': '512x512',
        '1024x1024': '1024x1024',
    };
    const imageSize = sizes[size] || sizes['512x512'];
    try {
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: imageSize,
        });
        const imageUrl = response.data.data[0].url;

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                data: imageUrl,
            }),
        };
    } catch (e) {
        if (e.response) {
            console.error("Error status:", e.response.status);
            console.error("Error data:", e.response.data)
        } else {
            console.error("Error message:", e.message);
        }
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                error: 'The image could not be generated',
            }),
        };
    }

  
};
