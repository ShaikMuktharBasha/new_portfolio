import React from 'react';

function StarField() {
  return (
    <div className="star-field">
      <div className="stars stars-1"></div>
      <div className="stars stars-2"></div>
      <div className="shooting-star"></div>
      
      {/* Asteroids */}
      <div className="asteroid asteroid-1"></div>
      <div className="asteroid asteroid-2"></div>
      <div className="asteroid asteroid-3"></div>
      <div className="asteroid asteroid-4"></div>
      <div className="asteroid asteroid-5"></div>
      <div className="asteroid asteroid-6"></div>
      <div className="asteroid asteroid-7"></div>
      <div className="asteroid asteroid-8"></div>
      <div className="asteroid asteroid-9"></div>
      <div className="asteroid asteroid-10"></div>
      <div className="asteroid asteroid-11"></div>
      <div className="asteroid asteroid-14"></div>
      <div className="asteroid asteroid-15"></div>
      
      {/* Satellite */}
      <div className="satellite">
        <div className="satellite-body"></div>
        <div className="solar-panel solar-panel-left"></div>
        <div className="solar-panel solar-panel-right"></div>
        <div className="satellite-antenna"></div>
      </div>
      
      {/* Space Station (ISS-inspired) */}
      <div className="space-station">
        <div className="station-module station-core"></div>
        <div className="station-module station-lab-left"></div>
        <div className="station-module station-lab-right"></div>
        <div className="station-truss"></div>
        <div className="station-solar station-solar-1"></div>
        <div className="station-solar station-solar-2"></div>
        <div className="station-solar station-solar-3"></div>
        <div className="station-solar station-solar-4"></div>
        <div className="station-radiator"></div>
      </div>
      
      {/* Simplified Solar System */}
      <div className="sun"></div>
      <div className="orbital-system">
        {/* Mercury */}
        <div className="orbit orbit-1">
          <div className="planet planet-mercury"></div>
        </div>
        {/* Venus */}
        <div className="orbit orbit-2">
          <div className="planet planet-venus"></div>
        </div>
        {/* Earth */}
        <div className="orbit orbit-3">
          <div className="planet planet-earth"></div>
        </div>
        {/* Mars */}
        <div className="orbit orbit-4">
          <div className="planet planet-mars"></div>
        </div>
        {/* Jupiter */}
        <div className="orbit orbit-5">
          <div className="planet planet-jupiter"></div>
        </div>
        {/* Saturn */}
        <div className="orbit orbit-6">
          <div className="planet planet-saturn"></div>
        </div>
      </div>
    </div>
  );
}

export default StarField;
