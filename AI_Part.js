
const express = require("express")
const OpenAI = require("openai")
const app = express()
app.use(express.json())

class Outfit {
    constructor(name, items) {
        this.name = name;
        this.items = items;
    }
}


const openai = new OpenAI({
    apiKey:"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"
})

app.get('/getResponse', async(req,res) => {
    const userPrompt = req.body.userPrompt;
    const response = await openai.chat.completions.create({
        model:'gpt-3.5-turbo',
        messages:[{"role": "system", "content": "You are a fashion designer. Based on user input, you will return 3 outfits with different clothes that match the required theme. Make it of the following format:\n\nOutfit #: \n- Item 1\n- Item 2\n- Item 3\n- Item 4\n\nYour output will be used as search terms on a search engine that we use for ASOS wear. Specify color and gender of the clothes.\n\n If asked about what goes well with a certain clothing item: generate three outfits that go well with it too."},
        {"role":"user", "content":userPrompt}],
        max_tokens: 400
    })
    answer = response.choices[0].message.content
    const parsedOutfits = parseOutfits(answer);
    console.log(parsedOutfits);
    res.send(answer);
})

app.listen(3000,() => {
    console.log("server started")
})

function parseOutfits(input) {
    const outfits = [];
    const outfitRegex = /Outfit (\d+):\s*([\s\S]*?)(?=(Outfit \d+:|$))/g;
    let match;
    while ((match = outfitRegex.exec(input)) !== null) {
        const outfitNumber = parseInt(match[1]);
        const items = match[2].trim().split('\n').map(item => item.trim().replace(/^- /, ''));
        const outfit = new Outfit(`Outfit ${outfitNumber}`, items);
        outfits.push(outfit);
    }
    return outfits;
}

