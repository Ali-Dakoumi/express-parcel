import '../css/styles.css';
import { gsap } from 'gsap'
// import image from "../images/dmitry-kropachev-j-tLvS3Xk0I-unsplash.webp"

// import imagemin from 'imagemin';
// import imageminWebp from 'imagemin-webp';

// async function name(params) {
  
  
//   await imagemin(['images/*.{jpg,png,webp}'], {
//     destination: 'src/public/assets/images',
//     plugins: [
//       imageminWebp({quality: 50})
//     ]
//   });
//   console.log('Images optimized');
// }

// name()
gsap.to('.test', 1, { x: 100, color: "red"})
console.log('It works ccc!');
