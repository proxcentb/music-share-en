import '../style.css';

export const Emoji = ({ name, className: _className, ...restProps }) => <img {...restProps} className={`emoji ${_className ?? ''}`} />;
export const Description = ({ children }) => <div className="description">{children}</div>;
