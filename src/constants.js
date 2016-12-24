// constats that are used application wide

const apiUrl = 'https://api.hurriyet.com.tr/v1/';
const apiKey = '6cbb11d0a88e4e27b36adca5cab03dbd';

const headers = new Headers({
    'apikey': apiKey
});

const defaults = {
    endpoints: {
        articles: apiUrl + 'articles'
    },
    actions: {
        shake: {
            init: 'init',
            readyToListen: 'readyToListen',
            playing: 'playing'
        }
    }
};

export { headers, defaults };