import {EventEmitter} from 'events'
import { gsap } from 'gsap'

import {each} from 'lodash'

export default class Page extends EventEmitter {
    constructor ({
        element,
        elements,
        id
    }) {
        super()

        this.id = id
        this.selector = element
        this.selectorChildren = {...elements}

        this.create
        this.show()

    }

    create() {
        this.element = document.querySelector(this.selector)
        this.elements = {}

        each(this.selectorChildren, (entry, key) => {
            if (entry instanceof HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)) {
                this.elements[key] = entry
            } else {
                this.elements[key] = document.querySelectorAll(entry)
                if (this.elements[key].length === 0 ) {
                    this.elements[key] = null
                } else if (this.elements[key].length === 1 ) {
                    this.elements[key] = document.querySelector(entry)
                }
            }
          }
        )
    }

    show () {
       console.log("🚀 ~ file: page.js:44 ~ Page ~ show ~ this.element :", this.element )
       return new Promise(resolve => {gsap.from(this.element, {
            autoAlpha: 0,
            onComplete: resolve
        })})
    }

    hide () {
        console.log("🚀 ~ file: page.js:44 ~ Page ~ hide ~ this.element :", this.element )
        return new Promise(resolve => {gsap.to(this.element, {
             autoAlpha: 0,
             onComplete: resolve
         })})
     }



}