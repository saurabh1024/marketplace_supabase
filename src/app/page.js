import Link from "next/link";

export default function Home() {
  return (
    <main>
      This is Home page.
      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </main>
  );
}
