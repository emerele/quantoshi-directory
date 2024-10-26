import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

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
    <div className="space-y-4">
      {data.map((feature) => (
        <div
          key={feature.name}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
        >
          <button
            onClick={() => toggleFeature(feature.name)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 focus:outline-none"
          >
            <div className="flex flex-col text-left">
              <span className="text-lg font-semibold text-gray-900">
                {feature.name}
              </span>
              <span className="text-sm text-gray-500">
                {feature.subFeatures.length} sub-features
              </span>
            </div>
            <ChevronDownIcon
              className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${
                expandedFeatures.has(feature.name) ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedFeatures.has(feature.name) && (
            <div className="border-t border-gray-200 divide-y divide-gray-200">
              {feature.subFeatures.map((subFeature) => (
                <div
                  key={`${feature.name}-${subFeature.name}`}
                  className="px-6 py-4 bg-gray-50"
                >
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    {subFeature.name}
                  </h3>
                  <div className="pl-4 space-y-2">
                    {subFeature.detailedOptions.map((option, idx) => (
                      <div
                        key={`${subFeature.name}-${idx}`}
                        className="flex items-center text-gray-600"
                      >
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span>
                        <span className="text-sm">{option}</span>
                      </div>
                    ))}
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
