import '../css/styles.css';
import { gsap } from 'gsap'
import {test} from "./new.js"

test()

gsap.to('.test', 1, { x: 100, color: "red"})
console.log('It works ccc!');
