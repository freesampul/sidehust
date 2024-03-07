import thumbnailLesson1 from "./lesson1images/thumbnail.webp";
const lessonData = [
  {
    id: "course-1",
    title: "intro",
    slides: [
      { id: 0, image: thumbnailLesson1, alt: "Thumbnail", price: 0 },
      { id: 1, image: "slide1.jpg", alt: "Slide 1", text: "Text for slide 1" },
      { id: 2, image: "slide2.jpg", alt: "Slide 2", text: "Text for slide 2" },
    ],
  },
  {
    id: "course-2",
    title: "problem",
    slides: [
      { id: 0, image: thumbnailLesson1, alt: "Thumbnail", price: 5 },
      { id: 1, image: "slide3.jpg", alt: "Slide 3", text: "Text for slide 3" },
      { id: 2, image: "slide4.jpg", alt: "Slide 4", text: "Text for slide 4" },
    ],
  },
];

export default lessonData;
