import { NextResponse } from "next/server";

import { categories, initialProducts } from "@/lib/products-data";

// Helper to attach category objects to product
function buildProduct(p) {
  const cat = categories.find((c) => c.slug === p.categorySlug || c.id === p.categoryId) || categories[0];
  return {
    ...p,
    categoryId: cat.id,
    category: cat,
    slug: p.slug || p.id,
    images: p.images || (p.image ? [{ id: `img-${p.id}`, url: p.image }] : []),
    reviews: p.reviews || []
  };
}

// In-memory state
let products = initialProducts.map(buildProduct);

let users = [
  { id: "usr-admin", name: "Mete Admin", email: "admin@mete.com", role: "ADMIN" },
  { id: "usr-ahmet", name: "Ahmet Yılmaz", email: "ahmet@mete.com", role: "CUSTOMER" }
];

let currentUser = users[0];

let orders = [
  {
    id: "ORD-9482",
    userId: "usr-ahmet",
    user: users[1],
    totalPrice: 15900.0,
    status: "PAID",
    paymentStatus: "SUCCESS",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    items: [
      {
        id: "item-1",
        quantity: 2,
        price: 7950.0,
        product: products[20]
      }
    ]
  },
  {
    id: "ORD-9483",
    userId: "usr-ahmet",
    user: users[1],
    totalPrice: 4850.0,
    status: "PREPARING",
    paymentStatus: "SUCCESS",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    items: [
      {
        id: "item-2",
        quantity: 1,
        price: 4850.0,
        product: products[10]
      }
    ]
  }
];

let favorites = [products[0].id, products[20].id];

let stockLogs = [
  {
    id: "log-1",
    productId: products[0].id,
    product: { title: products[0].title },
    oldStock: 150,
    newStock: 180,
    reason: "Depo Girişi (Yeni Sevkiyat)",
    changedBy: "Mete Admin",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  }
];

// Router dispatcher
export async function GET(req, { params }) {
  const { slug } = await params;
  const url = new URL(req.url);
  const path = slug.join("/");

  // 1. Health check
  if (path === "health") {
    return NextResponse.json({ status: "OK", timestamp: new Date() });
  }

  // 2. Categories list
  if (path === "products/categories/list" || path === "categories") {
    return NextResponse.json(categories);
  }

  // 3. Products list or detail
  if (slug[0] === "products") {
    if (slug.length === 1) {
      // List
      const limit = parseInt(url.searchParams.get("limit") || "60", 10);
      const page = parseInt(url.searchParams.get("page") || "1", 10);
      const category = url.searchParams.get("category");
      const search = url.searchParams.get("search")?.toLowerCase();
      const color = url.searchParams.get("color");

      let filtered = [...products];

      if (category && category !== "all") {
        filtered = filtered.filter((p) => p.category?.slug === category || p.categoryId === category);
      }

      if (search) {
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(search) ||
            p.description?.toLowerCase().includes(search)
        );
      }

      if (color === "lacivert") {
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes("lacivert") ||
            p.title.toLowerCase().includes("mavi") ||
            p.description?.toLowerCase().includes("lacivert")
        );
      }

      const total = filtered.length;
      const skip = (page - 1) * limit;
      const paginated = filtered.slice(skip, skip + limit);

      return NextResponse.json({
        products: paginated,
        total,
        page,
        totalPages: Math.ceil(total / limit)
      });
    }

    if (slug.length === 2) {
      // Product detail by ID or Slug
      const prodId = slug[1];
      const found = products.find((p) => p.id === prodId || p.slug === prodId);
      if (!found) {
        return NextResponse.json({ message: "Ürün bulunamadı" }, { status: 404 });
      }
      return NextResponse.json(found);
    }
  }

  // 4. Me
  if (path === "me") {
    return NextResponse.json({ user: currentUser });
  }

  // 5. Orders
  if (path === "orders") {
    return NextResponse.json(orders);
  }

  // 6. Favorites
  if (path === "favorites") {
    const list = favorites
      .map((favId) => {
        const prod = products.find((p) => p.id === favId);
        return prod ? { id: `fav-${favId}`, productId: favId, product: prod } : null;
      })
      .filter(Boolean);
    return NextResponse.json(list);
  }

  // 7. Users
  if (path === "users") {
    return NextResponse.json(users);
  }

  // 8. Dashboard stats
  if (path === "dashboard/stats" || path === "admin/stats") {
    const totalRevenue = orders.reduce((acc, o) => acc + Number(o.totalPrice), 0);
    return NextResponse.json({
      totalProducts: products.length,
      totalOrders: orders.length,
      totalUsers: users.length,
      totalRevenue
    });
  }

  // 9. Stock logs
  if (path === "stock/logs/history") {
    return NextResponse.json(stockLogs);
  }

  return NextResponse.json({ message: "Route not found" }, { status: 404 });
}

