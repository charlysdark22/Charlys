import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';

// === CONTEXTOS ===
const AuthContext = createContext();
const ThemeContext = createContext();
const CartContext = createContext();
const LanguageContext = createContext();

// === REDUCERS ===
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existing = state.find(item => item.id === action.payload.id);
      if (existing) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload);
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, email: 'admin@techstore.cu', password: 'admin123', name: 'Admin', role: 'admin' },
    { id: 2, email: 'user@techstore.cu', password: 'user123', name: 'Usuario', role: 'user' }
  ]);

  const login = (email, password) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      return { success: true };
    }
    return { success: false, message: 'Credenciales inválidas' };
  };

  const register = (name, email, password) => {
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'El correo ya existe' };
    }
    const newUser = { id: Date.now(), email, password, name, role: 'user', orders: [] };
    setUsers([...users, newUser]);
    return { success: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, users }}>
      {children}
    </AuthContext.Provider>
  );
};

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className={darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} style={{ minHeight: '100vh' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('lang') || 'es';
  });

  const translations = {
    es: {
      home: 'Inicio',
      products: 'Productos',
      cart: 'Carrito',
      login: 'Iniciar Sesión',
      register: 'Registrarse',
      darkMode: 'Modo Oscuro',
      language: 'Idioma',
      welcome: 'Bienvenido a TechStore',
      addToCart: 'Añadir al Carrito',
      viewProduct: 'Ver Producto',
      price: 'Precio',
      description: 'Descripción',
      contact: 'Contacto',
      adminPanel: 'Panel Admin',
      logout: 'Cerrar Sesión',
      name: 'Nombre',
      email: 'Correo',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      registerNow: 'Regístrate Ahora',
      alreadyAccount: '¿Ya tienes cuenta?',
      signIn: 'Inicia sesión',
      continueShopping: 'Seguir Comprando',
      checkout: 'Pagar',
      total: 'Total',
      emptyCart: 'Tu carrito está vacío',
      productName: 'Nombre del Producto',
      category: 'Categoría',
      stock: 'Stock',
      image: 'Imagen (URL)',
      save: 'Guardar',
      delete: 'Eliminar',
      edit: 'Editar',
      payment: 'Pago',
      selectMethod: 'Selecciona método de pago',
      transfermovil: 'Transfermóvil',
      enzona: 'EnZona',
      reference: 'Referencia de pago',
      confirmPayment: 'Confirmar Pago',
      orders: 'Órdenes',
      status: 'Estado',
      pending: 'Pendiente',
      paid: 'Pagado',
      shipped: 'Enviado',
      allOrders: 'Todas las Órdenes',
      manageProducts: 'Gestionar Productos',
      addProduct: 'Agregar Producto',
      desktop: 'Computadora de Escritorio',
      laptop: 'Laptop',
      phone: 'Teléfono',
      accessory: 'Accesorio'
    },
    en: {
      home: 'Home',
      products: 'Products',
      cart: 'Cart',
      login: 'Login',
      register: 'Register',
      darkMode: 'Dark Mode',
      language: 'Language',
      welcome: 'Welcome to TechStore',
      addToCart: 'Add to Cart',
      viewProduct: 'View Product',
      price: 'Price',
      description: 'Description',
      contact: 'Contact',
      adminPanel: 'Admin Panel',
      logout: 'Logout',
      name: 'Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      registerNow: 'Register Now',
      alreadyAccount: 'Already have an account?',
      signIn: 'Sign in',
      continueShopping: 'Continue Shopping',
      checkout: 'Checkout',
      total: 'Total',
      emptyCart: 'Your cart is empty',
      productName: 'Product Name',
      category: 'Category',
      stock: 'Stock',
      image: 'Image (URL)',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      payment: 'Payment',
      selectMethod: 'Select payment method',
      transfermovil: 'Transfermóvil',
      enzona: 'EnZona',
      reference: 'Payment reference',
      confirmPayment: 'Confirm Payment',
      orders: 'Orders',
      status: 'Status',
      pending: 'Pending',
      paid: 'Paid',
      shipped: 'Shipped',
      allOrders: 'All Orders',
      manageProducts: 'Manage Products',
      addProduct: 'Add Product',
      desktop: 'Desktop',
      laptop: 'Laptop',
      phone: 'Phone',
      accessory: 'Accessory'
    },
    pt: {
      home: 'Início',
      products: 'Produtos',
      cart: 'Carrinho',
      login: 'Entrar',
      register: 'Registrar',
      darkMode: 'Modo Escuro',
      language: 'Idioma',
      welcome: 'Bem-vindo à TechStore',
      addToCart: 'Adicionar ao Carrinho',
      viewProduct: 'Ver Produto',
      price: 'Preço',
      description: 'Descrição',
      contact: 'Contato',
      adminPanel: 'Painel Admin',
      logout: 'Sair',
      name: 'Nome',
      email: 'Email',
      password: 'Senha',
      confirmPassword: 'Confirmar Senha',
      registerNow: 'Registre-se Agora',
      alreadyAccount: 'Já tem uma conta?',
      signIn: 'Entrar',
      continueShopping: 'Continuar Comprando',
      checkout: 'Pagar',
      total: 'Total',
      emptyCart: 'Seu carrinho está vazio',
      productName: 'Nome do Produto',
      category: 'Categoria',
      stock: 'Estoque',
      image: 'Imagem (URL)',
      save: 'Salvar',
      delete: 'Excluir',
      edit: 'Editar',
      payment: 'Pagamento',
      selectMethod: 'Selecione método de pagamento',
      transfermovil: 'Transfermóvil',
      enzona: 'EnZona',
      reference: 'Referência de pagamento',
      confirmPayment: 'Confirmar Pagamento',
      orders: 'Pedidos',
      status: 'Status',
      pending: 'Pendente',
      paid: 'Pago',
      shipped: 'Enviado',
      allOrders: 'Todos os Pedidos',
      manageProducts: 'Gerenciar Produtos',
      addProduct: 'Adicionar Produto',
      desktop: 'Desktop',
      laptop: 'Notebook',
      phone: 'Telefone',
      accessory: 'Acessório'
    },
    fr: {
      home: 'Accueil',
      products: 'Produits',
      cart: 'Panier',
      login: 'Connexion',
      register: 'S\'inscrire',
      darkMode: 'Mode Sombre',
      language: 'Langue',
      welcome: 'Bienvenue chez TechStore',
      addToCart: 'Ajouter au Panier',
      viewProduct: 'Voir Produit',
      price: 'Prix',
      description: 'Description',
      contact: 'Contact',
      adminPanel: 'Panneau Admin',
      logout: 'Déconnexion',
      name: 'Nom',
      email: 'Email',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      registerNow: 'S\'inscrire Maintenant',
      alreadyAccount: 'Vous avez déjà un compte ?',
      signIn: 'Se connecter',
      continueShopping: 'Continuer les achats',
      checkout: 'Payer',
      total: 'Total',
      emptyCart: 'Votre panier est vide',
      productName: 'Nom du Produit',
      category: 'Catégorie',
      stock: 'Stock',
      image: 'Image (URL)',
      save: 'Enregistrer',
      delete: 'Supprimer',
      edit: 'Modifier',
      payment: 'Paiement',
      selectMethod: 'Sélectionnez le mode de paiement',
      transfermovil: 'Transfermóvil',
      enzona: 'EnZona',
      reference: 'Référence de paiement',
      confirmPayment: 'Confirmer le Paiement',
      orders: 'Commandes',
      status: 'Statut',
      pending: 'En attente',
      paid: 'Payé',
      shipped: 'Expédié',
      allOrders: 'Toutes les Commandes',
      manageProducts: 'Gérer les Produits',
      addProduct: 'Ajouter Produit',
      desktop: 'Ordinateur de bureau',
      laptop: 'Portable',
      phone: 'Téléphone',
      accessory: 'Accessoire'
    },
    de: {
      home: 'Startseite',
      products: 'Produkte',
      cart: 'Warenkorb',
      login: 'Anmelden',
      register: 'Registrieren',
      darkMode: 'Dunkler Modus',
      language: 'Sprache',
      welcome: 'Willkommen bei TechStore',
      addToCart: 'In den Warenkorb',
      viewProduct: 'Produkt anzeigen',
      price: 'Preis',
      description: 'Beschreibung',
      contact: 'Kontakt',
      adminPanel: 'Admin-Bereich',
      logout: 'Abmelden',
      name: 'Name',
      email: 'E-Mail',
      password: 'Passwort',
      confirmPassword: 'Passwort bestätigen',
      registerNow: 'Jetzt registrieren',
      alreadyAccount: 'Haben Sie bereits ein Konto?',
      signIn: 'Einloggen',
      continueShopping: 'Weiter einkaufen',
      checkout: 'Bezahlen',
      total: 'Gesamt',
      emptyCart: 'Ihr Warenkorb ist leer',
      productName: 'Produktname',
      category: 'Kategorie',
      stock: 'Lager',
      image: 'Bild (URL)',
      save: 'Speichern',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      payment: 'Zahlung',
      selectMethod: 'Zahlungsmethode wählen',
      transfermovil: 'Transfermóvil',
      enzona: 'EnZona',
      reference: 'Zahlungsreferenz',
      confirmPayment: 'Zahlung bestätigen',
      orders: 'Bestellungen',
      status: 'Status',
      pending: 'Ausstehend',
      paid: 'Bezahlt',
      shipped: 'Versandt',
      allOrders: 'Alle Bestellungen',
      manageProducts: 'Produkte verwalten',
      addProduct: 'Produkt hinzufügen',
      desktop: 'Desktop',
      laptop: 'Laptop',
      phone: 'Handy',
      accessory: 'Zubehör'
    }
  };

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const t = (key) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// === COMPONENTES ===
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">TechStore</div>
          <div className="hidden md:flex space-x-6">
            <a href="#home" className="hover:underline">{t('home')}</a>
            <a href="#products" className="hover:underline">{t('products')}</a>
            {user && <a href="#cart" className="hover:underline">{t('cart')}</a>}
            {user?.role === 'admin' && <a href="#admin" className="hover:underline">{t('adminPanel')}</a>}
            {user ? (
              <>
                <span>Hola, {user.name}</span>
                <button onClick={logout} className="hover:underline">{t('logout')}</button>
              </>
            ) : (
              <>
                <a href="#login" className="hover:underline">{t('login')}</a>
                <a href="#register" className="hover:underline">{t('register')}</a>
              </>
            )}
            <button onClick={() => setDarkMode(!darkMode)} className="hover:underline">
              {t('darkMode')}
            </button>
            <select
              value={useContext(LanguageContext).lang}
              onChange={(e) => useContext(LanguageContext).setLang(e.target.value)}
              className="bg-blue-700 text-white"
            >
              <option value="es">🇪🇸 ES</option>
              <option value="en">🇬🇧 EN</option>
              <option value="pt">🇵🇹 PT</option>
              <option value="fr">🇫🇷 FR</option>
              <option value="de">🇩🇪 DE</option>
            </select>
          </div>
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-xl">
              ☰
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mt-2 md:hidden bg-blue-700 rounded p-4 space-y-2">
            <a href="#home" className="block hover:underline" onClick={() => setMenuOpen(false)}>{t('home')}</a>
            <a href="#products" className="block hover:underline" onClick={() => setMenuOpen(false)}>{t('products')}</a>
            {user && <a href="#cart" className="block hover:underline" onClick={() => setMenuOpen(false)}>{t('cart')}</a>}
            {user?.role === 'admin' && <a href="#admin" className="block hover:underline" onClick={() => setMenuOpen(false)}>{t('adminPanel')}</a>}
            {user ? (
              <>
                <span>Hola, {user.name}</span>
                <button onClick={() => { logout(); setMenuOpen(false); }} className="block hover:underline w-full text-left">{t('logout')}</button>
              </>
            ) : (
              <>
                <a href="#login" className="block hover:underline" onClick={() => setMenuOpen(false)}>{t('login')}</a>
                <a href="#register" className="block hover:underline" onClick={() => setMenuOpen(false)}>{t('register')}</a>
              </>
            )}
            <button onClick={() => setDarkMode(!darkMode)} className="block hover:underline w-full text-left">
              {t('darkMode')}
            </button>
            <select
              value={useContext(LanguageContext).lang}
              onChange={(e) => useContext(LanguageContext).setLang(e.target.value)}
              className="w-full bg-blue-800 text-white p-1"
            >
              <option value="es">🇪🇸 Español</option>
              <option value="en">🇬🇧 English</option>
              <option value="pt">🇵🇹 Português</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="de">🇩🇪 Deutsch</option>
            </select>
          </div>
        )}
      </div>
    </nav>
  );
};

