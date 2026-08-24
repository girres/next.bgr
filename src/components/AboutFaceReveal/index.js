import FaceReveal from '@/components/FaceReveal';

export default function AboutFaceReveal() {
  return (
    <FaceReveal
      label='Reveal my face'
      className='about-face-reveal face-reveal'
      triggerClassName='face-reveal__trigger'
      ariaLabel='Reveal my face'
    />
  );
}
