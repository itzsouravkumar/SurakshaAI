"use client";

import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl } from 'react-leaflet';

interface Zone {
  id: number;
  city: string;
  lat: number;
  lng: number;
  risk: number;
  workers: number;
  disruption: string;
  premium: string;
  lastEvent: string;
  claims: number;
}

interface LeafletMapProps {
  zones: Zone[];
  selectedZoneId: number;
  onSelectZone: (zone: Zone) => void;
}

function getRiskStyle(risk: number) {
  if (risk >= 75) return { color: '#ef4444', fillColor: '#ef4444', label: 'High' };
  if (risk >= 50) return { color: '#f59e0b', fillColor: '#f59e0b', label: 'Medium' };
  return { color: '#10b981', fillColor: '#10b981', label: 'Low' };
}

export default function LeafletMap({ zones, selectedZoneId, onSelectZone }: LeafletMapProps) {
  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      style={{ height: '100%', width: '100%', borderRadius: '1rem', zIndex: 0 }}
      zoomControl={false}
      scrollWheelZoom={true}
    >
      <ZoomControl position="bottomright" />

      {/* OpenStreetMap tile layer — free & open source */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        opacity={0.85}
      />

      {zones.map((zone) => {
        const style = getRiskStyle(zone.risk);
        const isSelected = zone.id === selectedZoneId;

        return (
          <CircleMarker
            key={zone.id}
            center={[zone.lat, zone.lng]}
            radius={zone.risk >= 75 ? 22 : zone.risk >= 50 ? 16 : 12}
            pathOptions={{
              color: style.color,
              fillColor: style.fillColor,
              fillOpacity: isSelected ? 0.85 : 0.55,
              weight: isSelected ? 3 : 1.5,
              opacity: 1,
            }}
            eventHandlers={{
              click: () => onSelectZone(zone),
            }}
          >
            <Popup>
              <div style={{ minWidth: 180 }}>
                <p style={{ fontWeight: 800, fontSize: 14, marginBottom: 4, color: '#0f172a' }}>{zone.city}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>Risk Score</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: style.color }}>{zone.risk} — {style.label}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>Active Workers</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#0f172a' }}>{zone.workers.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>Trigger</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#0f172a' }}>{zone.disruption}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>Premium</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#4f46e5' }}>{zone.premium}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>Claims (week)</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#0f172a' }}>{zone.claims}</span>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
