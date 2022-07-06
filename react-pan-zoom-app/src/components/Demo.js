import React from 'react';

function Demo({ title, subtitle, code, children }) {
  return (
    <div className="demo">
      <a
        id={title}
        href={`#${encodeURIComponent(title)}`}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <h2>{title}</h2>
      </a>
      {code}
      {subtitle && <p>{subtitle}</p>}
      <div className="live-example">{children}</div>
    </div>
  );
}
export { Demo };
