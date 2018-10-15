import SelfImage from './selfImage';
export default class App {
    public selfImage: SelfImage;

    constructor() {
        this.selfImage = new SelfImage('./', true);
    }
}
window.addEventListener('load', () => {
    new App();
}, false);
