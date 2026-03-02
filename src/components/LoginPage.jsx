import { useState } from "react";
import { toast } from "sonner";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@inventory.com" && password === "1234") {
      onLogin({ email: email, name: "Admin User" });
    } else {
      toast.error("Invalid credentials.");
    }
  };
}
