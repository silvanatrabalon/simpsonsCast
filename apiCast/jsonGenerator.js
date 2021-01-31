const fs = require('fs');
const util = require('util');

const readdir = util.promisify(fs.readdir);

module.exports = async function jsonGenerator() {
  const serie = 'Simpsons'; //implementar logica para mas de 1

  const seasons = await readdir(`./public/${serie}`);

  const result = seasons.map(async (season) => {
    const episodesSeason = await readdir(`./public/${serie}/${season}`);

    const seasonObj = {};
    seasonObj[season] = episodesSeason
      .map((episode) => {
        if (episode !== 'image') {
          const episodeObj = {};
          const episodeSubStr = episode.replace('.mp4', '');

          episodeObj['title'] = episodeSubStr;
          episodeObj['image'] = `image/${episodeSubStr}.png`;

          return episodeObj;
        }
      })
      .filter((item) => item);

    return seasonObj;
  });

  const episodes = await Promise.all(result);

  const internalObj = {};
  const finalObj = {};
  finalObj[serie] = {};

  internalObj['seasons'] = seasons;
  
  Object.assign(finalObj[serie], internalObj);
  
  episodes.map((seasonEpisodes) => {
      Object.assign(finalObj[serie], seasonEpisodes);
  });

  return finalObj;
};