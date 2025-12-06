import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function Home() {
  return (
    <div>
      我是home组件
      <Button type="primary" shape="circle" icon={<SearchOutlined />}></Button>
    </div>
  );
}
export default Home;
