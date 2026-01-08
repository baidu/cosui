import {router} from 'san-router';
import Home from './components/home';
import Preview from './components/preview';
import './index.less';

router.add({
    rule: '/',
    Component: Home,
    target: '#app'
});

router.add({
    rule: '/preview/:type/:packages/:component',
    Component: Preview,
    target: '#app'
});

router.add({
    rule: '/preview/:type/:packages/:component/:ui',
    Component: Preview,
    target: '#app'
});


router.start();