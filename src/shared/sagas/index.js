import authSaga from './auth';
import profileSaga from './profile';

export default function* saga() {
    yield [authSaga(), profileSaga()];
}
