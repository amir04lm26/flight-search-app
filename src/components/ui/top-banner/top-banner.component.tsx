import Image from "next/image";

export const TopBanner = () => {
  return (
    <section className='relative h-[200] md:h-[220] lg:h-[250]'>
      <picture>
        <source
          type='image/webp'
          srcSet='https://cdn.alibaba.ir/h2/desktop/assets/images/hero/hero-e1fa22fb.webp'
        />
        <Image
          src='https://cdn.alibaba.ir/h2/desktop/assets/images/hero/hero-6061caed.jpg'
          alt='Flight'
          className='w-full h-full object-cover'
          layout='fill'
        />
      </picture>
    </section>
  );
};
