import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={`${styles.navbar}`}>
            <h1>myTask.com</h1>
            <div className={`${styles.links}`}>
                <a href="/">MyTask</a>
                <a href="/">Sign in</a>
            </div>
        </nav>
    );
}
 
export default Navbar
