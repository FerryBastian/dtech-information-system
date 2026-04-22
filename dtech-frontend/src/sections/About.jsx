import React from "react";

// ─── GANTI URL INI dengan foto asli kamu ───────────────────────
// Contoh pakai foto lokal: "/images/hero-about.jpg"
// Sekarang pakai URL yang sama persis seperti di Hero.jsx
const HERO_IMG  = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80";
const EVENT_IMG = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80";
// ───────────────────────────────────────────────────────────────

const AboutPage = () => {
  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", background: "#000", color: "#fff" }}>

      {/* ─── HERO ─── */}
      {/* Menggunakan backgroundImage persis seperti Hero.jsx */}
      <section
        style={{
          position: "relative",
          height: "420px",
          overflow: "hidden",
          background: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Layer foto — sama persis dengan Hero.jsx */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${HERO_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.45,
          }}
        />
        {/* Overlay gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.95) 100%)",
          }}
        />

        {/* Teks Hero */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 44px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
              marginBottom: "14px",
            }}
          >
            About Dtech-Engineering
          </h1>
          <p
            style={{
              fontSize: "12px",
              letterSpacing: "0.38em",
              color: "rgba(255,255,255,0.7)",
              textTransform: "uppercase",
              fontWeight: 300,
            }}
          >
            R e d i f i n e &nbsp;&nbsp; T e c h n o l o g y
          </p>
        </div>

        {/* Garis cyan bawah — sama seperti Hero.jsx */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(to right, transparent, #00b4d8, transparent)",
          }}
        />
      </section>

      {/* ─── WHO ARE WE ─── */}
      <section style={{ background: "#000", padding: "60px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "220px 1fr",
            gap: "60px",
            maxWidth: "960px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "36px",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "#fff",
              letterSpacing: "0.01em",
            }}
          >
            Who<br />Are We
          </div>

          <div
            style={{
              fontSize: "13.5px",
              lineHeight: 1.85,
              color: "rgba(255,255,255,0.75)",
              fontWeight: 300,
            }}
          >
            <p>
              A global technology company founded in Salatiga in 2009. Since its establishment, our company
              has been committed to delivering innovative technology and engineering solutions that are
              competitive on a global scale. With over a decade of experience, we have supported a wide range
              of research, design, and technology development projects for clients across various countries.
            </p>
            <p style={{ marginTop: "16px" }}>
              Our company is headquartered at Jl. Nusantara No. 18, Canden, Salatiga, Indonesia 50742,
              serving as the center for our operations and technological innovation.
            </p>
          </div>
        </div>
      </section>

      {/* ─── VISION & MISSION ─── */}
      <section style={{ background: "#000", padding: "0 60px 60px" }}>
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 400px",
            gap: "40px",
            alignItems: "start",
          }}
        >
          {/* Kiri: Vision + Mission */}
          <div>
            <div style={{ marginBottom: "28px" }}>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "30px",
                  fontWeight: 400,
                  color: "#fff",
                  marginBottom: "12px",
                  letterSpacing: "0.01em",
                }}
              >
                Vision
              </h2>
              <p
                style={{
                  fontSize: "13px",
                  lineHeight: 1.75,
                  color: "rgba(255,255,255,0.7)",
                  maxWidth: "380px",
                }}
              >
                "Providing the greatest possible benefit to all beings in the universe."
              </p>
            </div>

            <div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "30px",
                  fontWeight: 400,
                  color: "#fff",
                  marginBottom: "12px",
                  letterSpacing: "0.01em",
                }}
              >
                Mision
              </h2>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {[
                  'Introducing and promoting "distributed manufacturing"',
                  "Enhancing Indonesia's Global Competitiveness Index",
                  "Discovering a wide range of high-quality smart machines at competitive and affordable prices in Indonesia",
                ].map((item, i) => (
                  <li
                    key={i}
                    style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Kanan: Foto Event — pakai backgroundImage agar konsisten */}
          <div
            style={{
              width: "100%",
              aspectRatio: "4/3",
              minHeight: "260px",
              borderRadius: "4px",
              backgroundImage: `url(${EVENT_IMG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      </section>

    </div>
  );
};

export default AboutPage;