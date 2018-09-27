# prototype for a javascript learning game

### this project was build from scratch in webpack

A main challenge was to compile the svg-images from the src folder into the public folder. For that, it was necessary to install svg-url-loader. This loader help us to use svg images as background images in our scss.

```
npm install svg-url-loader
```

I only design the first challenge, as a prototype. Our JS Hero, Justus,  should avoid the falling bombs and get the diamond. You need to write your code fast, otherwise you lose your lives.

### how it works?

I used the  [ace editor](https://ace.c9.io/) as coding interface. This editor is really easy to embed in our HTML document. To make the javascript running, these few lines make the magic: 

```
editor.getSession().on('change', function () {
        localStorage.setItem('code', editor.getSession().getValue());
    });

    document.body.addEventListener('keydown', run);

    function run(event) {
        if (event.key === 'Enter') {
            // eval(localStorage.getItem('code'));
            eval(editor.getSession().getValue());
        }
    }
```



