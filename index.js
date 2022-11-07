const express = require('express')
const app = express();
const port = 3000;
var cors = require('cors');
const wbm = require("./test/wbm");



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post('/api', (req, res)=> {
    wbm.start({showBrowser: true, qrCodeData: true, session: false}).then(async (qrCodeData) => {
        await wbm.waitQRCode();
        const { contacts } = req.body

        const message = 'Hi {{name}}, ton montant du est {{montant_du}}';

        await wbm.send(contacts, message);
        await wbm.end();
    }).catch(err => console.log(err));
})


