/**
 * {@link} https://github.com/github/fetch
 */
 import fetch from "isomorphic-fetch";
 import { urlBuilder } from "~/utils";
 import { CONFIG } from "~/const/api.config";
 import { DEPLOY_CONFIG } from "~/config/app.config";
 
 export default class {
   /**
    * @static
    * @param {String} url  - Request url
    * @param {Object} options - Request params object
    * @param {Object} context - Nuxt Context
    * @returns {Promise}
    */
   static async callApi(url, options, context) {
     let token,
       opts = options || {};
     const reqTime = Date.now();
     if (process.server) {
       token = context.app.$cookies.get('token') || context.store.state.token;
     } else {
       token = window.$nuxt.$cookies.get('token') || window.$nuxt.$store.state.token;
     }
     
     opts.body = Object.assign({ token }, opts.body || {});
 
      if (process.env.DEV_MODE != "PROD") {
        console.log("%c 【callApi opts】:", "color: red;", {
          url: `${DEPLOY_CONFIG.API_BASE}${url}`,
          body: opts.body,
        });
      }

     if (opts.method.toUpperCase() === "GET") {
       url += "?" + urlBuilder(opts.body);
       delete opts.body;
     } else {
       opts.body = urlBuilder(opts.body);
     }
  
     return fetch(`${DEPLOY_CONFIG.API_BASE}${url}`, {
       headers: {
         "Content-Type": "application/x-www-form-urlencoded",
       },
       credentials: "same-origin",
       timeout: CONFIG.TIMEOUT,
       mode: "cors",
       cache: "no-cache",
       ...opts,
     })
       .then((response) => {
         if (response.status === 200) {
           return Promise.resolve(response.json());
         }
       })
       .then((data) => {
         if (process.env.DEV_MODE != "PROD") {
           const resTime = Date.now();
           console.log("%c 【payload】:", "color: red;", data.payload);
           console.log(
             "%c 【spendTime】:",
             "color: green;",
             `${resTime - reqTime}ms`
           );
         }
         if (data.code !== '1') {
          if (process.sevrer) {
            return context.error({
              statusCode: 401,
              message: '当前用户无权访问该页面',
              path: `${DEPLOY_CONFIG.API_BASE}${url}`
            })
          }
          if (process.broswer) {
            return window.$nuxt.error({
              statusCode: 401,
              message: data.msg,
              path: `${DEPLOY_CONFIG.API_BASE}${url}`
            })
          }
         }
         return data;
       })
       .catch((e) => {
         if (process.sevrer) {
          context.error({
            statusCode: 500,
            message: "服务器内部错误"
          })
         }
       });
   }
 }