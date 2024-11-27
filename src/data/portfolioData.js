import project1 from "../assets/images/banku.jpeg";
import project2 from "../assets/images/vrsimulation.jpg";
import project3 from "../assets/images/shawarma.jpg";
import project4 from "../assets/images/shito.jpg";

export const portfolioData = [
  {
    id: "1",
    title: "Brand Identity Design",
    description: "A comprehensive brand identity design project for a tech startup.",
    image: project1,
    tags: ["Branding", "Design", "Identity"],
    task: "Create a cohesive brand identity for a new tech startup.",
    strategy: "Modern and innovative approach",
    design: "Minimalist with bold accents",
    client: "TechNova Inc.",
    link: "https://example.com/project1",
    galleryImages: [
      project1,
      project2,
      project3,
      project4,
    ]
  },
  {
    id: 2,
    title: "VRSimulation",
    description: "A website that simulates the VRS system used in Ghana to manage the distribution of fuel to petrol stations.",
    image: project2,
    category: "Web Design/Development",
    task: "Building a website that simulates the VRS system used in Ghana to manage the distribution of fuel to petrol stations.",
    strategy: "UX Strategy",
    design: "UI/UX Design, Web Design",
    client: "VRSimulation",
    link: "https://vrsimulation.com",
    tags: ["UI/UX Design", "Web Design"],
  },
  {
    id: 3,
    title: "Shawarma",
    description: "A website that sells shawarma and other food items.",
    image: project3,
    category: "Web Design/Development",
    task: "Building a website that sells shawarma and other food items.",
    strategy: "UX Strategy",
    design: "UI/UX Design, Web Design",
    client: "Shawarma",
    link: "https://shawarma.com",
    tags: ["UI/UX Design", "Web Design"],
  },
  {
    id: 4,
    title: "Project Four",
    description: "Social media management tool",
    image: project4,
    tags: ["Vue.js", "Node.js", "MongoDB"],
    link: "https://project4.com",
  },
]; 