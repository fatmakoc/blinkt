
import { defaults, headers } from '../constants';
import pq from 'pquery';

class Hurriyet {

    get(endpoint){
        return pq(fetch(endpoint, { headers }), '@json');
    }
    
    getArticlesList(top){
        let endpoint = defaults.endpoints.articles;
        if (typeof top == 'number'){
            endpoint = endpoint.concat(`?$top=${top}`);
        }
        return this.get(endpoint);
    }

    getSingleArticle(id){
        let endpoint = defaults.endpoints.articles;
        if (id != undefined){
            endpoint = endpoint.concat(`/${id}`);
        }
        return this.get(endpoint);
    }

    getTextParts(id){
        let endpoint = defaults.endpoints.textParts;
        if (id != undefined){
            endpoint = endpoint.concat(`/${id}`);
        }
        return this.get(endpoint);
    }

    setTextParts(id, parts){
        let endpoint = defaults.endpoints.textParts;
        params = {
            articleId: id,
            textParts: parts
        }

        const setParams = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&');

        return pq(fetch(endpoint, { 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }, 
            method: 'POST',
            body: setParams
        }), '@json')
    }
}

export default Hurriyet;