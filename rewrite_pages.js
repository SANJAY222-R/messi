const fs = require('fs');
const path = require('path');

const pages = [
  { file: 'about/page.tsx', name: 'AboutPage', json: '01_personal.json', title: 'BIOGRAPHY', subtitle: 'The Man Behind The Legend', category: 'portraits' },
  { file: 'childhood/page.tsx', name: 'ChildhoodPage', json: '03_childhood.json', title: 'ORIGINS', subtitle: 'The Making of a Genius', category: 'childhood' },
  { file: 'barcelona/page.tsx', name: 'BarcelonaPage', json: '05_barcelona.json', title: 'FC BARCELONA', subtitle: 'The Golden Era', category: 'barcelona' },
  { file: 'psg/page.tsx', name: 'PSGPage', json: '06_psg.json', title: 'PARIS SAINT-GERMAIN', subtitle: 'A New Chapter', category: 'psg' },
  { file: 'inter-miami/page.tsx', name: 'InterMiamiPage', json: '07_inter_miami.json', title: 'INTER MIAMI CF', subtitle: 'The American Dream', category: 'interMiami' },
  { file: 'argentina/page.tsx', name: 'ArgentinaPage', json: '08_argentina.json', title: 'LA ALBICELESTE', subtitle: 'National Glory', category: 'argentina' },
  { file: 'statistics/page.tsx', name: 'StatisticsPage', json: '09_statistics.json', title: 'STATISTICS', subtitle: 'By The Numbers', category: 'hero' },
  { file: 'trophies/page.tsx', name: 'TrophiesPage', json: '10_trophies.json', title: 'TROPHY CABINET', subtitle: 'Silverware & Glory', category: 'trophies' },
  { file: 'awards/page.tsx', name: 'AwardsPage', json: '11_awards.json', title: 'INDIVIDUAL HONORS', subtitle: "The Ballon d'Or King", category: 'portraits' },
  { file: 'records/page.tsx', name: 'RecordsPage', json: '12_records.json', title: 'RECORDS', subtitle: 'Breaking History', category: 'hero' },
  { file: 'goals/page.tsx', name: 'GoalsPage', json: '13_goals.json', title: 'GOALS ARCHIVE', subtitle: 'The Scoring Catalog', category: 'goals' },
  { file: 'matches/page.tsx', name: 'MatchesPage', json: '14_matches.json', title: 'ICONIC MATCHES', subtitle: 'Moments of Magic', category: 'hero' },
  { file: 'timeline/page.tsx', name: 'TimelinePage', json: '15_timeline.json', title: 'CAREER TIMELINE', subtitle: 'Chronology of Greatness', category: 'hero' }
];

const template = (name, json, title, subtitle, category) => `'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import FooterSection from '@/components/sections/FooterSection';
import PageHeader from '@/components/PageHeader';
import DataSectionBuilder from '@/components/DataSectionBuilder';
import CategoryGallery from '@/components/CategoryGallery';

export default function ${name}() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/DATA/${json}')
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load data:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050608] text-neutral-500 font-cinzel tracking-widest uppercase">
        Loading Archive...
      </div>
    );
  }

  return (
    <>
      <Header />
      <PageHeader
        title="${title}"
        subtitle="${subtitle}"
        imageCategory="${category}"
      />
      
      <main className="min-h-screen bg-[#050608] pb-16 pt-16 px-6 md:px-12 flex flex-col justify-start relative z-10">
        <div className="max-w-6xl mx-auto w-full">
          <DataSectionBuilder data={data} />
        </div>
      </main>

      <CategoryGallery category="${category}" />
      <FooterSection />
    </>
  );
}
`;

pages.forEach(({ file, name, json, title, subtitle, category }) => {
  const filePath = path.join(__dirname, 'src', 'app', file);
  if (fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, template(name, json, title, subtitle, category), 'utf8');
    console.log(`Rebuilt ${file} successfully.`);
  } else {
    console.log(`Skipped ${file} - not found`);
  }
});
