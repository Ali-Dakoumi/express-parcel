import axios from 'axios';
import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN
const domain = process.env.SHOPIFY_STORE_DOMAIN


async function fetchFakeProducts() {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch fake products');
  }
}




const app = express();

// view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  let products = await fetchFakeProducts()
  res.render('index', { title: 'home!', id: "home", class: "home", products });
});
app.get('/about', (req, res) => {
  res.render('about', { title: 'about!', id: "about", class: "about" });
});
app.listen(3000, () => {
  console.log('Express is running...');
});
