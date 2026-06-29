'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PersonalInfo } from '@/types/messi';
import SpotlightCard from '../SpotlightCard';

export default function BiographySection() {
  const [personal, setPersonal] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/DATA/01_personal.json')
      .then((res) => res.json())
      .then((data) => {
        setPersonal(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load personal data:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !personal) {
    return (
      <div className="h-96 flex items-center justify-center bg-black text-neutral-500">
        Loading Biography...
      </div>
    );
  }

  const { personal_information, current_status, family, medical_history } = personal;

  return (
    <section className="relative min-h-screen w-full bg-black py-24 px-6 md:px-12 flex flex-col justify-center border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full">
        {/* Title Area */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-2 block">
            Origins & Foundation
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wider text-white">
            BIOGRAPHY
          </h2>
          <div className="h-[1px] w-24 bg-gold mt-4 mx-auto md:mx-0" />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Column 1: Core Personal Stats */}
          <div className="lg:col-span-1 space-y-6">
            <SpotlightCard spotlightColor="rgba(212, 175, 55, 0.15)">
              <h3 className="font-cinzel text-xl font-semibold text-gold mb-6 tracking-wide">
                Identity Profile
              </h3>
              <div className="space-y-4 text-sm font-sans">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Full Name</span>
                  <span className="text-white font-medium">{personal.full_name}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Date of Birth</span>
                  <span className="text-white font-medium">{personal_information.date_of_birth}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Birthplace</span>
                  <span className="text-white font-medium">
                    {personal_information.place_of_birth.city}, Argentina
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Citizenship</span>
                  <span className="text-white font-medium">
                    {personal_information.citizenship.join(' / ')}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Dominant Foot</span>
                  <span className="text-gold font-medium">{personal_information.dominant_foot}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Height</span>
                  <span className="text-white font-medium">
                    {personal_information.height.cm} cm ({personal_information.height.ft})
                  </span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-neutral-400">Dominant Hand</span>
                  <span className="text-white font-medium">{personal_information.dominant_hand || 'N/A'}</span>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Column 2: Origin Story & Early Diagnostics */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Childhood Card */}
              <SpotlightCard spotlightColor="rgba(116, 172, 223, 0.15)">
                <h3 className="font-cinzel text-xl font-semibold text-argentine mb-4 tracking-wide">
                  Rosario Roots
                </h3>
                <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                  Born in Rosario, Santa Fe Province, Lionel grew up in a tight-knit working-class family. 
                  He began playing at age 4 at Grandoli under Salvador Aparicio, where his grandmother 
                  Celia famously fought to give him a chance to step on the field.
                </p>
                <div className="text-[11px] text-argentine uppercase tracking-wider font-semibold">
                  Grandmother: Celia María Cuccittini
                </div>
              </SpotlightCard>

              {/* Medical History */}
              {medical_history && (
                <SpotlightCard spotlightColor="rgba(212, 175, 55, 0.15)">
                  <h3 className="font-cinzel text-xl font-semibold text-gold mb-4 tracking-wide">
                    The La Masia Contract
                  </h3>
                  <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                    Diagnosed with <strong className="text-white">Growth Hormone Deficiency</strong> at age 10. 
                    While Newell's could not fund the $900/month treatment, FC Barcelona sporting director Carles Rexach 
                    signed his first pledge on a paper napkin, funding his therapy and moving the family to Spain.
                  </p>
                  <div className="text-[11px] text-gold uppercase tracking-wider font-semibold">
                    Condition: {medical_history.condition}
                  </div>
                </SpotlightCard>
              )}
            </div>

            {/* Family & Status Grid */}
            <SpotlightCard spotlightColor="rgba(255, 255, 255, 0.08)" className="w-full">
              <h3 className="font-cinzel text-xl font-semibold text-white mb-6 tracking-wide">
                Family & Career Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-neutral-400 mb-3 font-semibold">
                    Family Circle
                  </h4>
                  <ul className="space-y-2 text-neutral-300">
                    <li>
                      <span className="text-neutral-500">Spouse:</span> {family.spouse}
                    </li>
                    <li>
                      <span className="text-neutral-500">Children:</span> {family.children.join(', ')}
                    </li>
                    <li>
                      <span className="text-neutral-500">Parents:</span> {family.father} & {family.mother}
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-neutral-400 mb-3 font-semibold">
                    Current League Profile
                  </h4>
                  <ul className="space-y-2 text-neutral-300">
                    <li>
                      <span className="text-neutral-500">Current Club:</span> {current_status.club}
                    </li>
                    <li>
                      <span className="text-neutral-500">League:</span> {current_status.league}
                    </li>
                    <li>
                      <span className="text-neutral-500">National Team:</span> {current_status.national_team}
                    </li>
                  </ul>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
