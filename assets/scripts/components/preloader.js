import { each } from "lodash";
import Component from "../classes/component"
import { gsap } from "gsap";
import SplitType from 'split-type'


export default class Preloader extends Component {
    constructor() {
        super({
            element: '.preloader',
            elements: {
                text: '.preloader__text',
                number: '.preloader__number',
                images: document.querySelectorAll('img')
            }
        })
        this.text = new SplitType(this.elements.text, { types: 'lines, chars' })

        this.length = 0
        console.log('preloader', this.element, this.elements)
        this.createPreloader()
    }


    createPreloader() {
        if (!this.elements.images.length) {
            this.onloaded()
            return;
        }
        each(this.elements.images, image => {
            image.src = image.getAttribute('data-src')
            image.add
            image.onload = () => {
                this.onAssetLoaded(image)
            }
        })
    }

    async onAssetLoaded(image) {
        this.length += 1
        const percent = this.length / this.elements.images.length
        this.elements.number.innerHTML = `${Math.round(percent * 100)}%`
        if (percent === 1) {
           await this.onloaded()
        }
        console.log("🚀 ~ file: preloader.js:31 ~ Preloader ~ onAssetLoaded ~ image:", percent)
    }

    onloaded() {
        return new Promise((resolve) => {

            const tl = gsap.timeline()
            tl.to(this.text.chars, {
                duration: 0.8,
                scaleY: 0,
                opacity: 0,
                y: "-100%",
                stagger: 0.008,
                ease: 'expo.out'
            })
            tl.to(this.elements.number, {
                autoAlpha: 0,
                scaleY: 0,
                transformOrigin: "0% 0%",
                y: "-100%",
                ease: 'expo.out'
            }, "-=0.8")
            tl.to(this.element, {
                scaleY: 0,
                transformOrigin: "0% 0%",
                ease: 'expo.out'
            })
            tl.call(() => {
                this.emit('preloaded')
                resolve
            })
        })
    }

    destroy() {
        this.element.parentNode.removeChild(this.element)
    }
}