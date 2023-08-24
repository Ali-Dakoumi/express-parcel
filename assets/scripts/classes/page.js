import {EventEmitter} from 'events'
import { gsap } from 'gsap'
import Prefix from 'prefix'

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

        this.transformPrefix = Prefix('transform')

        this.onMouseWheelEvent = this.onMouseWheel.bind(this)

    }

    create() {
        this.element = document.querySelector(this.selector)
        this.elements = {}
        this.scroll = {
            current: 0,
            target: 0,
            limit: 1000
        }

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
       return new Promise(resolve => {
        const animationIn = gsap.timeline()
        animationIn.fromTo(this.element,{autoAlpha: 0}, {
            autoAlpha: 1,
        })
        animationIn.call(_ => {
            this.addEventListeners()
            resolve()
        })
    })
    }

    hide () {
        return new Promise(resolve => {
            this.removeEventListeners()
            const animationOut = gsap.timeline()
            animationOut.to(this.element, {
             autoAlpha: 0,
            })
            animationIn.call(_ => {
                resolve()
            })        
        })
     }

     onMouseWheel(event) {        
        const { deltaY } = event

        this.scroll.target += deltaY
     }

     update () {
        this.scroll.current = gsap.utils.interpolate(this.scroll.current, this.scroll.target, 0.1)
        this.scroll.target = gsap.utils.clamp(0, this.scroll.limit, this.scroll.target)
        if (this.scroll.target > this.scroll.limit ) {
            this.scroll.target = this.scroll.limit
        }
        if (this.elements.wrapper) {
            this.elements.wrapper.style[this.transformPrefix] = `translateY(-${this.scroll.current}px)`
        }
     }

     addEventListeners () {
        window.addEventListener('mousewheel', this.onMouseWheelEvent)
     }

     removeEventListeners () {
        window.removeEventListener('mousewheel', this.onMouseWheelEvent)
     }



}