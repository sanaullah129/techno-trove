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
            <Link href='#'>Phones</Link>
            <Link href='#'>Laptops</Link>
            <Link href='#'>Desktops</Link>
            <Link href='#'>Watches</Link>
            <Link href='#'>TVs</Link>
            <Link href='#'>Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Customer Service</h3>
            <Link href='#'>Contact Us</Link>
            <Link href='#'>Shipping Policy</Link>
            <Link href='#'>Refund and Return</Link>
            <Link href='#'>About Us</Link>
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
            <Image src="/logo.png" alt="techno-trove" width={200} height={200} />
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer