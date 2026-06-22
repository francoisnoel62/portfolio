import { useRef } from 'react';
import { useStagger } from '../../hooks/useStagger';
import { useLang } from '../../context/LangContext';

export function ContactRenderer({ gen }: { data: unknown; gen: number }) {
  const { lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  useStagger(ref as React.RefObject<HTMLElement>, '.contact', gen);

  return (
    <div ref={ref}>
      <div className="contact">
        <div className="cbtns">
          <a className="cbtn cbtn--solid" href="https://mail.google.com/mail/?view=cm&fs=1&to=francoisnoel62@gmail.com" target="_blank" rel="noopener">
            {lang === 'fr' ? 'Me contacter' : 'Contact me'} ↗
          </a>
          <a className="cbtn" href="/assets/cv-francois-noel.pdf" target="_blank" rel="noopener">
            {lang === 'fr' ? 'Télécharger le CV' : 'Download CV'} ↗
          </a>
          <a className="cbtn" href="https://www.linkedin.com/in/françoisnoel62" target="_blank" rel="noopener">
            LinkedIn ↗
          </a>
          <a className="cbtn" href="https://github.com/francoisnoel62" target="_blank" rel="noopener">
            GitHub ↗
          </a>
          <a className="cbtn" href="https://revise.studio" target="_blank" rel="noopener">
            revise.studio ↗
          </a>
        </div>
        <div className="cmeta">
          <span>Lille, France</span>
          <span>·</span>
          <span>+33 7 49 15 42 69</span>
        </div>
      </div>
    </div>
  );
}
