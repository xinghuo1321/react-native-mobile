import { AsyncStorage } from 'react-native';

const uri = 'http://holer50112.restclient.cn';
const heads = {
    clientType: 'wx'
}
export default class DataStore {
    /**
     * 保存数据到本地
     * @param {保存的键值} key 
     * @param {保存的值} data 
     * @param {*} callback 
     */
    static saveDataKey(key, data) {
        if (!data || !key) return;
        AsyncStorage.setItem(key, data);
    }

    /**
     * 根据key获取本地数据
     * @param {键值} key 
     */
    static getDataKey(key, callback) {
        AsyncStorage.getItem(key, callback)
    }
    static getToken (key){
        return AsyncStorage.getItem(key)
    }
    //根据key删除
    static removeDataKey(key) {
        if (!key) return;
        AsyncStorage.removeItem(key, error => {
            error && console.log(error.toString());
        });
    }

    static _wrapData(data) {
        return {
            data: data,
            timestamp: new Date().getTime()
        }
    }

    //post请求
    static fetchData(url, data, headers) {
        return new Promise((resolve, reject) => {
            (async function getParmams(resolve, reject) {
                let headss = { ...heads, ...headers };
                console.log('请求头:', headss);
                console.log('参数:', data);
                console.log('url:', url);
                try {
                    let response = await fetch(uri + url, {
                        method: 'POST',
                        headers: headss,
                        body: JSON.stringify(data),
                    })
                    console.log('response:', response);
                    const reslove = respon(response)
                    resolve(reslove)
                } catch (error) {
                    console.log('error:', error);
                    reject(error);
                }

                // .then((response) => {
                //     let status = response.status;
                //     let json = response.json();
                //     let params = {
                //         status,
                //         json
                //     }
                //     return params;
                //     // if (response.ok) {
                //     //     return response.json();
                //     // } else {
                //     //     if (response.status === 409) {
                //     //         return response.json();
                //     //     }
                //     // }
                //     // console.log(response.json())
                //     // throw new Error('Network response was not ok.');
                // })
                // .then((responseJson) => {
                //     console.log(responseJson);
                //     resolve(responseJson);
                // })
                // .catch((error) => {
                //     console.log('error:' + error);
                //     reject(error);
                // });
            })(resolve, reject)
        })
    }

    //get请求
    static fetchDataGet(url, data, headers) {
        return new Promise((resolve, reject) => {
            let headss = { ...heads, ...headers };
            console.log('请求头:', headss);
            console.log('参数:', data);
            console.log('url:', url);
            fetch(uri + url + this.get(data), {
                method: 'GET',
                headers: headss,
            })
                .then((response) => {
                    console.log('response:', response);
                    return response.json()
                })
                .then((responseJson) => {
                    console.log('返回参数:', responseJson);
                    resolve(responseJson);
                })
                .catch((error) => {
                    console.log('error:' + error);
                    reject(error);
                });
        })
    }

    //post参数拼接body内容（form）
    static post(params) {
        let send = "";
        if (typeof (params) === 'object' && !Array.isArray(params)) {
            Object.keys(params).forEach(function (key) {
                send += send ? `&${key}=${params[key]}` : `${key}=${params[key]}`
            });
        }
        return send;
    }

    //get参数拼接
    static get(params) {
        if (params) {
            let send = "?";
            if (typeof (params) === 'object' && !Array.isArray(params)) {
                Object.keys(params).forEach(function (key) {
                    send += send ? `&${key}=${params[key]}` : `${key}=${params[key]}`
                });
            }
            return send
        }
        return '';
    }

    //上传图片
    static uploadImage(url, params, headers) {
        return new Promise(function (resolve, reject) {
            let headss = { ...heads, ...headers };
            console.log('请求头:', headss);
            console.log('参数:', params);
            console.log('url:', url);
            let formData = new FormData();
            for (var key in params) {
                formData.append(key, params[key]);
            }
            let file = { uri: params.path, type: 'application/octet-stream', name: 'image.jpg' };
            formData.append("file", file);
            fetch(uri + url, {
                method: 'POST',
                headers: headss,
                body: formData,
            }).then((response) => response.json())
                .then((responseData) => {
                    console.log('uploadImage:', responseData);
                    resolve(responseData);
                })
                .catch((err) => {
                    console.log('err:', err);
                    reject(err);
                });
        });
    }

    //获取token
    static getAuthToken(callback) {
        this.getDataKey('authToken', callback);
    }

    //设置token
    static setAuthToken(data) {
        console.log(data)
        this.saveDataKey('authToken', data);
    }

    static getUid(token){
        return token.substr(token.indexOf('@') + 1);
    }
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