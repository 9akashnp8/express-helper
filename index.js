#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { input } from '@inquirer/prompts';

const controllerName = await input({ message: 'Controller Name' });
console.log(controllerName)

// Controller contents
const jsCode = `
import type { Request, Response } from "express";

export async function ${controllerName}Controller(req: Request, res: Response) {
    res.send("Hello There")
}
`;

// subdirectory and filename
const subdirectory = `src/controllers/${controllerName}`;
const filename = 'index.ts';

// full path to the subdirectory
const directoryPath = path.join(".", subdirectory);

// create sub sir if not exists
if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
}

// Create the full path to the file
const filePath = path.join(directoryPath, filename);

fs.writeFileSync(filePath, jsCode);

console.log(`JavaScript file '${filename}' created in '${subdirectory}'`);
