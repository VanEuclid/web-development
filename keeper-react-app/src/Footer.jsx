import React from "react";

function Footer() {
    const date = new Date()
    return (
        <footer>
            <p>
                Copyright © {date.getFullYear()}<br />
            </p>
        </footer>
    );
}

export default Footer;