#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const oldDirPath = path.join(root, 'app');
const newDirPath = path.join(root, 'app-example');
const newAppDirPath = path.join(root, 'app');

const filesToCreate = [
  {
    path: path.join(newAppDirPath, 'index.tsx'),
    content: `import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
`,
  },
  {
    path: path.join(newAppDirPath, '_layout.tsx'),
    content: `import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
`,
  },
];

// Função para mover o diretório
function renameDirectory(oldPath, newPath) {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (error) => {
      if (error) {
        reject(`Error renaming directory: ${error}`);
      } else {
        console.log(`${oldPath} moved to ${newPath}.`);
        resolve();
      }
    });
  });
}

// Função para criar um novo diretório
function createDirectory(dirPath) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dirPath, { recursive: true }, (error) => {
      if (error) {
        reject(`Error creating directory: ${error}`);
      } else {
        console.log(`Directory created at: ${dirPath}`);
        resolve();
      }
    });
  });
}

// Função para criar um arquivo com conteúdo
function createFile(filePath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, (error) => {
      if (error) {
        reject(`Error creating file at ${filePath}: ${error}`);
      } else {
        console.log(`File created at: ${filePath}`);
        resolve();
      }
    });
  });
}

// Fluxo principal
async function main() {
  try {
    await renameDirectory(oldDirPath, newDirPath);
    await createDirectory(newAppDirPath);

    for (const file of filesToCreate) {
      await createFile(file.path, file.content);
    }

    console.log('All operations completed successfully.');
  } catch (error) {
    console.error(error);
  }
}

main();
