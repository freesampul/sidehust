const LessonBox = ({ title, thumbnailSrc, buttonText, buttonAction }) => {

  //Upper case the first letter of the title
  const tittle = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-sm m-4 bg-white hover:shadow-lg">
      <img className="w-full" src={thumbnailSrc} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{tittle}</div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={buttonAction}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default LessonBox;
