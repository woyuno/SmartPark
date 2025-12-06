import "./login.scss";
import bg from "../../assets/bg.jpg";
import lgbg from "../../assets/lgbg.jpg";
import logo from "../../assets/logo.png";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../../api/users";
import { authStore } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Login() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const { setToken } = authStore((state) => state);
  const navigate = useNavigate();
  function handleLogin() {
    form
      .validateFields()
      .then(async (res) => {
        setLoading(true);
        const {
          data: { token },
        } = await login(res);
        setLoading(false);
        setToken(token);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  }
  return (
    <div className="login" style={{ backgroundImage: `url(${bg})` }}>
      <div className="lgbg" style={{ backgroundImage: `url(${lgbg})` }}>
        <div className="part">
          <div className="title">
            <div className="logo">
              <img src={logo} alt="" width={100} />
            </div>
            <h1>鹏远智慧管理平台</h1>
          </div>
          <Form form={form}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "用户名不能为空" }]}
            >
              <Input
                placeholder="请输入您的用户名"
                prefix={<UserOutlined />}
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "密码不能为空" }]}
            >
              <Input.Password
                placeholder="请输入您的密码"
                prefix={<LockOutlined />}
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                style={{ width: "100%" }}
                size="large"
                onClick={handleLogin}
                loading={loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default Login;
