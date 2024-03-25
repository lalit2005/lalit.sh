interface GalleryProps {
  images: string[];
  // each string is in the form of URL||ALT_TEXT
}

const Gallery = (props: GalleryProps) => {
  return (
    <div className="flex relative">
      <div className="flex overflow-x-scroll space-x-5">
        {props.images.map((image, index) => (
          <img
            className="block max-h-64 !rounded gallery-image relative object-contain"
            data-cap={image.split("||")[1]}
            key={index}
            src={image.split("||")[0]}
            alt={image.split("||")[1]}
          />
        ))}
      </div>
      <div className="absolute top-0 right-0 w-10 h-full bg-gradient-to-r from-transparent to-zinc-950" />
    </div>
  );
};

export default Gallery;
