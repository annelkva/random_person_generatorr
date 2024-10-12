import Link from "next/link";

const Navbar = () => {
  return (
      <nav className="flex justify-evenly">
        <Link className="p-4" href="/">Home</Link>
        <Link className="p-4" href="/away">Away</Link>
        <Link className="p-4" href="https://www.tv2.no/">tv2</Link>
      </nav>
  )
};

export default Navbar
