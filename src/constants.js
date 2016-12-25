// constats that are used application wide

const apiUrl = 'https://api.hurriyet.com.tr/v1/';
const serviceUrl = 'https://blinkt.herokuapp.com/'
const apiKey = '6cbb11d0a88e4e27b36adca5cab03dbd';

const headers = new Headers({
    'apikey': apiKey
});

const defaults = {
    endpoints: {
        articles: apiUrl + 'articles',
        textParts: serviceUrl + 'articles'
    },
    actions: {
        shake: {
            init: 'init',
            readyToListen: 'readyToListen'
        }
    },
    language: 'tr-TR'
};

export { headers, defaults };