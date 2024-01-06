import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoveRight, Pencil, UserRound } from "lucide-react";
import { db } from "@/lib/db";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const cardData = [
  {
    title: "Bug Reports",
    description: "Report and track software bugs.",
    buttonText: "Explore",
    href: "/issues/all",
    icon: Pencil,
  },
  {
    title: "Community Discussions",
    description: "Join discussions and share ideas.",
    buttonText: "Explore",
    href: "/issues",
    icon: UserRound,
  },
];

export default async function Home() {
  const issues = await db.issue.findMany();
  return (
    <main className="maincol flex flex-col items-center min-h-screen ">
      <div className="mt-48 text-5xl font-semibold tracking-wider">
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
            <CardFooter className="w-full flex items-center justify-between">
              <Link href={card.href || ""}>
                <Button className="mt-4">{card.buttonText}</Button>
              </Link>
              {card.icon && <div>{<card.icon className="h-8 w-8" />}</div>}
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="md:flex justify-between w-full mt-32 gap-48">
        <div className="md:w-1/2 flex flex-col">
          <div className="md:text-4xl text-2xl font-semibold">
            {" "}
            Create your own issues and mark them as complete or open
          </div>

          <div className="my-10">
            <div className="flex flex-col w-full items-start mt-10 space-y-5">
              <div className="flex">
                <MoveRight />
                <h1 className="ml-10">Bug Fix: Unable to Submit Form</h1>
              </div>
              <div className="flex">
                <MoveRight />
                <h1 className="ml-10">
                  Enhancement: Improve User Authentication
                </h1>
              </div>
              <div className="flex">
                <MoveRight />
                <h1 className="ml-10">Feature Request: Add Dark Mode</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I get started?</AccordionTrigger>
              <AccordionContent>
                To get started, follow the installation guide in the
                documentation and refer to the provided examples.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-2">
              <AccordionTrigger>What browsers are supported?</AccordionTrigger>
              <AccordionContent>
                The library is compatible with major modern browsers, including
                Chrome, Firefox, Safari, and Edge.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is there a mobile version?</AccordionTrigger>
              <AccordionContent>
                Yes, the library is designed to be responsive and works well on
                various screen sizes, including mobile devices.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Are there any customization options?
              </AccordionTrigger>
              <AccordionContent>
                Absolutely! Check the documentation for details on customization
                options and styling the accordions to fit your needs.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </main>
  );
}
