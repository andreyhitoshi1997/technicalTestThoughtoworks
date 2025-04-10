const baseUrl = 'https://marsair.recruiting.thoughtworks.net/AndreyOnoue';
const headlessValue = !!process.env.CI;
module.exports = { baseUrl, headlessValue };