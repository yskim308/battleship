# webpack-template

### if cloned:

just npm install in root (npx webpack to build to dist)

### Create package.json 

`npm init -y`

### Create src folder 

Create a src directory. There, add template.html and index.js

template.html will be the html template

index.js will be the entry point for the bundler 

### Install webpack and loaders 

`npm i -D webpack webpack-cli webpack-dev-server style-loader css-loader postcss postcss-loader postcss-preset-env`

### Install plugins 

in this case, it will just be the html plugin for the template 

`npm install --save-dev html-webpack-plugin`

### Create webpack.config.js in the root and add the following:

```javascript
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
        entry: './src/main.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        plugins:[
            new HtmlWebpackPlugin({
                template: './src/index.html'
            })
        ],
        devtool: 'inline-source-map',
        mode: 'development',
        module: {
            rules:[
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader', 'postcss-loader'],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
            ],
        },
    };
```

### add tailwind directives

Create **styles.css** in the src directory and add the tailwind directives
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Initialize tailwind and configure tailwind config 

run the following to get the tailwind config file 
```
npm install -D tailwindcss
npx tailwindcss init
```
then in **tailwind.config.js** add the following:
```
module.exports = {
  content: ['./dist/*.{html,js}'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```
### Configure postcss config 
Create a file in root called **postcss.config.js** and add the following:
```
const tailwindcss = require('tailwindcss');
module.exports = {
  plugins: [
    'postcss-preset-env',
    tailwindcss
  ],
};
```
### Add this line to src/index.js 
`import '.styles/css';`

### Final steps 
set up the template html and style. to run webpack:
`npx webpack` or `npx webpack --watch` to hot reload 
