import "../App.css";
import SiteNav from "../components/SiteNav.jsx";
import CollageCard from "../components/CollageCard.jsx";
import useHomeMotion from "../hooks/useHomeMotion.js";
import {
  bandInfo,
  collageCards,
  members,
  releases,
  shows,
} from "../data/bandContent.js";

function Words({ text, start = 0, accent = false }) {
  return text.split(" ").map((word, index) => (
    <span className="word-shell" key={`${start}-${word}-${index}`}>
      {index > 0 ? " " : null}
      <span
        className={accent ? "title-word title-word--accent" : "title-word"}
        style={{ "--word-index": start + index }}
      >
        {word}
      </span>
    </span>
  ));
}

function SectionHeading({ index, eyebrow, title, note }) {
  return (
    <div className="section-heading">
      <span className="eyebrow reveal">
        {index} / {eyebrow}
      </span>
          <h2 className="stagger-title">{title}</h2>
          {note && <p className="reveal">{note}</p>}
    </div>
  );
}

export default function Home() {
  const pageRef = useHomeMotion();
  return (
    <main ref={pageRef} id="home">
      <SiteNav />
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-center">
          <h1 id="hero-title" className="hero-word">
            VALERIE
          </h1>
          <div className="hero-subline">
            <span>EMO</span>
            <span>— {bandInfo.location}</span>
          </div>
        </div>
        <div className="hero-bottom">
          <span>EST. {bandInfo.established}</span>
        </div>
        <div className="hero-orbit" aria-hidden="true" />
      </section>

      <section className="intro section-pad" id="about">
        <SectionHeading
          index="01"
          eyebrow="A NOTE FROM VALERIE"
          title={
            <>
              <span className="title-line"><Words text="SOMEWHERE" start={0} /></span>
              <span className="title-line"><Words text="BETWEEN THE" start={1} /></span>
              <span className="title-line"><Words text="NOISE & US." start={3} accent /></span>
            </>
          }
        />
        <div className="intro-copy reveal">
          <span className="cross-mark" aria-hidden="true">
            ✳
          </span>
          <p>
            This space is for the sound, the people, and everything that happens
            around it.
          </p>
          <p className="muted-copy">
            A short introduction is on its way. Until then, stay a little while.
          </p>
          <a className="text-link" href="#contact">
            SAY HELLO <span>↗</span>
          </a>
        </div>
      </section>

      <section className="collage-section" id="gallery">
        <div className="collage-topline">
          <span>02 / VISUAL FRAGMENTS</span>
          <span>IMAGES TO BE REPLACED WITH BAND ARCHIVE</span>
        </div>
        <div className="collage-stage">
          <p className="collage-whisper stagger-title">
            <span className="title-line"><Words text="THE THINGS" start={0} /></span>
            <span className="title-line"><Words text="WE KEEP" start={2} /></span>
          </p>
          {collageCards.map((card, index) => (
            <CollageCard key={card.id} card={card} index={index} />
          ))}
          <span className="stage-coordinate">35° 40' N / OPEN FILE</span>
        </div>
      </section>

      <section className="music-section section-pad" id="music">
        <SectionHeading
          index="03"
          eyebrow="SOUND / RELEASES"
          title={
            <>
              <span className="title-line"><Words text="A ROOM FULL" start={0} /></span>
              <span className="title-line"><Words text="OF" start={3} /><Words text="FEELING." start={4} accent /></span>
            </>
          }
          note="Songs and records, when they find their way here."
        />
        <div className="release-list">
          {releases.map((release, index) => (
            <article className="release-row" key={release.title}>
              <span className="row-index">0{index + 1}</span>
              <div>
                <h3 className="stagger-title"><Words text={release.title} /></h3>
                <p>
                  {release.format} <i>·</i> {release.year}
                </p>
              </div>
              {release.link ? (
                <a
                  href={release.link}
                  aria-label={`Listen to ${release.title}`}
                >
                  LISTEN ↗
                </a>
              ) : (
                <span className="row-placeholder">LINK TO COME</span>
              )}
            </article>
          ))}
        </div>
        <span className="music-watermark" aria-hidden="true">
          SIDE A
        </span>
      </section>

      <section className="shows-section section-pad" id="shows">
        <SectionHeading
          index="04"
          eyebrow="LIVE / IN PERSON"
          title={
            <>
              <span className="title-line"><Words text="WE'LL MEET" start={0} /></span>
              <span className="title-line"><Words text="OUT THERE." start={2} accent /></span>
            </>
          }
          note="No dates announced just yet."
        />
        <div className="show-list">
          {shows.map((show) => (
            <article className="show-row" key={show.date}>
              <span>{show.date}</span>
              <h3 className="stagger-title"><Words text={show.venue} /></h3>
              <span>{show.city}</span>
              <span className="show-status">{show.status}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="members-section section-pad" id="members">
        <SectionHeading
          index="05"
          eyebrow="THE PEOPLE"
          title={
            <>
              <span className="title-line"><Words text="MADE OF" start={0} /></span>
              <span className="title-line"><Words text="FEELING." start={2} accent /></span>
            </>
          }
          note="Names, faces, and parts played will live here."
        />
        <div className="member-list">
          {members.map((member) => (
            <article className="member-card" key={member.name}>
              <span className="member-symbol" aria-hidden="true">
                V
              </span>
              <div>
                <h3 className="stagger-title"><Words text={member.name} /></h3>
                <p>{member.role}</p>
                <span>{member.bio}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <span className="eyebrow reveal">06 / OPEN CHANNEL</span>
        <p className="contact-kicker reveal">
          FOR BOOKING, NOTES, OR JUST TO SAY
        </p>
        <h2 className="contact-title stagger-title">
          <Words text="HELLO" /><span className="contact-arrow" aria-hidden="true">↗</span>
        </h2>
        <p className="contact-placeholder">[BOOKING EMAIL] · [SOCIAL LINKS]</p>
      </section>
      <footer className="site-footer">
        <a href="#home">VALERIE®</a>
        <span>AN OPEN-ENDED ARCHIVE</span>
        <a href="#home">BACK TO TOP ↑</a>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}
