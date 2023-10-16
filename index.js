#!/usr/bin/env node

import fs from "fs";
import path from "path";
import inquirer from "inquirer";

let config

function generateBoilerPlate(funcName) {
    return `
    import type { Request, Response } from "express";

    export async function ${config.name}Controller(req: Request, res: Response) {
        res.send("Hello There")
    }
    `;
}

inquirer
    .prompt([
        {
            name: 'srcLocation',
            message: 'What is your src folder located color?'
        },
        {
            type: 'list',
            name: 'type',
            message: 'What do you want to generate?',
            choices: [
                'Controllers',
                'Service',
            ],
        },
        {
            name: 'name',
            message: 'Name of the object',
        },
    ])
    .then(answers => {
        config = answers

        const subdirectory = `src/controllers/${config.name}`;
        const filename = 'index.ts';

        const directoryPath = path.join(config.srcLocation, subdirectory);

        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }

        const filePath = path.join(directoryPath, filename);

        fs.writeFileSync(filePath, generateBoilerPlate(config.name));

        console.log(`Object created: ${filePath}`);
    });