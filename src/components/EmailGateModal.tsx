import { useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';

interface Props {
  onClose: () => void;
}

export function EmailGateModal({ onClose }: Props) {
  const [state, handleSubmit] = useForm('maqgynpa');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    if (state.succeeded) {
      const a = document.createElement('a');
      a.href = '/assets/from-demo-to-production-extrait.pdf';
      a.download = 'from-demo-to-production-extrait.pdf';
      a.click();
    }
  }, [state.succeeded]);

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal__close" onClick={onClose} aria-label="Fermer">✕</button>

        {state.succeeded ? (
          <div className="modal__success">
            <div className="modal__icon">↓</div>
            <p className="modal__title" id="modal-title">Téléchargement en cours</p>
            <p>Le PDF démarre automatiquement.<br />Bonne lecture.</p>
            <p className="modal__note">
              Je partagerai la sortie du livre complet<br />à cette adresse.
            </p>
          </div>
        ) : (
          <>
            <p className="modal__title" id="modal-title">Télécharger l'extrait</p>
            <p className="modal__sub">
              Introduction + Partie 1 (chapitres 1.1–1.4), environ 35 pages.
              <br />Laisse ton email pour recevoir le livre complet à sa sortie.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="modal__field">
                <label className="modal__label" htmlFor="email">Ton adresse email</label>
                <input
                  ref={inputRef}
                  id="email"
                  type="email"
                  name="email"
                  className="modal__input"
                  placeholder="toi@example.com"
                  required
                  aria-invalid={!!state.errors}
                />
                <ValidationError field="email" prefix="Email" errors={state.errors} className="modal__err" />
              </div>
              <button
                className="cbtn cbtn--solid"
                type="submit"
                disabled={state.submitting}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {state.submitting ? 'Envoi…' : 'Télécharger le PDF'}
              </button>
            </form>
            <p className="modal__note">
              Aucun spam. Juste la sortie du livre, quand il sera prêt.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
