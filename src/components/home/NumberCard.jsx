import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedCounter from "@/components/home/AnimatedCounter";
  
export function NumberCard({ title, type, content, contentValidated, contentPending, contentRefused}) {
    const hasFooterContent = [contentValidated, contentPending, contentRefused].some(value => value >= 0);
    return (
    <Card className="w-full">
        <CardHeader>
            <CardTitle className="text-sm">{title}</CardTitle>
            <CardDescription>{type}</CardDescription>
        </CardHeader>
        <CardContent className="text-2xl text-center">
            <AnimatedCounter from={0} to={content} />
        </CardContent>
        { hasFooterContent && (
            <CardFooter className="flex justify-evenly px-4">
                <div className="w-[32px] h-[32px] bg-green-50 py-3 flex justify-center items-center rounded-sm"><span>{contentValidated >= 0 ? <AnimatedCounter from={0} to={contentValidated} /> : '?'}</span></div>
                <div className="w-[32px] h-[32px] bg-gray-50 py-3 flex justify-center items-center rounded-sm"><span>{contentPending >= 0 ? <AnimatedCounter from={0} to={contentPending} /> : '?'}</span></div>
                <div className="w-[32px] h-[32px] bg-red-50 py-3 flex justify-center items-center rounded-sm"><span>{contentRefused >= 0 ? <AnimatedCounter from={0} to={contentRefused} /> : '?'}</span></div>
            </CardFooter>
        )}
    </Card>
    )
}