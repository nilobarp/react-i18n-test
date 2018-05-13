/**
 * This setup file is executed before each test.
 * Use it to run code required by majority tests suites.
 *
 * Having too many initializers here will slow down test execution.
 */
require("raf").polyfill();

const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

Enzyme.configure({ adapter: new Adapter() });
