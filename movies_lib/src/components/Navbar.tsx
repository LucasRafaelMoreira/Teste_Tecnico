import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { BiSearchAlt2 } from "react-icons/bi"
import { MdLocalMovies } from "react-icons/md"
import { BsHeart } from "react-icons/bs"
import ThemeToggle from "./ThemeToggle"
import { useTheme } from "../hooks/useTheme"

import styles from '../css/Navbar.module.scss'

const Navbar = () => {

    const [search, setSearch] = useState<string>("");
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!search) return;

        navigate(`/search?q=${search}`);
        setSearch("");
    }

    return (
        <nav className={styles.navbar}>
            <h2>
                <Link to="/"><MdLocalMovies /> CineVault </Link>
            </h2>
            <div className={styles.navActions}>
                <Link to="/favorites" className={styles.favoritesLink} title="Meus Favoritos">
                    <BsHeart />
                </Link>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input 
                        className={styles.input}
                        type="text" 
                        placeholder="Busque um filme..." 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className={styles.button} type="submit">
                        <BiSearchAlt2 />
                    </button>
                </form>
                <ThemeToggle theme={theme} onToggle={toggleTheme} />
            </div>
        </nav>
    )
}

export default Navbar