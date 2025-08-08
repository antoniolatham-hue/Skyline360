import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SkyLink360wHeader = () => {
  const [isNight, setIsNight] = useState(false);
  const [features, setFeatures] = useState({
    headerVisible: true,
    backgroundMode: 'auto', // 'auto' | 'manual'
    newFeature: false,
  });

  // Time-based theme switching
  useEffect(() => {
    const hour = new Date().getHours();
    setIsNight(hour >= 18 || hour < 6);
  }, []);

  // Sync feature changes to server
  useEffect(() => {
    const sendFeatureUpdate = async () => {
      try {
        await axios.post('https://YOUR_SERVER_URL/api/feature-sync', {
          timestamp: new Date().toISOString(),
          updatedFeatures: features,
        });
        console.log('✅ Feature sync sent to server');
      } catch (err) {
        console.error('❌ Failed to sync features:', err);
      }
    };

    sendFeatureUpdate();
  }, [features]);

  // Example of adding a new feature dynamically
  const enableNewFeature = () => {
    setFeatures((prev) => ({
      ...prev,
      newFeature: true,
    }));
  };

  return (
    <div
      className={`min-h-screen text-white font-sans px-4 py-8 transition-all duration-500 ${
        isNight
          ? 'bg-black'
          : 'bg-gradient-to-b from-orange-400 to-yellow-100'
      }`}
    >
      {/* Header */}
      <div className="text-3xl font-bold tracking-wide">
        SkyLink360w
      </div>

      {/* Greeting */}
      <div className="text-lg mt-2 opacity-80">
        {isNight ? 'Good evening, Pilot.' : 'Good day, Pilot.'}
      </div>

      {/* Example Button to Trigger New Feature */}
      <button
        onClick={enableNewFeature}
        className="mt-6 px-4 py-2 bg-white text-black rounded shadow hover:bg-gray-200 transition"
      >
        Add New Feature
      </button>
    </div>
  );
};

export default SkyLink360wHeader;
