import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedCounter from "@/components/home/AnimatedCounter";
  
export function NumberCard({ title, type, content }) {
    return (
    <Card className="w-full justify-between">
        <CardHeader>
            <CardTitle className="text-sm h-1/3">{title}</CardTitle>
            <CardDescription>{type}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-2/3 text-5xl">
            <AnimatedCounter className="" from={0} to={content} />
        </CardContent>
    </Card>
    )
}