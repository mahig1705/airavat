import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-xl">AI Research Assistant</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              AI-powered financial research platform for investors and professionals.
            </p>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-2">Resources</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li><Link href="#">Documentation</Link></li>
              <li><Link href="#">API Reference</Link></li>
              <li><Link href="#">Tutorials</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-2">Company</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li><Link href="#">About</Link></li>
              <li><Link href="#">Careers</Link></li>
              <li><Link href="#">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4 text-muted-foreground">
              <Link href="#"><Facebook className="w-5 h-5 hover:text-primary transition" /></Link>
              <Link href="#"><Twitter className="w-5 h-5 hover:text-primary transition" /></Link>
              <Link href="#"><Instagram className="w-5 h-5 hover:text-primary transition" /></Link>
              <Link href="#"><Linkedin className="w-5 h-5 hover:text-primary transition" /></Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} AI Research Assistant. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
