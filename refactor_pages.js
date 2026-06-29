const fs = require('fs');
const path = require('path');

const pageMappings = [
  { file: 'about/page.tsx', category: 'portraits' },
  { file: 'childhood/page.tsx', category: 'childhood' },
  { file: 'barcelona/page.tsx', category: 'barcelona' },
  { file: 'psg/page.tsx', category: 'psg' },
  { file: 'inter-miami/page.tsx', category: 'interMiami' },
  { file: 'argentina/page.tsx', category: 'argentina' },
  { file: 'statistics/page.tsx', category: 'hero' },
  { file: 'trophies/page.tsx', category: 'trophies' },
  { file: 'awards/page.tsx', category: 'portraits' },
  { file: 'records/page.tsx', category: 'hero' },
  { file: 'goals/page.tsx', category: 'goals' },
  { file: 'matches/page.tsx', category: 'hero' },
  { file: 'timeline/page.tsx', category: 'hero' },
  { file: 'gallery/page.tsx', category: 'wallpapers' },
  { file: 'references/page.tsx', category: 'wallpapers' },
  { file: 'search/page.tsx', category: 'hero' }
];

pageMappings.forEach(({ file, category }) => {
  const filePath = path.join(__dirname, 'src', 'app', file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${file} - not found`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace import
  content = content.replace(
    /import AnimatedTitle from '@\/components\/AnimatedTitle';/g,
    "import PageHeader from '@/components/PageHeader';"
  );

  // Extract title and subtitle from AnimatedTitle
  const titleRegex = /<AnimatedTitle\s+title="([^"]+)"\s+subtitle="([^"]+)"[^>]*\/>/g;
  let match = titleRegex.exec(content);
  if (!match) {
    // try multi-line match
    const multiLineRegex = /<AnimatedTitle[\s\S]*?title="([^"]+)"[\s\S]*?subtitle="([^"]+)"[\s\S]*?\/>/;
    match = multiLineRegex.exec(content);
  }

  if (match) {
    const fullMatch = match[0];
    const title = match[1];
    const subtitle = match[2];

    const replacementHeader = `<PageHeader\n        title="${title}"\n        subtitle="${subtitle}"\n        imageCategory="${category}"\n      />`;

    // Remove the old AnimatedTitle
    content = content.replace(fullMatch, '');

    // Insert PageHeader after <Header />
    content = content.replace(
      /(<Header \/>)/,
      `$1\n      ${replacementHeader}`
    );

    // Adjust main padding
    content = content.replace(
      /<main className="min-h-screen bg-\[#050608\] pt-28 pb-16 px-6 md:px-12 flex flex-col justify-center">/,
      '<main className="min-h-screen bg-[#050608] pb-16 pt-16 px-6 md:px-12 flex flex-col justify-start">'
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully refactored ${file}`);
  } else {
    console.log(`Could not find AnimatedTitle in ${file}`);
  }
});
