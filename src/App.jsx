import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import './App.css'

const carBrands = ['Maruti Suzuki', 'Hyundai', 'Tata', 'Mahindra', 'Honda', 'Toyota', 'Kia', 'Volkswagen', 'Skoda', 'Renault', 'Nissan', 'Ford', 'MG', 'Jeep', 'BMW', 'Mercedes-Benz', 'Audi']
const bikeBrands = ['Hero', 'Honda', 'Bajaj', 'TVS', 'Yamaha', 'Royal Enfield', 'KTM', 'Suzuki', 'Kawasaki', 'Jawa', 'Harley-Davidson', 'Triumph']
const fuelTypes = ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid']
const vehicleModels = {
  Car: {
    'Maruti Suzuki': ['Swift', 'Baleno', 'Brezza', 'Dzire', 'Vitara Brezza'],
    Hyundai: ['Creta', 'Verna', 'i20', 'Venue', 'Elantra'],
    Tata: ['Nexon', 'Harrier', 'Safari', 'Tiago', 'Altroz'],
    Mahindra: ['Scorpio', 'Thar', 'XUV700', 'Bolero', 'Marazzo'],
    Honda: ['City', 'Amaze', 'Civic', 'Elevate', 'Jazz'],
    Toyota: ['Innova', 'Fortuner', 'Corolla', 'Glanza', 'Urban Cruiser'],
    Kia: ['Seltos', 'Sonet', 'Carnival', 'Carens', 'EV6'],
    Volkswagen: ['Polo', 'Vento', 'Taigun', 'Virtus', 'Tiguan'],
    Skoda: ['Rapid', 'Slavia', 'Kushaq', 'Superb', 'Octavia'],
    Renault: ['Kwid', 'Triber', 'Duster', 'Captur', 'Kiger'],
    Nissan: ['Magnite', 'Sunny', 'GT-R', 'Rogue', 'X-Trail'],
    Ford: ['EcoSport', 'Freestyle', 'Figo', 'Aspire', 'Endeavour'],
    MG: ['Hector', 'Astor', 'Gloster', 'ZS EV', 'Comet'],
    Jeep: ['Compass', 'Wrangler', 'Grand Cherokee', 'Meridian', 'Commander'],
    BMW: ['3 Series', '5 Series', 'X5', 'X1', 'M3'],
    'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE', 'AMG GT'],
    Audi: ['A4', 'Q3', 'Q5', 'A6', 'RS5'],
  },
  Bike: {
    Hero: ['Splendor', 'HF Deluxe', 'Glamour', 'Xpulse 200', 'Karizma XMR'],
    Honda: ['Activa 6G', 'CB Shine', 'SP 125', 'Hornet 2.0', 'CBR 250R'],
    Bajaj: ['Pulsar 150', 'Dominar 400', 'Avenger Street 160', 'CT 100', 'Platina 110'],
    TVS: ['Apache RTR 160', 'Jupiter', 'Radeon', 'Sport', 'Ntorq 125'],
    Yamaha: ['R15M', 'MT-15', 'YZF-R3', 'FZ S', 'Ray ZR'],
    'Royal Enfield': ['Classic 350', 'Meteor 350', 'Himalayan', 'Hunter 350', 'Interceptor 650'],
    KTM: ['Duke 390', 'RC 390', '200 Duke', '390 Adventure', '125 Duke'],
    Suzuki: ['Gixxer 250', 'Access 125', 'V-Strom 650', 'Hayabusa', 'Burgman Street'],
    Kawasaki: ['Ninja 300', 'Z650', 'Versys 650', 'KX 100', 'Vulcan S'],
    Jawa: ['42', 'Classic', 'Perak', 'Forty Two', 'Jawa 300'],
    'Harley-Davidson': ['Street 750', 'Nightster', 'Sportster S', 'Pan America', 'Roadster'],
    Triumph: ['Street Triple', 'Speed 400', 'Tiger 900', 'Scrambler 400X', 'Bonneville T100'],
  },
}

const allCategories = [
  { name: 'Engine Parts', type: 'Car', icon: '⚙️', count: 24 },
  { name: 'Gearbox', type: 'Car', icon: '🔧', count: 18 },
  { name: 'Clutch', type: 'Car', icon: '🧰', count: 12 },
  { name: 'Suspension', type: 'Car', icon: '🛞', count: 16 },
  { name: 'Brakes', type: 'Car', icon: '🛑', count: 21 },
  { name: 'Steering', type: 'Car', icon: '🧭', count: 9 },
  { name: 'Electrical', type: 'Car', icon: '💡', count: 28 },
  { name: 'ECU', type: 'Car', icon: '🧠', count: 7 },
  { name: 'Sensors', type: 'Car', icon: '📡', count: 14 },
  { name: 'Lights', type: 'Car', icon: '💥', count: 20 },
  { name: 'Mirrors', type: 'Car', icon: '🪞', count: 10 },
  { name: 'Body Parts', type: 'Car', icon: '🚙', count: 26 },
  { name: 'Exhaust', type: 'Car', icon: '🚗', count: 13 },
  { name: 'AC Parts', type: 'Car', icon: '❄️', count: 11 },
  { name: 'Cooling System', type: 'Car', icon: '🌡️', count: 15 },
  { name: 'Interior Parts', type: 'Car', icon: '🪑', count: 19 },
  { name: 'Accessories', type: 'Car', icon: '🎯', count: 17 },
  { name: 'Engine Parts', type: 'Bike', icon: '⚙️', count: 20 },
  { name: 'Gearbox', type: 'Bike', icon: '🔧', count: 14 },
  { name: 'Clutch', type: 'Bike', icon: '🧰', count: 11 },
  { name: 'Brakes', type: 'Bike', icon: '🛑', count: 17 },
  { name: 'Suspension', type: 'Bike', icon: '🛞', count: 13 },
]

