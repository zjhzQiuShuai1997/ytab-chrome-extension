import SxRequest from './request';

const getAppList = () => {
  return SxRequest.get('/api/application/list');
};

const getLogin = () => {
  return SxRequest.get('/api/user/create');
};

export { getAppList, getLogin };
