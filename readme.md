### Build command
make build command for create project build in ./build folder
```bash
npm i
```

### Watcher for development
first make build, than you can run watch command for development
command automatic rebuild:
- SCSS to CSS
- JS to JS with concat and uglify
- PUG to HTML 
```bash
npm gulp
```

#### You can use separate builder for each process
Please look at `package.json` for check other commands
