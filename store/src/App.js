import React, { useState } from "react";

export default function App() {
  const [language, setLanguage] = useState("ES");
  const [screen, setScreen] = useState("home"); // home, login, register
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Traducciones
  const texts = {
    ES: {
      home: "Inicio",
      products: "Productos",
      about: "Sobre Nosotros",
      contact: "Contacto",
      login: "Iniciar Sesión",
      register: "Registrarse",
      changeLang: "EN",
      welcome: "Bienvenido a Stor",
      tagline1: "Tu tienda en línea",
      tagline2: "Tu mejor opción",
      email: "Correo electrónico",
      password: "Contraseña",
      confirmPassword: "Confirmar contraseña",
      name: "Nombre completo",
      loginBtn: "Iniciar sesión",
      registerBtn: "Crear cuenta",
      back: "Volver",
      loginSuccess: "¡Inicio de sesión exitoso!",
      registerSuccess: "¡Registro exitoso! Ahora puedes iniciar sesión.",
      fillAll: "Por favor, completa todos los campos.",
      passMatch: "Las contraseñas no coinciden.",
      welcomeUser: (name) => `¡Bienvenido, ${name}!`,
    },
    EN: {
      home: "Home",
      products: "Products",
      about: "About Us",
      contact: "Contact",
      login: "Login",
      register: "Register",
      changeLang: "ES",
      welcome: "Welcome to Stor",
      tagline1: "Your online store",
      tagline2: "Your best choice",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm password",
      name: "Full name",
      loginBtn: "Login",
      registerBtn: "Create account",
      back: "Back",
      loginSuccess: "Login successful!",
      registerSuccess: "Registration successful! You can now log in.",
      fillAll: "Please fill in all fields.",
      passMatch: "Passwords do not match.",
      welcomeUser: (name) => `Welcome, ${name}!`,
    },
  };

  const t = texts[language];

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ES" ? "EN" : "ES"));
    setError("");
    setSuccess("");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError(t.fillAll);
      return;
    }
    // Simulación de login exitoso
    setError("");
    setSuccess(t.loginSuccess);
    setTimeout(() => setScreen("home"), 1000);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, name } = formData;
    if (!email || !password || !confirmPassword || !name) {
      setError(t.fillAll);
      return;
    }
    if (password !== confirmPassword) {
      setError(t.passMatch);
      return;
    }
    setFormData({ email: "", password: "", confirmPassword: "", name: "" });
    setError("");
    setSuccess(t.registerSuccess);
    setTimeout(() => setScreen("login"), 2000);
  };

  const renderFormHeader = (title) => (
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      {success && <p className="text-green-600 mt-2">{success}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );

  const LoginForm = () => (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md transition-all">
      {renderFormHeader(t.login)}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.email}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder={t.email}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.password}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder={t.password}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition"
        >
          {t.loginBtn}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>
          {t.register}?{" "}
          <button
            onClick={() => setScreen("register")}
            className="text-pink-600 hover:underline font-medium"
          >
            {t.register}
          </button>
        </p>
        <button
          onClick={() => setScreen("home")}
          className="text-gray-500 hover:text-gray-700 text-sm mt-2"
        >
          ← {t.back}
        </button>
      </div>
    </div>
  );

  const RegisterForm = () => (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md transition-all">
      {renderFormHeader(t.register)}
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.name}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder={t.name}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.email}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder={t.email}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.password}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder={t.password}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.confirmPassword}
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder={t.confirmPassword}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          {t.registerBtn}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>
          {t.alreadyHaveAccount}?{" "}
          <button
            onClick={() => setScreen("login")}
            className="text-green-600 hover:underline font-medium"
          >
            {t.login}
          </button>
        </p>
        <button
          onClick={() => setScreen("home")}
          className="text-gray-500 hover:text-gray-700 text-sm mt-2"
        >
          ← {t.back}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-pink-600 cursor-pointer" onClick={() => setScreen("home")}>
            Stor
          </div>

          {/* Menú Desktop */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#home"
              onClick={() => setScreen("home")}
              className="nav-link text-gray-700 hover:text-pink-600 relative transition-colors duration-200"
            >
              {t.home}
            </a>
            <a
              href="#products"
              className="nav-link text-gray-700 hover:text-pink-600 relative transition-colors duration-200"
            >
              {t.products}
            </a>
            <a
              href="#about"
              className="nav-link text-gray-700 hover:text-pink-600 relative transition-colors duration-200"
            >
              {t.about}
            </a>
            <a
              href="#contact"
              className="nav-link text-gray-700 hover:text-pink-600 relative transition-colors duration-200"
            >
              {t.contact}
            </a>
          </nav>

          {/* Auth y Idioma */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="text-sm font-medium text-pink-600 border border-pink-600 px-3 py-1 rounded-full hover:bg-pink-600 hover:text-white transition"
            >
              {t.changeLang}
            </button>
            {screen !== "login" && (
              <button
                onClick={() => setScreen("login")}
                className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
              >
                {t.login}
              </button>
            )}
            {screen !== "register" && (
              <button
                onClick={() => setScreen("register")}
                className="text-sm font-medium text-green-600 hover:text-green-800 transition"
              >
                {t.register}
              </button>
            )}
          </div>

          {/* Menú Móvil (Hamburguesa) */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Menú Móvil Desplegable */}
        {menuOpen && (
          <nav className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              <a
                href="#home"
                onClick={() => {
                  setScreen("home");
                  setMenuOpen(false);
                }}
                className="block nav-link text-gray-700 hover:text-pink-600"
              >
                {t.home}
              </a>
              <a
                href="#products"
                className="block nav-link text-gray-700 hover:text-pink-600"
              >
                {t.products}
              </a>
              <a
                href="#about"
                className="block nav-link text-gray-700 hover:text-pink-600"
              >
                {t.about}
              </a>
              <a
                href="#contact"
                className="block nav-link text-gray-700 hover:text-pink-600"
              >
                {t.contact}
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* Estilos para el efecto de subrayado animado */}
      <style jsx>{`
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 2px;
          background-color: #ec4899;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>

      {/* Contenido Principal */}
      <main className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        {screen === "home" && (
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {t.welcome}
            </h1>
            <p className="text-lg text-gray-600 mb-2">{t.tagline1}</p>
            <p className="text-lg text-gray-600">{t.tagline2}</p>
            <img
              src="https://placehold.co/600x300/f8f9fa/6c757d?text=Stor+Products"
              alt="Stor"
              className="mx-auto mt-8 rounded-lg shadow-md"
            />
          </div>
        )}

        {screen === "login" && <LoginForm />}
        {screen === "register" && <RegisterForm />}
      </main>
    </div>
  );
}