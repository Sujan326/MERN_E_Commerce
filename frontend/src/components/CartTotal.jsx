import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

function CartTotal() {
  const { getCartAmount, currency, delivery_fees } = useContext(ShopContext);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-3 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Sub Total</p>
          <p>
            {currency} {getCartAmount()}.00
          </p>
        </div>

        <hr />

        <div className="flex justify-between">
          <p>Shipping Fees</p>
          <p>
            {currency} {delivery_fees}.00
          </p>
        </div>

        <hr />

        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency}{" "}
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fees}.00
          </b>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
