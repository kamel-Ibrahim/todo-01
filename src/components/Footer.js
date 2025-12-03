import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Footer.css";

const Footer = () => {
  const { user } = useContext(AuthContext);
  if (!user) return null;

  return (
    <footer className="footer">
      <p>© 2025 My Todo List App. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
