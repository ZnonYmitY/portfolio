export default function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <header className="section-heading">
      <p>{kicker}</p>
      <h2>{title}</h2>
    </header>
  );
}