export async function POST(req, { params }) {
  const { slug } = await params;
  const path = slug.join("/");
  let body = {};
  try {
    body = await req.json();
  } catch {}

  // 1. Login
  if (path === "login" || path === "auth/login") {
    const { email, password } = body;
    const existing = users.find((u) => u.email === email) || {
      id: `usr-${Date.now()}`,
      name: email.split("@")[0],
      email,
      role: email.includes("admin") ? "ADMIN" : "CUSTOMER"
    };
    currentUser = existing;
    return NextResponse.json({
      user: existing,
      token: "demo-jwt-token-" + Date.now()
    });
  }

  // 2. Register
  if (path === "register" || path === "auth/register") {
    const { name, email, password } = body;
    const newUser = {
      id: `usr-${Date.now()}`,
      name: name || "Yeni Kullanıcı",
      email: email || "user@mete.com",
      role: "CUSTOMER"
    };
    users.push(newUser);
    currentUser = newUser;
    return NextResponse.json({
      user: newUser,
      token: "demo-jwt-token-" + Date.now()
    });
  }

  // 3. Create Product
  if (path === "products") {
    const newProd = buildProduct({
      id: `prod-${Date.now()}`,
      title: body.title || "Yeni Ürün",
      price: Number(body.price) || 0,
      stock: Number(body.stock) || 0,
      categoryId: body.categoryId || categories[0].id,
      categorySlug: categories.find((c) => c.id === body.categoryId)?.slug || "kalebodur",
      description: body.description || "",
      image: body.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
    });
    products.unshift(newProd);
    return NextResponse.json(newProd, { status: 201 });
  }

  // 4. Create Order
  if (path === "orders") {
    const items = (body.items || []).map((i, idx) => {
      const prod = products.find((p) => p.id === i.productId) || products[0];
      return {
        id: `item-${Date.now()}-${idx}`,
        quantity: i.quantity || 1,
        price: prod.price,
        product: prod
      };
    });
    const calculatedTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalPrice = body.totalPrice !== undefined ? Number(body.totalPrice) : calculatedTotal;
    const isPaid = body.paymentMethod === "CREDIT_CARD_3D_SECURE";
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser.id,
      user: {
        ...currentUser,
        name: body.customerInfo?.name || currentUser.name,
        email: body.customerInfo?.email || currentUser.email
      },
      customerInfo: body.customerInfo || null,
      paymentMethod: body.paymentMethod || "CREDIT_CARD",
      installment: body.installment || 1,
      totalPrice,
      status: isPaid ? "PAID" : "PENDING",
      paymentStatus: isPaid ? "SUCCESS" : "PENDING",
      createdAt: new Date().toISOString(),
      items
    };
    orders.unshift(newOrder);
    return NextResponse.json(newOrder, { status: 201 });
  }

  // 5. Toggle Favorite
  if (path === "favorites") {
    const { productId } = body;
    let favorited = false;
    if (favorites.includes(productId)) {
      favorites = favorites.filter((id) => id !== productId);
      favorited = false;
    } else {
      favorites.push(productId);
      favorited = true;
    }
    return NextResponse.json({ favorited });
  }

  return NextResponse.json({ message: "Action not supported" }, { status: 404 });
}

export async function PATCH(req, { params }) {
  const { slug } = await params;
  let body = {};
  try {
    body = await req.json();
  } catch {}

  // 1. Update Order Status: orders/:id
  if (slug[0] === "orders" && slug.length === 2) {
    const orderId = slug[1];
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      if (body.status) order.status = body.status;
      return NextResponse.json(order);
    }
    return NextResponse.json({ message: "Sipariş bulunamadı" }, { status: 404 });
  }

  // 2. Update Stock: stock/:id
  if (slug[0] === "stock" && slug.length === 2) {
    const prodId = slug[1];
    const prod = products.find((p) => p.id === prodId);
    if (prod) {
      const oldStock = prod.stock;
      prod.stock = Number(body.stock);
      stockLogs.unshift({
        id: `log-${Date.now()}`,
        productId: prod.id,
        product: { title: prod.title },
        oldStock,
        newStock: prod.stock,
        reason: "Admin Manuel Güncelleme",
        changedBy: currentUser.name || "Mete Admin",
        createdAt: new Date().toISOString()
      });
      return NextResponse.json(prod);
    }
    return NextResponse.json({ message: "Ürün bulunamadı" }, { status: 404 });
  }

  // 3. Update User Role: users/:id/role
  if (slug[0] === "users" && slug.length === 3 && slug[2] === "role") {
    const userId = slug[1];
    const user = users.find((u) => u.id === userId);
    if (user) {
      if (body.role) user.role = body.role;
      return NextResponse.json(user);
    }
    return NextResponse.json({ message: "Kullanıcı bulunamadı" }, { status: 404 });
  }

  return NextResponse.json({ message: "Action not supported" }, { status: 404 });
}

export async function DELETE(req, { params }) {
  const { slug } = await params;

  // Delete product: products/:id
  if (slug[0] === "products" && slug.length === 2) {
    const prodId = slug[1];
    products = products.filter((p) => p.id !== prodId && p.slug !== prodId);
    return NextResponse.json({ success: true, message: "Ürün silindi" });
  }

  return NextResponse.json({ message: "Action not supported" }, { status: 404 });
}
