const fs = require('node:fs');
const inquirer = require('inquirer');
const { Triangle, Square, Circle } = require('./lib/shapes');

const shapeOptions = [
    {name: 'circle', value: 'circle'},
    {name: 'triangle', value: 'triangle'},
    {name: 'square', value: 'square'},
];

// Makes sure the input inside the inquire question, contains any of the following data.
const validateColor = (input) => {
    const colorKeywords = ['red', 'green', 'blue', 'yellow', 'orange', 'aqua', 'black', 'brown', 'fuchsia', 'gold'];
    const hexRegex = /^#([0-9a-f]{3}){1,2}$/i;  // RegEx to validate "hexadecimal numbers".

    if (colorKeywords.includes(input.toLowerCase())) { // Ensures the prompt is transform to lowercase.
        return true;
    } else if (hexRegex.test(input)) {
        return true;
    } else {
        return 'Please enter a valid color keyword or a hexadecimal number';
    }
};

// List of Questions inside the inquirer.
const svgVariablesQuestions = [
    {
        type: 'input',
        message: 'Please enter an up to three character text to be inside the image.',
        name: 'text',
        // Dosent let you advance in the question, unless your answer length is higher than 0 and no more than 3 characters.
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
        message: 'Enter a "Color" or a "Hexadecimal Number" for the Text:',
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
        message: 'Enter a "Color" or a "Hexadecimal Number" for the Shape:',
        name: 'shapeColor',
        validate: validateColor,
    },
];

// Function that generates the SVG, depending on the answers of the inquirer, and defined by the 'sahpe' answer.
function generateSVG(answers) {
    let shapeSVG;
    switch (answers.shape) {
        case 'circle':
            const circle = new Circle(150, 100, 80);
            circle.setColor(answers.shapeColor); 
            shapeSVG = circle.render();
            break;
        case 'square':
            const square = new Square(85, 40, 130, 130); // Defines the meassurements of the form (x, y, width and height).
            square.setColor(answers.shapeColor);
            shapeSVG = square.render();
            break;
        case 'triangle':
            const triangle = new Triangle("150, 18 244, 182 56, 182");
            triangle.setColor(answers.shapeColor); // Sets de color of the generated shape, with the answers of the inquirer promt; so that it can be use insise 'shapes.js'.
            shapeSVG = triangle.render();
            break;
        default:
            throw new Error('Invalis shape selected');
    }

    return `
    <svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">

    ${shapeSVG}
  
    <text x="150" y="125" font-size="60" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>
  
  </svg>`
};

// Function that creates/writes the file inside "/examples".
function saveSVGToFile(svgContent) {
    fs.writeFile('./examples/logo.svg', svgContent, (err) => {
        if (err) {
            console.error('Error writing SVG file', err);
        } else {
            console.log('Generated logo.svg');
        }
    });
};

// Starts inquirer...
function init() {
    inquirer
    .prompt(svgVariablesQuestions)
    .then((answers) => {
        console.log("Info saved succesfully");
        console.log("This is the data:")
        console.log(answers);
        const svgContent = generateSVG(answers);
        saveSVGToFile(svgContent); // Calls the function to write the file.
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
