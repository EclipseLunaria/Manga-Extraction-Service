import router from './routes';
import express from 'express';
import process from 'process';
const app = express();
const port = process.env.PORT || 6967;
app.use("/extract/",router)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
 