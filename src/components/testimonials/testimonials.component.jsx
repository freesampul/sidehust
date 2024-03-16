import testimonials from "./testimonials";

const Testimonials = () => {
    return (
        <div className="testimonials flex justify-center items-center">
            <div id='test' className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-8 flex flex-col justify-between">
                        <div className="flex items-center mb-6">
                            <img
                                className="w-16 h-16 rounded-full mr-4"
                                src={testimonial.image}
                                alt={testimonial.title}
                            />
                            <div>
                                <h3 className="font-semibold text-2xl mb-1 font-bold">{testimonial.title}</h3>
                            </div>
                        </div>
                        <p className="text-gray-800 mb-6 text-3xl font-semibold">{testimonial.review}</p>
                        <div className="flex items-center">
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 fill-current text-yellow-500"
                                    viewBox="1 3 20 20"
                                >
                                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                                </svg>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Testimonials;
