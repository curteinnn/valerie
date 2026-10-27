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
              SOMEWHERE<br />
              BETWEEN THE<br />
              NOISE &amp; US.
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
            THE THINGS<br />
            WE KEEP
          </p>
          {collageCards.map((card, index) => (
            <CollageCard key={card.id} card={card} index={index} />
          ))}
          <span className="stage-coordinate">35° 40' N / OPEN FILE</span>
        </div>
      </section>

      <div className="horizontal-scroll">
        <div className="horizontal-track">
      <section className="music-section section-pad" id="music">
        <SectionHeading
          index="03"
          eyebrow="SOUND / RELEASES"
          title={
            <>
              A ROOM FULL<br />
              OF FEELING.
            </>
          }
          note="Songs and records, when they find their way here."
        />
        <div className="release-list">
          {releases.map((release, index) => (
            <article className="release-row" key={release.title}>
              <span className="row-index">0{index + 1}</span>
              <div>
                <h3 className="stagger-title">{release.title}</h3>
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
              WE'LL MEET<br />
              OUT THERE.
            </>
          }
          note="No dates announced just yet."
        />
        <div className="show-list">
          {shows.map((show) => (
            <article className="show-row" key={show.date}>
              <span>{show.date}</span>
              <h3 className="stagger-title">{show.venue}</h3>
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
              MADE OF<br />
              FEELING.
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
                <h3 className="stagger-title">{member.name}</h3>
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
        <h2 className="contact-title">
          <span className="stagger-title">HELLO</span>
          <span className="contact-arrow" aria-hidden="true">↗</span>
        </h2>
        <p className="contact-placeholder">[BOOKING EMAIL] · [SOCIAL LINKS]</p>
        <div className="contact-meta">
          <a className="contact-meta-brand" href="#home">VALERIE®</a>
          <span>AN OPEN-ENDED ARCHIVE</span>
          <a href="#home">BACK TO TOP ↑</a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </section>
        </div>
      </div>
    </main>
  );
}
