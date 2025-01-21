type RequestInit = Parameters<typeof fetch>[1];

const BASE_URL = 'http://localhost:3010';

type configType = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data: any;
};

class SxRequest {
  baseURL: string;

  constructor(config: { baseURL: string }) {
    this.baseURL = config.baseURL;
  }

  async request<T = any>(config: configType) {
    // fetch中GET方法没有请求体 需要拼接到url中 参数直接拼接
    const fetchURL = this.baseURL + config.url;
    // 如果是POST 把data传递给body
    const fetchConfig: RequestInit =
      config.method === 'POST'
        ? {
            method: config.method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config.data)
          }
        : {
            method: config.method
          };

    // 获取fetch的数据并返回
    const res = await fetch(fetchURL, fetchConfig);
    const data: T = await res.json();
    return data;
  }

  get<T1 = any, T2 = any>(url: string, data?: T2) {
    return this.request<T1>({ url, method: 'GET', data });
  }

  post<T1 = any, T2 = any>(url: string, data?: T2) {
    return this.request<T1>({ url, method: 'POST', data });
  }
}

export default new SxRequest({
  baseURL: BASE_URL
});
