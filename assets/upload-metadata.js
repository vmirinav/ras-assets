const fs = require('fs');
const path = require('path');
const { Octokit } = require('@octokit/rest');

require('dotenv').config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function uploadMetadata() {
  const files = ['like-metadata.json', 'retweet-metadata.json'];
  
  for (const file of files) {
    const content = fs.readFileSync(
      path.join(__dirname, '../assets/', file),
      'utf8'
    );

    try {
      await octokit.repos.createOrUpdateFileContents({
        owner: 'vmirinav',
        repo: 'ras-assets',
        path: `assets/${file}`,
        message: `Update ${file} metadata`,
        content: Buffer.from(content).toString('base64'),
        branch: 'main'
      });
      console.log(`Uploaded ${file} successfully`);
    } catch (error) {
      console.error(`Error uploading ${file}:`, error);
    }
  }
}

uploadMetadata();