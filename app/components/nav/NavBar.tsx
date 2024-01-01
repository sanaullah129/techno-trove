import Link from "next/link"
import Container from "../Container"
import { Oswald } from 'next/font/google'
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import getCurrentUser from "@/actions/getCurrentUser";
import Categories from "./Categories";
import SearchBar from "./SearchBar";

const oswald = Oswald({subsets: ['latin'], weight: ['700']});

const NavBar = async () => {

  const currentUser = await getCurrentUser();

  return (
    <div className="sticky top-0 w-full bg-slate-400 z-30 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link href='/' className={`${oswald.className} text-lg`} >Techno Trove</Link>
            <div className="hidden md:block"><SearchBar /></div>
            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
              <UserMenu currentUser = {currentUser} />
            </div>
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}

export default NavBar