import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from 'axios'
import commonConfig from '@/common/config'
import router from '@/router'


//扩展接口，避免config.headers.Authorizatio报错
interface IRequestConfig extends AxiosRequestConfig  {
  headers?:any
}


const service = axios.create({
  baseURL:commonConfig.url,
});

// Request interceptors
service.interceptors.request.use(
  (config: IRequestConfig) => {
    // do something
    //从localStorage里取出token
    const token = localStorage.getItem('token');
    //把token塞入Authorization里
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

// Response interceptors
service.interceptors.response.use(
  async (response: AxiosResponse) => {
    // do something
    // console.log(response)
    //获取更新的token
    const { authorization } = response.headers;
    //如果token存在则存在localStorage
    authorization && localStorage.setItem('token', authorization);
    return response.data
  },
  (error: any) => {
    // do something
    console.log(error.response)
    if(error.response, 'error.response') {
      const { status } = error.response;
      //如果401或405则到登录页
      if (status == 401 || status == 405) {
        console.log()
        const { pathname, search } = window.location
        router.push(`/login?url=${pathname + search}`)
        console.log('去登陆')
      }
    }
    //return Promise.reject(error);
  }
);

export default service;

