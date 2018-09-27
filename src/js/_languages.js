//determinate which language the User Browser has

let welcomeMessage = document.querySelector('div');



class User {
    constructor(userLang) {

        this._languagesArray = [];
        this._language = userLang;
        this._msg = null;
        this.askLanguages();
        this.checkLanguages();
        this.printHallo();

    }

    fillLanguagesArray() {
        this._languagesArray.push(this._language);
    }

    askLanguages() {
        if (this._language != null || this._language != 'undefined' || this._language != '') {
            this.checkLanguages();
            this.fillLanguagesArray();
        } else {
            console.log('no languages settings on your browser')
        }
    }

    checkLanguages() {
        if (!navigator) {
            return null;
        }

        switch (this._language) {
            case "de":
                this.printHallo(`<h2>Willkommen zum <span>JS Challenges</span></h2>
                <br><h5>spielend javascript programieren lernen  - ein Spiel prototype</h5>
                <input type="button" id="check" class="btn btn-info mx-auto" value="zum log in">`);
                break;
            case "en":
                this.printHallo(`<h2>Welcome to <span>JS Challenges</span></h2><br>
                <h5>learn javascript playing with - a game prototype</h5>
                <input type="button" id="check" class="btn btn-info mx-auto" value="start registration">`);
                break;
            case "en-US":
                this.printHallo(`<h2>Welcome to <span>JS Challenges</span></h2><br>
                <h5>learn javascript playing with - a game prototype</h5>
                <input type="button" id="check" class="btn btn-info mx-auto" value="start registration">`);
  
                break;
            case "es":
                // this.printHallo('Bienvenido a ');
                this.printHallo(`<h2>Bienvenido a <span>JS Challenges</span></h2><br>
                <h5>aprende javascript jugando - un prototipo</h5>
                <input type="button" id="check" class="btn btn-info mx-auto" value="pasar a registrarse">`);

                break;
            default:
                this.printHallo(`<h2>Welcome to <span>JS Challenges</span></h2><br>
                    <h5>learn javascript playing with - a game prototype</h5>
                    <input type="button" id="check" class="btn btn-info mx-auto" value="start registration">`);

        }
    }

    printHallo(msg) {
        welcomeMessage.innerHTML = `${msg}`;
    }
}


let user = new User(navigator.language);
user.askLanguages();

let users = [];
users.push(user);
console.log(users);

