import React from "react";
import { loginSchema } from "./schemas/userSchema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Validate bằng safeParse()
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      // ❌ Nếu dữ liệu sai → hiển thị toast lỗi
      const errors = result.error.format();

      if (errors.email?._errors) {
        toast.error(errors.email._errors[0]);
      } else if (errors.password?._errors) {
        toast.error(errors.password._errors[0]);
      }

      return;
    }

    // ✅ Nếu dữ liệu hợp lệ
    toast.success("Đăng nhập thành công!");
  };

  return (
    <div style={{ width: 300, margin: "50px auto", textAlign: "center" }}>
      <ToastContainer position="top-center" autoClose={2000} />
      <h2>Đăng nhập</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10, padding: 5 }}
        />

        <input
          name="password"
          placeholder="Mật khẩu"
          type="password"
          value={formData.password}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: 10, padding: 5 }}
        />

        <button type="submit" style={{ width: "100%", padding: 8 }}>
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default App;
