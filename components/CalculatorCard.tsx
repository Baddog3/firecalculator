import Link from "next/link";

type CalculatorCardProps = {
  title: string;
  description: string;
  href: string;
};

export default function CalculatorCard({ title, description, href }: CalculatorCardProps) {
  return (
    <li className="border-b border-border py-4">
      <Link href={href} className="block">
        <p className="text-lg font-medium">{title}</p>
        <p className="text-sm text-text-muted">{description}</p>
      </Link>
    </li>
  );
}
