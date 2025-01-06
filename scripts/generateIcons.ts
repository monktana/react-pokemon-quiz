import { cleanupSVG, importDirectorySync, parseColors, runSVGO } from '@iconify/tools';
import { promises as fs } from 'fs';

const iconSets = [
  { path: './icons/localization', prefix: 'localization' },
  { path: './icons/pokemon', prefix: 'pokemon' }
];

const iconData: Record<string, Array<string>> = {};

const processIconSet = async ({ path, prefix }: { path: string; prefix: string }) => {
  const iconSet = importDirectorySync(path, {
    prefix,
    ignoreImportErrors: 'warn',
    includeSubDirs: true
  });

  iconData[prefix] = Object.keys(iconSet.entries);

  for (const name of Object.keys(iconSet.entries)) {
    const entry = iconSet.entries[name];
    if (entry.type !== 'icon') {
      continue;
    }

    const svg = iconSet.toSVG(name);
    if (!svg) {
      iconSet.remove(name);
      return;
    }

    try {
      cleanupSVG(svg);

      parseColors(svg, {
        callback: (_attr, colorString) => colorString
      });

      runSVGO(svg);
      iconSet.fromSVG(name, svg);
    } catch (err) {
      console.error(`Error parsing ${name}:`, err);
      iconSet.remove(name);
      return;
    }
  }

  await fs.writeFile(
    `./src/components/icons/${iconSet.prefix}.json`,
    JSON.stringify(iconSet.export(), null, '\t') + '\n',
    'utf8'
  );
};

const main = async () => {
  // delete everything in ./src/components/icons/
  const files = await fs.readdir('./src/components/icons/');
  for (const file of files) {
    await fs.unlink(`./src/components/icons/${file}`);
  }

  for (const iconSetConfig of iconSets) {
    await processIconSet(iconSetConfig);
  }

  // Generate icons.d.ts
  // const iconTypeDefinitions = `
  //   // sonar-ignore-file
  //   // icons.d.ts - Auto-generated by iconify.ts
  //   /* eslint-disable prettier/prettier */
  //   declare module 'icons' {
  //     export type Icons = {${Object.entries(iconData)
  //       .map(
  //         ([collection, icons]) => `
  //       ${collection}: "${icons.join('" | "')}";`
  //       )
  //       .join('')}
  //     };
  //
  //     export type IconCollections = keyof Icons;
  //
  //     export type IconName<C extends IconCollections> = C extends keyof Icons ? Icons[C] : never;
  //   }
  // `;

  // fs.writeFile('./src/types/icons.d.ts', iconTypeDefinitions, 'utf8').then(() => {});
};

main().catch(console.error);