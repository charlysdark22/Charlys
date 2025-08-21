import React, { useState, useEffect, createContext, useContext, useCallback } from "react";
import { 
  Home, Phone, Laptop, Monitor, Headphones, 
  ShoppingCart, User, Sun, Moon, Menu, X, 
  LogIn, UserPlus, Package, CreditCard, Globe,
  Trash2, Plus, Minus, ArrowRight
} from "lucide-react";

// Contextos
const AuthContext = createContext();
const ThemeContext = createContext();
const CartContext = createContext();
const LanguageContext = createContext();

// Traducciones
const translations = {
  es: {
    store: "Stor - Tu Tienda Tecnológica",
    home: "Inicio",
    products: "Productos",
    computers: "Computadoras",
    laptops: "Laptops",
    phones: "Teléfonos",
    accessories: "Accesorios",
    login: "Iniciar Sesión",
    register: "Registrarse",
    cart: "Carrito",
    darkMode: "Modo Oscuro",
    lightMode: "Modo Claro",
    language: "Idioma",
    welcome: "Bienvenido a Stor",
    description: "La mejor tecnología al mejor precio",
    addToCart: "Añadir al carrito",
    viewCart: "Ver Carrito",
    checkout: "Pagar",
    total: "Total",
    productName: "Nombre del producto",
    productPrice: "Precio",
    productDesc: "Descripción",
    submit: "Enviar",
    email: "Correo electrónico",
    password: "Contraseña",
    name: "Nombre",
    phone: "Teléfono",
    address: "Dirección",
    adminPanel: "Panel de Administrador",
    manageProducts: "Gestionar Productos",
    orders: "Pedidos",
    users: "Usuarios",
    addProduct: "Agregar Producto",
    logout: "Cerrar Sesión",
    payment: "Pago",
    selectMethod: "Selecciona método de pago",
    transfermovil: "Transfermóvil",
    enzona: "Enzona",
    selectBank: "Selecciona banco",
    bandec: "BANDEC",
    bpa: "BPA",
    metropolitano: "Metropolitano",
    confirmPayment: "Confirmar Pago",
    emptyCart: "Tu carrito está vacío",
    continueShopping: "Seguir comprando"
  },
  en: {
    store: "Stor - Your Tech Store",
    home: "Home",
    products: "Products",
    computers: "Computers",
    laptops: "Laptops",
    phones: "Phones",
    accessories: "Accessories",
    login: "Login",
    register: "Register",
    cart: "Cart",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    language: "Language",
    welcome: "Welcome to Stor",
    description: "The best technology at the best price",
    addToCart: "Add to Cart",
    viewCart: "View Cart",
    checkout: "Checkout",
    total: "Total",
    productName: "Product Name",
    productPrice: "Price",
    productDesc: "Description",
    submit: "Submit",
    email: "Email",
    password: "Password",
    name: "Name",
    phone: "Phone",
    address: "Address",
    adminPanel: "Admin Panel",
    manageProducts: "Manage Products",
    orders: "Orders",
    users: "Users",
    addProduct: "Add Product",
    logout: "Logout",
    payment: "Payment",
    selectMethod: "Select payment method",
    transfermovil: "Transfermóvil",
    enzona: "Enzona",
    selectBank: "Select bank",
    bandec: "BANDEC",
    bpa: "BPA",
    metropolitano: "Metropolitan",
    confirmPayment: "Confirm Payment",
    emptyCart: "Your cart is empty",
    continueShopping: "Continue Shopping"
  }
};

