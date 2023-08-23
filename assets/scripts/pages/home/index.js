import Page from "../../classes/page"

export default class About extends Page {
    constructor () {
        super({
            id: 'home',
            element: '.home',
            elements: {
                navigation: document.querySelector('.navigation'),
                title: '.home__title',
                content: '.home__content'
            }
        })
    }


}