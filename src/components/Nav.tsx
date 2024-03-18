import { useAuth } from "@/utils/AuthContext";
import Link from "next/link";
import LanguageSelector from "./LanguageSelector";
import CartNav from "./CartNav";
import { useCart } from "@/utils/CartContext";

export default function Nav() {
  const { totalCartItems } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between py-12 items-center">
      <Link href="/">moneytronics</Link>

      <div className="flex gap-4">
        <CartNav itemCount={totalCartItems} />
        {user ? (
          <>
            <Link href="/profile">profile</Link>
            <button onClick={() => logout()}>logout</button>
          </>
        ) : (
          <Link href="/login">login</Link>
        )}

        <div className="ml-4">
          <LanguageSelector/>
        </div>
      </div>
    </nav>
  );
}