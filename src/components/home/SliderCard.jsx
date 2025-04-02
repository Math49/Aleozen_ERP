import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";

export function SliderCard({ title }) {
    return (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="h-full w-full p-0 flex items-center justify-center relative">
                <Carousel className="w-[80%] h-full" opts={{ loop: true }}>
                    <CarouselContent className="h-full">
                        {[...Array(5)].map(() => (
                            <CarouselItem key={Math.random()}>
                                <Link href="/" className="w-full h-full flex flex-col items-center justify-center gap-2">
                                    <h2 className="uppercase font-medium max-w-[100%]">Formation Qi Qong</h2>
                                    <p>A partir du <span className="font-medium">14 septembre 2025</span></p>
                                    <p>Location : <span className="font-medium">Angers - 56 rue de la gare</span></p>
                                    <p>Nombre d'inscrits : <span className="font-medium">13</span></p>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </CardContent>
        </Card>
    );
}
