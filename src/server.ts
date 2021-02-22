import express from 'express';
const app = express();

app.get('/', (req, res) => {

    return res.json({ message: "Hellow world - NLW 04 " })
})

app.post('/', (req, res) => {
    return res.json({ message: "Os dados foram salvos com sucesso!" })
})

app.listen(3333, () => { console.log("Server run in port: 3333") })

