import React from 'react';

interface Testimonial {
  id: number;
  message: string;
  name: string;
  rating: number; // out of 5
  avatar?: string; // Optional URL or base64, fallback to default icon
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    message: "Thank you for guiding us at the right time!",
    name: "Shruthi L",
    rating: 5,
  },
  {
    id: 2,
    message:
      "I consulted Dr. Supraja Chandrasekar when my son was suffering from skin allergy. She is friendly and gives proper explanation of problem and medicine. Thank you so much doctor.",
    name: "Swetha M",
    rating: 5,
  },
  {
    id: 3,
    message: "Thank you for guiding us at the right time!",
    name: "Shruthi L",
    rating: 5,
  },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex space-x-1 mt-2">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.956c.3.92-.755 1.688-1.54 1.118L10 13.348l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.956a1 1 0 00-.364-1.118L3.643 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className=" py-12 px-6 md:px-12">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Testimonials
      </h2>
      <div className="w-24 h-1 mx-auto bg-green-500 rounded mb-12"></div>

      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map(({ id, message, name, rating }) => (
          <div
            key={id}
            className="bg-green-50 p-6 rounded shadow-sm flex flex-col justify-between"
          >
            <p className="text-teal-600 italic text-sm mb-4 relative">
              <span className="inline-block mr-1">❝</span>
              {message}
              <span className="inline-block ml-1">❞</span>
            </p>
            <StarRating rating={rating} />
            <div className="flex items-center mt-4 space-x-3">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg uppercase">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <span className="font-semibold text-gray-700">{name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
