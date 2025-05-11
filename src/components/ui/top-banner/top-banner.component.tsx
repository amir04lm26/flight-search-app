export const TopBanner = () => {
  return (
    <section className='relative h-[200px] md:h-[220px] lg:h-[250px]'>
      <picture>
        <source
          type='image/webp'
          srcSet='https://cdn.alibaba.ir/h2/desktop/assets/images/hero/hero-e1fa22fb.webp'
        />
        <img
          src='https://cdn.alibaba.ir/h2/desktop/assets/images/hero/hero-6061caed.jpg'
          alt='Flight'
          className='w-full h-full object-cover absolute inset-0'
        />
      </picture>
    </section>
  );
};
