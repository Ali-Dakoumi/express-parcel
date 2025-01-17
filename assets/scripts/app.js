import { each } from "lodash"
import About from "./pages/about"
import Home from "./pages/home"
import '../css/styles.scss';
import Preloader from "./components/preloader";

class App {
    constructor() {
        this.createPreloader()
        this.createContent()
        this.createPages()
        this.addEventListeners()

        this.update()
    }

    createContent() {
        this.content = document.querySelector('.content')
        this.template = this.content.getAttribute('data-template')

    }

    createPages() {
        console.log('create pages')
        this.pages = {
            home: new Home(),
            about: new About()
        }
        this.page = this.pages[this.template]
        this.page.create()
    }

    createPreloader() {
        this.preloader = new Preloader()
        this.preloader.once('preloaded', this.onPreloaded.bind(this))
    }

    onPreloaded() {
        console.log('completed')
        this.preloader.destroy()
        this.page.show()
    }

    update() {
        if(this.page && this.page.update) {
            this.page.update()
        }
        this.frame = window.requestAnimationFrame(this.update.bind(this))
    }

    async onChange(link) {
        await this.page.hide()

        const newPage = await window.fetch(link)
        if (newPage.status === 200) {
            const html = await newPage.text()
            const div = document.createElement('div')
            div.innerHTML = html
            const divContent = div.querySelector('.content')
            this.template = divContent.getAttribute('data-template')
            this.content.setAttribute('data-template', this.template)
            this.content.innerHTML = divContent.innerHTML

            this.page = this.pages[this.template]
            this.page.create()
            this.page.show()
            window.history.pushState(null, null, link);

        } else {
            console.log('error')
            throw new Error('couldnt fetch page ', link)
        }

    }

    async addEventListeners() {
        const links = document.querySelectorAll('a')
        each(links, link => {
            link.onclick = (e) => {
                e.preventDefault()
                const { href } = link
                this.onChange(href)

                console.log("🚀 ~ file: page.js:47 ~ Page ~ addEventListeners ~ prventDefault:", link)
            }
        })
    }
}

new App()