# MiniScript Web-Terminal

MiniScript terminal for the Web.

It allows you to write MiniScript programs that run on a web-terminal. Intrinsics like `print` and `input` interact directly with the terminal. 

The terminal component is [xterm.js](http://xtermjs.org/). As such it supports all [escape sequences](http://xtermjs.org/docs/api/vtfeatures/) that xterm.js is capable of.

The MiniScript implementation also supports module `import`, either local modules or "lib" modules. Included are the [same modules](https://github.com/JoeStrout/miniscript/tree/master/MiniScript-cpp/lib) as "command-line" MiniScript.

## Usage

Download one of the latest releases from a successful build in the "Actions" of the GitHub project.

It consists of an "index.html" page and additional files / folders, among them the "lib" folder with "command-line" MiniScript modules.

Put your MiniScript files directly in the root folder or under a sub-folder of your choice.

Change "data-src-file" in "index.html" (on the "body" element) to point to
the entry file of your program.

For example, if you put it in the root folder it would read:

```html
<body data-src-file="myProgram.ms">
```

And if you put it in a sub-folder it would read:

```html
<body data-src-file="src/myProgram.ms">
```

You can then serve the contents locally (e.g. with `python3 -m http.server 8080`) or zip them and upload somewhere (e.g. to itch.io).

Feel free to explore and/or remove the example folder before publishing.