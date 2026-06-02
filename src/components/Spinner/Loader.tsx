import { Spin } from 'antd';
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <Spin size="large" />
      <p className="loader-text">Loading lakshmi narayana...</p>
    </div>
  );
};

export default Loader;