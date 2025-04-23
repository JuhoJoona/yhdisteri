'use client';

import React, { useState } from 'react';
import { ChevronRight, Calendar, Check, Clock, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'in-progress' | 'planned';
  category: string;
}

const roadmapData: RoadmapItem[] = [
  {
    id: '1',
    title: 'User Authentication',
    description:
      'Implement secure user authentication with social login options.',
    date: 'Q1 2025',
    status: 'completed',
    category: 'Core Features',
  },
  {
    id: '2',
    title: 'Dashboard Redesign',
    description:
      'Complete overhaul of the main dashboard with improved analytics and visualizations.',
    date: 'Q1 2025',
    status: 'completed',
    category: 'UI/UX',
  },
  {
    id: '3',
    title: 'Real-time Notifications',
    description: 'Add WebSocket support for instant notifications and updates.',
    date: 'Q2 2026',
    status: 'in-progress',
    category: 'Core Features',
  },
  {
    id: '4',
    title: 'Mobile App Beta',
    description:
      'Launch beta version of our mobile application for iOS and Android.',
    date: 'Q2 2026',
    status: 'in-progress',
    category: 'Platform Expansion',
  },
  {
    id: '5',
    title: 'API v2.0',
    description:
      'Release of our completely redesigned API with improved performance and new endpoints.',
    date: 'Q3 2026',
    status: 'planned',
    category: 'Developer Tools',
  },
  {
    id: '6',
    title: 'Advanced Analytics',
    description:
      'Implement machine learning powered insights and predictive analytics.',
    date: 'Q3 2026',
    status: 'planned',
    category: 'Core Features',
  },
  {
    id: '7',
    title: 'Enterprise Features',
    description:
      'Role-based access control, audit logs, and compliance reporting.',
    date: 'Q4 2026',
    status: 'planned',
    category: 'Enterprise',
  },
  {
    id: '8',
    title: 'Marketplace Launch',
    description:
      'Launch of plugin marketplace allowing third-party integrations.',
    date: 'Q4 2026',
    status: 'planned',
    category: 'Platform Expansion',
  },
];

const categories = Array.from(
  new Set(roadmapData.map((item) => item.category))
);

export default function RoadmapPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const t = useTranslations('Roadmap');

  const filteredItems = selectedCategory
    ? roadmapData.filter((item) => item.category === selectedCategory)
    : roadmapData;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 dark:bg-green-600';
      case 'in-progress':
        return 'bg-blue-500 dark:bg-blue-600';
      case 'planned':
        return 'bg-gray-400 dark:bg-gray-500';
      default:
        return 'bg-gray-400 dark:bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'planned':
        return <ArrowRight className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-400">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div>

      <div className="flex items-center justify-center mb-10 flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === null
              ? 'bg-blue-500 dark:bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {t('allCategories')}
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'bg-blue-500 dark:bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {t(`categories.${category}`)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all group bg-white dark:bg-gray-800 hover:border-blue-200 dark:hover:border-blue-700"
          >
            <div className="flex items-center mb-4">
              <div
                className={`w-8 h-8 rounded-full ${getStatusColor(
                  item.status
                )} flex items-center justify-center text-white mr-3`}
              >
                {getStatusIcon(item.status)}
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
                {t(`status.${item.status}`)}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors">
              {t(`items.${item.id}.title`)}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t(`items.${item.id}.description`)}
            </p>
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">{item.date}</span>
            </div>
            <div className="mt-4">
              <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-xs font-medium rounded-full text-gray-700 dark:text-gray-300">
                {t(`categories.${item.category}`)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          {t('feedbackTitle')}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          {t('feedbackDescription')}
        </p>
        <a
          href="#"
          className="inline-flex items-center px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
        >
          {t('submitFeedback')}
          <ChevronRight className="ml-2 w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
