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
import Link from "next/link";

const cardData = [
  {
    title: "Bug Reports",
    description: "Report and track software bugs.",
    buttonText: "Explore",
    href: "/issues/all",
  },
  {
    title: "Community Discussions",
    description: "Join discussions and share ideas.",
    buttonText: "Explore",
    href: "/issues",
  },
];

export default async function Home() {
  const issues = await db.issue.findMany();
  return (
    <main className="maincol flex flex-col items-center min-h-screen">
      <div className="mt-72 text-5xl font-semibold tracking-wider">
        Issue Tracker
      </div>
      <div className="md:flex justify-between w-full mt-20 gap-10 grid grid-cols-1">
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
              <Link href={card.href || ""}>
                <Button className="mt-4">{card.buttonText}</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-between w-full mt-20">
        <div className="text-4xl w-1/2">
          Create your own issues and mark them as complete or open
        </div>
        
      </div>
    </main>
  );
}
