import Button from './components/Button/Button';
import Card from './components/Card/Card';
import Container from './components/Container/Container';
import Dialog from './components/Dialog/Dialog';
import Form from './components/Form/Form';
import Icon from './components/Icon/Icon';
import Link from './components/Link/Link';
import Navigation from './components/Navigation/Navigation';
import HeroBanner from './modules/HeroBanner/HeroBanner';
import './styles/main.css';

declare const lib: {
    Button: typeof Button;
    Card: typeof Card;
    Container: typeof Container;
    Dialog: typeof Dialog;
    Form: typeof Form;
    Icon: typeof Icon;
    Link: typeof Link;
    Navigation: typeof Navigation;
    HeroBanner: typeof HeroBanner;
};
export default lib;
