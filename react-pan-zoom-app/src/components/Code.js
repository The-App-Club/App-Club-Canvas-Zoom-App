import Prism from 'prismjs';
// import 'prismjs/themes/prism-tomorrow.css';
import { useEffect, useRef } from 'react';

function Code({ children, language = 'javascript' }) {
  const elem = useRef(null);
  useEffect(() => {
    Prism.highlightElement(elem.current, false);
  }, []);
  return (
    <pre className={`language-${language}`} ref={elem}>
      <code>{children}</code>
    </pre>
  );
}

export { Code };
