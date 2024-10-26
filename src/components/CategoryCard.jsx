import React from "react";

const CategoryCard = ({ title, description, icon, slug }) => {
  return (
    <a href={`/category/${slug}`} className="block group">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
              {icon}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 truncate">
              {title}
            </h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {description}
            </p>
          </div>
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
};

export default CategoryCard;
