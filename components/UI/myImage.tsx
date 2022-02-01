/* eslint-disable @next/next/no-img-element */

type Props = {
  alt: string;
  className?: string;
  height?: string;
  src: string;
  useMap?: string;
  width?: string;
};

const MyImage: React.FC<Props> = ({
  alt,
  className,
  height,
  src,
  width,
  useMap,
}) => {
  return (
    <img
      alt={alt}
      className={className}
      height={height}
      loading="lazy"
      src={src}
      useMap={useMap}
      width={width}
    />
  );
};

export default MyImage;