// Proveedores
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const login = (email, password) => {
    // Simulación de login
    if (email && password) {
      setUser({ 
        id: 1, 
        name: "Usuario", 
        email, 
        role: email.includes('admin') ? 'admin' : 'user' 
      });
      return true;
    }
    return false;
  };

  const register = (data) => {
    // Simulación de registro
    setUser({ 
      id: Date.now(), 
      name: data.name, 
      email: data.email, 
      role: 'user' 
    });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity,
      getTotal, showCart, setShowCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('es');

  const t = (key) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Componentes
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { lang, setLang, t } = useContext(LanguageContext);
  const { showCart, setShowCart } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold flex items-center">
              <Package className="mr-2" /> {t('store')}
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="#home" className="hover:text-blue-200 transition">{t('home')}</a>
            <a href="#products" className="hover:text-blue-200 transition">{t('products')}</a>
            {user && user.role === 'admin' && (
              <a href="#admin" className="hover:text-blue-200 transition">{t('adminPanel')}</a>
            )}
            <button 
              onClick={() => setShowCart(!showCart)}
              className="flex items-center hover:text-blue-200 transition relative"
            >
              <ShoppingCart />
              <span className="ml-1">{t('cart')}</span>
              {useContext(CartContext).cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {useContext(CartContext).cart.length}
                </span>
              )}
            </button>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">Hola, {user.name}</span>
                <button 
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm transition"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => useContext(AuthContext).setIsLogin(true)}
                  className="bg-white text-blue-600 px-3 py-1 rounded text-sm hover:bg-gray-100 transition"
                >
                  {t('login')}
                </button>
                <button 
                  onClick={() => useContext(AuthContext).setIsLogin(false)}
                  className="border border-white px-3 py-1 rounded text-sm hover:bg-white hover:text-blue-600 transition"
                >
                  {t('register')}
                </button>
              </div>
            )}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="relative">
              <select 
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent border border-white border-opacity-30 rounded px-2 py-1 text-sm appearance-none pr-6"
              >
                <option value="es">ES</option>
                <option value="en">EN</option>
              </select>
              <Globe className="absolute right-2 top-1.5 text-white text-opacity-70" size={16} />
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 mr-2"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 dark:bg-blue-900">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#home" className="block px-3 py-2 hover:bg-blue-600 rounded">{t('home')}</a>
            <a href="#products" className="block px-3 py-2 hover:bg-blue-600 rounded">{t('products')}</a>
            {user && user.role === 'admin' && (
              <a href="#admin" className="block px-3 py-2 hover:bg-blue-600 rounded">{t('adminPanel')}</a>
            )}
            <button 
              onClick={() => {setShowCart(!showCart); setMenuOpen(false);}}
              className="w-full text-left px-3 py-2 hover:bg-blue-600 rounded flex items-center"
            >
              <ShoppingCart className="mr-2" /> {t('cart')}
              {useContext(CartContext).cart.length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {useContext(CartContext).cart.length}
                </span>
              )}
            </button>
            {user ? (
              <div className="px-3 py-2">
                <span className="block mb-2">Hola, {user.name}</span>
                <button 
                  onClick={logout}
                  className="bg-red-500 w-full text-center px-3 py-1 rounded text-sm"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <div className="flex space-x-2 px-3 py-2">
                <button 
                  onClick={() => {useContext(AuthContext).setIsLogin(true); setMenuOpen(false);}}
                  className="bg-white text-blue-600 px-3 py-1 rounded text-sm flex-1"
                >
                  {t('login')}
                </button>
                <button 
                  onClick={() => {useContext(AuthContext).setIsLogin(false); setMenuOpen(false);}}
                  className="border border-white px-3 py-1 rounded text-sm flex-1"
                >
                  {t('register')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const CartModal = () => {
  const { cart, removeFromCart, updateQuantity, getTotal, showCart, setShowCart } = useContext(CartContext);
  const { t } = useContext(LanguageContext);

  if (!showCart) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowCart(false)}></div>
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">{t('cart')}</h3>
            <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-300">
              <X />
            </button>
          </div>
          
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-500 dark:text-gray-400">{t('emptyCart')}</p>
              <button 
                onClick={() => setShowCart(false)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                {t('continueShopping')}
              </button>
            </div>
          ) : (
            <>
              <div className="max-h-96 overflow-y-auto mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3 py-2 border-b dark:border-gray-700">
                    <img 
                      src={item.image || `https://placehold.co/80x80/3b82f6/FFFFFF?text=${item.name.charAt(0)}`} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">${item.price}</p>
                    </div>
                    <div className="flex items-center">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="mx-2 w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="border-t dark:border-gray-700 pt-4">
                <div className="flex justify-between text-lg font-bold mb-4">
                  <span>{t('total')}:</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center">
                  <CreditCard className="mr-2" /> {t('checkout')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const LoginRegister = () => {
  const { isLogin, setIsLogin, login, register } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login(formData.email, formData.password);
    } else {
      register(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-900 text-white p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">
            {isLogin ? t('login') : t('register')}
          </h2>
          <p>{isLogin ? 'Ingresa tus credenciales' : 'Crea tu cuenta'}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('name')}
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('phone')}
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('address')}
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('email')}
            </label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('password')}
            </label>
            <input
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            {isLogin ? t('login') : t('register')}
          </button>
        </form>
        
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {isLogin 
              ? `¿No tienes cuenta? ${t('register')}` 
              : `¿Ya tienes cuenta? ${t('login')}`
            }
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop Gamer', price: 1200, category: 'laptop', stock: 5 },
    { id: 2, name: 'PC de Escritorio', price: 800, category: 'desktop', stock: 3 }
  ]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'laptop', stock: '' });

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Acceso denegado. Requiere permisos de administrador.
        </div>
      </div>
    );
  }

  const addProduct = () => {
    if (newProduct.name && newProduct.price) {
      setProducts([...products, { 
        id: Date.now(), 
        ...newProduct, 
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock) || 0
      }]);
      setNewProduct({ name: '', price: '', category: 'laptop', stock: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-center">{t('adminPanel')}</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b dark:border-gray-700">
            <nav className="flex">
              {['products', 'orders', 'users'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium ${
                    activeTab === tab 
                      ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400' 
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {t(tab)}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">{t('manageProducts')}</h2>
                  <button 
                    onClick={addProduct}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <Plus className="mr-1" size={16} /> {t('addProduct')}
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    placeholder={t('productName')}
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  />
                  <input
                    type="number"
                    placeholder={t('productPrice')}
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  />
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="desktop">Computadora</option>
                    <option value="laptop">Laptop</option>
                    <option value="phone">Teléfono</option>
                    <option value="accessory">Accesorio</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Precio</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Categoría</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {products.map(product => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 mr-3">Editar</button>
                            <button className="text-red-600 hover:text-red-900 dark:text-red-400">Eliminar</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Historial de Pedidos</h2>
                <p className="text-gray-500 dark:text-gray-400">Aquí se mostrarán los pedidos de los clientes.</p>
              </div>
            )}
            
            {activeTab === 'users' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Gestión de Usuarios</h2>
                <p className="text-gray-500 dark:text-gray-400">Aquí se podrán gestionar los usuarios registrados.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductList = () => {
  const { addToCart } = useContext(CartContext);
  const { t } = useContext(LanguageContext);
  
  const products = [
    { id: 1, name: 'PC Gamer Pro', price: 1500, category: 'desktop', image: 'https://placehold.co/300x200/3b82f6/FFFFFF?text=PC+Gamer' },
    { id: 2, name: 'Laptop Ultra', price: 1200, category: 'laptop', image: 'https://placehold.co/300x200/10b981/FFFFFF?text=Laptop' },
    { id: 3, name: 'Smartphone X', price: 800, category: 'phone', image: 'https://placehold.co/300x200/f59e0b/FFFFFF?text=Phone' },
    { id: 4, name: 'Teclado Mecánico', price: 120, category: 'accessory', image: 'https://placehold.co/300x200/ef4444/FFFFFF?text=Teclado' },
    { id: 5, name: 'Monitor 4K', price: 600, category: 'accessory', image: 'https://placehold.co/300x200/8b5cf6/FFFFFF?text=Monitor' },
    { id: 6, name: 'Auriculares Pro', price: 200, category: 'accessory', image: 'https://placehold.co/300x200/06b6d4/FFFFFF?text=Auriculares' }
  ];

  return (
    <div id="products" className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            {t('products')}
          </h2>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
            Descubre nuestra selección de tecnología de alta calidad
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{product.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 text-lg font-bold mb-4">${product.price}</p>
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center"
                >
                  <ShoppingCart className="mr-2" size={18} /> {t('addToCart')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const { t } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">{t('welcome')}</span>
              <span className="block text-blue-600 dark:text-blue-400 pt-2">{t('description')}</span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-gray-500 dark:text-gray-300">
              Tu tienda especializada en computadoras, laptops, teléfonos y accesorios tecnológicos.
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <a
                href="#products"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition flex items-center"
              >
                {t('viewCart')} <ArrowRight className="ml-2" size={18} />
              </a>
              {!user && (
                <button
                  onClick={() => useContext(AuthContext).setIsLogin(true)}
                  className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium py-3 px-6 rounded-lg transition border border-blue-600"
                >
                  {t('login')}
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="bg-white dark:bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Monitor />, title: t('computers'), desc: 'Potentes PCs de escritorio para gaming y trabajo' },
                { icon: <Laptop />, title: t('laptops'), desc: 'Laptops ultraligeras y de alto rendimiento' },
                { icon: <Phone />, title: t('phones'), desc: 'Los mejores smartphones del mercado' }
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentSection(hash);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
              <Navbar />
              <CartModal />
              
              {currentSection === 'home' && <Home />}
              {currentSection === 'products' && <ProductList />}
              {currentSection === 'login' && <LoginRegister />}
              {currentSection === 'admin' && <AdminPanel />}
              
              <footer className="bg-gray-800 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <p>&copy; 2025 Stor - Todos los derechos reservados</p>
                  <p className="text-gray-400 mt-2">Soportamos pagos con Transfermóvil y Enzona</p>
                </div>
              </footer>
            </div>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;