const makeArt = (type, label) => {
  const palette = type === 'Car' ? ['#f97316', '#fbbf24', '#0f172a', '#e2e8f0'] : ['#38bdf8', '#22c55e', '#111827', '#f8fafc']

  const vehicleSvg = type === 'Car'
    ? `
      <path d="M105 395 L190 330 L284 300 L505 300 L595 332 L688 395 L700 420 L96 420 Z" fill="${palette[2]}" opacity="0.92"/>
      <path d="M205 332 L270 258 L480 258 L560 332" fill="none" stroke="${palette[3]}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="235" y="212" width="150" height="82" rx="16" fill="rgba(255,255,255,0.18)"/>
      <rect x="416" y="212" width="102" height="82" rx="16" fill="rgba(255,255,255,0.12)"/>
      <circle cx="238" cy="420" r="54" fill="rgba(15,23,42,0.78)"/>
      <circle cx="560" cy="420" r="54" fill="rgba(15,23,42,0.78)"/>
      <circle cx="238" cy="420" r="22" fill="${palette[3]}"/>
      <circle cx="560" cy="420" r="22" fill="${palette[3]}"/>
      <rect x="130" y="366" width="52" height="18" rx="9" fill="rgba(255,255,255,0.7)"/>
      <rect x="620" y="366" width="52" height="18" rx="9" fill="rgba(255,255,255,0.7)"/>
    `
    : `
      <circle cx="220" cy="420" r="58" fill="rgba(15,23,42,0.8)"/>
      <circle cx="560" cy="420" r="58" fill="rgba(15,23,42,0.8)"/>
      <circle cx="220" cy="420" r="24" fill="${palette[3]}"/>
      <circle cx="560" cy="420" r="24" fill="${palette[3]}"/>
      <path d="M257 316 L350 278 L450 280 L520 332 L420 398 L295 398 Z" fill="${palette[2]}" opacity="0.92"/>
      <path d="M260 318 L354 278 L425 332 L322 332 Z" fill="rgba(255,255,255,0.15)"/>
      <path d="M355 280 L386 220 L460 220 L510 282" fill="none" stroke="${palette[3]}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M390 220 L344 296" fill="none" stroke="${palette[3]}" stroke-width="12" stroke-linecap="round"/>
      <path d="M452 218 L505 170" fill="none" stroke="${palette[3]}" stroke-width="12" stroke-linecap="round"/>
      <path d="M520 170 L593 170" fill="none" stroke="${palette[3]}" stroke-width="12" stroke-linecap="round"/>
      <path d="M622 170 L580 234" fill="none" stroke="${palette[3]}" stroke-width="12" stroke-linecap="round"/>
      <path d="M352 315 L316 388" fill="none" stroke="${palette[3]}" stroke-width="12" stroke-linecap="round"/>
      <path d="M456 315 L490 390" fill="none" stroke="${palette[3]}" stroke-width="12" stroke-linecap="round"/>
      <path d="M245 308 L180 330" fill="none" stroke="${palette[3]}" stroke-width="12" stroke-linecap="round"/>
      <path d="M596 332 L640 318" fill="none" stroke="${palette[3]}" stroke-width="12" stroke-linecap="round"/>
    `

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${palette[0]}"/>
          <stop offset="100%" stop-color="${palette[1]}"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" rx="32" fill="url(#bg)"/>
      <circle cx="120" cy="120" r="72" fill="rgba(255,255,255,0.12)"/>
      <circle cx="690" cy="150" r="100" fill="rgba(255,255,255,0.08)"/>
      ${vehicleSvg}
      <text x="400" y="545" text-anchor="middle" fill="rgba(255,255,255,0.92)" font-family="Arial, sans-serif" font-size="38" font-weight="700">${label}</text>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

const products = [
  { id: 'p1', name: 'Maruti Swift 2019 Engine Mount', type: 'Car', category: 'Engine Parts', brand: 'Maruti Suzuki', model: 'Swift', year: '2019', price: 4800, condition: 'Used', image: makeArt('Car', 'Engine Parts'), stock: 7, rating: 4.9, location: 'Delhi', verified: true },
  { id: 'p2', name: 'Hyundai Creta Front Suspension Kit', type: 'Car', category: 'Suspension', brand: 'Hyundai', model: 'Creta', year: '2021', price: 9200, condition: 'Refurbished', image: makeArt('Car', 'Suspension'), stock: 4, rating: 4.7, location: 'Mumbai', verified: true },
  { id: 'p3', name: 'Honda City Clutch Plate Set', type: 'Car', category: 'Clutch', brand: 'Honda', model: 'City', year: '2020', price: 5600, condition: 'Used', image: makeArt('Car', 'Clutch'), stock: 9, rating: 4.8, location: 'Bengaluru', verified: false },
  { id: 'p4', name: 'Tata Nexon ECU Unit', type: 'Car', category: 'ECU', brand: 'Tata', model: 'Nexon', year: '2022', price: 14800, condition: 'Refurbished', image: makeArt('Car', 'ECU'), stock: 3, rating: 5.0, location: 'Pune', verified: true },
  { id: 'p5', name: 'Mahindra Scorpio Brake Rotor', type: 'Car', category: 'Brakes', brand: 'Mahindra', model: 'Scorpio', year: '2021', price: 6100, condition: 'Used', image: makeArt('Car', 'Brakes'), stock: 8, rating: 4.6, location: 'Jaipur', verified: true },
  { id: 'p6', name: 'BMW 3 Series Headlight Assembly', type: 'Car', category: 'Lights', brand: 'BMW', model: '3 Series', year: '2018', price: 18600, condition: 'Used', image: makeArt('Car', 'Lights'), stock: 2, rating: 4.9, location: 'Chennai', verified: true },
  { id: 'p7', name: 'Hero Splendor Gearbox Shell', type: 'Bike', category: 'Gearbox', brand: 'Hero', model: 'Splendor', year: '2017', price: 2600, condition: 'Used', image: makeArt('Bike', 'Gearbox'), stock: 11, rating: 4.7, location: 'Lucknow', verified: true },
  { id: 'p8', name: 'Royal Enfield Classic 350 Front Fork', type: 'Bike', category: 'Suspension', brand: 'Royal Enfield', model: 'Classic 350', year: '2020', price: 5400, condition: 'Refurbished', image: makeArt('Bike', 'Suspension'), stock: 6, rating: 4.8, location: 'Ahmedabad', verified: true },
  { id: 'p9', name: 'TVS Apache Brake Disc', type: 'Bike', category: 'Brakes', brand: 'TVS', model: 'Apache RTR 160', year: '2022', price: 3100, condition: 'Used', image: makeArt('Bike', 'Brakes'), stock: 14, rating: 4.6, location: 'Nagpur', verified: false },
  { id: 'p10', name: 'Honda Activa 6G Body Panel Set', type: 'Bike', category: 'Body Parts', brand: 'Honda', model: 'Activa 6G', year: '2021', price: 4200, condition: 'Used', image: makeArt('Bike', 'Body Parts'), stock: 10, rating: 4.5, location: 'Hyderabad', verified: true },
  { id: 'p11', name: 'Skoda Kushaq Headlight Assembly', type: 'Car', category: 'Lights', brand: 'Skoda', model: 'Kushaq', year: '2023', price: 17500, condition: 'Refurbished', image: makeArt('Car', 'Lights'), stock: 5, rating: 4.9, location: 'Noida', verified: true },
  { id: 'p12', name: 'Yamaha R15M Rear Shock Absorber', type: 'Bike', category: 'Suspension', brand: 'Yamaha', model: 'R15M', year: '2022', price: 6200, condition: 'Used', image: makeArt('Bike', 'Suspension'), stock: 4, rating: 4.8, location: 'Indore', verified: true },
  { id: 'p13', name: 'Kia Seltos AC Compressor', type: 'Car', category: 'AC Parts', brand: 'Kia', model: 'Seltos', year: '2022', price: 9800, condition: 'Refurbished', image: makeArt('Car', 'AC Parts'), stock: 5, rating: 4.7, location: 'Coimbatore', verified: true },
  { id: 'p14', name: 'KTM Duke 390 Clutch Cable', type: 'Bike', category: 'Clutch', brand: 'KTM', model: 'Duke 390', year: '2021', price: 2000, condition: 'Used', image: makeArt('Bike', 'Clutch'), stock: 9, rating: 4.4, location: 'Bhopal', verified: false },
]

const faqItems = [
  { question: 'How do I know a part is compatible with my vehicle?', answer: 'Use the vehicle selector on the homepage or the filter in shop pages to match your car or bike model and year before placing a request.' },
  { question: 'Can I negotiate prices?', answer: 'Yes. Every product details page includes a Make an Offer option and you can request a better price directly from the seller.' },
  { question: 'Do you offer returns?', answer: 'We provide a transparent return and refund policy for damaged, wrong-fit, or non-functional parts; the claim must be raised within 7 days of delivery.' },
  { question: 'How fast is shipping?', answer: 'Most parts dispatch within 24-48 hours, with pan-India delivery depending on your location and part size.' },
]

const reviews = [
  { name: 'Rohit S.', rating: 5, text: 'Found a perfect clutch kit for my Hyundai Creta at a fraction of dealer cost. The process was transparent and smooth.' },
  { name: 'Anjali K.', rating: 5, text: 'The site makes finding bike parts easy. I compared options and saved both time and money.' },
  { name: 'Vikas M.', rating: 4, text: 'Quick communication and trusted listings. I was able to negotiate a great deal on a front suspension setup.' },
]

const trustBadges = ['Verified sellers', 'Secure payments', 'Fast shipping', '7-day returns', 'OEM fit checks', 'Expert support']

const legalSections = {
  shipping: {
    title: 'Shipping Policy',
    intro: 'PARTX aims to deliver quality used and refurbished automotive parts quickly and reliably across India.',
    items: [
      'Orders are processed within 24-48 hours on business days after confirmation.',
      'Shipping fees vary by item type, weight, and delivery distance.',
      'Fragile or oversized parts may require specialist packaging and additional handling.',
      'Tracking information is shared after dispatch so you can monitor progress.',
    ],
  },
  refund: {
    title: 'Return & Refund Policy',
    intro: 'We want every part transaction to be fair, transparent, and confidence-building for your purchase.',
    items: [
      'Returns are accepted only for damaged, incorrect, or incompatible items that are reported within 7 days of delivery.',
      'Items must be accompanied by proof of condition and original packaging wherever possible.',
      'Refunds are processed after inspection and approval by the seller or support team.',
      'Custom or heavily used parts may be excluded from return eligibility based on product condition.',
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    intro: 'We respect your privacy and use your data only to improve your marketplace experience and communication.',
    items: [
      'We collect essential account details such as name, email, and contact information for order and support purposes.',
      'Marketplace data is stored locally in the browser for demo purposes and is never shared with a real backend.',
      'Cookies and localStorage are used only to remember browsing preferences and account session state.',
      'You may request account data deletion at any time through the support team.',
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    intro: 'These terms govern how you browse, buy, and negotiate parts on PARTX.',
    items: [
      'All listings are for informational and demo purposes and may not reflect live inventory availability.',
      'Buyers must verify compatibility before making a final purchase decision.',
      'The platform acts as a listing and discovery interface; sellers are responsible for the condition and quality of their parts.',
      'Any dispute should be reported promptly to our support team for review and mediation.',
    ],
  },
}

function getStoredJSON(key, fallback) {
  if (typeof window === 'undefined') return fallback

  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

function App() {
  const [authUser, setAuthUser] = useState(() => getStoredJSON('partx-user', null))
  const [offers, setOffers] = useState(() => getStoredJSON('partx-offers', []))

  useEffect(() => {
    localStorage.setItem('partx-user', JSON.stringify(authUser))
  }, [authUser])

  useEffect(() => {
    localStorage.setItem('partx-offers', JSON.stringify(offers))
  }, [offers])

  return (
    <BrowserRouter>
      <AppLayout authUser={authUser} setAuthUser={setAuthUser} offers={offers} setOffers={setOffers} />
    </BrowserRouter>
  )
}

function AppLayout({ authUser, setAuthUser, offers, setOffers }) {
  const location = useLocation()

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="container nav-row">
          <Link to="/" className="brand" aria-label="PARTX home">
            <span className="brand-mark">P</span>
            <span>PARTX</span>
          </Link>

          <nav className="main-nav" aria-label="Main navigation">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/cars">Cars</NavLink>
            <NavLink to="/bikes">Bikes</NavLink>
            <NavLink to="/categories">Categories</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>

          <div className="nav-actions">
            <Link to="/search" className="ghost-btn">Find My Part</Link>
            {!authUser ? (
              <>
                <Link to="/login" className="cta-btn">Login</Link>
                <Link to="/register" className="outline-btn">Register</Link>
              </>
            ) : (
              <div className="user-box">
                <span>{authUser.name.split(' ')[0]}</span>
                <button type="button" className="link-btn" onClick={() => setAuthUser(null)}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/cars" element={<VehiclePage vehicleType="Car" />} />
          <Route path="/bikes" element={<VehiclePage vehicleType="Bike" />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/bargain" element={<BargainPage offers={offers} setOffers={setOffers} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/shipping-policy" element={<PolicyPage sectionKey="shipping" />} />
          <Route path="/returns-policy" element={<PolicyPage sectionKey="refund" />} />
          <Route path="/privacy-policy" element={<PolicyPage sectionKey="privacy" />} />
          <Route path="/terms" element={<PolicyPage sectionKey="terms" />} />
          <Route path="/login" element={<AuthPage mode="login" setAuthUser={setAuthUser} />} />
          <Route path="/register" element={<AuthPage mode="register" setAuthUser={setAuthUser} />} />
          <Route path="/forgot-password" element={<AuthPage mode="forgot" setAuthUser={setAuthUser} />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="brand footer-brand">
              <span className="brand-mark">P</span>
              <span>PARTX</span>
            </div>
            <p className="muted">Quality Used Auto Parts. Better Prices. Your Deal.</p>
          </div>

          <div>
            <h4>Marketplace</h4>
            <ul className="footer-links">
              <li><Link to="/shop">Shop All Parts</Link></li>
              <li><Link to="/cars">Cars</Link></li>
              <li><Link to="/bikes">Bikes</Link></li>
              <li><Link to="/categories">Categories</Link></li>
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4>Policies</h4>
            <ul className="footer-links">
              <li><Link to="/shipping-policy">Shipping Policy</Link></li>
              <li><Link to="/returns-policy">Return & Refund</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 PARTX</span>
          <span className={location.pathname === '/' ? 'dot-live' : ''}>Trusted by 25,000+ riders and drivers</span>
        </div>
      </footer>
    </div>
  )
}

function HomePage() {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')
  const [vehicleSelection, setVehicleSelection] = useState({
    type: 'Car',
    brand: 'Maruti Suzuki',
    model: 'Swift',
    variant: 'VXI',
    year: '2023',
    engine: '1197cc',
    fuel: 'Petrol',
  })

  const handleSearch = (event) => {
    event.preventDefault()
    const query = searchText.trim()
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : '/shop')
  }

  const handleVehicleSubmit = () => {
    navigate(`/shop?vehicleType=${vehicleSelection.type}&brand=${encodeURIComponent(vehicleSelection.brand)}`)
  }

  const displayedProducts = products.slice(0, 4)
  const featuredDeals = products.filter((product) => product.price < 7000).slice(0, 4)
  const recentAdds = products.slice(-4)

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Premium used auto marketplace</span>
            <h1>Quality Used Auto Parts. Better Prices. Your Deal.</h1>
            <p>Find genuine used, refurbished and affordable car & bike parts — and make your own offer.</p>
            <div className="hero-actions">
              <button type="button" className="cta-btn" onClick={() => navigate('/shop?vehicleType=Car')}>Shop Car Parts</button>
              <button type="button" className="secondary-btn" onClick={() => navigate('/shop?vehicleType=Bike')}>Shop Bike Parts</button>
              <button type="button" className="ghost-btn" onClick={() => navigate('/search')}>Find My Part</button>
            </div>

            <form className="search-box" onSubmit={handleSearch}>
              <input
                type="text"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Search by part, brand, or model"
                aria-label="Search for parts"
              />
              <button type="submit" className="cta-btn">Search</button>
            </form>
          </div>

          <div className="vehicle-selector card-panel">
            <div className="selector-header">
              <h3>Vehicle selector</h3>
              <span>Parts available for your vehicle</span>
            </div>
            <div className="selector-grid">
              <label>
                Vehicle Type
                <select value={vehicleSelection.type} onChange={(event) => {
                  const type = event.target.value
                  const brand = type === 'Car' ? carBrands[0] : bikeBrands[0]
                  const model = type === 'Car' ? vehicleModels.Car[brand][0] : vehicleModels.Bike[brand][0]
                  setVehicleSelection({ ...vehicleSelection, type, brand, model })
                }}>
                  <option value="Car">Car</option>
                  <option value="Bike">Bike</option>
                </select>
              </label>

              <label>
                Brand
                <select value={vehicleSelection.brand} onChange={(event) => {
                  const nextBrand = event.target.value
                  const nextModel = vehicleSelection.type === 'Car' ? vehicleModels.Car[nextBrand][0] : vehicleModels.Bike[nextBrand][0]
                  setVehicleSelection({ ...vehicleSelection, brand: nextBrand, model: nextModel })
                }}>
                  {(vehicleSelection.type === 'Car' ? carBrands : bikeBrands).map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </label>

              <label>
                Model
                <select value={vehicleSelection.model} onChange={(event) => setVehicleSelection({ ...vehicleSelection, model: event.target.value })}>
                  {(vehicleSelection.type === 'Car' ? vehicleModels.Car[vehicleSelection.brand] : vehicleModels.Bike[vehicleSelection.brand]).map((model) => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </label>

              <label>
                Variant
                <select value={vehicleSelection.variant} onChange={(event) => setVehicleSelection({ ...vehicleSelection, variant: event.target.value })}>
                  {['VXI', 'ZXI', 'EX', 'X', 'Sport', 'STD', 'Premium'].map((variant) => (
                    <option key={variant} value={variant}>{variant}</option>
                  ))}
                </select>
              </label>

              <label>
                Year
                <select value={vehicleSelection.year} onChange={(event) => setVehicleSelection({ ...vehicleSelection, year: event.target.value })}>
                  {['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'].map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </label>

              <label>
                Engine
                <select value={vehicleSelection.engine} onChange={(event) => setVehicleSelection({ ...vehicleSelection, engine: event.target.value })}>
                  {['998cc', '1197cc', '1248cc', '1498cc', '1997cc', '2200cc', '300cc', '390cc', '650cc'].map((engine) => (
                    <option key={engine} value={engine}>{engine}</option>
                  ))}
                </select>
              </label>

              <label>
                Fuel Type
                <select value={vehicleSelection.fuel} onChange={(event) => setVehicleSelection({ ...vehicleSelection, fuel: event.target.value })}>
                  {fuelTypes.map((fuel) => (
                    <option key={fuel} value={fuel}>{fuel}</option>
                  ))}
                </select>
              </label>
            </div>

            <button type="button" className="cta-btn full-width" onClick={handleVehicleSubmit}>Check compatible parts</button>
          </div>
        </div>
      </section>

      <section className="container section-block">
        <SectionHeader title="Featured products" subtitle="Quality parts checked for fit, condition and reliability." />
        <div className="product-grid">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container section-block">
        <SectionHeader title="Popular categories" subtitle="Choose your next upgrade with confidence." />
        <div className="category-grid">
          {allCategories.slice(0, 8).map((category) => (
            <Link key={`${category.type}-${category.name}`} to={`/shop?category=${encodeURIComponent(category.name)}`} className="category-card">
              <span className="category-icon">{category.icon}</span>
              <div>
                <strong>{category.name}</strong>
                <small>{category.count} listed parts</small>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section-block split-section">
        <div>
          <SectionHeader title="Cars" subtitle="Performance parts for hatchbacks, sedans, SUVs and premium models." />
          <div className="mini-grid">
            {products.filter((product) => product.type === 'Car').slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
        </div>

        <div>
          <SectionHeader title="Bikes" subtitle="Bike-specific engine, clutch and suspension parts ready to ship." />
          <div className="mini-grid">
            {products.filter((product) => product.type === 'Bike').slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="container section-block">
        <SectionHeader title="Best deals" subtitle="High value savings on trusted parts and accessories." />
        <div className="product-grid">
          {featuredDeals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container section-block">
        <SectionHeader title="Recently added parts" subtitle="Fresh inventory and latest arrivals from verified sellers." />
        <div className="product-grid">
          {recentAdds.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container section-block why-us">
        <SectionHeader title="Why choose us" subtitle="A trustworthy marketplace built for fitment confidence and fair pricing." />
        <div className="feature-grid">
          {[
            ['✅ Verified fitment', 'Every listing is checked for compatibility and quality before publishing.'],
            ['💬 Direct seller negotiation', 'Instantly request lower pricing or confirm part condition before checkout.'],
            ['📦 Nationwide delivery', 'Fast dispatch and secure packaging across India.'],
            ['🔒 Buyer protection', 'Clear returns and policy guidance for peace of mind on every purchase.'],
          ].map(([title, description]) => (
            <div key={title} className="feature-card">
              <h4>{title}</h4>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container section-block">
        <SectionHeader title="Customer reviews" subtitle="What riders and drivers say about PARTX." />
        <div className="review-grid">
          {reviews.map((review) => (
            <div key={review.name} className="review-card">
              <div className="stars">{'★'.repeat(review.rating)}</div>
              <p>“{review.text}”</p>
              <strong>{review.name}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="container section-block">
        <SectionHeader title="Trust badges" subtitle="Built around confidence, clarity and convenience." />
        <div className="badge-grid">
          {trustBadges.map((badge) => (
            <div key={badge} className="badge-pill">{badge}</div>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <span className="eyebrow">Need a better deal?</span>
            <h3>Find a compatible part and negotiate your price online.</h3>
          </div>
          <button type="button" className="cta-btn" onClick={() => navigate('/shop')}>Shop now</button>
        </div>
      </section>
    </>
  )
}

function ShopPage() {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const searchTerm = query.get('q') || ''
  const vehicleTypeQuery = query.get('vehicleType') || 'all'
  const categoryQuery = query.get('category') || 'all'
  const [category, setCategory] = useState(categoryQuery)
  const [vehicleType, setVehicleType] = useState(vehicleTypeQuery)

  useEffect(() => {
    setCategory(categoryQuery)
    setVehicleType(vehicleTypeQuery)
  }, [categoryQuery, vehicleTypeQuery])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const termMatch = !searchTerm || [product.name, product.brand, product.model, product.category].join(' ').toLowerCase().includes(searchTerm.toLowerCase())
      const typeMatch = vehicleType === 'all' || product.type === vehicleType
      const categoryMatch = category === 'all' || product.category === category
      return termMatch && typeMatch && categoryMatch
    })
  }, [searchTerm, vehicleType, category])

  return (
    <div className="container page-shell-inner">
      <SectionHeader title="Shop all parts" subtitle="Explore quality inventory for cars and bikes from trusted sellers." />
      <div className="filter-panel card-panel">
        <div className="filter-controls">
          <select value={vehicleType} onChange={(event) => setVehicleType(event.target.value)}>
            <option value="all">All Vehicles</option>
            <option value="Car">Cars</option>
            <option value="Bike">Bikes</option>
          </select>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="all">All Categories</option>
            {[...new Set(products.map((product) => product.category))].map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.length ? filteredProducts.map((product) => <ProductCard key={product.id} product={product} />) : <p className="empty-state">No parts match your current filters. Try another category or vehicle type.</p>}
      </div>
    </div>
  )
}

function VehiclePage({ vehicleType }) {
  return (
    <div className="container page-shell-inner">
      <SectionHeader title={vehicleType === 'Car' ? 'Cars' : 'Bikes'} subtitle={`Browse premium ${vehicleType.toLowerCase()} parts from verified sellers.`} />
      <div className="product-grid">
        {products.filter((product) => product.type === vehicleType).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

function CategoriesPage() {
  return (
    <div className="container page-shell-inner">
      <SectionHeader title="Categories" subtitle="Find the right fitment category for your vehicle and requirement." />
      <div className="category-grid large">
        {allCategories.map((category) => (
          <Link key={`${category.type}-${category.name}`} to={`/shop?vehicleType=${category.type}&category=${encodeURIComponent(category.name)}`} className="category-card">
            <span className="category-icon">{category.icon}</span>
            <div>
              <strong>{category.name}</strong>
              <small>{category.type} • {category.count} parts</small>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function SearchResultsPage() {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const searchTerm = query.get('q') || ''
  const filtered = products.filter((product) => !searchTerm || [product.name, product.brand, product.model, product.category].join(' ').toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="container page-shell-inner">
      <SectionHeader title={searchTerm ? `Search results for “${searchTerm}”` : 'Find my part'} subtitle="Search for part numbers, brands, models, and categories to discover compatible inventory." />
      <div className="product-grid">
        {filtered.length ? filtered.map((product) => <ProductCard key={product.id} product={product} />) : <p className="empty-state">No items found. Try a different keyword or browse the shop directly.</p>}
      </div>
    </div>
  )
}

function ProductDetailsPage() {
  const { productId } = useParams()
  const product = products.find((item) => item.id === productId)
  const navigate = useNavigate()

  if (!product) {
    return <div className="container page-shell-inner"><p className="empty-state">Product not found.</p></div>
  }

  const related = products.filter((item) => item.type === product.type && item.id !== product.id).slice(0, 3)

  return (
    <div className="container page-shell-inner">
      <div className="product-detail">
        <div className="detail-image-wrap">
          <img src={product.image} alt={product.name} className="detail-image" />
        </div>

        <div className="detail-info">
          <span className="eyebrow">{product.type} • {product.category}</span>
          <h2>{product.name}</h2>
          <div className="meta-row">
            <span>{product.brand}</span>
            <span>{product.model}</span>
            <span>{product.year}</span>
          </div>
          <div className="price-row">
            <strong>₹{product.price.toLocaleString('en-IN')}</strong>
            <span>{product.condition}</span>
          </div>
          <p className="muted">Listed in {product.location} • {product.stock} units available • {product.rating}★ rating</p>
          <ul className="detail-specs">
            <li>Compatible with {product.model} {product.year}</li>
            <li>Fitment confirmed for {product.type.toLowerCase()} applications</li>
            <li>Ready for inspection, pickup or delivery</li>
          </ul>
          <div className="detail-actions">
            <button type="button" className="cta-btn" onClick={() => navigate('/bargain')}>Make an offer</button>
            <button type="button" className="secondary-btn" onClick={() => navigate('/shop')}>Continue shopping</button>
          </div>
        </div>
      </div>

      <div className="related-products">
        <SectionHeader title="Related parts" subtitle="You may also like these compatible options." />
        <div className="product-grid">
          {related.map((item) => <ProductCard key={item.id} product={item} />)}
        </div>
      </div>
    </div>
  )
}

function BargainPage({ offers, setOffers }) {
  const [form, setForm] = useState({ name: '', product: 'Maruti Swift 2019 Engine Mount', offer: 4500, note: '' })
  const [status, setStatus] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const newOffer = { ...form, id: Date.now(), createdAt: new Date().toLocaleString() }
    setOffers((current) => [newOffer, ...current])
    setStatus('Offer submitted successfully. The seller will review your request shortly.')
    setForm({ name: '', product: 'Maruti Swift 2019 Engine Mount', offer: 4500, note: '' })
  }

  return (
    <div className="container page-shell-inner bargain-page">
      <SectionHeader title="Bargain / Make an Offer" subtitle="Request a better price on any compatible part and start a conversation with the seller." />
      <div className="bargain-layout">
        <form className="card-panel bargain-form" onSubmit={handleSubmit}>
          <label>
            Your name
            <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Enter your name" required />
          </label>
          <label>
            Part name
            <select value={form.product} onChange={(event) => setForm({ ...form, product: event.target.value })}>
              {products.map((product) => (
                <option key={product.id} value={product.name}>{product.name}</option>
              ))}
            </select>
          </label>
          <label>
            Offer price (₹)
            <input type="number" value={form.offer} onChange={(event) => setForm({ ...form, offer: Number(event.target.value) })} min="100" required />
          </label>
          <label>
            Message
            <textarea value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} rows="4" placeholder="Tell the seller about your budget or part requirements" />
          </label>
          <button type="submit" className="cta-btn">Submit offer</button>
          {status && <p className="success-text">{status}</p>}
        </form>

        <div className="card-panel offer-list">
          <h3>Recent offers</h3>
          {offers.length ? offers.slice(0, 5).map((offer) => (
            <div key={offer.id} className="offer-item">
              <strong>{offer.name}</strong>
              <span>{offer.product}</span>
              <small>Offer: ₹{offer.offer.toLocaleString('en-IN')}</small>
              <small>{offer.createdAt}</small>
            </div>
          )) : <p className="muted">No offers yet. Be the first to negotiate your best price.</p>}
        </div>
      </div>
    </div>
  )
}

function AboutPage() {
  return (
    <div className="container page-shell-inner">
      <SectionHeader title="About PARTX" subtitle="A trusted marketplace designed for genuine used auto parts shopping without the hassle." />
      <div className="article-card card-panel">
        <p>PARTX brings together drivers, riders and sellers in one premium marketplace to discover reliable used, refurbished and price-flexible auto parts. Our goal is to make fitment decisions easier, save money and create trust in every transaction.</p>
        <p>From engine parts and clutch kits to suspension upgrades and body components, we simplify product discovery for both cars and bikes. Our platform is built for a clean front-end experience using mock data and local state so the marketplace feels seamless and realistic without requiring a backend.</p>
      </div>
    </div>
  )
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="container page-shell-inner contact-page">
      <SectionHeader title="Contact" subtitle="Talk to our support team for compatibility, shipping or seller questions." />
      <div className="contact-layout">
        <form className="card-panel contact-form" onSubmit={handleSubmit}>
          <label>
            Full name
            <input type="text" placeholder="Your name" required />
          </label>
          <label>
            Email
            <input type="email" placeholder="you@example.com" required />
          </label>
          <label>
            Subject
            <input type="text" placeholder="Part query or customer support" required />
          </label>
          <label>
            Message
            <textarea rows="5" placeholder="How can we help?" required />
          </label>
          <button type="submit" className="cta-btn">Send message</button>
          {submitted && <p className="success-text">Your message has been sent. Our team will reply soon.</p>}
        </form>

        <div className="card-panel contact-info">
          <h3>Support</h3>
          <p>Email: support@partx.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Hours: Mon-Sat, 9:00 AM - 7:00 PM</p>
          <p>Address: 24 Auto Lane, Sector 12, Bengaluru, India</p>
        </div>
      </div>
    </div>
  )
}

function FaqPage() {
  const [expanded, setExpanded] = useState(0)

  return (
    <div className="container page-shell-inner">
      <SectionHeader title="FAQ" subtitle="Answers to common buyer and seller questions." />
      <div className="faq-list card-panel">
        {faqItems.map((item, index) => (
          <div key={item.question} className={`faq-item ${expanded === index ? 'open' : ''}`}>
            <button type="button" onClick={() => setExpanded(expanded === index ? -1 : index)}>
              <span>{item.question}</span>
              <span>{expanded === index ? '−' : '+'}</span>
            </button>
            {expanded === index && <p>{item.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

function PolicyPage({ sectionKey }) {
  const section = legalSections[sectionKey]

  return (
    <div className="container page-shell-inner">
      <div className="article-card card-panel policy-card">
        <h2>{section.title}</h2>
        <p>{section.intro}</p>
        <ul>
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function AuthPage({ mode, setAuthUser }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [message, setMessage] = useState('')

  const title = mode === 'login' ? 'Login' : mode === 'register' ? 'Register' : 'Forgot Password'

  const handleSubmit = (event) => {
    event.preventDefault()

    if (mode === 'login') {
      const accounts = getStoredJSON('partx-accounts', [])
      const account = accounts.find((item) => item.email === form.email && item.password === form.password)

      if (!account) {
        setMessage('No matching account found. Please register first.')
        return
      }

      setAuthUser({ name: account.name, email: account.email })
      navigate('/')
      return
    }

    if (mode === 'register') {
      const accounts = getStoredJSON('partx-accounts', [])
      const exists = accounts.some((item) => item.email === form.email)
      if (exists) {
        setMessage('An account with this email already exists.')
        return
      }

      const updated = [...accounts, { ...form }]
      localStorage.setItem('partx-accounts', JSON.stringify(updated))
      setAuthUser({ name: form.name, email: form.email })
      navigate('/')
      return
    }

    setMessage('Password reset link sent to your email. Demo mode: please use your registered email to log in.')
  }

  return (
    <div className="container page-shell-inner auth-page">
      <div className="card-panel auth-card">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'register' && (
            <label>
              Full name
              <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your full name" required />
            </label>
          )}

          {(mode === 'login' || mode === 'register') && (
            <label>
              Email
              <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" required />
            </label>
          )}

          {(mode === 'login' || mode === 'register') && (
            <label>
              Password
              <input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Your password" required />
            </label>
          )}

          {mode === 'forgot' && (
            <label>
              Email
              <input type="email" placeholder="Enter your email" required />
            </label>
          )}

          <button type="submit" className="cta-btn full-width">{title}</button>
          {message && <p className="success-text">{message}</p>}
        </form>

        <div className="auth-links">
          <Link to="/register">Create new account</Link>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
      </div>
    </div>
  )
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="section-header">
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </div>
  )
}

function ProductCard({ product, compact = false }) {
  return (
    <article className={`product-card${compact ? ' compact' : ''}`}>
      <Link to={`/product/${product.id}`} className="product-image-link">
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>
      <div className="product-body">
        <div className="product-topline">
          <span className="pill">{product.type}</span>
          <span className="rating">⭐ {product.rating}</span>
        </div>
        <Link to={`/product/${product.id}`} className="product-title">{product.name}</Link>
        <div className="product-meta">
          <span>{product.brand}</span>
          <span>{product.model}</span>
        </div>
        <div className="product-foot">
          <strong>₹{product.price.toLocaleString('en-IN')}</strong>
          <Link to={`/bargain`} className="offer-link">Make offer</Link>
        </div>
      </div>
    </article>
  )
}

export default App
