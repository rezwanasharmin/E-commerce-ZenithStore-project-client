import { api } from './api';
import { defaultProducts } from '../data/defaultProducts';
import type { Product } from '../components/ProductCard';

export const productService = {
  /**
   * Fetch all products from custom localStorage, Backend API, and Default Catalog.
   * Seamlessly falls back and eliminates CORS issues.
   */
  async getAllProducts(): Promise<Product[]> {
    const combinedProducts: Product[] = [];
    const seenIds = new Set<string | number>();

    // 1. Load custom user-created products from localStorage
    try {
      const customRaw = localStorage.getItem('custom_products');
      if (customRaw) {
        const parsed: Product[] = JSON.parse(customRaw);
        if (Array.isArray(parsed)) {
          parsed.forEach((p) => {
            if (p && p.id && !seenIds.has(p.id)) {
              seenIds.add(p.id);
              combinedProducts.push(p);
            }
          });
        }
      }
    } catch (e) {
      console.warn('Error parsing local custom products:', e);
    }

    // 2. Try fetching products from backend MongoDB API
    try {
      const response = await api.get('/products');
      if (Array.isArray(response.data)) {
        response.data.forEach((item: any) => {
          const mappedProduct: Product = {
            id: item._id || item.id,
            title: item.title,
            price: typeof item.price === 'number' ? item.price : parseFloat(item.price || '0'),
            description: item.description || item.shortDescription || '',
            category: item.category || 'electronics',
            image: item.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
            rating: item.rating || { rate: 4.8, count: 12 },
            sku: item.sku || `ZEN-${item.id || '001'}`
          };

          if (!seenIds.has(mappedProduct.id)) {
            seenIds.add(mappedProduct.id);
            combinedProducts.push(mappedProduct);
          }
        });
      }
    } catch (err) {
      console.info('Backend API unavailable, serving client catalog dataset.');
    }

    // 3. Merge with default catalog products (guarantees a rich catalog always displays)
    defaultProducts.forEach((defaultProd) => {
      if (!seenIds.has(defaultProd.id)) {
        seenIds.add(defaultProd.id);
        combinedProducts.push(defaultProd);
      }
    });

    // 4. Filter out any items the user previously deleted
    try {
      const deletedRaw = localStorage.getItem('deleted_product_ids');
      if (deletedRaw) {
        const deletedIds: (string | number)[] = JSON.parse(deletedRaw);
        return combinedProducts.filter((p) => !deletedIds.includes(p.id));
      }
    } catch (e) {
      console.warn('Error reading deleted products list:', e);
    }

    return combinedProducts;
  },

  /**
   * Get single product details by ID.
   */
  async getProductById(id: string | number): Promise<Product> {
    const idStr = String(id);

    // 1. Check custom localStorage
    try {
      const customRaw = localStorage.getItem('custom_products');
      if (customRaw) {
        const parsed: Product[] = JSON.parse(customRaw);
        const match = parsed.find((p) => String(p.id) === idStr);
        if (match) return match;
      }
    } catch (e) {
      console.warn('Error reading custom products for ID:', id);
    }

    // 2. Check default products catalog
    const defaultMatch = defaultProducts.find((p) => String(p.id) === idStr);
    if (defaultMatch) {
      return defaultMatch;
    }

    // 3. Try backend API
    try {
      const response = await api.get(`/products/${id}`);
      if (response.data) {
        const item = response.data;
        return {
          id: item._id || item.id,
          title: item.title,
          price: typeof item.price === 'number' ? item.price : parseFloat(item.price || '0'),
          description: item.description || item.shortDescription || '',
          category: item.category || 'electronics',
          image: item.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
          rating: item.rating || { rate: 4.8, count: 12 },
          sku: item.sku || `ZEN-${item.id || '001'}`
        };
      }
    } catch (e) {
      console.warn('Product not found in backend API for id:', id);
    }

    throw new Error(`Product with ID ${id} was not found.`);
  },

  /**
   * Save a newly created product
   */
  async createProduct(newProduct: any): Promise<void> {
    // 1. Try sending to backend API
    try {
      await api.post('/products', newProduct);
    } catch (err) {
      console.warn('Backend server offline, saved locally to localStorage.', err);
    }

    // 2. Save locally
    try {
      const existingRaw = localStorage.getItem('custom_products');
      const existing: Product[] = existingRaw ? JSON.parse(existingRaw) : [];
      localStorage.setItem('custom_products', JSON.stringify([newProduct, ...existing]));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  },

  /**
   * Delete product
   */
  async deleteProduct(id: string | number): Promise<void> {
    // 1. Try backend delete
    try {
      await api.delete(`/products/${id}`);
    } catch (err) {
      console.info('Backend delete skipped or offline.');
    }

    // 2. Remove from custom_products localStorage
    try {
      const customRaw = localStorage.getItem('custom_products');
      if (customRaw) {
        const parsed: Product[] = JSON.parse(customRaw);
        const updated = parsed.filter((p) => String(p.id) !== String(id));
        localStorage.setItem('custom_products', JSON.stringify(updated));
      }
    } catch (e) {
      console.error('Failed to remove from custom_products:', e);
    }

    // 3. Mark in deleted_product_ids
    try {
      const deletedRaw = localStorage.getItem('deleted_product_ids');
      const deletedIds: (string | number)[] = deletedRaw ? JSON.parse(deletedRaw) : [];
      if (!deletedIds.includes(id)) {
        localStorage.setItem('deleted_product_ids', JSON.stringify([...deletedIds, id]));
      }
    } catch (e) {
      console.error('Failed storing deleted_product_ids:', e);
    }
  }
};
