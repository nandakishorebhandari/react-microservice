/* eslint no-unused-expressions: 0 */
import { expect } from 'chai';

import {
  startRequest,
  succeededRequest,
  failedRequest,
  stopRequest
} from '../../actions/request';
import {
  getFullUrl,
  error401,
  startRequestPattern,
  succeededRequestPattern,
  failedRequestPattern,
  stopRequestPattern,
} from '../request';

describe('utils/request', () => {
  it('getFullUrl()', () => {
    expect(
      getFullUrl('/test')
    ).to.equals(
      'http://fakeurl.com/test'
    )
  });

  [
    {
      name: 'error401',
      pattern: error401,
      successAction: failedRequest('/test', 'GET', 401, {}),
      failAction: failedRequest('/test', 'GET', 404, {})
    },
    {
      name: 'startRequestPattern',
      pattern: startRequestPattern('/test'),
      successAction: startRequest('/test'),
      failAction: startRequest('/another-url')
    },
    {
      name: 'succeededRequestPattern',
      pattern: succeededRequestPattern('/test'),
      successAction: succeededRequest('/test', 'GET', { status: 'ok' }),
      failAction: succeededRequest('/fake-url', 'GET', { status: 'ok' }),
    },
    {
      name: 'failedRequestPattern',
      pattern: failedRequestPattern('/test', 'POST'),
      successAction: failedRequest('/test', 'POST', 404, {}),
      failAction: failedRequest('/fake-url', 'GET', 500)
    },
    {
      name: 'stopRequestPattern',
      pattern: stopRequestPattern('/test'),
      successAction: stopRequest('/test'),
      failAction: failedRequest('/fake-url')
    }
  ].forEach(({ name, pattern, successAction, failAction }) => {
    describe(name, () => {
      it('return true', () => {
        expect(pattern(successAction)).to.be.true;
      });

      it('return false', () => {
        expect(pattern(failAction)).to.be.false;
      })
    });
  });
});