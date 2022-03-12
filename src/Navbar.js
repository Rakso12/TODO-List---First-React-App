import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <h1>myTask.com</h1>
            <div className={styles.links}>
                <Link to="/">MyTask</Link>
                <Link to="/signin">Sign in</Link>
            </div>
        </nav>
    );
}
 
export default Navbar
