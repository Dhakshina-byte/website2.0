// src/components/Gallery6Demo.tsx
import { Gallery6 } from "@/components/blocks/gallery6";
import carManagementImg from "../assets/img/Screenshot 2026-05-27 224608.png";
import sweetCupcakeShopImg from "../assets/img/Screenshot 2026-05-27 225834.png";
import flightBookingImg from "../assets/img/images (1).jpg";
import calculatorImg from "../assets/img/unnamed.png";

const demoData = {
  heading: "Featured Projects",
  demoUrl: "https://github.com/Dhakshina-byte",
  items: [
    {
      id: "item-1",
      title: "Car Management System",
      summary:
        "This project is a vehicle service management system includes various functionalities for managing vehicle services, bookings, inspections, maintenance, repairs, and more.",
      url: "https://github.com/Dhakshina-byte/Car-Management-System-new-",
      image: carManagementImg,
    },
    {
      id: "item-2",
      title: "The Sweet Cupcake Shop Management System",
      summary:
        "This application uses Java Swing for the GUI and demonstrates core Object-Oriented Programming (OOP) principles like Inheritance, Polymorphism, and Encapsulation.",
      url: "https://github.com/Dhakshina-byte/SweetCupcakeShop",
      image: sweetCupcakeShopImg,
    },
    {
      id: "item-3",
      title: "Flight Booking Billing",
      summary:
        "A simple Billing system using .net framework and C# language. .",
      url: "https://github.com/Dhakshina-byte/FlightBookingBilling",
      image: flightBookingImg,
    },
    {
      id: "item-4",
      title: "Calculator",
      summary:
        "My first project in Java, a simple calculator application that performs basic arithmetic operations like addition, subtraction, multiplication, and division.",
      url: "https://github.com/Dhakshina-byte/PROJECT.calculator",
      image: calculatorImg,
    },
  ],
};

function Gallery6Demo() {
  return <Gallery6 {...demoData} />;
}

export default Gallery6Demo;