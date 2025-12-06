import "./login.scss";
import bg from "../../assets/bg.jpg";
import lgbg from "../../assets/lgbg.jpg";
import logo from "../../assets/logo.png";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import http from "../../utils/http/http";
import { useEffect } from "react";
import { login } from "../../api/users";
function Login() {
  const [form] = Form.useForm();

  function handleLogin() {
    form
      .validateFields()
      .then(async (res) => {
        const data = await login(res);
        console.log("结果是", data);
      })
      .catch((err) => {
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
