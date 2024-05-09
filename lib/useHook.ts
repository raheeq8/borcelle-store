import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";

interface CartItem {
  item: ProductType;
  quantity: number;
  color?: string;
  size?: string;
}

export interface CartStore {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (_id: string) => void;
  increaseQuantity: (_id: string) => void;
  decreaseQuantity: (_id: string) => void;
  clearCart: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      addItem: (data: CartItem) => {
        const { item, quantity, color, size } = data;
        const currentItems = get().cartItems;
        const existingItems = currentItems.find(
          (cartItem) => cartItem.item._id === item._id
        );
        if (existingItems) {
          return toast("Item already in cart", { icon: "🙄" });
        }
        set({ cartItems: [...currentItems, { item, quantity, size, color }] });
        toast.success("Item added to cart");
      },
      removeItem: (_id: String) => {
        const newCartItems = get().cartItems.filter(
          (cartItem) => cartItem.item._id !== _id
        );
        set({ cartItems: newCartItems });
        toast.success("Item delete from cart");
      },
      increaseQuantity: (_id: String) => {
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === _id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        toast.success("Quantity increase")
        set({ cartItems: newCartItems })
      },
      decreaseQuantity: (_id: String) => {
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === _id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
        set({ cartItems: newCartItems })
        toast.success("Quantity decrease")
      },
      clearCart: () => set({ cartItems: [] })
    }),
    {
      name: "Cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useCart