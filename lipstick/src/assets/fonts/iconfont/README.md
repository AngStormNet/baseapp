Updating the Material Design Icons:

http://google.github.io/material-design-icons/

1.  npm install material-design-icons
2.  copy folder ../node_modules/material-design-icons/iconfont to src/assets/fonts/
3.  make sure your angular-cli file is importing app->styles->"assets/fonts/iconfont/material-icons.css"
4.  make sure your primary s/css file has the following CSS saved to it:

.material-icons {
    // material design icon class
    color: $color-primary;
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;  /* Preferred icon size */
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;

    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;

    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;

    /* Support for IE. */
    font-feature-settings: 'liga';
}
5.  Quit yer mopin' and crack one open.  You're done.


The recommended way to use the Material Icons font is by linking to the web font hosted on Google Fonts:

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
```

Read more in our full usage guide:
http://google.github.io/material-design-icons/#icon-font-for-the-web
