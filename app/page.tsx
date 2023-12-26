import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import BarChart from "@/components/ui/bar-chart";
import { db } from "@/lib/db";

const cardData = [
  {
    title: "Bug Reports",
    description: "Report and track software bugs.",
    buttonText: "Explore",
  },
  {
    title: "Community Discussions",
    description: "Join discussions and share ideas.",
    buttonText: "Explore",
  },
];

export default async function Home() {
  const issues = await db.issue.findMany();
  return (
    <main className="maincol flex flex-col items-center justify-center h-screen text-blue-500">
      <div className=" md:flex grid grid-cols-1 gap-8 place-items-center md:mt-32 w-full">
        {cardData.map((card, index) => (
          <Card
            key={index}
            className="w-full border p-4 rounded-xl shadow-md hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle className="text-xl mb-2">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                {card.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button className="mt-4">{card.buttonText}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="md:h-full w-full mt-20">
        <BarChart issues={issues} indexAxis="x" />
      </div>
    </main>
  );
}
