import DataStore from '../js/expand/dao/DataStore';
//固定地址
const axiosURL = "http://holer50112.restclient.cn";
// url 请求接口地址 string
// method 请求方式 string
// headers 请求方式 josn
// data josn数据格式 只支持post 
//params 普通数据 josn

export default function axios({ url, method, headers, data, params, callback }) {
    url = axiosURL + url; //拼接请求地址
    //method默认get，不区分大小写
    if (!method) {
        method = 'GET'
    } else {
        method = method.toUpperCase()
    }
    //判断请求方式，转换对应的数据格式 params则调用get，data则代表是josn
    if (method === 'GET') {
        if (params) {
            url += `?${get(params)}`
        }
    } else if (method === 'POST') {
        if (data) {
            data = JSON.stringify(data)
        } else if (params) {
            data = get(params)
        }
    }
    //该方法返回一个promise，请用then去获取
    return new Promise((res, rej) => {
        (async function getParmams(res, rej) {
            let josn = {};
            josn.method = method;
            // let header = new Headers();
            // await DataStore.getAuthToken((error, token) => {
            //     header.append('authToken', token)
            // })
            
            // header.append('clientType', 'wx')
            // if (headers) {
            //     Object.keys(headers).forEach(item => {
            //         header.append(item, headers[item])
            //     })
            // }
            // josn.headers = header.map;
            
            let authToken =  await DataStore.getToken('authToken')
            console.log(authToken)
            let header = {
                authToken,
                clientType: 'wx'
            }
            josn.headers = {...header,...headers}
            console.log(josn)
            if (method === 'POST') { josn.body = data; }
            try {
                let response = await fetch(
                    url, josn
                );
                console.log(response)
                const reslove = respon(response)
                res(reslove)
            } catch (error) {
                console.log(error)
                rej(error);
            }
        })(res, rej)
    })
}

function get(params) {
    let send = "";
    if (typeof (params) === 'object' && !Array.isArray(params)) {
        Object.keys(params).forEach(function (key) {
            send += send ? `&${key}=${params[key]}` : `${key}=${params[key]}`
        });
    }
    console.log(send);
    return send
}

async function respon(response) {
    let status = response.status;
    console.log(response)
    let josn = await response.json();
    let params = {
        status,
        josn
    }
    console.log(params)
    return params
}