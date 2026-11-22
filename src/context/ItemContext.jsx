import { createContext, useContext, useState } from "react";
import initialItems from "../data/items.json";

const ItemContext = createContext();

const ItemsContext = ({ children }) => {
  const [items] = useState(initialItems);

  return (
    <ItemContext.Provider value={{ items }}>{children}</ItemContext.Provider>
  );
};

export default ItemsContext;

export const useItems = () => {
  const context = useContext(ItemContext);
  if (!context) throw new Error("useItems must be used inside ItemsContext");
  return context;
};