import "./TrainerLayout.css";

type Props = {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
};

export function TrainerLayout({ title, onBack, children }: Props) {
  return (
    <section className="trainer">
      <div className="trainer-top">
        <div>
          <h2 className="trainer-title">{title}</h2>
          <p className="trainer-subtitle">Modo entrenamiento · feedback en cada decisión</p>
        </div>

        <button className="trainer-back" onClick={onBack} type="button">
          ← Volver
        </button>
      </div>

      <div className="trainer-body">{children}</div>
    </section>
  );
}
