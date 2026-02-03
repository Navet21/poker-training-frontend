import { useCardSkin } from "../../theme/useCardSkin";
import "./SkinToggle.css";

type Props = {
  variant?: "label" | "icon";
  className?: string;
};

export function SkinToggle({ variant = "label", className = "" }: Props) {
  const { skin, toggle } = useCardSkin();
  const value = skin === "flat" ? "Flat" : "Classic";

  return (
    <button
      type="button"
      onClick={toggle}
      className={`skin-toggle skin-toggle--${variant} ${className}`}
      title={`Cambiar skin (actual: ${value})`}
      aria-label="Cambiar estilo de cartas"
    >
      <span className="skin-toggle__icon" aria-hidden="true">⚙️</span>

      {variant === "label" && (
        <>
          <span className="skin-toggle__label">Skin</span>
          <span className="skin-toggle__value">{value}</span>
        </>
      )}
    </button>
  );
}
