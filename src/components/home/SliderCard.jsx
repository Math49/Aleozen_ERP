import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";

export function SliderCard({ title, data }) {
    return (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="h-full w-full p-0 flex items-center justify-center relative">
                <Carousel className="w-[80%] h-full" opts={{ loop: true }}>
                    <CarouselContent className="h-full">
                        {data.map((item) => (
                            <CarouselItem key={item.training_id ? item.training_id : item.course_id}>
                                <Link href="/" className="w-full h-full flex flex-col items-center justify-center gap-2">
                                    <h2 className="uppercase font-medium max-w-[100%]">{item.training_id ? 'Formation ' : 'Stage '} {item.type}</h2>
                                    <p>A partir du <span className="font-medium">
                                        {new Date(item.start_date).toLocaleDateString('fr-FR')}
                                    </span></p>
                                    <p>Location : <span className="font-medium">{item.location}</span></p>
                                    <p>Nombre d'inscrits : <span className="font-medium">{item.inscriptionCount}</span></p>
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
