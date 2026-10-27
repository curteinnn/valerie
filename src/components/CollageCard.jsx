export default function CollageCard({ card, index }) {
  return (
    <article
      className={`collage-card card-${index + 1} ${card.shape}`}
      data-speed={card.speed}
    >
      <div
        className={`card-art tone-${card.tone}`}
        role="img"
        aria-label={card.title}
      >
        <span className="art-grain" aria-hidden="true" />
        <span className="art-cross" aria-hidden="true">
          ✳
        </span>
        <span className="art-note">{card.note} / V.</span>
        <span className="art-placeholder">{card.title}</span>
      </div>
      <div className="card-caption">
        <span>{card.label}</span>
        <span>VALERIE — {card.note}</span>
      </div>
    </article>
  );
}
