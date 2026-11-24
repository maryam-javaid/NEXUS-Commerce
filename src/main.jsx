import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ShoppingBag,
  Search,
  ArrowRight,
  LayoutDashboard,
  Package,
  Users,
  MessageSquare,
  Menu,
  X,
  Minus,
  Plus,
  Trash2,
  ShieldCheck,
  Truck,
  Headphones,
  CheckCircle,
  ChevronLeft,
  Monitor,
  BarChart3,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useStore } from "./store";
import { statuses } from "./data";
import {
  money,
  total,
  filterProducts,
  changeCart,
  placeOrder,
  metrics,
  validateCheckout,
} from "./logic";
import "./style.css";
const categories = [
  "All",
  "Laptops",
  "Phones",
  "Audio",
  "Wearables",
  "Accessories",
];
function Button({
  children,
  onClick,
  secondary = false,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={secondary ? "btn secondary" : "btn"}
    >
      {children}
    </button>
  );
}
function Empty({ children }) {
  return (
    <div className="empty">
      <Package size={35} />
      <p>{children}</p>
    </div>
  );
}
function ProductCard({ p, open, add }) {
  return (
    <article className="product">
      <button
        className="image-button"
        onClick={() => open(p.id)}
        aria-label={"View " + p.name}
      >
        <img src={p.image} alt={p.name + " illustrative image"} />
      </button>
      <div className="product-body">
        <small>{p.category}</small>
        <button className="product-name" onClick={() => open(p.id)}>
          {p.name}
        </button>
        <p>{p.description}</p>
        <div className="flex justify-between items-center gap-2">
          <strong>{money(p.price)}</strong>
          <button
            className="icon-add"
            onClick={() => add(p)}
            aria-label={"Add " + p.name + " to cart"}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </article>
  );
}
function Fields({ values, set, fields }) {
  return fields.map(([key, label, type]) => (
    <label key={key}>
      {label}
      {type === "textarea" ? (
        <textarea
          required
          value={values[key] || ""}
          onChange={(e) => set({ ...values, [key]: e.target.value })}
        />
      ) : (
        <input
          required
          type={type || "text"}
          value={values[key] || ""}
          onChange={(e) => set({ ...values, [key]: e.target.value })}
        />
      )}
    </label>
  ));
}
function App() {
  const [state, update, warning] = useStore();
  const [page, setPage] = useState("home"),
    [query, setQuery] = useState(""),
    [category, setCategory] = useState("All"),
    [sort, setSort] = useState("default"),
    [selected, setSelected] = useState(null),
    [toast, setToast] = useState(""),
    [menu, setMenu] = useState(false),
    [form, setForm] = useState({}),
    [error, setError] = useState(""),
    [tab, setTab] = useState("Overview");
  function go(p) {
    setPage(p);
    setMenu(false);
    setForm({});
    setError("");
    setToast("");
    window.scrollTo(0, 0);
  }
  function browse(c = "All") {
    setCategory(c);
    setQuery("");
    go("shop");
  }
  function open(id) {
    setSelected(id);
    go("detail");
  }
  function add(p) {
    update((s) => ({ ...s, cart: changeCart(s.cart, p, 1) }));
    setToast(p.name + " added to cart.");
  }
  function qty(p, d) {
    update((s) => ({ ...s, cart: changeCart(s.cart, p, d) }));
  }
  function checkout(e) {
    e.preventDefault();
    if (!validateCheckout(form) || !state.cart.length) {
      setError("Please enter a valid name, email, phone and delivery address.");
      return;
    }
    update((s) => placeOrder(s, form));
    setForm({});
    go("success");
  }
  const count = state.cart.reduce((s, p) => s + p.qty, 0),
    filtered = filterProducts(state.products, query, category, sort),
    p = state.products.find((x) => x.id === selected);
  const nav = [
    ["Home", "home"],
    ["Shop", "shop"],
    ["Contact", "contact"],
    ["Admin", "admin"],
  ];
  return (
    <>
      <header>
        <div className="header-inner">
          <button className="brand" onClick={() => go("home")}>
            <span className="brand-icon">
              <Monitor size={22} />
            </span>
            NEXUS<span className="brand-accent">.</span>
          </button>
          <nav className={menu ? "nav open" : "nav"}>
            {nav.map(([label, value]) => (
              <button
                key={value}
                className={page === value ? "active" : ""}
                onClick={() => (value === "shop" ? browse() : go(value))}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              className="header-cart"
              onClick={() => go("cart")}
              aria-label={`Cart ${count} items`}
            >
              <ShoppingBag size={20} />
              <span>{count}</span>
            </button>
            <button
              className="mobile-menu"
              onClick={() => setMenu(!menu)}
              aria-label="Toggle navigation"
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      {warning && (
        <div role="alert" className="warning">
          {warning}
        </div>
      )}
      {toast && (
        <div className="toast" role="status">
          <CheckCircle size={20} />
          {toast}
          <button
            onClick={() => setToast("")}
            aria-label="Dismiss notification"
          >
            <X size={18} />
          </button>
        </div>
      )}
      <main className="wrap">
        {page === "home" && (
          <>
            <section className="hero">
              <div>
                <span className="eyebrow">THE FUTURE IS IN YOUR HANDS</span>
                <h1>
                  Upgrade your
                  <br />
                  everyday<span>.</span>
                </h1>
                <p>
                  Discover exceptional technology, curated for the way you work,
                  play and connect.
                </p>
                <Button onClick={() => browse()}>
                  Explore collection <ArrowRight size={18} />
                </Button>
              </div>
              <div className="hero-art">
                <img
                  src="/images/1.png"
                  alt="AI-generated laptop product image"
                />
                <img
                  src="/images/9.png"
                  alt="AI-generated headphones product image"
                />
              </div>
            </section>
            <div className="benefits">
              {[
                [Truck, "Fast delivery", "Simulated shipping"],
                [ShieldCheck, "Shop confidently", "Demo secure checkout"],
                [Headphones, "Here to help", "Contact our team"],
              ].map(([Icon, title, sub]) => (
                <div key={title}>
                  <Icon size={24} />
                  <span>
                    <b>{title}</b>
                    <small>{sub}</small>
                  </span>
                </div>
              ))}
            </div>
            <section className="section">
              <div className="section-head">
                <div>
                  <span className="eyebrow">DISCOVER YOUR NEXT UPGRADE</span>
                  <h2>Shop by category</h2>
                </div>
              </div>
              <div className="categories">
                {categories.slice(1).map((c, i) => (
                  <button key={c} onClick={() => browse(c)}>
                    <img
                      src={state.products.find((p) => p.category === c).image}
                      alt=""
                    />
                    <b>{c}</b>
                    <ArrowRight size={16} />
                  </button>
                ))}
              </div>
            </section>
            <section className="section">
              <div className="section-head">
                <div>
                  <span className="eyebrow">CURATED FOR YOU</span>
                  <h2>Featured technology</h2>
                </div>
                <Button secondary onClick={() => browse()}>
                  View all <ArrowRight size={16} />
                </Button>
              </div>
              <div className="products">
                {[1, 5, 9, 13].map((id) => (
                  <ProductCard
                    key={id}
                    p={state.products.find((p) => p.id === id)}
                    open={open}
                    add={add}
                  />
                ))}
              </div>
            </section>
          </>
        )}
        {page === "shop" && (
          <section className="section">
            <span className="eyebrow">THE COLLECTION</span>
            <h1 className="page-title">Explore technology</h1>
            <p className="muted">Find your next favourite device.</p>
            <div className="filters">
              <div className="search">
                <Search size={19} />
                <input
                  aria-label="Search products"
                  placeholder="Search products…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <select
                aria-label="Sort products"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="default">Recommended</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
            </div>
            <div className="chips">
              {categories.map((c) => (
                <button
                  key={c}
                  className={category === c ? "chosen" : ""}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <p className="muted mb-4">{filtered.length} products</p>
            {filtered.length ? (
              <div className="products">
                {filtered.map((p) => (
                  <ProductCard key={p.id} p={p} open={open} add={add} />
                ))}
              </div>
            ) : (
              <Empty>
                No products match your search.{" "}
                <button
                  className="link"
                  onClick={() => {
                    setQuery("");
                    setCategory("All");
                  }}
                >
                  Clear filters
                </button>
              </Empty>
            )}
          </section>
        )}
        {page === "detail" && p && (
          <section className="section">
            <button className="link mb-5" onClick={() => go("shop")}>
              <ChevronLeft size={18} /> Back to collection
            </button>
            <div className="detail">
              <img src={p.image} alt={p.name + " illustration"} />
              <div>
                <span className="eyebrow">{p.category}</span>
                <h1 className="page-title">{p.name}</h1>
                <p className="muted">{p.description}</p>
                <h2 className="my-6">{money(p.price)}</h2>
                <p className="mb-5 text-emerald-700">In stock · Demo product</p>
                <Button onClick={() => add(p)}>
                  <ShoppingBag size={18} /> Add to cart
                </Button>{" "}
                <Button secondary onClick={() => go("cart")}>
                  View cart
                </Button>
              </div>
            </div>
          </section>
        )}
        {page === "cart" && (
          <section className="section">
            <h1 className="page-title">Your shopping bag</h1>
            {!count ? (
              <Empty>
                Your bag is empty.{" "}
                <button className="link" onClick={() => browse()}>
                  Explore products
                </button>
              </Empty>
            ) : (
              <div className="split">
                <div className="panel">
                  {state.cart.map((p) => (
                    <div className="cart-row" key={p.id}>
                      <img src={p.image} alt="" />
                      <div className="grow">
                        <b>{p.name}</b>
                        <p className="muted">{money(p.price)}</p>
                        <div className="quantity">
                          <button
                            aria-label={"Decrease " + p.name}
                            onClick={() => qty(p, -1)}
                          >
                            <Minus size={15} />
                          </button>
                          {p.qty}
                          <button
                            aria-label={"Increase " + p.name}
                            onClick={() => qty(p, 1)}
                          >
                            <Plus size={15} />
                          </button>
                        </div>
                      </div>
                      <strong>{money(p.price * p.qty)}</strong>
                      <button
                        aria-label={"Remove " + p.name}
                        onClick={() => qty(p, -p.qty)}
                      >
                        <Trash2 size={19} />
                      </button>
                    </div>
                  ))}
                </div>
                <Summary state={state}>
                  <Button
                    onClick={() => {
                      setForm({});
                      go("checkout");
                    }}
                  >
                    Proceed to checkout <ArrowRight size={18} />
                  </Button>
                </Summary>
              </div>
            )}
          </section>
        )}
        {page === "checkout" && (
          <section className="section">
            <h1 className="page-title">Checkout</h1>
            {!count ? (
              <Empty>
                Your bag is empty.{" "}
                <button className="link" onClick={() => browse()}>
                  Shop now
                </button>
              </Empty>
            ) : (
              <div className="split">
                <form className="panel form" onSubmit={checkout}>
                  <h2>Delivery information</h2>
                  <Fields
                    values={form}
                    set={setForm}
                    fields={[
                      ["name", "Full name"],
                      ["email", "Email address", "email"],
                      ["phone", "Phone number", "tel"],
                      ["address", "Delivery address", "textarea"],
                    ]}
                  />
                  <p className="muted">
                    Payment is simulated. No card or real payment required.
                  </p>
                  {error && (
                    <p role="alert" className="error">
                      {error}
                    </p>
                  )}
                  <Button type="submit">
                    Place demo order <ArrowRight size={18} />
                  </Button>
                </form>
                <Summary state={state} />
              </div>
            )}
          </section>
        )}
        {page === "success" && (
          <section className="section">
            <div className="success panel">
              <CheckCircle size={60} />
              <h1 className="page-title">Order confirmed!</h1>
              <p>
                Thank you, {state.lastOrder?.name}. Your simulated order has
                been placed.
              </p>
              <b>
                {state.lastOrder?.id} · {money(state.lastOrder?.total || 0)}
              </b>
              <p className="muted">
                Your order is now visible in the admin dashboard.
              </p>
              <Button onClick={() => browse()}>Continue shopping</Button>
              <Button
                secondary
                onClick={() => {
                  setTab("Orders");
                  go("admin");
                }}
              >
                View in admin
              </Button>
            </div>
          </section>
        )}
        {page === "contact" && (
          <section className="section">
            <h1 className="page-title">Get in touch</h1>
            <form
              className="panel form contact"
              onSubmit={(e) => {
                e.preventDefault();
                if (!form.name.trim() || !form.message.trim()) return;
                update((s) => ({
                  ...s,
                  inquiries: [
                    {
                      id: crypto.randomUUID(),
                      name: form.name,
                      email: form.email,
                      message: form.message,
                      status: "Open",
                      notes: "",
                    },
                    ...s.inquiries,
                  ],
                }));
                setForm({});
                setToast("Inquiry submitted successfully.");
              }}
            >
              <h2>How can we help?</h2>
              <Fields
                values={form}
                set={setForm}
                fields={[
                  ["name", "Your name"],
                  ["email", "Email", "email"],
                  ["message", "Message", "textarea"],
                ]}
              />
              <Button type="submit">Send inquiry</Button>
            </form>
          </section>
        )}
        {page === "admin" && (
          <Admin state={state} update={update} tab={tab} setTab={setTab} />
        )}
      </main>
      <footer>
        <div className="wrap footer-inner">
          <div>
            <b>NEXUS.</b>
            <p>Premium technology. Better everyday.</p>
          </div>
          <span></span>
          <button onClick={() => go("contact")}>Contact support</button>
        </div>
      </footer>
    </>
  );
}
function Summary({ state, children }) {
  return (
    <aside className="panel summary">
      <h2>Order summary</h2>
      <div>
        <span>Subtotal</span>
        <b>{money(total(state.cart))}</b>
      </div>
      <div>
        <span>Shipping (demo)</span>
        <b>Free</b>
      </div>
      <div className="sum-total">
        <b>Total</b>
        <b>{money(total(state.cart))}</b>
      </div>
      {children}
    </aside>
  );
}
function Admin({ state, update, tab, setTab }) {
  const m = metrics(state);
  const [search, setSearch] = useState(""),
    [expanded, setExpanded] = useState(null);
  const nav = [
    ["Overview", LayoutDashboard],
    ["Orders", Package],
    ["Customers", Users],
    ["Inquiries", MessageSquare],
  ];
  const matches = (...v) =>
    v.join(" ").toLowerCase().includes(search.toLowerCase());
  const days = [...new Set(state.orders.map((o) => o.date))]
    .sort()
    .map((date) => ({
      date,
      Sales: state.orders
        .filter((o) => o.date === date && o.status === "Delivered")
        .reduce((s, o) => s + o.total, 0),
      Orders: state.orders.filter((o) => o.date === date).length,
    }));
  const patch = (key, id, fields) =>
    update((s) => ({
      ...s,
      [key]: s[key].map((x) => (x.id === id ? { ...x, ...fields } : x)),
    }));
  return (
    <section className="section">
      <span className="eyebrow">NEXUS / MANAGEMENT</span>
      <h1 className="page-title">Admin workspace</h1>
      <p className="muted">
        Local demo · No authentication · Use fictional customer information.
      </p>
      <div className="admin-layout">
        <aside className="admin-nav">
          {nav.map(([n, Icon]) => (
            <button
              key={n}
              className={tab === n ? "selected" : ""}
              onClick={() => {
                setTab(n);
                setSearch("");
                setExpanded(null);
              }}
            >
              <Icon size={19} />
              {n}
            </button>
          ))}
        </aside>
        <div className="admin-content">
          <h2 className="mb-5">{tab}</h2>
          {tab === "Overview" ? (
            <>
              <div className="metrics">
                {[
                  ["Delivered revenue", money(m.revenue), BarChart3],
                  ["Total orders", m.orders, Package],
                  ["Customers", m.customers, Users],
                  ["Pending orders", m.pending, ShoppingBag],
                ].map(([name, value, Icon]) => (
                  <div className="panel metric" key={name}>
                    <Icon size={21} />
                    <small>{name}</small>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
              <div className="panel mt-5">
                <h3>Delivered sales by date</h3>
                <div style={{ height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={days}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" fontSize={11} />
                      <YAxis fontSize={11} />
                      <Tooltip formatter={(v) => money(v)} />
                      <Bar
                        dataKey="Sales"
                        fill="#3979ff"
                        radius={[5, 5, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="panel mt-5">
                <h3>Order volume by date</h3>
                <div style={{ height: 220 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={days}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" fontSize={11} />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar
                        dataKey="Orders"
                        fill="#142c58"
                        radius={[5, 5, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="search mb-4">
                <Search size={18} />
                <input
                  aria-label={"Search " + tab}
                  placeholder={"Search " + tab.toLowerCase()}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              {tab === "Orders" && (
                <div className="panel table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.orders
                        .filter((o) => matches(o.id, o.name, o.status))
                        .map((o) => (
                          <React.Fragment key={o.id}>
                            <tr>
                              <td>
                                <button
                                  className="link"
                                  onClick={() =>
                                    setExpanded(expanded === o.id ? null : o.id)
                                  }
                                >
                                  {o.id}
                                </button>
                              </td>
                              <td>{o.name}</td>
                              <td>{o.date}</td>
                              <td>{money(o.total)}</td>
                              <td>
                                <select
                                  aria-label={"Status " + o.id}
                                  value={o.status}
                                  onChange={(e) =>
                                    patch("orders", o.id, {
                                      status: e.target.value,
                                    })
                                  }
                                >
                                  {statuses.map((s) => (
                                    <option key={s}>{s}</option>
                                  ))}
                                </select>
                              </td>
                            </tr>
                            {expanded === o.id && (
                              <tr>
                                <td colSpan="5">
                                  {o.items.map((i) => (
                                    <p key={i.id}>
                                      {i.qty} × {i.name} —{" "}
                                      {money(i.qty * i.price)}
                                    </p>
                                  ))}
                                  {o.address && <p>Delivery: {o.address}</p>}
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                    </tbody>
                  </table>
                  {!state.orders.some((o) =>
                    matches(o.id, o.name, o.status),
                  ) && <Empty>No matching orders.</Empty>}
                </div>
              )}
              {tab === "Customers" && (
                <div className="panel table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Orders</th>
                        <th>CRM notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.customers
                        .filter((c) => matches(c.name, c.email, c.phone))
                        .map((c) => (
                          <tr key={c.id}>
                            <td>{c.name}</td>
                            <td>{c.email}</td>
                            <td>{c.phone}</td>
                            <td>
                              {
                                state.orders.filter(
                                  (o) => o.customerId === c.id,
                                ).length
                              }
                            </td>
                            <td>
                              <input
                                aria-label={"Notes for " + c.name}
                                value={c.notes}
                                onChange={(e) =>
                                  patch("customers", c.id, {
                                    notes: e.target.value,
                                  })
                                }
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {!state.customers.some((c) =>
                    matches(c.name, c.email, c.phone),
                  ) && <Empty>No matching customers.</Empty>}
                </div>
              )}
              {tab === "Inquiries" && (
                <div className="inquiries">
                  {state.inquiries
                    .filter((i) =>
                      matches(i.name, i.email, i.message, i.status),
                    )
                    .map((i) => (
                      <article key={i.id} className="panel form">
                        <div className="flex justify-between gap-3">
                          <div>
                            <b>{i.name}</b>
                            <p className="muted">{i.email}</p>
                          </div>
                          <select
                            aria-label={"Inquiry status " + i.id}
                            value={i.status}
                            onChange={(e) =>
                              patch("inquiries", i.id, {
                                status: e.target.value,
                              })
                            }
                          >
                            {["Open", "In progress", "Resolved"].map((s) => (
                              <option key={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                        <p>{i.message}</p>
                        <label>
                          Internal notes
                          <textarea
                            value={i.notes}
                            onChange={(e) =>
                              patch("inquiries", i.id, {
                                notes: e.target.value,
                              })
                            }
                          />
                        </label>
                      </article>
                    ))}
                  {!state.inquiries.some((i) =>
                    matches(i.name, i.email, i.message, i.status),
                  ) && <Empty>No matching inquiries.</Empty>}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
createRoot(document.getElementById("root")).render(<App />);
