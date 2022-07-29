import Button from './components/Button/Button';
import Navigation from './components/Navigation/Navigation';
import HeroBanner from './modules/HeroBanner/HeroBanner';
import './styles/main.css';

declare const lib: {
    Button: typeof Button;
    Navigation: typeof Navigation;
    HeroBanner: typeof HeroBanner;
};
export default lib;
