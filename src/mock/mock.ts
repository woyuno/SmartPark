import Mock from "mockjs";
Mock.mock("https://www.demo.com/login", "post", (options: any) => {
  const { username, password } = JSON.parse(options.body);
  if (username === "admin" && password === "123456") {
    return {
      code: 200,
      message: "登录成功",
      data: {
        usename: "赵铁柱",
        token: "mocktoken0",
      },
    };
  } else if (username === "manager" && password === "123456") {
    return {
      code: 200,
      message: "登录成功",
      data: {
        usename: "manager",
        token: "mocktoken1",
      },
    };
  } else if (username === "user" && password === "123456") {
    return {
      code: 200,
      message: "登录成功",
      data: {
        usename: "user",
        token: "mocktoken3",
      },
    };
  } else {
    return {
      code: 401,
      message: "用户账号或密码错误",
      data: "",
    };
  }
});
