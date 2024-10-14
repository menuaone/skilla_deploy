const express = require('express');
const app = express();
const port = 5000;
const URL =
    'https://api.skilla.ru/mango/getList?date_start=2024-9-10&date_end=2024-10-14&limit=200';

app.listen(port, () => {
    console.log(`Server is runnning on port ${port}`);
});

async function getDataFromApi() {
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer testtoken',
        },
    });

    const data = await response.json();

    return data.results;
}


app.get('/contact_list', async (req, res) => {
    try {
        const { order = 'asc', sortBy = 'dayTime' } = req.query;
        const list = await getDataFromApi();

        // сортировка входых данных(базово по возрастанию)
        list.sort((a, b) => {
            if (sortBy === 'dayTime') {
                if (order === 'asc') {
                    return (
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    ); // По возрастанию
                } else {
                    return (
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                    ); // По убыванию
                }
            } else if (order === 'asc') {
                return a[sortBy] > b[sortBy] ? 1 : -1; // По возрастанию
            } else {
                return a[sortBy] < b[sortBy] ? 1 : -1; // По убыванию
            }
        });

        res.send(list);
    } catch (error) {
        console.log('#### serverError:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

