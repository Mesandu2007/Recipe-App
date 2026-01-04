import "./Footer.css";

export default function Footer(){


    return(
        <footer className="footer">
            <div className="footer-content">
                <h3>🍽️ Recipe Finder</h3>
                <p>Discover, save & enjoy your favorite recipes</p>
                <div className="footer-links">
                    <a href="#">Home</a>
                    <a href="#favorites">Favorites</a>
                    <a href="https://www.themealdb.com/" target="_blank" rel="noreferrer">
                        API Source
                    </a>
                </div>
                <p className="footer-copy">
                © {new Date().getFullYear()} Recipe Finder. All rights reserved.
                </p>

            </div>
        </footer>

    );
}