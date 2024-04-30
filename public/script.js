document.addEventListener('DOMContentLoaded', async () => {
    const wordElement = document.getElementById('word-of-the-day');
    const changeWordBtn = document.getElementById('change-word-btn');

    try {
        const response = await fetch('/get-word');
        const currentWord = await response.text();
        wordElement.textContent = currentWord;
    } catch (error) {
        console.error('Error fetching word:', error);
    }

    changeWordBtn.addEventListener('click', async () => {
        const newWord = prompt('Enter a new word:');
        if (newWord) {
            try {
                await fetch('/update-word', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ word: newWord }),
                });
                wordElement.textContent = newWord;
            } catch (error) {
                console.error('Error updating word:', error);
            }
        }
    });
});
