import { type User, type InsertUser, type Product, type InsertProduct } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProducts(options?: {
    category?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ products: Product[]; total: number }>;
  getProductById(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<number, Product>;
  private nextProductId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.nextProductId = 1;
    
    this.seedProducts();
  }

  private seedProducts() {
    const sampleProducts: Omit<Product, 'id'>[] = [
      {
        name: "Wireless Bluetooth Speaker",
        price: 79.99,
        category: "Electronics",
        stock_status: "In Stock",
        created_at: new Date(),
      },
      {
        name: "Premium Leather Laptop Bag",
        price: 129.99,
        category: "Accessories",
        stock_status: "In Stock",
        created_at: new Date(),
      },
      {
        name: "Insulated Water Bottle",
        price: 24.99,
        category: "Home & Living",
        stock_status: "Low Stock",
        created_at: new Date(),
      },
      {
        name: "Wireless Ergonomic Mouse",
        price: 49.99,
        category: "Electronics",
        stock_status: "In Stock",
        created_at: new Date(),
      },
      {
        name: "Modern Desk Lamp",
        price: 89.99,
        category: "Home & Living",
        stock_status: "In Stock",
        created_at: new Date(),
      },
      {
        name: "Smart Fitness Tracker",
        price: 149.99,
        category: "Sports & Fitness",
        stock_status: "Out of Stock",
        created_at: new Date(),
      },
      {
        name: "Noise Cancelling Headphones",
        price: 199.99,
        category: "Electronics",
        stock_status: "In Stock",
        created_at: new Date(),
      },
      {
        name: "Portable Phone Charger",
        price: 39.99,
        category: "Electronics",
        stock_status: "Low Stock",
        created_at: new Date(),
      },
      {
        name: "Yoga Mat Pro",
        price: 59.99,
        category: "Sports & Fitness",
        stock_status: "In Stock",
        created_at: new Date(),
      },
      {
        name: "Stainless Steel Coffee Mug",
        price: 19.99,
        category: "Home & Living",
        stock_status: "In Stock",
        created_at: new Date(),
      },
      {
        name: "Wireless Keyboard",
        price: 69.99,
        category: "Electronics",
        stock_status: "In Stock",
        created_at: new Date(),
      },
      {
        name: "Running Shoes",
        price: 119.99,
        category: "Sports & Fitness",
        stock_status: "Low Stock",
        created_at: new Date(),
      },
    ];

    sampleProducts.forEach(product => {
      const id = this.nextProductId++;
      this.products.set(id, { ...product, id });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProducts(options?: {
    category?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ products: Product[]; total: number }> {
    let allProducts = Array.from(this.products.values());

    // Filter by category only if a specific category is provided (not "all" or empty)
    if (options?.category && options.category !== "all" && options.category.trim() !== "") {
      allProducts = allProducts.filter(p => p.category === options.category);
    }

    // Filter by search query
    if (options?.search && options.search.trim() !== "") {
      const searchLower = options.search.toLowerCase();
      allProducts = allProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) || 
        p.category.toLowerCase().includes(searchLower)
      );
    }

    // Sort by newest first
    allProducts.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());

    const total = allProducts.length;
    const limit = options?.limit ?? total;
    const offset = options?.offset ?? 0;
    const products = allProducts.slice(offset, offset + limit);

    return { products, total };
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.nextProductId++;
    const product: Product = {
      ...insertProduct,
      id,
      created_at: new Date(),
    };
    this.products.set(id, product);
    return product;
  }
}

export const storage = new MemStorage();
