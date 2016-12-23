
import { defaults, headers } from '../../constants';
import pq from 'pquery';

class Hurriyet {

    get(endpoint){
        return pq(fetch(endpoint, { headers }), '@json');
    }
    
    getArticlesList(top){
        let endpoint = defaults.endpoints.articles;
        if (typeof top == 'number'){
            endpoint.concat(`?$top=${top}`);
        }
        return this.get(endpoint);
    }
}

export default Hurriyet;