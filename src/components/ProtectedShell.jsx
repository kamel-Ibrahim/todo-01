import React from "react";
export default function ProtectedShell({ title, children }) {
  return (
    <main className="profile-shell with-navbar app-gradient">
      <section className="glass-card">
        {title ? <h1>{title}</h1> : null}
        {children}
      </section>
    </main>
  );
}
