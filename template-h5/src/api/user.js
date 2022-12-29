import { Get, Post } from '@/util/request';

export function UserInfo(params) {
  return Get({
    url: '/v1/user/info',
    params,
  });
}
