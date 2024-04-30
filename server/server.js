// server.js

const express = require('express');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

const WORDS_FILE_PATH = 'C:\\one word\\server\\words.txt.txt'; // Updated file path

app.use(express.static('public'));
app.use(express.json());

app.get('/get-word', async (req, res) => {
    try {
        const currentWord = await fs.readFile(WORDS_FILE_PATH, 'utf-8');
        res.status(200).send(currentWord);
    } catch (error) {
        console.error('Error retrieving word:', error);
        res.status(500).send('Error retrieving word');
    }
});

app.post('/update-word', async (req, res) => {
    const newWord = req.body.word;

    try {
        await fs.writeFile(WORDS_FILE_PATH, newWord);
        res.status(200).send('Word updated successfully');
    } catch (error) {
        console.error('Error updating word:', error);
        res.status(500).send('Error updating word');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
