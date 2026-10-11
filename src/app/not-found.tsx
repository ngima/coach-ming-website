import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="py-24 md:py-40">
      <Container className="text-center">
        <p className="eyebrow justify-center">404</p>
        <h1 className="display mt-4 text-[3rem] text-fg md:text-[5rem]">
          Missed <span className="text-lime">rep</span>.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-muted">That page does not exist. Let us get you back to the programme.</p>
        <div className="mt-8">
          <Button href="/">Back home</Button>
        </div>
      </Container>
    </section>
  );
}
