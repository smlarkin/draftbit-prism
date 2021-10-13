import './Prism.css';

export const Prism = () => (
  <div className="container">
    {['mt', 'ml', 'pt', 'pl', 'ct', 'pr', 'mr', 'pb', 'mb'].map((bm) => (
      <div className={bm}>{bm !== 'ct' && bm}</div>
    ))}
  </div>
);
