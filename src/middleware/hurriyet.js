
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
}

export default Hurriyet;