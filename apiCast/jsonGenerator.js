const fs = require('fs');
const publicIp = require('public-ip');
const util = require('util');

const readdir = util.promisify(fs.readdir);

module.exports = async function jsonGenerator() {
  const ip = await publicIp.v4();
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

          episodeObj['title'] = episode;
          episodeObj['image'] = `image/${episodeSubStr}.png`;

          return episodeObj;
        }
      })
      .filter((item) => item);

    return seasonObj;
  });

  const episodes = await Promise.all(result);

  const finalObj = {};
  const internalObj = {};

  internalObj['seasons'] = seasons;
  internalObj['ip'] = ip;
  internalObj['path'] = `http://${ip}:3000/${serie}/`;
  internalObj['pathLocal'] = `http://localhost:3000/${serie}/`;
  internalObj['ip'] = ip;

  finalObj[serie] = {internalObj, ...episodes[0]};

  return finalObj;
};
