const Card = ({ children, className = "" }) => {
  return <section className={`glass-panel rounded-2xl p-4 sm:p-5 ${className}`}>{children}</section>;
};

export default Card;
