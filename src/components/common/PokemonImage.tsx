import { useState } from 'react';

interface PokemonImage {
  src: string;
  alt: string;
  width?: number;
}

const PokemonImage = ({ src, alt, width = 50 }: PokemonImage) => {
  const [isLoading, setIsLoading] = useState(true); // State to track image loading

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <img
        src={src}
        alt={alt}
        width={width}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </div>
  );
};

export default PokemonImage;
