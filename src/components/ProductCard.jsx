import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import useCartStore from "../store/useCartStore";
import { formatCurrency, truncateText } from "../lib/utils";

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain p-6 transition-transform group-hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
          {truncateText(product.title, 60)}
        </CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {truncateText(product.description, 80)}
        </p>
        <p className="text-2xl font-bold text-slate-900">
          {formatCurrency(product.price)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
