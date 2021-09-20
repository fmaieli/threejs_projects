# Three.js Basic Tutorial

This project is a static page with three.js, to make it happend I used [http-server](https://www.npmjs.com/package/http-server)

[Creating a scene](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)

# Three.js Integration with React

This project is the integration of the **Creating a scene** project with React.js

It's the exact same project but with babel and webpack.

# Three.js Drawing Lines with React

This project it's about the tutorial of drawing lines in the documentation of three.js

[Drawing lines](https://threejs.org/docs/index.html#manual/en/introduction/Drawing-lines)

# Three.js Text Geometry with React

Practice project with 3D Text

Some pages and tools that help in the making of this project:

* [Creating-text](https://threejs.org/docs/#manual/en/introduction/Creating-text)
* [TextGeometry](https://threejs.org/docs/#api/en/geometries/TextGeometry)
* [Creating a 3D Font in Three.js](https://blog.andrewray.me/creating-a-3d-font-in-three-js/)
* Converter of .ttf files to .json or .js -> [Facetype.js](http://gero3.github.io/facetype.js/)
* [1001freefonts](https://www.1001freefonts.com/)
* [3D Text and Fonts](https://www.youtube.com/watch?v=IA3HjAV2nzU&ab_channel=Genka) and the [Repo] (https://github.com/tamani-coding/threejs-text-example)

### Common Errors

* Problems getting the fonts from a local folder: CORS (Cross-Origin Request Blocked) [CORS Errors](https://developer.mozilla.org/es/docs/Web/HTTP/CORS/Errors)

```js

loader.load('./fonts/Confetti_Stream_Regular.json', ...)

```

### Solutions

Some posible solutions for the CORS error are these:

* Use [http-server](https://www.npmjs.com/package/http-server) and host locally the fonts, use this line of code:

```

http-server . -p 8000 --cors

```

Then you can use:

```js

loader.load('http://localhost:8000/fonts/Confetti_Stream_Regular.json', ...)

```

* The other option is to import the font, in a .json file, into the component:

```js

import ConfettiStream from '../fonts/Confetti_Stream_Regular.json';

```

Then you 'parse' the font:

```js

var font = loader.parse(ConfettiStream);

```

And you can use it normally in TextGeometry:

```js

const geometry = new THREE.TextGeometry('three.js', {
    font: font,
    ...
});

```

# Three.js Loading 3D Models

