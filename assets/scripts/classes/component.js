import {each} from 'lodash'
import EventEmitter from 'events'

export default class Component extends EventEmitter {
    constructor ({
        element,
        elements,
    }) {
        super()
        this.selector = element
        this.selectorChildren = {...elements}

        this.create()
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

    addEventListeners () {}

    removeEventListeners () {}

}