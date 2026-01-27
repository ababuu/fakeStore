import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import useCartStore from "../store/useCartStore";
import { formatCurrency } from "../lib/utils";

const ShoppingCartModal = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    getCartTotal,
  } = useCartStore();

  const total = getCartTotal();

  return (
    <Dialog open={isCartOpen} onOpenChange={closeCart}>
      <DialogContent className="max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <ShoppingBag className="h-6 w-6" />
            Shopping Cart
          </DialogTitle>
        </DialogHeader>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <ShoppingBag className="h-24 w-24 text-gray-300 mb-4" />
            <p className="text-xl text-muted-foreground">Your cart is empty</p>
            <Button
              onClick={closeCart}
              className="mt-4 bg-slate-900 hover:bg-slate-800"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id}>
                    <div className="flex gap-4">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-contain p-2"
                        />
                      </div>

                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium line-clamp-2">
                            {item.title}
                          </h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <p className="mt-1 text-sm font-bold text-purple-600">
                          {formatCurrency(item.price)}
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => decrementQuantity(item.id)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-12 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => incrementQuantity(item.id)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <span className="ml-auto text-sm font-semibold">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-4">
              <Separator />
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-slate-900">{formatCurrency(total)}</span>
              </div>
              <Button className="w-full bg-slate-900 hover:bg-slate-800 h-12 text-lg">
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShoppingCartModal;