const Home = () => {
  const { t } = useContext(LanguageContext);
  return (
    <section id="home" className="py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">{t('welcome')}</h1>
      <p className="text-xl mb-8">Tu tienda de tecnología en Cuba</p>
      <a href="#products" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 inline-block">
        {t('viewProduct')}
      </a>
    </section>
  );
};

const ProductList = () => {
  const { t } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(CartContext);

  const products = [
    { id: 1, name: 'Laptop Gamer Pro', category: 'laptop', price: 800, image: 'https://placehold.co/300x200/333/FFF?text=Laptop', description: 'Potente laptop para juegos y trabajo.' },
    { id: 2, name: 'PC Escritorio 16GB', category: 'desktop', price: 1200, image: 'https://placehold.co/300x200/444/FFF?text=PC', description: 'Computadora de escritorio con 16GB RAM.' },
    { id: 3, name: 'Smartphone Ultra', category: 'phone', price: 600, image: 'https://placehold.co/300x200/555/FFF?text=Phone', description: 'Teléfono con cámara de 108MP.' },
    { id: 4, name: 'Teclado Mecánico', category: 'accessory', price: 80, image: 'https://placehold.co/300x200/666/FFF?text=Teclado', description: 'Teclado mecánico RGB.' },
  ];

  return (
    <section id="products" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">{t('products')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t[product.category]}</p>
                <p className="text-blue-600 font-semibold mt-1">{t('price')}: ${product.price}</p>
                <p className="text-sm mt-2">{product.description}</p>
                {user && (
                  <button
                    onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
                    className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    {t('addToCart')}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CartPage = () => {
  const { t } = useContext(LanguageContext);
  const { state, dispatch } = useContext(CartContext);
  const [step, setStep] = useState(1); // 1: cart, 2: payment, 3: confirmation
  const [paymentMethod, setPaymentMethod] = useState('');
  const [reference, setReference] = useState('');

  const total = state.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = () => {
    if (!paymentMethod || !reference) return alert('Completa todos los campos');
    setStep(3);
  };

  if (step === 3) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-lg">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <h3 className="font-bold">¡Pago recibido!</h3>
            <p>Tu orden está pendiente de confirmación. ID: {Date.now()}</p>
            <button onClick={() => setStep(1)} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">
              {t('continueShopping')}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">{t('cart')}</h2>
        {state.length === 0 ? (
          <p className="text-xl text-center py-8">{t('emptyCart')}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {state.map((item) => (
                  <div key={item.id} className="flex border-b py-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div className="ml-4 flex-1">
                      <h3 className="font-bold">{item.name}</h3>
                      <p>${item.price} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => dispatch({
                          type: 'UPDATE_QUANTITY',
                          payload: { id: item.id, quantity: parseInt(e.target.value) }
                        })}
                        className="w-16 border text-center"
                      />
                      <button
                        onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                        className="ml-4 text-red-500 hover:text-red-700"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded">
                <h3 className="text-xl font-bold mb-4">{t('checkout')}</h3>
                <p className="text-lg">{t('total')}: <strong>${total}</strong></p>
                {step === 1 ? (
                  <button
                    onClick={() => setStep(2)}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    {t('checkout')}
                  </button>
                ) : (
                  <div className="mt-4">
                    <h4 className="font-bold mb-2">{t('payment')}</h4>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full border p-2 mb-2"
                    >
                      <option value="">{t('selectMethod')}</option>
                      <option value="transfermovil">{t('transfermovil')}</option>
                      <option value="enzona">{t('enzona')}</option>
                    </select>
                    <input
                      type="text"
                      placeholder={t('reference')}
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      className="w-full border p-2 mb-2"
                    />
                    <button
                      onClick={handlePayment}
                      className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                      {t('confirmPayment')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (!result.success) setError(result.message);
  };

  return (
    <section id="login" className="py-12">
      <div className="container mx-auto px-4 max-w-md">
        <h2 className="text-3xl font-bold mb-6">{t('login')}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder={t('email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded"
            required
          />
          <input
            type="password"
            placeholder={t('password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
            {t('login')}
          </button>
        </form>
        <p className="mt-4 text-center">
          {t('alreadyAccount')}{' '}
          <a href="#register" className="text-blue-600 hover:underline">{t('signIn')}</a>
        </p>
      </div>
    </section>
  );
};

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Las contraseñas no coinciden');
      return;
    }
    const result = register(name, email, password);
    if (!result.success) setError(result.message);
    else alert('Registro exitoso');
  };

  return (
    <section id="register" className="py-12">
      <div className="container mx-auto px-4 max-w-md">
        <h2 className="text-3xl font-bold mb-6">{t('register')}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder={t('name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded"
            required
          />
          <input
            type="email"
            placeholder={t('email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded"
            required
          />
          <input
            type="password"
            placeholder={t('password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded"
            required
          />
          <input
            type="password"
            placeholder={t('confirmPassword')}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border p-3 rounded"
            required
          />
          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
            {t('registerNow')}
          </button>
        </form>
        <p className="mt-4 text-center">
          ¿Ya tienes cuenta?{' '}
          <a href="#login" className="text-blue-600 hover:underline">Inicia sesión</a>
        </p>
      </div>
    </section>
  );
};

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const { t } = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop Gamer Pro', category: 'laptop', price: 800, stock: 10, image: 'https://placehold.co/300x200/333/FFF?text=Laptop' },
  ]);
  const [orders] = useState([
    { id: 101, user: 'usuario@techstore.cu', total: 800, status: 'pending', method: 'transfermovil' },
  ]);
  const [newProduct, setNewProduct] = useState({ name: '', category: 'laptop', price: '', stock: '', image: '' });

  if (!user || user.role !== 'admin') return <div>Acceso denegado</div>;

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    setProducts([...products, { ...newProduct, id: Date.now(), price: parseFloat(newProduct.price), stock: parseInt(newProduct.stock) }]);
    setNewProduct({ name: '', category: 'laptop', price: '', stock: '', image: '' });
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <section id="admin" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">{t('adminPanel')}</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded ${activeTab === 'products' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {t('manageProducts')}
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {t('allOrders')}
          </button>
        </div>

        {activeTab === 'products' && (
          <div>
            <h3 className="text-xl font-bold mb-4">{t('addProduct')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
              <input
                placeholder={t('productName')}
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="border p-2 col-span-2"
              />
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="border p-2"
              >
                <option value="desktop">{t('desktop')}</option>
                <option value="laptop">{t('laptop')}</option>
                <option value="phone">{t('phone')}</option>
                <option value="accessory">{t('accessory')}</option>
              </select>
              <input
                type="number"
                placeholder={t('price')}
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="border p-2"
              />
              <input
                type="number"
                placeholder={t('stock')}
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                className="border p-2"
              />
              <input
                placeholder={t('image')}
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                className="border p-2"
              />
              <button onClick={addProduct} className="bg-green-600 text-white p-2 rounded col-span-6 md:col-span-1">
                {t('save')}
              </button>
            </div>
            <h3 className="text-xl font-bold mb-4">{t('manageProducts')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {products.map((p) => (
                <div key={p.id} className="border p-4 rounded flex justify-between items-center">
                  <div>
                    <h4 className="font-bold">{p.name}</h4>
                    <p>{t(p.category)} - ${p.price} ({p.stock} en stock)</p>
                  </div>
                  <button onClick={() => deleteProduct(p.id)} className="text-red-500 hover:text-red-700">
                    {t('delete')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h3 className="text-xl font-bold mb-4">{t('allOrders')}</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="py-2 px-4">ID</th>
                    <th className="py-2 px-4">{t('user')}</th>
                    <th className="py-2 px-4">{t('total')}</th>
                    <th className="py-2 px-4">{t('method')}</th>
                    <th className="py-2 px-4">{t('status')}</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b">
                      <td className="py-2 px-4">{o.id}</td>
                      <td className="py-2 px-4">{o.user}</td>
                      <td className="py-2 px-4">${o.total}</td>
                      <td className="py-2 px-4">{t(o.method)}</td>
                      <td className="py-2 px-4">
                        <span className={`px-2 py-1 rounded text-white text-xs ${
                          o.status === 'paid' ? 'bg-green-500' : 
                          o.status === 'shipped' ? 'bg-blue-500' : 'bg-yellow-500'
                        }`}>
                          {t(o.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// === RUTEO BÁSICO ===
const App = () => {
  const hash = typeof window !== 'undefined' ? window.location.hash : '#home';
  const [cartState, cartDispatch] = useReducer(cartReducer, []);

  return (
    <AuthProvider>
      <ThemeContext.Provider value={{ darkMode: false, setDarkMode: () => {} }}>
        <ThemeProvider>
          <LanguageProvider>
            <CartContext.Provider value={{ state: cartState, dispatch: cartDispatch }}>
              <div>
                <Navbar />
                {hash === '#home' && <Home />}
                {hash === '#products' && <ProductList />}
                {hash === '#cart' && <CartPage />}
                {hash === '#login' && <LoginPage />}
                {hash === '#register' && <RegisterPage />}
                {hash === '#admin' && <AdminPanel />}
                {(!hash || ['','#home','#products','#cart','#login','#register','#admin'].indexOf(hash) === -1) && <Home />}
              </div>
            </CartContext.Provider>
          </LanguageProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </AuthProvider>
  );
};

export default App;