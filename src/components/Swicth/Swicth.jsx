import { useState } from "react";
import "./style.scss";
const Swicth = ({ data, TabControl }) => {
  const [Tab, setTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (item, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setTab(index);
    }, 300);
    TabControl(item, index);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((item, index) => (
          <span
            className="tabItem"
            key={index}
            onClick={() => activeTab(item, index)}
          >
            <b>{item.toUpperCase()}</b>
          </span>
        ))}
        <span className="movingBg" style={{ left }}></span>
      </div>
    </div>
  );
};

export default Swicth;
