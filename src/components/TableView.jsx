import React, { useState } from "react";

const TableView = ({ data }) => {
  const [expandedFeatures, setExpandedFeatures] = useState(new Set());

  const toggleFeature = (featureName) => {
    const newExpanded = new Set(expandedFeatures);
    if (newExpanded.has(featureName)) {
      newExpanded.delete(featureName);
    } else {
      newExpanded.add(featureName);
    }
    setExpandedFeatures(newExpanded);
  };

  return (
    <div className="space-y-3">
      {data.map((feature) => (
        <div
          key={feature.name}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
        >
          {/* Feature Header */}
          <button
            onClick={() => toggleFeature(feature.name)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 focus:outline-none"
          >
            <span className="text-lg font-medium text-gray-900">
              {feature.name}
            </span>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">
                {feature.subFeatures.length} sub-features
              </span>
              <svg
                className={`w-5 h-5 text-gray-400 transform transition-transform ${
                  expandedFeatures.has(feature.name) ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>

          {/* Sub-features and Details */}
          {expandedFeatures.has(feature.name) && (
            <div className="border-t border-gray-200">
              {feature.subFeatures.map((subFeature, idx) => (
                <div
                  key={`${feature.name}-${subFeature.name}`}
                  className={`border-b border-gray-100 last:border-b-0 ${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <div className="px-6 py-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      {subFeature.name}
                    </h4>
                    <ul className="space-y-1 pl-4">
                      {subFeature.detailedOptions.map((detail, detailIdx) => (
                        <li
                          key={`${subFeature.name}-${detailIdx}`}
                          className="text-sm text-gray-600 flex items-center space-x-2"
                        >
                          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TableView;
