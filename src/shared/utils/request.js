/* @flow */
import 'isomorphic-fetch';
import { startRequest, stopRequest, failedRequest, succeededRequest } from '../actions/request';

export function getFullUrl(url: string) {
  return `${BASE_API}${url}`;
}

function getRequestPattern(actionType: string): Function {
  return (url: string, method: string = 'GET'): Function => ({ type, payload }): boolean => (
    type === actionType &&
    payload.url === url &&
    payload.method === method
  );
}

export const startRequestPattern = getRequestPattern(String(startRequest));
export const succeededRequestPattern = getRequestPattern(String(succeededRequest));
export const failedRequestPattern = getRequestPattern(String(failedRequest));
export const stopRequestPattern = getRequestPattern(String(stopRequest));

export function error401({
  type,
  payload: { statusCode } = {}
}: {
  type: string,
  payload: {
    statusCode: ?number
  }
}): boolean {
  return (
    type === String(failedRequest) &&
    statusCode === 401
  );
}
