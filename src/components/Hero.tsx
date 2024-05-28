import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="container mx-auto px-4 py-12 ">
      <h1 className="text-4xl  font-medium  text-center  md:text-5xl ">
        <b>Welcome to Blog & Blog</b> <br /> Discover a world of stories and
        creativity.
      </h1>
      <div className="flex flex-col  items-center px-1 pt-5 md:flex-row md:gap-8 ">
        <div className="hidden w-full h-72 relative md:block md:flex-1  ">
          <Image
            src="/Thinking.svg"
            alt=""
            fill
            quality={75}
            priority={true}
            className="object-contain  object-center rounded-lg "
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 py-12 ">
          <h1 className=" font-bold">
            Lorem ipsum dolor sit amet alim consectetur adipisicing elit.
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Lorem ipsum dolor sit amet aliquam consectetur adipisicing elit.
            Cupiditate, quam nisi magni ea laborum inventore voluptatum
            laudantium repellat ducimus unde aspernatur fuga. Quo, accusantium
            quisquam! Harum unde sit culpa debitis.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
