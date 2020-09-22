import React from "react";
import { GithubFilled, LinkedinFilled, } from "@ant-design/icons";

const style = {
    fontSize: "24px",
    marginTop: "10px"
}


const Footer = () => {
    return (
        <footer>
            <p>Made By Elouadi Abdelali</p>
            <div className="footer-social-media">
                <a href="https://github.com"><GithubFilled className="icon" style={style} /></a>
                <a href="https://linkden.com"><LinkedinFilled className="icon" style={style} /></a>
            </div>
        </footer>
    );
}

export default Footer;