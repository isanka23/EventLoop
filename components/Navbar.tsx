import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
    return (
        <header>
            <nav>
                <Link href='/' className="logo">
                    <Image src="/icons/app_logo.png" alt="logo" width={70} height={70} />

                    <p>EventLoop</p>
                </Link>

                <ul>
                    <Link href="/">Home</Link>
                    <Link href="/#events-section">Events</Link>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar