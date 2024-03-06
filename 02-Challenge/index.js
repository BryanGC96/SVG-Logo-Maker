const fs = require('node:fs');
const inquirer = require('inquirer');
const { circleShape, squareShape, triangleShape } = require('./lib/shapes');

const shapeOptions = [
    {name: 'circle', value: 'circle'},
    {name: 'triangle', value: 'triangle'},
    {name: 'square', value: 'square'},
];

const validateColor = (input) => {
    const colorKeywords = ['red', 'green', 'blue', 'yellow', 'orange', 'aqua', 'black', 'brown', 'fuchsia', 'gold'];
    const hexRegex = /^#([0-9a-f]{3}){1,2}$/i; 

    if (colorKeywords.includes(input.toLowerCase())) {
        return true;
    } else if (hexRegex.test(input)) {
        return true;
    } else {
        return 'Please enter a valid color keyword or a hexadecimal number';
    }
};

const svgVariablesQuestions = [
    {
        type: 'input',
        message: 'Please enter an up to three character text to be inside the image.',
        name: 'text',
        validate: function(input) {
            if (input.length > 0 && input.length <= 3) {
                return true;
            } else {
                return "Please enter a text of 1 character, up to 3 characters to continue...";
            }
        }
    },
    {
        type: 'input',
        message: 'Enter a color or a hexadecimal number for the Text:',
        name: 'textColor',
        validate: validateColor,
    },
    {
        type: 'list',
        message: 'Select a shape:',
        name: 'shape',
        choices: shapeOptions,
    },
    {
        type: 'input',
        message: 'Enter a color or a hexadecimal number for the Shape:',
        name: 'shapeColor',
        validate: validateColor,
    },
];

function generateSVG(answers) {
    let shapeSVG;
    switch (answers.shape) {
        case 'circle':
            shapeSVG = circleShape;
            break;
        case 'square':
            shapeSVG = squareShape;
            break;
        case 'triangle':
            shapeSVG = triangleShape;
            break;
        default:
            throw new Error('Invalis shape selected');
    }

    return `
    <svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">

    ${shapeSVG}fill="${answers.shapeColor}"/>
  
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>
  
  </svg>`
};

function saveSVGToFile(svgContent) {
    fs.writeFile('generated_image.svg', svgContent, (err) => {
        if (err) {
            console.error('Error writing SVG file', err);
        } else {
            console.log('New SVG file created successfully');
        }
    });
};

function init() {
    inquirer
    .prompt(svgVariablesQuestions)
    .then((answers) => {
        console.log("Info saved succesfully");
        console.log("This is the data:")
        console.log(answers);
        const svgContent = generateSVG(answers);
        saveSVGToFile(svgContent);
    })
    .catch( (error) => {
        if (error.isTtyError) { // Tty = 'teletypewriter Interface, in case the program is not running in an environment that supports the interface...
            console.log("Promt couldn't be rendered in the current environment");
        } else {
            console.log("Something else went wrong");
        }
    });
}

init();
