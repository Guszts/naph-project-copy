import { createFileRoute } from "@tanstack/react-router";
import NaphApp from "@/components/NaphApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Naph — Residential & Commercial Heating, Cooling & Air Quality" },
      { name: "description", content: "Reliable heating, cooling, and indoor air quality solutions to keep your home or commercial space comfortable in every season." },
      { property: "og:title", content: "Naph — Your comfort, in every season." },
      { property: "og:description", content: "Reliable heating, cooling, and air quality solutions to keep your home comfortable all year round." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NaphApp,
});
