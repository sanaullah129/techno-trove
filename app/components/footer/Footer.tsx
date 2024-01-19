import Link from "next/link"
import Container from "../Container"
import FooterList from "./FooterList"
import { BsGithub, BsLinkedin, BsInstagram } from 'react-icons/bs'
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="bg-blue-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-around pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Shop Categories</h3>
            <Link href='/?category=Phone'>Phones</Link>
            <Link href='/?category=Phone'>Laptops</Link>
            <Link href='/?category=Phone'>Desktops</Link>
            <Link href='/?category=Phone'>Watches</Link>
            <Link href='/?category=Phone'>TVs</Link>
            <Link href='/?category=Phone'>Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Customer Service</h3>          
            <Link href='/shipping-policy'>Shipping Policy</Link>
            <Link href='/refund-and-return'>Refund and Return</Link>
            <Link href='/about-us'>About Us</Link>
          </FooterList>          
          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow</h3>
            <div className="flex gap-5">
              <Link href='https://github.com/sanaullah129?tab=repositories' target="blank"><BsGithub size={24} /></Link>
              <Link href='https://www.linkedin.com/in/sanaullah129' target="blank"><BsLinkedin size={24} /></Link>
              <Link href='https://www.instagram.com/sanaullah129/' target="blank"><BsInstagram size={24} /></Link>
            </div>
          </FooterList>
          <div>
            <a href="/">
            <Image src="/logo.png" alt="techno-trove" width={200} height={200} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer