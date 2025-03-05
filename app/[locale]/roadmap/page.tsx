"use client";

import React, { useState } from "react";
import { ChevronRight, Calendar, Check, Clock, ArrowRight } from "lucide-react";

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  date: string;
  status: "completed" | "in-progress" | "planned";
  category: string;
}

const roadmapData: RoadmapItem[] = [
  {
    id: "1",
    title: "User Authentication",
    description: "Implement secure user authentication with social login options.",
    date: "Q1 2025",
    status: "completed",
    category: "Core Features"
  },
  {
    id: "2",
    title: "Dashboard Redesign",
    description: "Complete overhaul of the main dashboard with improved analytics and visualizations.",
    date: "Q1 2025",
    status: "completed",
    category: "UI/UX"
  },
  {
    id: "3",
    title: "Real-time Notifications",
    description: "Add WebSocket support for instant notifications and updates.",
    date: "Q2 2025",
    status: "in-progress",
    category: "Core Features"
  },
  {
    id: "4",
    title: "Mobile App Beta",
    description: "Launch beta version of our mobile application for iOS and Android.",
    date: "Q2 2025",
    status: "in-progress",
    category: "Platform Expansion"
  },
  {
    id: "5",
    title: "API v2.0",
    description: "Release of our completely redesigned API with improved performance and new endpoints.",
    date: "Q3 2025",
    status: "planned",
    category: "Developer Tools"
  },
  {
    id: "6",
    title: "Advanced Analytics",
    description: "Implement machine learning powered insights and predictive analytics.",
    date: "Q3 2025",
    status: "planned",
    category: "Core Features"
  },
  {
    id: "7",
    title: "Enterprise Features",
    description: "Role-based access control, audit logs, and compliance reporting.",
    date: "Q4 2025",
    status: "planned",
    category: "Enterprise"
  },
  {
    id: "8",
    title: "Marketplace Launch",
    description: "Launch of plugin marketplace allowing third-party integrations.",
    date: "Q4 2025",
    status: "planned",
    category: "Platform Expansion"
  }
];

const categories = Array.from(new Set(roadmapData.map(item => item.category)));

export default function RoadmapPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredItems = selectedCategory 
    ? roadmapData.filter(item => item.category === selectedCategory)
    : roadmapData;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-blue-500";
      case "planned":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="w-4 h-4" />;
      case "in-progress":
        return <Clock className="w-4 h-4" />;
      case "planned":
        return <ArrowRight className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Product Roadmap
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our vision for the future and what we&apos;re building next. Stay up to date with our development plans and upcoming features.
        </p>
      </div>

      <div className="flex items-center justify-center mb-10">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium mr-2 transition-all ${
            selectedCategory === null
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium mr-2 transition-all ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all group bg-white hover:border-blue-200"
          >
            <div className="flex items-center mb-4">
              <div className={`w-8 h-8 rounded-full ${getStatusColor(item.status)} flex items-center justify-center text-white mr-3`}>
                {getStatusIcon(item.status)}
              </div>
              <span className="text-sm font-medium text-gray-500 capitalize">{item.status}</span>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <div className="flex items-center text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">{item.date}</span>
            </div>
            <div className="mt-4">
              <span className="inline-block px-3 py-1 bg-gray-100 text-xs font-medium rounded-full text-gray-700">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Have a Feature Request?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          We&apos;re always looking to improve. If you have ideas for features you&apos;d like to see on our roadmap, we&apos;d love to hear from you.
        </p>
        <a 
          href="#" 
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Feedback
          <ChevronRight className="ml-2 w-4 h-4" />
        </a>
      </div>
    </div>
  );
}