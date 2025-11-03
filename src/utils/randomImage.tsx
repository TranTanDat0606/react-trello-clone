const RandomImage = () => {
  const randomNum = Math.floor(Math.random() * 1000);

  return `https://picsum.photos/280/130?random=${randomNum}`;
};

export default RandomImage;
