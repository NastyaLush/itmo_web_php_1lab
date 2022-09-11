import {drawGraph} from './canvas.js';
import {initialisation} from "./firebase";
import {createTable} from "./table";
import {validation} from "./validation";
drawGraph();
initialisation();
createTable();
validation();