import express from 'express';

const app = express();
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`App listening at port ${port}`));
